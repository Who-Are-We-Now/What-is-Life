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

	if( data.name=="TimeTaken"){
		//don’t consolidate timetaken series
		data.series.forEach( (values,i) =>{				
				let dataobject = {
					'areas': values.x.map( (d, pointIndex)=>{
						return {x: d, y: +values.y[pointIndex] }
					})
				};
				d3data.series.push({
					shape: 'areas',
					data: dataobject
				});

				if (values.s !== ""){
					if( typeof d3data.labels[i] == 'undefined' ){
						d3data.labels[i] = [values.s, getLabelPostion(positions, i) ]; //push label data	
					}			
				}
				d3data.colors.push(values.c);
		});
	}else{
		//consolidate series data into groups by label
		let legend = data.legend;
		let linecount = 0;
		legend.forEach( (legendArray, legendIndex)=>{
			
			let xy_type = '';
			let dataobject = {};
			legendArray.forEach( seriesIndex =>{			
				let multi = false;
				let seriesData = data.series[seriesIndex];

				if( seriesData.s !== "" ){
					d3data.labels[legendIndex] = [seriesData.s, getLabelPostion(positions, legendIndex) ];
					d3data.colors[legendIndex] = seriesData.c;
				}	
				let style = '';
				let data_type = '';
				if ( seriesData.w < 0){
					xy_type += 'dot';
					data_type = 'dots';
				}else if( seriesData.w == 0){
					xy_type += 'area';
					if( dataobject['areas'] ){
						multi = true;
						xy_type = 'multiarea';
						if( dataobject['lines'] ){
							xy_type = 'multiarealine';
						}					
					}
					data_type = 'areas';
				}else if( seriesData.w == 16){
					//thick line				
					xy_type += 'thicklines';
					data_type = 'lines';
				}else if( seriesData.w == 8){				
					style = 'dotted';
					multi = true;
					xy_type += 'dotted'
					data_type = 'lines';
				}else{
					style = 'solid';
					xy_type += 'line';
					data_type = 'lines';
				}

				if(multi){
					shapedata = seriesData.x.map( (d, pointIndex)=>{
						return {x: d, y: +seriesData.y[pointIndex] }
					});
					if( dataobject[data_type] ){
						if( !dataobject["multi"] ){
							dataobject["multi"] = [ [0, dataobject[data_type].length] ];
						}
						dataobject["multi"].push([dataobject[data_type].length, dataobject[data_type].length+shapedata.length]);
						dataobject[data_type].push(...shapedata);
					}else{
						dataobject[data_type] = shapedata;
					}
					
				}else{
					dataobject[data_type] = seriesData.x.map( (d, pointIndex)=>{
						return {x: d, y: +seriesData.y[pointIndex] }
					});
				}
			
			});
			
			d3data.series.push({
				shape: xy_type,
				data: dataobject
			});	

		});
	}


	if( d3data.labels.length == 0){
		//if none of the series had labels, use axis label
		d3data.labels.push([data.ay, getLabelPostion(positions, 0)]);
	}

	//loop through sequence data to store stops,
	data.seq.forEach( (sequence, j) =>{
		let seriesIndices = sequence.i; //index of series relevant for this sequence
		
		//consolidates stops by series group, indicated by legend
		if( data.name=="TimeTaken"){
			let seriesIndices = sequence.i; //index of series relevant for this sequence
			d3data.stops.push(seriesIndices);
		}else{
			seriesIndices.forEach( index=>{
				if( !d3data.stops[j] ){
					d3data.stops[j] = [];
				}
				//check against legend to add to stop or not
				//each series uses the first series indicated in the legend
				//as the representative
				data.legend.forEach( (l, li)=>{
					if( l.includes(index) ){
						if( !d3data.stops[j].includes( li ) ){
							d3data.stops[j].push( li );
						}
					}
				});
			});
		}



		d3data.xdomains.push(sequence.x);
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