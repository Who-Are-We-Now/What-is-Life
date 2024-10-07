import {getLabelPostion, setupBranching, weighted_ranks, weighted_median} from "../plot-utils";
////////////////////////////////////////////////////////
//DENSITY AVERAGE plots

const TICKCOUNT = [	['0', '100', '1,000', '10,000', '100,000'], 8];

export function processData(data, plotinfo){
	//given raw data
	//transforms to a d3-friendly data format

	const BINS = data.bins;
	
	let d3data = {
		format: "DensityAvg",
		stops: [], //an array of series indices for each stop / interactive frame
		errorStops: [], //array of relevant error areas (special for average plots)
		labels: [], //labels for each series
		colors: [],
		bins: [],
		series: [],
		xdomains: [],
		ydomains: [],
		axes: ['Density', ''],
		ticks: [TICKCOUNT[0], TICKCOUNT[1]]
	}


	let inds = [], values = [], noisyvalues = [], weights = [], densities = [];
	//extract where to place labels from plots.json info
	let positions = plotinfo['series_positions'].split(',');


	// The JSON is series[weight][value][age] += 1
	// We're transforming to self.seriesData[iSeries][weight][age] = [value, value, ]
	// convert series data to x,y coordinates for d3 processing
	let seriesData = [];
	let nRespondents = data.n;

	data.series.forEach( (series, i) =>{
		
		d3data.labels.push([series.s, getLabelPostion(positions, i) ]); //push label data
		d3data.colors.push(series.c);
		
		let vs = series.v;
		let random = series.r;

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


		let ind;
		if( series.j.length > 0 ){
			ind = series.j;
		}else{
			ind = [...Array(nRespondents).keys()];
		}
		inds.push(ind);

		let raw = new Array(nRespondents).fill(0);
		let noisearr = new Array(nRespondents).fill(0);

		vs.forEach( (value, i)=>{
			let index = ind[i];
			raw[ index ] = value;
			let noise = random[i]/100 - 0.5;
			let noisevalue = value + noise;
			noisearr[ index ] = noisevalue;
		});

		noisyvalues.push(noisearr);
		values.push(raw);
		weights.push(...ws);
		densities.push(...ds);
	});
	
	// console.log('SELF.DENS', densities)
	// console.log('SELF.WGHTS', weights)
	// console.log('SELF.VALS', values)
	// console.log('SELF.NOISYVALS', noisyvalues)
	// console.log('SELF.INDS', inds)
	

	const z_array = data.z; //array of zs
	let bin_minmax = [ d3.mean(BINS.slice(0,2)),  d3.mean(BINS.slice(-2))]

	//append sequence-specific info to d3 data 
	data.seq.forEach( sequence =>{

		let indices = [];
		let errorIndices = {};
		//sequence indices are 2D arrays, first is the series index, second is the list of error areas 
		sequence.i.forEach( stopIndex =>{
			indices.push( parseInt( Object.keys(stopIndex)[0] ) );
			errorIndices[ Object.keys(stopIndex)[0] ] = Object.values(stopIndex)[0];			
		});
		d3data.stops.push(indices);
		d3data.errorStops.push(errorIndices);

		d3data.xdomains.push(bin_minmax); // we onnly have 1 xScale for AgeCat plots, but define for each stop for consistency with other plots data
		d3data.ydomains.push(sequence.y);
	});

	let alphas = z_array.map( z =>0.5 - 0.5*z );


	//loop through each series again, calculating BIN values
	data.series.forEach( (series, i) =>{
		d3data.series.push({
			shape: 'lineerror',
			data: {
				'lines': [],
				'errors': [],
				'median': []
			}
		});

		//calculate datapoints for each BIN
		for(let j=0; j < BINS.length - 1; j++){
			// console.log('BIN', j)

			let binLo = BINS[j];
			let binHi = BINS[j+1];
			let bin_midpoint = binLo + 0.5*(binHi - binLo);

			let bin_bounds = [binLo, binHi];

			let mask = []; //setup an array of 1s and 0s where the density is within bounds. this is our filter		
			inds[i].forEach( (f, k) =>{
				let d = densities[f];
				if( d >= bin_bounds[0] && d < bin_bounds[1]){
					mask.push(f);
				}
			});

			// console.log('BIN', j);
			// console.log('FILTER', mask);

			let wghts = [], vals = [], vals0 = [];
			mask.forEach( m=>{
				wghts.push(weights[m]);
				vals.push(noisyvalues[i][m]);
				vals0.push(values[i][m]);
			});

			let weightSum = d3.sum(wghts);
			if ( weightSum > 0 ){
				wghts = wghts.map( w => w/weightSum);

				let weightedvals = vals0.map( (value, k) => value*wghts[k] );
				vals.map( (val, n) => {
					val = val + d3.mean( weightedvals ) - d3.mean( vals.map( (value, k) => value*wghts[k] ));
				});	//adjust mean to unfuzzed

				let wranks = weighted_ranks(vals, wghts, alphas);

				for (let r = 0; r < wranks[0].length; r++){
					if ( !d3data.series[i].data.errors[r] ){
						d3data.series[i].data.errors[r] = [];
					}
					let error_area = {
						x: bin_midpoint,
						low: wranks[0][r],
						high: wranks[1][r]
					}
					d3data.series[i].data.errors[r].push(error_area);
				}				

				let bin_mean = d3.sum( vals0.map( (value, k) => value*wghts[k] ) );

				let bin_median = weighted_median(vals, wghts);

				let line_point = {
					x: bin_midpoint,
					y: bin_mean
				}

				let median_point = {
					x: bin_midpoint,
					y: bin_median
				}
				
				d3data.series[i].data.lines.push(line_point);
				d3data.series[i].data.median.push(median_point);
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
				d3data.bins.push(bin); 
			}     
		}

	});
	
	//if there are "from" transitions
	d3data = setupBranching(data.seq, d3data);

	return d3data;
}
