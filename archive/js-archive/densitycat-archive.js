////////////////////////////////////////////////////////
//AGE CATEGORY plots
//used in the backend for SVG exports
//and in the frontend to generate the interactive plots

var web = true; //flag for static vs. dynamic plots
try{
	//for server-side code;
	var d3 = require('d3');
	web = false;
}catch(e){
	
}

(function(exports) {


const duration = 1200;
const ytickoffset = 0;
const tickcount = 4;

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
		.range([0, plotdata.dims.width])
		.clamp(true),
		y: plotdata.ydomains.map( range => {
			return d3.scaleLinear()
				.domain(range)
				.range([plotdata.dims.height, 0 ]);
		})
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

	// Define X and Y axis
	let x = plotdata.scales.x;
	let y = plotdata.scales.y[0]; //use first Y scale for initial setup

	drawAxis( svg, plotdata.dims.width, plotdata.dims.height, x, y);

	drawBins(svg, key, plotdata, 0);
	
	// Add plot contents for first stop(0) for initial setup
	let seriesLength = plotdata.data.lines.length;
	for (let i = 0; i < seriesLength; i++ ){
		//we still draw all series for transition purposes
		svg.append('g').attr("class", "series" + i); //setup series groups
		drawLine(svg, key, plotdata, i, 0); 
		drawError(svg, key, plotdata, i, 0); 
	}
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

	// Define X and Y axis
	let x = plotdata.scales.x;
	let y = plotdata.scales.y[0]; //use first Y scale for initial setup

	drawAxis(svg, plotdata.dims.width, plotdata.dims.height, x, y);

	//remove axis label strings for svg exports
	// svg.selectAll('.xaxis').remove();
	// svg.selectAll('.yaxis').remove();

	drawBins(svg, key, plotdata, 0);
	// For plot export, we can’t use nth-child selectors, so
	// add a class to every other
	svg.selectAll('.bin').each(function(d,i) {
		if (i % 2 === 0) {
			 d3.select(this).attr("class", "bin alt");
		}
	})

	let seriesLength = plotdata.stops[0].length;
	let series = plotdata.stops[0];

	for (let i = 0; i < seriesLength; i++ ){
		let index = series[i];		
		drawLine(svg, key, plotdata, index, 0); 
		drawError(svg, key, plotdata, index, 0); 
	}

	// console.log('exportPlot', svg);
	
}

function drawLine(svg, key, plotdata, index, stop){
	//given a plot id key, plot data, series index, and stop number
	//draws a d3 line
	let linedata = plotdata.data.lines[index]; 

	let x = plotdata.scales.x;
	let y = plotdata.scales.y[stop];

	let seriesIndices = plotdata.stops[stop];

	let plotlines = svg.select(".series"+index).selectAll(".line")
		 .data([linedata], function(d){ return d.x});

	if (!web){
		//for print: no transitions
		plotlines
		 .enter()
		 .append("path")
		 .attr("class", "line")
		 .attr('opacity', 0)
		 .join(
				function(enter){
					return plotlines	   				
				},
				function(update){
					return update
				},
				function(exit){
					return exit.remove()
				})
			.attr('opacity', function(){
					//conditionally turn opactiy on/off depending on active series for sequence
					let alpha = 0;
					if( seriesIndices.includes(index) ){
						alpha = 1;
					}
					return alpha;
			})
			.attr("d", d3.line()
			 .x(function(d) { return x(d.x); })
			 .y(function(d) { return y(d.percent); })
			 );
	}else{
		plotlines
		 .enter()
		 .append("path")
		 .attr("class", "line")
		 .attr('opacity', 0)
		 .join(
				function(enter){
					return plotlines	   				
				},
				function(update){
					return update
				},
				function(exit){
					return exit.remove()
				})
			.transition()
			.duration(duration)
			.attr('opacity', function(){
					//conditionally turn opactiy on/off depending on active series for sequence
					let alpha = 0;
					if( seriesIndices.includes(index) ){
						alpha = 1;
					}
					return alpha;
			})
			.attr("d", d3.line()
			 .x(function(d) { return x(d.x); })
			 .y(function(d) { return y(d.percent); })
			 );

		//add series labels

		//get point to which to align the series label
		let series_position = plotdata.labels[index][1]; //i.e. 2t

		//access the specified point to position the series label
		let labels = svg.select(".series"+index).selectAll(".label")
			 .data([ linedata[ series_position.slice(0,-1) ] ]); //get index number of point, ie 2

		let series_label = plotdata.labels[index][0];  //series name
		labels
			.enter()
			.append("text")
			.attr("class", "label")
			 .attr('opacity', 0)
			 .join(
					function(enter){
						return labels  				
					},
					function(update){
						return update
					},
					function(exit){
						return exit.remove()
					})
				.transition()
				.duration(duration)
				.attr('opacity', function(){
						//conditionally turn opactiy on/off depending on active series for sequence
						let alpha = 0;
						if( seriesIndices.includes(index) ){
							alpha = 1;
						}
						return alpha;
				})
				.attr("transform", function(d) { return "translate(" + x(d.x) + "," + y(d.percent) + ")"})
				.attr("x", 4)
				.attr("dy", function( ){
					if (series_position.charAt(series_position.length-1) == 't'){
						//position above top of point
						return '-1em'
					}else{
						//position below point
						return '1em'
					}
				})
				.text(series_label);


		let datalabels = svg.select(".series"+index).selectAll(".datalabel")
			 .data([linedata], function(d){ return d.x});

		// let datatext= `<span class="val"></span>`
		datalabels
			.enter()
			.append("div")
			.attr("class", "datalabel")
			 // .attr('opacity', 0)
			 .join(
					function(enter){
						return datalabels  				
					},
					function(update){
						return update
					},
					function(exit){
						return exit.remove()
					})
			 	.on("mouseover", function(d){datalabels.text(d.percent); return datalabels.attr("opacity", 1);})
			    .on("mousemove", function(){return datalabels.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})
			    // .on("mouseout", function(){return datalabels.attr("opacity", 0);});

				// .transition()
				// .duration(duration)
				// .attr('opacity', 1)
				// .attr("transform", function(d) { return "translate(" + x(d.x) + "," + y(d.percent) + ")"})
				// .attr("x", 4)
				// .text(series_label);

	}

}


function drawError(svg, key, plotdata, index, stop){
	//given a plot id key, plot data, series index, and stop number
	//draws a d3 error area
	let errordata = plotdata.data.errors[index]; 

	let x = plotdata.scales.x;
	let y = plotdata.scales.y[stop];

	let areas = svg.select(".series"+index).selectAll('.area')
		.data([errordata], function(d){ return d.x});

	let seriesIndices = plotdata.stops[stop];

	if (!web){
		//for print: no transitions
		areas
			.enter()
			.append("path")
			.attr("class", "area")
			.attr('opacity', 0)
			.join(
					function(enter){
						return areas	   				
					},
					function(update){
						return update
					},
					function(exit){
						return exit.remove()
					})
			.attr('opacity', function(){
					//conditionally turn opactiy on/off depending on active series for sequence
					let alpha = 0;
					if( seriesIndices.includes(index) ){
						alpha = 1;
					}
					return alpha;
			})
			.attr("d", d3.area()
				.x(d => x(d.x))
				.y1(d => y(d.high))
				.y0(d => y(d.low)) 
			);
	}else{
		areas
		.enter()
		.append("path")
		.attr("class", "area")
		.attr('opacity', 0)
		 .join(
				function(enter){
					return areas	   				
				},
				function(update){
					return update
				},
				function(exit){
					return exit.remove()
				})
		.transition()
		.duration(duration)
		.attr('opacity', function(){
				//conditionally turn opactiy on/off depending on active series for sequence
				let alpha = 0;
				if( seriesIndices.includes(index) ){
					alpha = 1;
				}
				return alpha;
		})
		.attr("d", d3.area()
			.x(d => x(d.x))
			.y1(d => y(d.high))
			.y0(d => y(d.low)) 
		);
	}
}


function drawAxis(svg, width, height, x, y){

	let xticks = ['0', '100', '1,000', '10,000', '100,000']; //setup xTicks
	svg.append("g")
	.attr('class', 'xaxis')
	.attr("transform", `translate(0,${height})`)
	.call( d3.axisBottom(x).ticks(tickcount).tickFormat( d=> xticks[d-1] ) );	

	svg.append("g")
		.attr('class', 'yaxis')
		.attr("transform", `translate(${width + 20},0)`)
		.call( d3.axisLeft(y).ticks(tickcount).tickFormat(d => d + "%") )
			.selectAll("text")
				.style("text-anchor", "start");

	const xAxisGrid = d3.axisBottom(x).tickSize(-height).tickFormat('').ticks(tickcount);
	const yAxisGrid = d3.axisLeft(y).tickSize(-width).tickFormat('').ticks(tickcount);

	svg.append('g')
		.attr('class', 'x gridline')
		.attr('transform', 'translate(0,' + height + ')')
		.call(xAxisGrid);

	svg.append('g')
		.attr('class', 'y gridline')
		.call(yAxisGrid);
}


function drawBins(svg, key, plotdata, stop){    
	// given a plot id key, plot data, and stop number
	// append the rectangles that indicate bins

	let bindata = plotdata.data.bins;

	let x = plotdata.scales.x;
	let y = plotdata.scales.y[stop];

	let bins = svg.append("g")
		.attr("class", "bins")
		.selectAll(".bin")
		.data(bindata);

	bins
		.enter()
		.append("rect")
		.attr("class", "bin")
		.attr("x", d => x(d.x) )
		.attr("y", 0)
		.attr("width", d => {
			return ( x(d.x + d.width) - x(d.x) )
		})
		.attr("height", plotdata.dims.height);


}



function wrap(text, width) {
	text.each(function() {
		var text = d3.select(this),
				words = text.text().split(/\s+/).reverse(),
				word,
				line = [],
				lineNumber = 0,
				lineHeight = 1.0, // ems
				y = text.attr("y"),
				dy = parseFloat(text.attr("dy")),
				tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
		while (word = words.pop()) {
			line.push(word);
			tspan.text(line.join(" "));
			if (tspan.node().getComputedTextLength() > width) {
				line.pop();
				tspan.text(line.join(" "));
				line = [word];
				tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
			}
		}
	});
}


//main charting function
function chart(key, plotdata){
	preprocessData(plotdata, DIMENSIONS);
	setupPlot(key, plotdata);
	setupPlotLabels(key, plotdata);
}

//export svg charting function
function exportChart(key, plotdata, plot){
	preprocessData(plotdata, DIMENSIONS_PRINT);
	printPlot(key, plotdata, plot);
}

//update with scroll
function plotSequence(key, plotdata, stop){
	let svg = d3.select(`#${key}-group`);
	
	//transition yAxis
	let y = plotdata.scales.y[stop];
	
	svg.selectAll(".yaxis")
		.transition()
		.duration(duration)
		.call( d3.axisLeft(y).ticks(tickcount).tickFormat(d => d + "%") )
			.selectAll("text")
				.style("text-anchor", "start");;

	svg.selectAll(".y.gridline")
		.transition()
		.duration(duration)
		.call( d3.axisLeft(y).tickSize(-plotdata.dims.width).tickFormat('').ticks(tickcount) );

	// Add plot contents	
	let seriesLength = plotdata.labels.length;
	for (let i = 0; i < seriesLength; i++ ){
		drawLine(svg, key, plotdata, i, stop);
		drawError(svg, key, plotdata, i, stop);  
	}
}

function setupPlotLabels(key, plotdata){
	if(typeof plotdata.labels !== 'undefined'){

		let plot = document.querySelector('#'+key);
		let labels =  plot.querySelector('.plot-labels');

		let series_html = '';

		plotdata.labels.forEach( (label, i) =>{
			// console.log(label[0]);
			series_html += `<div class="key-item series${i}"><div class="key-color"></div><div class="key-label">${label[0]}</div></div>`;
			
			//tooltip
			// let tooltip = d3.select("#"+key).append("div")
			// 		 .style("opacity", 0)
			// 		 .html(label[0])
			// 		 .attr("class", `tooltip tip-label series${i}`)

			//corresponding area hover triggers tooltip
			let area = d3.select(`#${key}-group .series${i}`).select(`.area`);
			area.on('mouseover', function(event, d){

				//add stroke highlights
				let current_highlight = document.querySelectorAll(`#${key} .highlight`);
				current_highlight.forEach( el =>{
					el.classList.remove('highlight');
				});
				
				document.querySelector(`#${key} .series${i}`).classList.add('highlight');
				document.querySelector(`#${key} .plot-labels .series${i}`).classList.add('highlight');

				// tooltip
				// 	 .style("left", (event.layerX + 10) + "px")
				// 	 .style("top", (event.layerY - 15) + "px");
				// tooltip.transition()
				// 		.duration(50)
				// 		.style("opacity", 1);
			}).on('mouseout', function (d, i) {

				//remove stroke highlights
				let previous_highlight = document.querySelectorAll(`#${key} .highlight`);
				previous_highlight.forEach( el =>{
					el.classList.remove('highlight');
				});
			});

		});
		labels.innerHTML = series_html;
	}
}

exports.chart = chart;
exports.exportChart = exportChart;
exports.plotSequence = plotSequence;

}) (typeof exports === 'undefined'? this['densitycat']={}: exports);