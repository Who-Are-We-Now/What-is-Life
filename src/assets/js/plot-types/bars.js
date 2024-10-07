import {getLabelPostion} from "../plot-utils";
////////////////////////////////////////////////////////
//BAR plots
const TICKCOUNT = [4, 6];

export function processData(data, plotinfo){
	//given raw data
	//transforms to a d3-friendly data format
	const questions = data.qs;
	let d3data = {
		format: "Bars",
		stops: [], //an array of series indices for each stop / interactive frame
		ticks: 0,
		axes: "score",
		data: {
			qs: questions,
			values: []
		}, //an array of d3-friendly data objects for each series, organized by type of geometry
		headers: [], //labels for each series
		labels: ['Positive predictors', 'Negative predictors'],
		colors: [],
		xdomains: [],
		ydomains: []
	}
 	
 	data.series.forEach( (series, index) =>{
 		d3data.stops.push([index]);
 		d3data.headers.push( series.title );

 		let X = d3.map(series.vs,  d => Math.abs(d[1]) );
 		let maxX = d3.max(X);
 		//centered X range, 
 		//setting up the maximum X and its negative equivalent as bound
 		d3data.xdomains.push( [-1*maxX, maxX] );
 		
 		let yrange = d3.map(series.vs,  d => d[0] );
 		d3data.ydomains.push( yrange );
 		d3data.data.values.push( series.vs );
 	});


 	

	return d3data;
}