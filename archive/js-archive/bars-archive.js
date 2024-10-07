////////////////////////////////////////////////////////
//used in the backend for SVG exports
//and in the frontend to generate the interactive plots
// var d3;
web = true; //flag for static vs. dynamic plots
try{
	//for server-side code;
	var d3 = require('d3');
	web = false;
}catch(e){

}

(function(exports) {

const duration = 1200;
const DIMENSIONS = {
	size: [1000, 480],
	margin: {
		top: 0, right: 50, bottom: 0, left: 50
	}
};

const DIMENSIONS_PRINT = {
	size: [500, 700],
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
}

function setupPlot(key, plotdata){

	let plot = d3.select('#'+key).select('.plot-content').append("svg");

	let svg = plot.attr("viewBox", `0 0 ${plotdata.dims.size[0]} ${plotdata.dims.size[1]}`)
		.attr("class", plotdata.format)
		.append("g")
		.attr('id', key+'-group')
		.attr("transform",
					"translate(" + plotdata.dims.margin.left + "," + plotdata.dims.margin.top + ")");

	DivergingBarChart(svg, key, plotdata, 0);

	// series.forEach( (values, i) =>{
	// 	//if sequence is defined

	// 	// barset.sort(function(a, b) {
	// 	// 	return d3.descending(a[1], b[1])
	// 	// });
		
	// 	if(barset){
	// 		DivergingBarChart(key, barset, 0, 0 {
	// 			x: d => d[1], // given d in data, returns the (quantitative) x-value
	// 			y: d => questions[ d[0] ], // given d in data, returns the (ordinal) y-value
	// 			yDomain: plotadata.yDomains[0],
	// 			marginTop: plotdata.dims.margin.top, // top margin, in pixels
	// 			marginRight: plotdata.dims.margin.right, // right margin, in pixels
	// 			marginBottom: plotdata.dims.margin.bottom, // bottom margin, in pixels
	// 			marginLeft: plotdata.dims.margin.left, // left margin, in pixels
	// 			xType: d3.scaleLinear, // type of x-scale
	// 			xRange: [plotdata.dims.margin.left, plotdata.dims.width - plotdata.dims.margin.right], // [left, right]
	// 			yPadding: 0.3, // amount of y-range to reserve to separate bars
	// 			width: plotdata.dims.width
	// 		});
	// 	}    
	// });
}

function printPlot(key, plotdata, plot){

	let svg = plot.attr("viewBox", `0 0 ${plotdata.dims.size[0]} ${plotdata.dims.size[1]}`)
		.attr("class", plotdata.format)
		.append("g")
		.attr('id', key+'-group')
		.attr("transform",
					"translate(" + plotdata.dims.margin.left + "," + plotdata.dims.margin.top + ")");

	let laststop = plotdata.stops.length - 1;
	DivergingBarChart(svg, key, plotdata, laststop);
}

//Modified from https://observablehq.com/@d3/diverging-bar-chart
function DivergingBarChart(svg, key, plotdata, stop, {
	x = d => d[1], // given d in data, returns the (quantitative) x-value
	y = d => plotdata.data.qs[ d[0] ], // given d in data, returns the (ordinal) y-value
	marginTop = plotdata.dims.margin.top, // top margin, in pixels
	marginRight = plotdata.dims.margin.right, // right margin, in pixels
	marginBottom = plotdata.dims.margin.bottom, // bottom margin, in pixels
	marginLeft = plotdata.dims.margin.left, // left margin, in pixels
	width = plotdata.dims.width,
	height = plotdata.dims.height,
	xType = d3.scaleLinear, // type of x-scale
	xDomain, // [xmin, xmax]
	xRange = [marginLeft, width - marginRight], // [left, right]
	xFormat, // a format specifier string for the x-axis
	xLabel, // a label for the x-axis
	yPadding = 0.3, // amount of y-range to reserve to separate bars
	yDomain = plotdata.ydomains[stop], // an array of (ordinal) y-values
	yRange, // [top, bottom]  
} = {}) {

	// Compute values.
	let bardata = plotdata.data.series[stop].vs;
	const X = d3.map(bardata, x);
	const Y = d3.map(bardata, y);

	// Compute default domains, and unique the y-domain.
	if (xDomain === undefined) xDomain = d3.extent(X);
	if (yDomain === undefined) yDomain = Y;
	yDomain = new d3.InternSet(yDomain);

	// Omit any data not present in the y-domain.
	// Lookup the x-value for a given y-value.
	const I = d3.range(X.length).filter(i => yDomain.has(Y[i]));
	const YX = d3.rollup(I, ([i]) => X[i], i => Y[i]);

	// Compute the default height.
	if (height === undefined) height = Math.ceil((yDomain.size + yPadding) * 25) + marginTop + marginBottom;
	if (yRange === undefined) yRange = [marginTop, height - marginBottom];

	// Construct scales, axes, and formats.
	const xScale = xType(xDomain, xRange);
	const yScale = d3.scaleBand(yDomain, yRange).padding(yPadding);
	const xAxis = d3.axisTop(xScale).ticks(width / 80, xFormat);
	const yAxis = d3.axisLeft(yScale).tickSize(0).tickPadding(6);
	const format = xScale.tickFormat(100, xFormat);


	let bars = svg.selectAll(".bar")
		.data(I)

	if (!web){
		//for print: no transitions
		bars
			.enter()
			.append("rect")
			.join(
				function(enter){
					return bars				
				},
				function(update){
					return update
				},
				function(exit){
					return exit.remove()
				})
				.attr("class", i => X[i] > 0 ? "bar area series0" : "bar area series1")
				.attr("x", i => Math.min(xScale(0), xScale(X[i])))
				.attr("y", i => yScale(Y[i]))
				.attr("width", i => Math.abs(xScale(X[i]) - xScale(0)))
				.attr("height", yScale.bandwidth());
	}else{
		bars
			.enter()
			.append("rect")
			.join(
				function(enter){
					return bars				
				},
				function(update){
					return update
				},
				function(exit){
					return exit.remove()
				})
			.transition()
			.duration(duration)
				.attr("class", i => X[i] > 0 ? "bar area series0" : "bar area series1")
				.attr("x", i => Math.min(xScale(0), xScale(X[i])))
				.attr("y", i => yScale(Y[i]))
				.attr("width", i => Math.abs(xScale(X[i]) - xScale(0)))
				.attr("height", yScale.bandwidth());
	}
	// let labels = svg.select('.labels')
	// 	.selectAll('.series-label')
	// 	.attr("text-anchor", "end")
	// 	.data(I)

	// labels
	// 	.enter()
	// 	.join(labels)
	// 		.append("text")
	// 		.attr("text-anchor", i => X[i] < 0 ? "end" : "start")
	// 		.attr("x", i => xScale(X[i]) + Math.sign(X[i] - 0) * 4)
	// 		.attr("y", i => yScale(Y[i]) + yScale.bandwidth() / 2)
	// 		.attr("dy", "0.25em")
	// 		.attr("class", "series-label")
	// 		.text(i => format(X[i]));

	// svg.append("text")
	// 	.text(plotdata.labels[stop])
	// 	.attr("class", "series-label");
		
	
	svg.selectAll('.question-label').remove();

	svg.append("g")
		.attr("class", "question-label")
	    .attr("transform", `translate(${xScale(0)},0)`)
	    .call(yAxis)
	    .call(g => g.selectAll(".tick text")
	      .filter(y => YX.get(y) < 0)
	        .attr("text-anchor", "start")
	        .attr("x", 6));
}

function chart(key, plotdata){
	preprocessData(plotdata, DIMENSIONS);
	setupPlot(key, plotdata);
}

function exportChart(key, plotdata, plot){
	preprocessData(plotdata, DIMENSIONS_PRINT);
	printPlot(key, plotdata, plot);
}
//update with scroll
function plotSequence(key, plotdata, stop){
	let svg = d3.select(`#${key}-group`);	
	// Add plot contents	
	DivergingBarChart(svg, key, plotdata, stop);
}

function setupPlotLabels(key, plotdata){
	// console.log('setup labels');
	if(typeof plotdata.labels !== 'undefined'){

		let plot = document.querySelector('#'+key);
		let labels =  plot.querySelector('.plot-labels');

		let series_html = '';

		plotdata.labels.forEach( (label, i) =>{
			series_html += `<div class="key-item series${i}"><div class="key-color"></div><div class="key-label">${label}</div></div>`;
			
			//tooltip
			let tooltip = d3.select("#"+key).append("div")
			     .style("opacity", 0)
			     .html(label)
			     .attr("class", `tooltip tip-label series${i}`)

			//corresponding area hover triggers tooltip
			let hotspot;

			if(plotdata.data.areas.length == 0 && plotdata.data.lines.length > 0){
				hotspot = d3.select(`#${key}-group`).select(`.wideline.series${i}`);				
			}else{
				hotspot = d3.select(`#${key}-group`).select(`.area.series${i}`)
			}			

			hotspot.on("mouseover", function(event, d){
				if( plotdata.data.areas.length > 0){
					this.style.setProperty('--alpha', '60%');
				}				
				//activate corresponding plot labels
				let current_highlight = document.querySelectorAll(`#${key} .highlight`);
				current_highlight.forEach( el =>{
					el.classList.remove('highlight');
				});
				
				document.querySelector(`#${key} .line.series${i}`).classList.add('highlight');

				tooltip
			     .style("left", (event.layerX) + "px")
			     .style("top", (event.layerY - 15) + "px");
				tooltip.transition()
		          .duration(50)
		          .style("opacity", 1);
					}).on('mouseout', function( ){
					if( plotdata.data.areas.length > 0){
						this.style.removeProperty('--alpha');
					}

				//remove stroke highlights
				let previous_highlight = document.querySelectorAll(`#${key} .highlight`);
				previous_highlight.forEach( el =>{
					el.classList.remove('highlight');
				});

				tooltip.transition()
	        .duration(50)
	        .style("opacity", 0);
    		});

		});

		labels.innerHTML = series_html;
	}
}

exports.chart = chart;
exports.exportChart = exportChart;
exports.plotSequence = plotSequence;

}) (typeof exports === 'undefined'? this['bars']={}: exports);