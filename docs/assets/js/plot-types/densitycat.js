import {getLabelPostion, setupBranching} from "../plot-utils";
////////////////////////////////////////////////////////
//DENSITY CATEGORY plots

const TICKCOUNT = [	['0', '100', '1,000', '10,000', '100,000'],6];

export function processData(data, plotinfo){
	//given raw data
	//transforms to a d3-friendly data format
	const z = data.z;
	const z2 = Math.pow(data.z, 2); //z-squared
	const BINS = data.bins;


	let d3data = {
		format: "DensityCat",
		stops: [], //an array of series indices for each stop / interactive frame
		data: {}, //an array of d3-friendly data objects for each series, organized by type of geometry
		series: [],
		headers: [],
		labels: [],
		colors: [],
		xdomains: [],
		ydomains: [],
		axes: ['Density', '%'],
		ticks: [TICKCOUNT[0], TICKCOUNT[1]]
	}
 	
 	let bin_minmax = [ d3.mean(BINS.slice(0,2)),  d3.mean(BINS.slice(-2))];
 	
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
		d3data.xdomains.push([bin_minmax[0], bin_minmax[1]]);
		d3data.ydomains.push(sequence.y);

		//if label headers are needed for each sequence
		if( data.str ){
			let stringIndex = sequence.s.indexOf(1);
			let header = data.str[stringIndex][1];
			d3data.headers.push(header);
		}
	});

	let binset = []; 
	let dataset = [];
	let errorset = []; 

	let inds = [], values = [], weights = [], densities = [];
	//extract where to place labels from plots.json info
	let positions = plotinfo['series_positions'].split(',');

	//convert series data to x,y coordinates for d3 processing
	data.series.forEach( (series, i) =>{
		
		d3data.labels.push([series.s, getLabelPostion(positions, i) ]); //push label data
		//for each series
		d3data.colors.push(series.c);
		//for each series

		d3data.series.push({
			shape: 'lineerror',
			data: {
				'lines': [],
				'errors': []
			}
		});

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
			    	y: 100 * p
			    }

			   d3data.series[i].data.lines.push(datapoint);
			   d3data.series[i].data.errors.push(error_area);
			}


			if(i == 0){
				//this only needs to happen for the first series
				let bin = {
					x: bin_bounds[0],
					width: bin_bounds[1]-bin_bounds[0]
				}
				//crop first and last
				if( j == 0){
					bin.x = bin_minmax[0];
					bin.width = bin_bounds[1]-bin_minmax[0];
				}else if( j == BINS.length-2 ){
					bin.width = bin_minmax[1]-bin_bounds[0];
				}
				binset.push(bin); 
			}        
		};//end for bins
	}); //end for each series

	d3data.bins = binset;

	//if there are "from" transitions
	d3data = setupBranching(data.seq, d3data);

	return d3data;
}