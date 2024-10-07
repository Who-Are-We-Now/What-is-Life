import {getLabelPostion, setupBranching} from "../plot-utils";
////////////////////////////////////////////////////////
//DENSITY CATEGORY plots
const TICKCOUNT = [4, 6];

export function processData(data, plotinfo){
	//given raw data
	//transforms to a d3-friendly data format
	let d3data = {
		format: "XY",
		stops: [], //an array of series indices for each stop / interactive frame
		headers: [],
		series: [], //graph data
		hover: data.hover,
		labels: [], //labels for each series
		colors: [],
		xdomains: [],
		ydomains: [],
		axes: [data.ax, data.ay],
		log: [],
		ticks: [TICKCOUNT[0], TICKCOUNT[1]],
	}

 	//extract where to place labels from plots.json info
	let positions = plotinfo['series_positions'].split(',');

	// loop through series data to store in d3data object
	// Construct X,Y tuples by series
	let seriesColors = []; 

	data.series.forEach( (values,i) =>{

		let seriesIndex = i;

		if (values.s !== ""){
			// this series contains the axis names
			// add to labels array if not already there
			// console.log(values.s, d3data.labels[seriesIndex][0] == values.s );
			if( typeof d3data.labels[seriesIndex] == 'undefined' ){
				d3data.labels[seriesIndex] = [values.s, getLabelPostion(positions, seriesIndex) ]; //push label data	
			}			
		} 

		d3data.colors.push(values.c);

		let xy_type = 'lines';
		let data_type = 'lines';

		if ( values.w < 0){
			xy_type = 'dots';
			data_type = 'dots';
		}else if( values.w == 0){
			xy_type = 'areas';
			data_type = 'areas';
		}else if( values.w == 16){
			//thick line
			xy_type = 'thicklines';
		}else if( values.w == 8){
			//thick line
			xy_type = 'dottedlines';
		}
		
		let dataobject = {};
		dataobject[data_type] = values.x.map( (d, pointIndex)=>{
			return {x: d, y: +values.y[pointIndex] }
		});

		d3data.series.push({
			shape: xy_type,
			data: dataobject
		});
		
  });

	if( d3data.labels.length == 0){
		//if none of the series had labels, use axis label
		d3data.labels.push([data.ay, getLabelPostion(positions, 0)]);
	}

	//loop through sequence data to store stops,
	data.seq.forEach( (sequence, j) =>{
		let seriesIndices = sequence.i; //index of series relevant for this sequence
		d3data.stops.push(seriesIndices);
		d3data.xdomains.push(sequence.x)
		d3data.ydomains.push(sequence.y);

		if( sequence.log ){
			d3data.log.push(sequence.log)	
		}

		//if label headers are needed for each sequence
		if( data.str ){
			let stringIndex = sequence.s.indexOf(1);
			let header = data.str[stringIndex][1];
			d3data.headers.push(header);
		}


	});

	
	if (data.ax){
		//add axes info if defined
		d3data.axes = [data.ax, data.ay];
	}else{
		//Score predictions
		d3data.axes = ['Score', '%'];
	}

	d3data = setupBranching(data.seq, d3data);

	return d3data;
}