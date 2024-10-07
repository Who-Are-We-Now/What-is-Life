////////////////////////////////////////////////////////
//used in the backend for SVG exports
//and in the frontend to generate the interactive plots

web = true; //flag for static vs. dynamic plots
try{
	//for server-side code;
	var d3 = require('d3');
	web = false;
}catch(e){
	
}

(function(exports) {

const duration = 1200;

const ytickoffset = -15;
const ytickcount = 4;



const DIMENSIONS = {
	size: [850, 550],
	margin: {
		top: 5, right: 50, bottom: 20, left: 0
	}
};

const DIMENSIONS_PRINT = {
	size: [700, 300],
	margin: {
		top: 0, right: 0, bottom: 0, left: 0
	}
};
	

function preprocessData(plotdata, dim){
// given a global data object with all plot information
// sets up x and y scales for each plot
// and appends to object
	plotdata.dims = dim;
	plotdata.dims.width = dim.size[0]-dim.margin.left-dim.margin.right;
	plotdata.dims.height = dim.size[1]-dim.margin.top-dim.margin.bottom;

	plotdata.scales = {
		x: d3.scaleLinear()
		.domain(plotdata.xdomain)
		.range([0, plotdata.dims.width]),
		y: d3.scaleLinear()
		.domain(plotdata.ydomain)
		.range([plotdata.dims.height, 0 ])
	}
}

function setupPlot(key, plotdata){

	let plot = d3.select('#'+key).select('.plot-content').append("svg");

	let svg = plot.attr("viewBox", `0 0 ${plotdata.dims.size[0]} ${plotdata.dims.size[1]}`)
		.attr("class", plotdata.format)
		.append("g")
		.attr('id', key+'-group')
		.attr("transform",
					"translate(" + plotdata.dims.margin.left + "," + plotdata.dims.margin.top + ")");

	//use first scale for initial setup
	let x = plotdata.scales.x;
	let y = plotdata.scales.y;


	let tickcount = 6;


	// drawAxis( svg, plotdata, x, y);

	// draw plot
	// draw all series
	// plotdata.stops.forEach( (stops, i) =>{
	// 	drawDots(svg, key, plotdata, i);
	// });


}


function printPlot(key, plotdata, plot){

	let svg = plot.attr("viewBox", `0 0 ${plotdata.dims.size[0]} ${plotdata.dims.size[1]}`)
		.attr("class", plotdata.format)
		.append("g")
		.attr('id', key+'-group')
		.attr("transform",
					"translate(" + plotdata.dims.margin.left + "," + plotdata.dims.margin.top + ")");

	// For plot exports, use last stop / frame
	// which includes the final display
	let laststop = plotdata.stops.length - 1;

	// Define X and Y axis
	let x = plotdata.scales.x;
	let y = plotdata.scales.y; //use first Y scale for initial setup

	drawAxis( svg, plotdata, x, y);

	//remove axis label strings for svg exports
	svg.selectAll('.xaxis').remove();
	svg.selectAll('.yaxis').remove();

	//draw plot
	// draw all series
	let series = [...Array(plotdata.labels.length).keys()];

	series.forEach( i =>{
		drawDots(svg, key, plotdata, i);
	})
}



let origin = [0,0];
let startAngle = Math.PI/4;
let scale = 20;
function drawDots(svg, key, plotdata, index){

	let x = plotdata.scales.x;
	let y = plotdata.scales.y;

	let seriesIndices = plotdata.stops[index];
	console.log('indices', seriesIndices);

	let data = plotdata.data[index]; 
	console.log(data);

	data.forEach( (group, i) => {
		svg.append('g').attr("class", "series" + seriesIndices[i]); //setup series group

		// let dots = svg.select(".series"+seriesIndices[i]).selectAll(".dot")
		// 	 .data(group);

		// dots
		//  .enter()
		//  .append("circle")
		//  .attr("class", "dot")
		//  .attr("opacity", 0)
		//   .join(
		//  		function(enter){
		//  			return dots	   				
		//  		},
		//  		function(update){
		//  			return update
		//  		},
		//  		function(exit){
		//  			return exit.remove()
		//  		})
		// 	  .attr('opacity', function(){
		// 	  		//conditionally turn opactiy on/off depending on active series for sequence
		// 	  		let alpha = 0;
		// 	  		if( seriesIndices.includes( seriesIndices[i] ) ){
		// 	  			alpha = 1;
		// 	  		}
		// 	  		// console.log(key, index, seriesIndices, alpha);
		// 	  		return alpha;
		// 	  })
		// 	.attr("cx", function(d) { return x(d[0]) } )
		// 	.attr("cy", function(d) { return y(d[1]) } )
		// 	.attr("r", 5)

		// group.forEach( dotsdata => {
		// 	console.log(dotsdata);

			
		// });
	});
	

	
}


function xAxis(plotdata, x){
	let xtickcount = 6;
	let xformat = x => `${x.toFixed(2)}`;
	let xaxislabel = plotdata.axes[0];
	let height = plotdata.dims.height;

	return {
		'axis': d3.axisBottom(x).ticks(xtickcount).tickFormat(xformat),
		'grid': d3.axisBottom(x).tickSize(-height).tickFormat('').ticks(xtickcount)
	}
}

function yAxis(plotdata, y){
	let ytickcount = 6;
	let yformat = d => `${d.toFixed(2)}`;
	let width = plotdata.dims.width;
	let yaxislabel = plotdata.axes[1];

	return {
		'axis': d3.axisLeft(y).ticks(ytickcount).tickFormat(yformat),
		'grid': d3.axisLeft(y).tickSize(-width).tickFormat('').ticks(ytickcount)
	}
}

function drawAxis(svg, plotdata, x, y){

	let height = plotdata.dims.height;
	let width = plotdata.dims.width;

	svg.append("g")
			.attr('class', 'xaxis')
			.attr("transform", "translate(0," + height + ")")
			.call(xAxis(plotdata, x).axis);	

	svg.append('g')
		.attr('class', 'x gridline')
		.attr('transform', 'translate(0,' + height + ')')
		.call(xAxis(plotdata, x).grid);

	svg.append("g")
		.attr('class', 'yaxis')
		.attr("transform", `translate(${width + 20},0)`)
		.call( yAxis(plotdata, y).axis )
			.selectAll("text")
				.style("text-anchor", "start");

	svg.append('g')
		.attr('class', 'y gridline')
		.call(yAxis(plotdata, y).grid);
}


//main charting function
function chart(key, plotdata){
	preprocessData(plotdata, DIMENSIONS);
	setupPlot(key, plotdata);
	setTimeout(setupPlotLabels(key, plotdata), 1200); //wait until plot transitions are complete
}

//export svg charting function
function exportChart(key, plotdata, plot){
	preprocessData(plotdata, DIMENSIONS_PRINT);
	printPlot(key, plotdata, plot);
}


//update with scroll
function plotSequence(key, plotdata, stop){
	let svg = d3.select(`#${key}-group`);
	
	// transition xAxis
	let x = plotdata.scales.x;
	svg.selectAll(".xaxis")
		.transition()
		.duration(duration)
			.call( xAxis(plotdata, x).axis );

	svg.selectAll(".x.gridline")
		.transition()
		.duration(duration)
			.call( xAxis(plotdata, x).grid );

	//transition yAxis
	let y = plotdata.scales.y;
	svg.selectAll(".yaxis")
		.transition()
		.duration(duration)
		.call( yAxis(plotdata, y).axis );

	svg.selectAll(".y.gridline")
		.transition()
		.duration(duration)
		.call( yAxis(plotdata, y).grid )
			.selectAll("text")
				.attr("y", ytickoffset)
				.style("text-anchor", "start");

	// Add plot contents

	// drawDots(svg, key, plotdata, stop);

}


function setupPlotLabels(key, plotdata){
	// console.log('setup labels');
	if(typeof plotdata.labels !== 'undefined'){

		let plot = document.querySelector('#'+key);
		let labels =  plot.querySelector('.plot-labels');

		let series_html = '';

		plotdata.stops.forEach( (indices, i) =>{
			indices.forEach( (index, j) =>{
				let label = plotdata.labels[i][j];
				series_html += `<div class="key-item series${index}"><div class="key-color"></div><div class="key-label">${label}</div></div>`;
			});
			

		});

		labels.innerHTML = series_html;
	}
}



exports.chart = chart;
exports.exportChart = exportChart;
exports.plotSequence = plotSequence;

}) (typeof exports === 'undefined'? this['pca']={}: exports);