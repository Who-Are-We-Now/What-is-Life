function AgeAvgData(data){

	const BINS = data.bins; //array of bin edges

	let d3data = {
		format: "AgeAvg",
		stops: [], //an array of series indices for each stop / interactive frame
		data: {}, //d3-friendly data objects for each series, organized by type of geometry
		labels: [], //labels for each series
		xdomain: [],
		ydomains: []
	}

	//append sequence-specific info to d3 data 
	data.seq.forEach( (sequence, i) =>{

		let seriesIndices = [];
		let seq = sequence.i; //array of { seriesIndex: {k: [m]} }
		seq.forEach( (kDict, j)=>{
			for(const kStr in kDict ){
				let k = parseInt(kStr);
				seriesIndices.push(k)	
			}			
		});
		// console.log('stop', i, seriesIndices);
		d3data.stops.push( seriesIndices );
		d3data.ydomains.push(sequence.y);
	});



	//extract where to place labels from plots.json info
	let positions = plotinfo['series_positions'].split(',');

	// The JSON is series[weight][value][age] += 1
	// We're transforming to self.seriesData[iSeries][weight][age] = [value, value, ]
	// convert series data to x,y coordinates for d3 processing
	let seriesData = [];
	data.series.forEach( (series, i) =>{
		
		d3data.labels.push([series.s, getLabelPostion(positions, i) ]); //push label data
		
		//for each series, i is the series index
		let values = series.v;
		let iSeriesData = {};	

		for (const weightStr in values) {
			let weight = parseFloat(weightStr);
			let dataWeight = values[weightStr];

			for (const valueStr in dataWeight){
				let value = parseFloat(valueStr); //number of children
				let dataWeightValue = dataWeight[valueStr]; // {age: number of respondents}
				
				for (const ageStr in dataWeightValue){
					let age = parseFloat(ageStr); //i.e age 37
					let count = dataWeightValue[ageStr]; //i.e. 9
					let vals = [];
					let noisyVals = [];

					//construct value and errorvalue arrays
					for (let n=0; n<count; n++){
						vals.push(value);
						let noise = Math.random() - 0.5;
						let noiseVal = value + (noise * 0); //multiplying by 0 fuzz.
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

	let binset = []; 
	let dataset = [];
	let errorset = []; 
	// console.log('seriesData', seriesData);

	seriesData.forEach( (iSeriesData, i) =>{
		dataset[i] = []; //data for plotting lines
		errorset[i] = []; //data for error area


		let bin_minmax = [ d3.mean(BINS.slice(0,2)),  d3.mean(BINS.slice(-2))]
		d3data.xdomain = bin_minmax;

		d3data.data = seriesData;

		//calcBinned
		//calculate datapoints for each BIN
		for(let j=0; j < BINS.length - 1; j++){
		// BINS.forEach( function(BIN,j){
			// console.log('topj', j);

			let ageLo = BINS[j];
			let ageHi = BINS[j+1];
			let bin_midpoint = ageLo + 0.5*(ageHi - ageLo);

			let bin_bounds = [];

			if ( j == BINS.length - 2 ){
				//last bin
				bin_bounds = [ageLo, bin_minmax[1] ];
			}else{
				bin_bounds = [ageLo, ageHi];
			}


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

			let line_point = {
				x: bin_midpoint,
				y: bin_mean
			}
			
			let alphas = z_array.map( z =>0.5 - 0.5*z );
			 
			// console.log('BIN', j, 'ranks', weighted_ranks(noisyvals, weights, alphas) );

			console.log('BIN', j);
			// console.log('vals', vals, vals.length, 'noisyvals', noisyvals, noisyvals.length, 'ws', weights, 'alphas', alphas);
			weighted_ranks(noisyvals, weights, alphas);
			 // array of noisy Values, weights, alphas

			function weighted_ranks(arr, ws, zs){
				let pairs = [];
				//create pairs of value and weights
				arr.forEach( (noisyvalue, i) => {
					pairs.push([noisyvalue, ws[i]])
				});	
				console.log('pairs', pairs)	;	    
				//sort pairs list by value
			   	pairs = pairs.sort( (a, b) => {return a[0] - b[0]});

				console.log('sortedpairs', pairs);	  

			    function rank(pairs, z){
					let s0 = 0;
					let s = 0;
					let e0 = '';
					let ret = '';
					let flag = false;
					for( j=0; j<pairs.length; j++){
						//e,w == p[0], p[1]
						let p = pairs[j];
						if (e0 == ''){
						    e0 = p[0];
						}
						s += p[1];
						if (s == z){
						   	ret = p[0];
						   	flag = true;
						   	break
						}else if( s > z ){
						    f = (z-s0) / (s-s0);
						    ret = f*p[0] + (1.-f)*e0;
						    flag = true;
						    break
						}
						e0 = p[0];
						s0 = s;
					}
					if( !flag ){
						ret = pairs[-1][0];
					}					
					return ret;
				}
				
				let ranks = [ [], [] ];
				z_array.forEach( z=>{
					ranks[0].push( rank(pairs, z) );
					// ranks[1].push( rank(pairs.reverse(), z) );
				});		
				console.log('ranks', ranks);		
				return ranks;
			}

			
			// let error_area = {
			// 	x: bin_midpoint,
			// 	low: 100 * (p0 - pe),
			// 	high: 100 * (p0 + pe),
			// }

			// z_array.forEach( z=>{
			// 	let error = z*bin_mean;
			// 	let error_area = {
			// 		x: bin_midpoint,
			// 		low: 100 * (bin_mean - error),
			// 		high: 100 * (bin_mean + error),
			// 	}
			// 	errorset[i].push(error_area);
			// });

			// dataset[i].push(line_point);

			if(i == 0){
				//this only needs to happen for the first series
				let bin = {
					x: bin_bounds[0],
					width: bin_bounds[1]-bin_bounds[0]
				}
				binset.push(bin); 
			}
		// });
		}

	});

	d3data.data = {
		lines: dataset,
		bins: binset,
		errors: errorset,
		series: seriesData
	}
	return d3data;
}