import {getLabelPostion, setupBranching, weighted_ranks, weighted_median} from "../plot-utils";
////////////////////////////////////////////////////////
//AGE AVERAGE plots

const TICKCOUNT = [7, 6];

export function processData(data, plotinfo){
	//given raw data
	//transforms to a d3-friendly data format

	const BINS = data.bins;
	
	let d3data = {
		axes: ['Age', ''],
		bins: [],
		colors: [],
		format: "AgeAvg",
		headers: [],
		labels: [], //labels for each series
		series: [],
		stops: [], //an array of series indices for each stop / interactive frame
		errorStops: [], //array of relevant error areas (special for average plots)
		ticks: [TICKCOUNT[0], TICKCOUNT[1]],
		xdomains: [],
		ydomains: []		
	}

	//extract where to place labels from plots.json info
	let positions = plotinfo['series_positions'].split(',');

	// The JSON is series[weight][value][age] += 1
	// We're transforming to self.seriesData[iSeries][weight][age] = [value, value, ]
	// convert series data to x,y coordinates for d3 processing
	let seriesData = [];
	data.series.forEach( (series, i) =>{
		
		d3data.labels.push([series.s, getLabelPostion(positions, i) ]); //push label data
		d3data.colors.push(series.c);
		//for each series, i is the series index
		let values = series.v;
		let random = series.r;

		let iSeriesData = {};	

		for (const weightStr in values) {
			let weight = parseFloat(weightStr);
			let dataWeight = values[weightStr];
			let randomWeight = random[weightStr];

			for (const valueStr in dataWeight){
				let value = parseFloat(valueStr); //number of children
				let dataWeightValue = dataWeight[valueStr]; // {age: number of respondents}
				let randomWeightValue = randomWeight[valueStr];

				for (const ageStr in dataWeightValue){
					let age = parseFloat(ageStr); //i.e age 37
					let count = dataWeightValue[ageStr]; //i.e. 9 children
					let randomcount = randomWeightValue[ageStr];
					let vals = [];
					let noisyVals = [];

					//construct value and errorvalue arrays
					for (let n=0; n<count; n++){
						vals.push(value);
						let noise = randomcount[n]/100 - 0.5;
						let noiseVal = value + noise;
						noisyVals.push(noiseVal);
					}
					// console.log(ageStr, vals, noisyVals)
					//we now have array containing the count of children
					//with the length of the number of respondents

					if( !(weightStr in iSeriesData) ){
						iSeriesData[weightStr] = {}
					}
					let iSeriesDataWeight = iSeriesData[weightStr];
					// console.log('age', ageStr, 'value', valueStr, 'wght', weightStr, 'str iSeriesDataWeight',  iSeriesDataWeight);

					if( !(ageStr in iSeriesDataWeight) ){
						iSeriesDataWeight[ageStr] = [vals, noisyVals]
					}else{
						iSeriesDataWeightAge = iSeriesDataWeight[ageStr]
						iSeriesDataWeightAge[0].push(...vals);
						iSeriesDataWeightAge[1].push(...noisyVals);
					}					
				}				
			}
		}
		// console.log('series',i, iSeriesData);
		seriesData.push( iSeriesData );		
	});


	const z_array = data.z; //array of zs
	//loop through each series again, calculating BIN values

	// console.log('seriesData', seriesData);

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

		d3data.xdomains.push(bin_minmax);
		d3data.ydomains.push(sequence.y);

		//if label headers are needed for each sequence
		if( data.str ){
			let stringIndex = sequence.s.indexOf(1);
			let header = data.str[stringIndex][1];
			d3data.headers.push(header);
		}
	});

	let alphas = z_array.map( z =>0.5 - 0.5*z );
	seriesData.forEach( (iSeriesData, i) =>{
		d3data.series.push({
			shape: 'lineerror',
			data: {
				'lines': [],
				'errors': [],
				'median': []
			}
		});
		//calcBinned
		//calculate datapoints for each BIN
		for(let j=0; j < BINS.length - 1; j++){
			// console.log('BIN', j)

			let ageLo = BINS[j];
			let ageHi = BINS[j+1];
			let bin_midpoint = ageLo + 0.5*(ageHi - ageLo);
			let bin_bounds = [ageLo, ageHi];

			let vals = []; //relevant values for bin
			let noisyvals = []; //relevant noisy values for bin
			let weights = [];

			for ( weightStr in iSeriesData ){
				//go through each weight in seriesdata
				//get sum values * weightratio for relevant ages within bin				
				
				let weight = parseFloat(weightStr);
				let iSeriesDataWeight = iSeriesData[weightStr];
				for ( age in iSeriesDataWeight){
					if (age>= ageLo && age<ageHi){
						let ageValues = iSeriesDataWeight[age];
						// console.log(ageValues);

						vals.push(... ageValues[0] ); //array of values
						noisyvals.push(... ageValues[1] ); //array of noisy values
						weights.push(... Array(ageValues[0].length).fill(weight)); //corresponding weights for each value
					}
				}
			}

			let weightSum =  d3.sum(weights);
			weights = weights.map( w => w/weightSum );		
			// console.log('weighratios', weightRatios);
			//calculate sum np.sum(vals*weights)
			let bin_mean = d3.sum( vals.map( (value, k) => value*weights[k] ) );

			let bin_median = weighted_median(noisyvals, weights);

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

			// console.log('BIN', j, 'ranks', weighted_ranks(noisyvals, weights, alphas) );
			// console.log('vals', vals, vals.length, 'noisyvals', noisyvals, noisyvals.length, 'ws', weights, 'alphas', alphas);
			let wranks = weighted_ranks(noisyvals, weights, alphas);
			// array of noisy Values, weights, alphas

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
	//make series multi-dimensional where
	//series array index = stop
	d3data = setupBranching(data.seq, d3data);

	return d3data;
}
