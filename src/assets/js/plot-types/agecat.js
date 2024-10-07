import {getLabelPostion, setupBranching} from "../plot-utils";
////////////////////////////////////////////////////////
//AGE CATEGORY plots

const TICKCOUNT = [4, 6];

export function processData(data, plotinfo){
	//given raw data
	//transforms to a d3-friendly data format
	const z = data.z;
	const z2 = Math.pow(data.z, 2); //z-squared
	const BINS = data.bins;

	const min_age = data.x[0];
	const max_age = data.x[1];

	ages = Array
		.from({length: max_age + 1 - min_age}, (v, i) => i)
		.map(i => i + min_age); // array of integers between

	let d3data = {
		axes: ['Age', '%'],
		bins: [],
		colors: [],
		headers: [], //headers for labels, if applicable
		format: "AgeCat",
		labels: [], //labels for each series
		series: [],
		stops: [], //an array of series indices for each stop / interactive frame		
		ticks: [TICKCOUNT[0], TICKCOUNT[1]],
		xdomains: [],
		ydomains: []
	}
	
	//midpoint between first two and last two bins
	let bin_minmax = [ d3.mean(BINS.slice(0,2)),  d3.mean(BINS.slice(-2))]; 

	let binset = []; 
	let dataset = [];
	let errorset = []; 

	//extract where to place labels from plots.json info
	let positions = plotinfo['series_positions'].split(',');

	//convert series data to x,y coordinates for d3 processing
	data.series.forEach( (values, i) =>{
		
		d3data.labels.push([values.s, getLabelPostion(positions, i) ]); //push label data
		d3data.colors.push(values.c);
		//for each series

		d3data.series.push({
			shape: 'lineerror',
			data: {
				'lines': [],
				'errors': []
			}
		});

		dataset[i] = []; //data for plotting lines
		errorset[i] = []; //data for error area

		//calculate error bars for each bin
		for(let j=0; j < BINS.length - 1; j++){

			let ageLo = BINS[j];
			let ageHi = BINS[j+1];
			let bin_midpoint = ageLo + 0.5*(ageHi - ageLo);

			let bin_bounds = [ageLo, ageHi];

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
				y: percent
			}


			d3data.series[i].data.lines.push(datapoint);
			d3data.series[i].data.errors.push(error_area);

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
		};
	}); //end for each series

	d3data.bins = binset;


	//append sequence-specific info to d3 data 
	data.seq.forEach( (sequence, j) =>{
		d3data.stops.push(sequence.i);

		d3data.xdomains.push(bin_minmax); // we only have 1 xScale for AgeCat plots, but define for each stop for consistency with other plots data
		d3data.ydomains.push(sequence.y);

		//if label headers are needed for each sequence
		if( data.str ){
			let stringIndex = sequence.s.indexOf(1);
			let header = data.str[stringIndex][1];
			d3data.headers.push(header);
		}
	});

	//if there are "from" transitions
	//make series multi-dimensional where
	//series array index = stop
	d3data = setupBranching(data.seq, d3data);


	return d3data;
}
