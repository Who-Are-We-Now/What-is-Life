var fs = require('fs');
var path = require('path');
var d3 = require('d3');	
const plots = require("./plots.json"); //read in figures index file

let allplots = {};
let prints = [];
let plotinfo;
function setupPlotData(){
//reads through the directory of json data files
//formats data into a global json containing all data
//restructure for use with d3
//outputed to docs/assets/js/allplotdata.json via src/allplotdata.liquid
	const directoryPath = path.join(__dirname, './responses');

	fs.readdir(directoryPath, function (err, files) {
		//handling error
		if (err) {
			return console.log('Unable to scan directory: ' + err);
		} 
		files.forEach(function (file) {
			if( path.extname(file) == '.json' ) {
				let filepath = path.join(directoryPath, file);
				let key = path.basename(file, '.json');
				plotinfo = plots[key];
				// console.log(key, ":");
				// console.log(JSON.parse(fs.readFileSync(filepath)).type);
				if( plotinfo ){

					if( key.endsWith('-print') ){					
						prints.push( [key, filepath] );
						//process print data later
					}else{
					
						let plot_data = JSON.parse(fs.readFileSync(filepath));
						// console.log(plot_data);											
						
						let plot_type = plot_data.type;
						
						if( plot_type == 'AgeCat'){					
							allplots[key] = AgeCatData(plot_data);  
						}else if( plot_type == 'Bars'){
							allplots[key] = BarsData(plot_data);
						}else if( plot_type == 'XY'){
							allplots[key] = XY(plot_data);
						}else if( plot_type == 'PCA'){
							allplots[key] = PCAData(plot_data);
						}else if( plot_type == 'DensityCat'){
							allplots[key] = DensityCatData(plot_data);						
						}else{
							//not suppoorted yet;
							allplots[key] = plot_data;
						}

				
						// if( plot_data.series ){
						// 	plot_data.series.forEach( series => {
						// 		console.log('"',series.s,'",');
						// 	});
						// }
						// if( plot_data.seq ){
						// 	console.log('stops', plot_data.seq.length);
						// }								
					}//if web
				}//if defined
			}//if json
		}); //foreach file

		//for each print file
		prints.forEach( file =>{
			// console.log(file);
			let printkey = file[0];
			// console.log(printkey);
			let file_data = JSON.parse( fs.readFileSync(file[1]) );
			//determine corresponding data file from id
			let id =  file_data.name.toLowerCase();			
			id = isNaN(id.slice(-1)) ? id : id.slice(0, -1); //remove number if it is numbered

			// console.log(printkey, id);
			//corresponding data from main data file
			//first assign default plot data
			if ( allplots[id] ){
				allplots[printkey] = JSON.parse(JSON.stringify(allplots[id])); //deep copy
				// override sequence / scope from print file
				if(file_data.i){
					allplots[printkey].stops = [file_data.i];
				}	
				if(file_data.y){
					allplots[printkey].ydomains = [file_data.y];
				}
				if(file_data.x){
					if( file_data.type == 'XY' ){
						//multiple x-scales for XY plots, override the first
						allplots[printkey].xdomains = [file_data.x];
					}else{
						allplots[printkey].xdomain = file_data.x;
					}
					
				}
			}
							
		});
	});//readdir
	return allplots;
}


function AgeCatData(data){
	const z = data.z;
	const z2 = Math.pow(data.z, 2); //z-squared
	const BINS = data.bins;
	// const min_x = BINS[0];
	// const max_x = BINS[BINS.length-1];

	const min_age = data.x[0];
	const max_age = data.x[1];

	ages = Array
		.from({length: max_age + 1 - min_age}, (v, i) => i)
		.map(i => i + min_age); // array of integers between

	let d3data = {
		format: "AgeCat",
		stops: [], //an array of series indices for each stop / interactive frame
		data: [], //an array of d3-friendly data objects for each series, organized by type of geometry
		labels: [], //labels for each series
		xdomain: [],
		ydomains: []
	}
 	
	//append sequence-specific info to d3 data 
	data.seq.forEach( (sequence, index) =>{
		let seriesIndices = sequence.i; //index of series relevant for this sequence
		d3data.stops.push(seriesIndices);
		//check for 'from' transitions
		// if( sequence.from ){
		// 	d3data.stops.push( [seriesIndices, sequence.from]);
		// }else{
		// 	d3data.stops.push( [seriesIndices, '']);
		// }
		d3data.ydomains.push(sequence.y);
	});

	let binset = []; 
	let dataset = [];
	let errorset = []; 

	//extract where to place labels from plots.json info
	let positions = plotinfo['series_positions'].split(',');
	let bin_minmax = [ d3.mean(BINS.slice(0,2)),  d3.mean(BINS.slice(-2))];
	d3data.xdomain = bin_minmax;
	//convert series data to x,y coordinates for d3 processing
	data.series.forEach( (values, i) =>{
		
		d3data.labels.push([values.s, getLabelPostion(positions, i) ]); //push label data
		//for each series
		dataset[i] = []; //data for plotting lines
		errorset[i] = []; //data for error area

		//calculate error bars for each bin
		for(let j=0; j < BINS.length - 1; j++){

			let ageLo = BINS[j];
			let ageHi = BINS[j+1];
			let bin_midpoint = ageLo + 0.5*(ageHi - ageLo);

			let bin_bounds = [];
			if ( j == 0){
				bin_bounds = [min_age, ageHi ];
			}else if ( j == BINS.length - 2 ){
				//last bin
				bin_bounds = [ageLo, max_age ];
			}else{
				bin_bounds = [ageLo, ageHi];
			}
		 
			let ages_bounds = [ ages.indexOf(bin_bounds[0]), ages.indexOf(bin_bounds[1]) ];
			let ages_mask = ages.slice( ages_bounds[0], ages_bounds[1]);

			// let diff = ages_bounds[1] - ages_bounds[0];
			let ages_avg = d3.mean(ages_mask);

			let subset_n = values['n'].slice(ages_bounds[0], ages_bounds[1]);
			let subset_p = values['p'].slice(ages_bounds[0], ages_bounds[1]);
			let subset_N = values['N'].slice(ages_bounds[0], ages_bounds[1]);
			let subset_P = values['P'].slice(ages_bounds[0], ages_bounds[1]);

			let sum_n = d3.sum(subset_n);
			let sum_p = d3.sum(subset_p);
			let sum_N = d3.sum(subset_N);
			let sum_P = d3.sum(subset_P); 

			let n = sum_n + sum_p;
			let nz2 = n + z2;
			let w = z2 / nz2;
			let w1 = 1 - w;

			let p = sum_P / (sum_N + sum_P); // weighted yes fraction
			let p0 = w1*p + w*0.5;
			let pe = z * Math.sqrt(w1 * p * (1 - p)/nz2 + w/(4 * nz2) );

			let percent = 100 * p;

			let error_area = {
				x: bin_midpoint, //bin_midpoint
				low: 100 * (p0 - pe),
				high: 100 * (p0 + pe),
			}

			let datapoint = {
				x: bin_midpoint,
				percent: percent
			}

			// let bin = {
			// 	x: bin_bounds[0],
			// 	width: diff
			// }

			// //cropping x-axis
			// if( j == 0 ){
			// 	//for left  edge of first bin: use first x-coordinate
			// 	bin.x = ages_avg;
			// 	//set x-axis range to begin with this value
			// 	d3data.xdomain[0] = ages_avg;
			// }else if( j == BINS.length - 2 ){
			// 	//for right edge of last bin: use last x-coordinate
			// 	d3data.xdomain[1] = ages_avg;
			// }

			dataset[i].push(datapoint);
			errorset[i].push(error_area);

			if(i == 0){
				//this only needs to happen for the first series
				let bin = {
					x: bin_bounds[0],
					width: bin_bounds[1]-bin_bounds[0]
				}
				binset.push(bin); 
			}        
		};
	}); //end for each series

	d3data.data = {
		lines: dataset,
		errors: errorset,
		bins: binset
	}

	return d3data;
}


function DensityCatData(data){
	const z = data.z;
	const z2 = Math.pow(data.z, 2); //z-squared
	const BINS = data.bins;


	let d3data = {
		format: "DensityCat",
		stops: [], //an array of series indices for each stop / interactive frame
		data: [], //an array of d3-friendly data objects for each series, organized by type of geometry
		labels: [], //labels for each series
		xdomain: [],
		ydomains: []
	}
 	
	//append sequence-specific info to d3 data 
	data.seq.forEach( (sequence, index) =>{
		let seriesIndices = sequence.i; //index of series relevant for this sequence
		d3data.stops.push(seriesIndices);
		//check for 'from' transitions
		// if( sequence.from ){
		// 	d3data.stops.push( [seriesIndices, sequence.from]);
		// }else{
		// 	d3data.stops.push( [seriesIndices, '']);
		// }
		d3data.ydomains.push(sequence.y);
	});

	let binset = []; 
	let dataset = [];
	let errorset = []; 

	let inds = [], values = [], weights = [], densities = [];
	//extract where to place labels from plots.json info
	let positions = plotinfo['series_positions'].split(',');


	let bin_minmax = [ d3.mean(BINS.slice(0,2)),  d3.mean(BINS.slice(-2))];
	d3data.xdomain = [bin_minmax[0], bin_minmax[1]]

	//convert series data to x,y coordinates for d3 processing
	data.series.forEach( (series, i) =>{
		
		d3data.labels.push([series.s, getLabelPostion(positions, i) ]); //push label data
		//for each series
		dataset[i] = []; //data for plotting lines
		errorset[i] = []; //data for error area

		let vs = series.v;
		let nRespondents = vs.length;

		// support for either global or per-series weight map
		let weightMap = series.w; // use per-series weights
		if( typeof weightMap == 'undefined'){
			weightMap = data.w; // use global weights
		}

		let densityMap = series.d; // use per-series densitys
		if( typeof densityMap == 'undefined'){
			densityMap = data.d; // use global densitys
		}

		//convert from weight: counts to
		let ws = new Array(nRespondents);
		let ds = new Array(nRespondents);

		for (const weight in weightMap){
			let w = parseFloat(weight);
			weightMap[weight].forEach( x=>{
				ws[x] = w;
			});
		}

		for (const density in densityMap){
			let w = parseFloat(density);
			densityMap[density].forEach( x=>{
				ds[x] = w;
			});
		}

		if( series.i ){
			ind = series.i;
		}else{
			ind = new Array(nRespondents).fill(1);
		}

        inds.push(ind);
		values.push(vs);
		weights.push(ws);
		densities.push(ds);
	});

	data.series.forEach( (series, i) =>{
		//calculate error bars for each bin
		for(let j=0; j < BINS.length - 1; j++){

			// let percent = 100 * p;
			let binLo = BINS[j];
			let binHi = BINS[j+1];
			let bin_midpoint = binLo + 0.5*(binHi - binLo);

			let bin_bounds = [binLo, binHi];

			let mask = []; //setup an array of 1s and 0s where the density is within bounds			
			inds[i].forEach( (ind, k) =>{
				let d = densities[i][k];
				if( d >= bin_bounds[0] && d < bin_bounds[1]){
					mask.push( ind * 1 );
				}else{
					mask.push( ind * 0 );
				}
			});
			
			let vs = values[i];
			let yes = [];
			let no = [];
			// python: yes = np.where(mask * vs)[0]
			mask.forEach( (m,k) =>{
				let condition = m*vs[k];
				if ( m*vs[k] == 1){
					yes.push(k);
				}else if( m*(1-vs[k]) == 1){
					no.push(k);
				}				
			});

			// console.log('yes', yes, 'no', no);
			let ns = no.length;
			let ps = yes.length;

			let Ns = 0;
			no.forEach( n=>{				
				Ns = Ns + weights[i][n];
			});

			let Ps = 0;
			yes.forEach( y=>{				
				Ps = Ps + weights[i][y];
			});
			if (Ns+Ps > 0){
			    // We compute confidence intervals per Olivier & May,
			    // _Weighted confidence interval construction for binomial parameters_
			    // in Statistical methods in medical research 15, no. 1 (2006): 37-46.
			    // We use weighted p's, but unweighted n's.
			    // Ideally we'd have a correction for the n too, since if the weighting
			    // is very uneven the effective n is smaller.
			   
			    // self.good[i,j] = 1
			    let n = ns+ps;
			    let nz2 = n + z2;
			    let w = z2 / nz2;
			    let w1 = 1.-w;
			    let p = Ps / (Ns+Ps) //weighted yes fraction
			    let p0 = w1*p + w*0.5;
			    let pe = z * Math.sqrt(w1 * p * (1 - p)/nz2 + w/(4 * nz2) );

			    let error_area = {
			    	x: bin_midpoint, //bin_midpoint
			    	low: 100 * (p0 - pe),
			    	high: 100 * (p0 + pe),
			    }

			    let datapoint = {
			    	x: bin_midpoint,
			    	percent: 100 * p
			    }
			    dataset[i].push(datapoint);
			    errorset[i].push(error_area);
			}

			// // let bin = {
			// // 	x: bin_bounds[0],
			// // 	width: diff
			// // }



			if(i == 0){
				//this only needs to happen for the first series
				let bin = {
					x: bin_bounds[0],
					width: bin_bounds[1]-bin_bounds[0]
				}
				binset.push(bin); 
			}        
		};//end for bins
	}); //end for each series

	d3data.data = {
		lines: dataset,
		errors: errorset,
		bins: binset
	}

	return d3data;
}




function BarsData(data){
	//format data for bar chart
	// x is the prediction score
	// y is the questions

	//setup stop index and ydomains for each series
	const questions = data.qs;
	// const questionlist =  d3.groupSort(data.series[0].vs, g => -d3.median(g, d => d[1]), d => questions[ d[0] ]);
	let d3data = {
		format: "Bars",
		data: {
			qs: questions,
			series: data.series
		},
		stops: [],
		labels: [],
		ydomains: []
	}

	data.series.forEach( (series, index) =>{
		d3data.stops.push(index);
		d3data.labels.push(series.title);
		d3data.ydomains.push(d3.groupSort(series.vs, g => -d3.median(g, d => d[1]), d => questions[ d[0] ]) );
	});

	return d3data;
}

function XY(data){

	let d3data = {
		format: "XY",
		stops: [], //an array of series indices for each stop / interactive frame
		data: {
			dots: [],
			areas: [],
			lines: []
		}, //an object d3-friendly data objects for each series, organized by type of geometry
		labels: [], //labels for each series
		xdomains: [],
		ydomains: [],
		axes: []
	}


	//extract where to place labels from plots.json info
	let positions = plotinfo['series_positions'].split(',');

	// loop through series data to store in object
	// Construct X,Y tuples by series

	// function checkIfEmpty( series ){ return series.s == "" };
	// let first_series_type = checkIfEmpty ( data.series[0] ); //true if series is line type  
	// // console.log( first_series_type )
	// let multiple = false; //check for whether there are multiple geometries stored
	// let alternate = false; //multiple geometries are stored every-other series alternately, or consecutively (default)
	let seriesColors = [];
	data.series.forEach( (values,i) =>{

		if (values.s !== ""){
			//this series contains the axis names
			//series index is the size of the labels array
			label_position = getLabelPostion(positions, d3data.labels.length);
			d3data.labels.push([values.s, label_position]); //push label data
		}

		//setup unique series by geometry
		//use color array value to match series indices across geometries
		let color = JSON.stringify(values.c);		
		if( !seriesColors.includes(color) ){
			seriesColors.push(color);
		}
		let seriesIndex = seriesColors.indexOf(color);		

		let xy_type = 'lines';

		if ( values.w < 0){
			xy_type='dots';
		}else if( values.w == 0){
			xy_type='areas';
		}

		d3data.data[xy_type][seriesIndex] = values.x.map( (d, i)=>{
			return {x: d, y: +values.y[i] }
		});
  	});

	//loop through sequence data to store stops,
	//cleaned up by series organization
	data.seq.forEach( (sequence, j) =>{
		let seriesIndices = sequence.i; //index of series relevant for this sequence
		// d3data.stops.push(seriesIndices);
		d3data.stops[j] = [];
		// if there are paired geometries, simplify the sequence seriesIndices
		// 	to the pared-down indices
		seriesIndices.forEach(index =>{
			//add unique series to stops array
			let seriesColor = JSON.stringify(data.series[index].c);
			let seriesIndex = seriesColors.indexOf(seriesColor);
			if ( !d3data.stops[j].includes(seriesIndex) ){
				d3data.stops[j].push(seriesIndex);
			}
		});
		d3data.xdomains.push(sequence.x)
		d3data.ydomains.push(sequence.y);
	});

	
	if (data.ax){
		//add axes info
		d3data.axes = [data.ax, data.ay];
	}

	return d3data;
}


function PCAData(data){
	let d3data = {
		format: "PCA",
		stops: [],
		data: [],
		labels: [],
		xdomain: [],
		ydomain: [],
		zdomain:[],
		axes: []
	}

	let questions = data.qs[0];
	let nQuestions = questions.length;
	let identities = data.qs[1]; 
	let nIds = identities.length;

	let vsh = data.vsh; //data.vsh.length equals questions.length

	let questionData = [];
	for( j=0; j<nQuestions; j++){
		let array1 = data.data.map( x => x[j] ); 
		
		let mean = d3.mean(array1);
		// console.log('mean', mean);
		let array2 = array1.map( y => y - mean );
		let std = d3.deviation(array2);
		// console.log('std', std);
		let array3 = array2.map( z => z/std);
		questionData.push ( array3 );
	}

	let questionDataTransposed = d3.transpose(questionData);

	let mmultiply = (a, b) => a.map(x => transpose(b).map(y => dotproduct(x, y)));
	let dotproduct = (a, b) => a.map((x, i) => a[i] * b[i]).reduce((m, n) => m + n);
	let transpose = a => a[0].map((x, i) => a.map(y => y[i]));

	let T = mmultiply(questionDataTransposed, vsh);
	// console.table(T);

	let expEnv = {};
	identities.forEach( (id, i) =>{
		expEnv[id] = data.data.map( x => x[nQuestions+i] );
		// console.log('expenv', i, expEnv[id] );
	});

	let count = 0;
	data.seq.forEach( (sequence, i) =>{
		d3data.labels[i] = [];
		let dataset = [];
		
		d3data.stops[i] = [];
		//each sequence index contains an array of groups

		sequence.forEach( group=>{
			d3data.stops[i].push(count);
			count++;
			let expression = group[0];
			let label = group[1];
			let pointSize = group[3];
			let alpha = group[4];


			d3data.labels[i].push(label);

			let filter = []
			if( ["Female", "Male", "She", "He"].includes(expression) ){
				filter =  expEnv[expression];
			}else if( expression == "Female*Male")	{
				filter = expEnv["Female"].map( (f,i) => f*expEnv["Male"][i] );
			}else if( expression == "(1-Female)*(1-Male)" ){
				filter = expEnv["Female"].map( (f,i) => (1 - f) * (1 - expEnv["Male"][i]) );
			}else if( expression == "She*He"){
				filter = expEnv["She"].map( (f,i) => f*expEnv["He"][i] );
			}else if( expression == "(1-She)*(1-He)" ){
				filter = expEnv["She"].map( (f,i) => (1 - f) * (1 - expEnv["He"][i]) );
			}else if ( expression == "Hetero*(1-Homo)*Female*(1-Male)" ){
				filter = expEnv["Hetero"].map( (f,i) => f * (1 - expEnv["Homo"][i]) * expEnv["Female"][i]*( 1 - expEnv["Male"][i] ) );
			}else if ( expression ==  "Homo*(1-Hetero)*Female*(1-Male)"){
				filter = expEnv["Homo"].map( (f,i) => f * (1 - expEnv["Hetero"][i]) * expEnv["Female"][i]*( 1 - expEnv["Male"][i] ) );
			}
			// console.log(expression, filter);

			let ind =  [];
			filter.forEach( (f, i) =>{ 
				if( f !== 0){
				 	ind.push(i);
				} 
			});//where filter is non-zero
			// console.log(ind);

			let ps = ind.map( i => T[i] );
			// console.log(ps)
			dataset.push( ps );
		});

		d3data.data.push(dataset);
	});


	d3data.xdomain = data.x;
	d3data.ydomain = data.y;

	return d3data;
}

//HELPERS
function getLabelPostion(positions, i){
	let label_position = '1t'; //set default label position at 2nd data point (index 1)
	if (positions[i] != '' && typeof positions[i] !='undefined'){
		label_position = positions[i];
	}
	return label_position;
}

module.exports = setupPlotData;