const JSZip = require("jszip");
const FileSaver = require('file-saver');

import * as utils from "./global-utils";
import * as agecat from "./plot-types/agecat";
import * as ageavg from "./plot-types/ageavg";
import * as densitycat from "./plot-types/densitycat";
import * as densityavg from "./plot-types/densityavg";
import * as xy from "./plot-types/xy";
import * as bars from "./plot-types/bars";

//REGISTER ALL PLOT_TYPES DATA PROCESSORS
const PLOT_TYPES = {
	AgeCat: agecat.processData,
	DensityCat: densitycat.processData,
	XY: xy.processData,
	Bars: bars.processData,
	AgeAvg: ageavg.processData,
	DensityAvg: densityavg.processData
};

// let printData = {};

const DIMENSIONS = {
	size: [850, 550],
	margin: {
		top: 20, right: 60, bottom: 20, left: 20
	}
};

const MOBILE_DIMENSIONS = {
	size: [650, 550],
	margin: {
		top: 20, right: 60, bottom: 20, left: 20
	}
};

const DIMENSIONS_BAR = {
	size: [1400, 600],
	margin: {
		top: 10, right: 80, bottom: 20, left: 20
	}
}

const MOBILE_DIMENSIONS_BAR = {
	size: [650, 800],
	margin: {
		top: 10, right: 80, bottom: 20, left: 20
	}
}

const DIMENSIONS_PRINT = {
	size: [383, 167],
	margin: {
		top: 0, right: 0, bottom: 0, left: 0
	}
};


let IOs = {};
let duration = 800; //default duration for d3 transitions
const BINALPHA = 0.3; //default bin opacity
const allplotinfo = require("./../../_data/plots.json");
const colors = require("./../../_data/plotcolors.json");


/*------------------------------
//LOAD DATA
--------------------------------*/
function loadJSON(url, id) {
	return fetch(url)
		.then(response => {
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			return response.json();
		})
		.then(data => {
			let dataProcessor = PLOT_TYPES[data.type];
			let stops_count = 1;
			let series_count = 1;
			if (data.seq) {
				stops_count = data.seq.length;
			}
			if (data.series) {
				series_count = data.series.length;
			}
			// console.log(key, 'stop=', noStops, 'series=', noSeries );
			// allPlotData[key] = data;
			if (dataProcessor) {
				try {
					initializePlot(id, data, dataProcessor);
				} catch (error) {
					console.log('error with', id, data);
					console.error(error);
				}
			}
		})
		.catch(error => {
			throw error;
		});
}


// Function to load JSON data for divs and execute callback after all are loaded
export function loadPlotData(plots, callback) {
	plotArray = Array.from(plots)
	const promises = plotArray.map(el => {
		let id = el.id.replace('-plot', '');
		const url = `/assets/data/${id}.json`;
		return loadJSON(url, id);
	});

	Promise.all(promises)
		.then(data => {
			// console.log('all plots loaded');
			callback(null, data);
		})
		.catch(error => {
			console.log(error);
		});
}


/*------------------------------
//PLOT AXIS SETUP
--------------------------------*/
function xAxis(plotdata, x) {
	let height = plotdata.dims.height;
	let xformat = x => x;
	let xtickcount = plotdata.ticks[0];
	let xaxislabel = plotdata.axes[0];
	if (xaxislabel == "Age") {
		xformat = d3.format("d");
	} else if (xaxislabel == "Year") {
		xtickcount = 7;
		xformat = d3.format("d");
	} else if (xaxislabel == "Cumulative area (square miles)" || xaxislabel == "Square meters per person") {
		xformat = d3.format(",")
	}
	if (xaxislabel == "Density") {
		let xticks = plotdata.ticks[0]; //explicit xTicks values for density scales
		xtickcount = plotdata.ticks[0].length;
		xformat = d => {
			return xticks[d - 1]
		};
	}
	return {
		'axis': d3.axisBottom(x).tickSize(-height).ticks(xtickcount).tickFormat(xformat)
	}
}

function yAxis(plotdata, y) {
	let yformat = d => d;
	let width = plotdata.dims.width;

	let ytickcount = plotdata.ticks[1];

	let yaxislabel = plotdata.axes[1];
	if (yaxislabel.includes('%')) {
		yformat = d => d + "%";
	}

	let yaxis = d3.axisRight(y).tickSize(-width).ticks(ytickcount).tickFormat(yformat);

	if (plotdata.log && plotdata.log.length > 0) { //support logarithmic scales
		ytickcount = 4;
		yformat = d => {
			let ytick = '';
			if (d == 1000000) {
				ytick = '1M';
			} else if (d == 1000000) {
				ytick = '10M'
			} else if (d == 10000000) {
				ytick = '100M'
			} else if (d == 100000000) {
				ytick = '1B'
			} else if (d == 1000000000) {
				ytick = '10B'
			} else if (d == 10000000000) {
				ytick = '100B'
			}
			return ytick;
		}
		yaxis = d3.axisRight(y).tickSize(-width).ticks().tickFormat(yformat);
	}


	if (plotdata.axes[1] == '% of 1961 productivity') {
		//crops special case
		yaxis = d3.axisRight(y).tickSize(-width).ticks(12).tickFormat(d => (d * (1 / 25)).toFixed(1));
	}
	return {
		'axis': yaxis
	}
}

function updateXAxis(svg, plotdata, stop) {
	let x = plotdata.scales.x[stop];
	let xAxisFormat = xAxis(plotdata, x);
	let height = plotdata.dims.height;

	svg.selectAll(".xaxis")
		.transition()
		.duration(duration)
		.attr("transform", `translate(0,${height})`)
		.call(xAxisFormat.axis)
		.selectAll("text")
		.attr("dy", "1em");
}

function updateYAxis(svg, plotdata, stop) {
	let y = plotdata.scales.y[stop];
	let yAxisFormat = yAxis(plotdata, y);
	let width = plotdata.dims.width;

	if (plotdata.axes[1] == '% of 1961 productivity' && stop > 1) {
		//crops special case 
		let yformat = d => d + "%";
		yAxisFormat.axis = yaxis = d3.axisRight(y).tickSize(-width).ticks(12).tickFormat(yformat);
	}

	svg.selectAll(".yaxis")
		.transition()
		.duration(duration)
		.attr("transform", `translate(${width},0)`)
		.call(yAxisFormat.axis)
		.selectAll("text")
		.style("text-anchor", "start")
		.attr("dx", "0.5em");
}

function drawAxis(svg, plotdata, x, y) {

	let height = plotdata.dims.height;
	let width = plotdata.dims.width;

	let xAxisFormat = xAxis(plotdata, x);
	let yAxisFormat = yAxis(plotdata, y);

	svg.append("g")
		.attr('class', 'xaxis')
		.attr("transform", "translate(0," + height + ")")
		.call(xAxisFormat.axis)
		.selectAll("text")
		.attr("dy", "1em");

	svg.append("g")
		.attr('class', 'yaxis')
		.attr("transform", `translate(${width},0)`)
		.call(yAxisFormat.axis)
		.selectAll("text")
		.style("text-anchor", "start")
		.attr("dx", "0.5em");
}

/*------------------------------
//PLOT DRAWING FUNCTIONS
--------------------------------*/

function drawLine(svg, key, data, plotdata, index, stop, style = 'solid') {
	//given a svg container, plot id key, plot data, series index, and stop (frame) number
	//draws a d3 line
	let linedata = data;
	let lineclass = "line solid";
	let lineselector = ".line.solid";
	if (style !== "solid") {
		lineclass = "line " + style;
		lineselector = ".line." + style;
	}
	let x = plotdata.scales.x[stop];
	let y = plotdata.scales.y[stop];
	let seriesIndices = plotdata.stops[stop];

	let plotlines;
	// console.log('DRAWLINE', index, lineselector, linedata);

	let hoverareas = svg.select('.hoverareas')
	if (style == 'hotspot') {
		//these lines are for hovering over, rendered in the top most layer
		plotlines = hoverareas.select(`g[data-series="${index}"]`).selectAll(lineselector)
			.data([linedata], function (d) {
				return d.x
			});

	} else {
		plotlines = svg.select(`g[data-series="${index}"]`).selectAll(lineselector)
			.data([linedata], function (d) {
				return d.x
			});
	}

	plotlines
		.enter()
		.append("path")
		.attr("class", lineclass)
		.join(
			function (enter) {
				return plotlines
			},
			function (update) {
				return update
			},
			function (exit) {
				return exit.remove()
			})
		.transition()
		.duration(duration)
		.attr("d", d3.line()
			.x(function (d) {
				return x(d.x);
			})
			.y(function (d) {
				return y(d.y);
			})
		);

	if (style == "hotspot") {
		//invisible lines for hovering over

	} else {
		//ADD SERIES LABELS
		try {
			if (plotdata.labels[index] && style !== 'dotted') {
				let element = document.getElementById(key + '-plot');
				element.setAttribute('data-active-series', seriesIndices.toString());
				element.setAttribute('data-active-stop', stop.toString());

				//get point to which to align the series label
				let series_position = plotdata.labels[index][1];
				let series_position_index = series_position.slice(0, -1); //i.e. get 2 from 2t

				let thislabeldata = linedata[series_position_index];

				if (thislabeldata) {
					//access the specified point to position the series label
					let labels = svg.select(`g[data-series="${index}"]`).selectAll(".svg-label")
						.data([thislabeldata]); //get index number of point, ie 2
					if (labels) {
						let series_label = plotdata.labels[index][0]; //series name
						labels
							.enter()
							.append("text")
							.attr("class", "svg-label")
							.join(
								function (enter) {
									return labels
								},
								function (update) {
									return update
								},
								function (exit) {
									return exit.remove()
								})
							.transition()
							.duration(duration)
							.attr("transform", function (d) {
								return "translate(" + x(d.x) + "," + y(d.y) + ")"
							})
							.attr("x", 4)
							.attr("dy", function () {
								if (series_position.charAt(series_position.length - 1) == 't') {
									//position above top of point
									return '-1em'
								} else {
									//position below point
									return '1em'
								}
							})
							.text(series_label);
					}
				}
			}
		} catch (er) {
			console.log(er, key, index);
		}
	}
	// if( plotdata.format != 'XY'){
	// 	//too many datapoints for XY plots
	// 	//need to optimize
	// 	addTooltips(svg, key, plotdata, index, x, y);
	// }
}


function drawDots(svg, key, dotdata, plotdata, index, stop) {
	//given a plot id key, plot data, series index, and stop number
	//draws a d3 circles
	let x = plotdata.scales.x[stop];
	let y = plotdata.scales.y[stop];

	let dots = svg.select(`g[data-series="${index}"]`).selectAll(".dot")
		.data(dotdata);

	dots
		.enter()
		.append("circle")
		.attr("class", "dot")
		.join(
			function (enter) {
				return dots
			},
			function (update) {
				return update
			},
			function (exit) {
				return exit.remove()
			})
		.transition()
		.duration(duration)
		.attr("cx", function (d) {
			return x(d.x)
		})
		.attr("cy", function (d) {
			return y(d.y)
		})

}

function drawError(svg, key, data, plotdata, index, stop) {
	//given a plot id key, plot data, series index, and stop number
	//draws a d3 path area
	let errordata = data;
	let x = plotdata.scales.x[stop];
	let y = plotdata.scales.y[stop];

	if (errordata[0].x) {
		let errors = svg.select(`g[data-series="${index}"]`).selectAll('.area')
			.data([errordata], function (d) {
				return d.x
			});
		plotRects(errors, 0);
	} else {
		// there are multiple error rects, for Age Average plots
		for (let z = 0; z < errordata.length; z++) {
			let z_errors = svg.select(`g[data-series="${index}"]`).selectAll('.alpha' + z)
				.data([errordata[z]], function (d) {
					return d.x
				});

			plotRects(z_errors, z);
		}
	}

	function plotRects(errors, z) {
		errors
			.enter()
			.append("path")
			.attr("class", `area alpha${z}`)
			.join(
				function (enter) {
					return errors
				},
				function (update) {
					return update
				},
				function (exit) {
					return exit.remove()
				})
			.transition()
			.duration(duration)
			.attr("d", d3.area()
				.x(d => x(d.x))
				.y1(d => y(d.high))
				.y0(d => y(d.low))
			);
	}
}

function drawArea(svg, key, areadata, plotdata, index, stop, multi) {
	//given a plot id key, plot data, series index, and stop number
	//draws a d3 polygon area
	let x = plotdata.scales.x[stop];
	let y = plotdata.scales.y[stop];

	if (multi) {
		for (let a = 0; a < multi.length; a++) {
			let a_multi = svg.select(`g[data-series="${index}"]`).selectAll('.area' + a).data([areadata.slice(multi[a][0], multi[a][1])], function (d) {
				return d.x
			});
			plotAreas(a_multi, a);
		}
	} else {
		let areas = svg.select(`g[data-series="${index}"]`).selectAll('.area').data([areadata], function (d) {
			return d.x
		});
		plotAreas(areas, 0);

	}


	function plotAreas(areas, a) {
		areas
			.enter()
			.append("polygon")
			.attr("class", `area area${a}`)
			.join(
				function (enter) {
					return areas
				},
				function (update) {
					return update
				},
				function (exit) {
					return exit.remove()
				})
			.transition()
			.duration(duration)
			.attr("points", function (d) {
				return d.map(function (d) {
					return [x(d.x), y(d.y)].join(",");
				}).join(" ");
			});
	}


}

function drawBins(svg, key, plotdata, stop) {
	// given a plot id key, plot data, and stop number
	// append the rectangles that indicate bins
	let bindata = plotdata.bins;

	let x = plotdata.scales.x[stop];
	let y = plotdata.scales.y[stop];

	let bins = svg.select(".bins").selectAll(".bin")
		.data(bindata);

	let figure = document.querySelector(`#${key}-plot`);
	let binindicator = figure.querySelector(`.bin-tip`);

	bins
		.join(
			function (enter) {
				return enter
					.append("rect")
					.attr("height", plotdata.dims.height)
					.attr("y", 0)
					.attr("class", function (d, i) {
						if (i % 2 === 0) {
							return "bin alt"
						} else {
							return "bin"
						}
					})
					.attr("data-index", function (d, i) {
						return i
					})
					.attr("opacity", BINALPHA)
					.on("mousemove", function (event, data) {
						d3.select(this).classed("activebin", true);
						let index = d3.select(this).attr('data-index');
						activeBin = index;
						showBinDataLabel(key, "bin", index, event);
					})
					.on("mouseout", function () {
						d3.select(this).classed("activebin", false);
						figure.querySelector('.plot-tips').classList.remove('visible');
					})
			},
			function (update) {
				return update
			},
			function (exit) {
				return exit.remove()
			})
		.transition()
		.duration(duration)
		.attr("x", d => x(d.x))
		.attr("width", d => {
			return (x(d.x + d.width) - x(d.x))
		})


	// DRAW BIN LINES AND TIPS
	// for "expert mode" updating bin boundaries	

	let bingroups = svg.select('.binlines').selectAll(".binlinegroup")
		.data(bindata);
	//draw bin lines
	let newGroups = bingroups
		.join(
			function (enter) {
				return enter
					.append("g")
					.attr("class", "binlinegroup")
					.attr("data-binindex", (d, i) => { return i })
			},
			function (update) {
				return update
			},
			function (exit) {
				return exit.remove()
			})
		.attr("transform", d => `translate(${x(d.x)}, 0)`);

	newGroups.each(function (d) {
		if (!d3.select(this).select("rect").node()) {
			d3.select(this)
				.append("rect")
				.attr("width", 6)
				.attr("y", 0)
				.attr("height", plotdata.dims.height)
				.attr("class", "binline")
		}
		if (!d3.select(this).select("text").node()) {
			d3.select(this)
				.append("text")
				.attr("class", "bintip")
				.attr("y", 0)
				.attr("dx", '-0.5em')
				.attr("dy", '-0.5em')
		}

		d3.select(this)
			.select("text")
			.text(function (d, i) {
				let xvalue = d.x;
				if (plotdata.format.includes('Density')) {
					xvalue = formatDensity(xvalue);
				}
				return xvalue;
			});
	});


}

function formattedX(newX, scale, key) {
	//converts from pixel value X to 
	//scale X and provides format as needed
	let dataX = scale.invert(newX);
	let formattedValue;
	let binX;

	if (webPlots[key].format.includes('Density')) {
		formattedValue = formatDensity(dataX);
		binX = dataX;
	} else {
		//age needs to be an integer to filter the age data
		formattedValue = Math.round(dataX);
		binX = formattedValue;
	}
	return { 'bin': binX, 'format': formattedValue }
}
function getTransformX(attr) {
	return /translate\(([^,]+),[^)]+\)/.exec(attr);
}

export function updateBins(key, rawdata, dataprocessor) {
	let svg = d3.select(`#${key}-svg`);
	let thisPlot = document.getElementById(key + '-plot');
	let currentplotdata = webPlots[key];

	let rawdatacopy = JSON.parse(JSON.stringify(rawdata));
	// expert mode bin adjustments

	let binlines = svg.selectAll(".binlinegroup");

	//add bins
	svg.on('mousemove', function (event) {
		if (thisPlot.hasAttribute('data-binupdate')) {

			let xcoord = d3.pointer(event)[0];
			let xscale = currentplotdata.scales.x[parseInt(thisPlot.dataset.activeStop)];
			let vals = formattedX(xcoord, xscale, key);

			svg.select('.binlineghost')
				.attr("transform", `translate(${xcoord}, 0)`);
			// svg.select('.binlineghost').select("text")
			// 	.text(vals.format);

			svg.on('click', function () {
				if (!rawdatacopy.bins.includes(vals.bin)) {
					rawdatacopy.bins = insertIntoSortedArray(rawdatacopy.bins, vals.bin);
					// console.log('COMPARE DATA', rawdata, rawdatacopy)
					duration = 0;
					updatePlotNewBins(rawdatacopy);
				}
			});
		}
	});

	let removeBinClickHandler = function (event, d) {
		if (event.defaultPrevented) return;
		event.stopPropagation();
		if (thisPlot.querySelectorAll('.binlinegroup').length > 2) {
			//only allow for removing bins when there are more than 1 bin
			let clickedBin = d3.select(this);
			let clickedBinIndex = parseInt(clickedBin.attr("data-binindex"));
			rawdatacopy.bins.splice(clickedBinIndex, 1);
			duration = 0;
			updatePlotNewBins(rawdatacopy);
		}
	}

	//drag and drop binlines
	let dragBinHandler = d3.drag()
		.on("start", function (event, d) {
			svg.select('.binlines').attr('data-dragging', true);
			duration = 400; //make transitions faster for bin updates;

			var current = d3.select(this);

			d.deltaX = parseFloat(getTransformX(current.attr("transform"))[1]) - event.x;
			d.xscale = currentplotdata.scales.x[parseInt(thisPlot.dataset.activeStop)];

			//get current bin line index
			d.binlineIndex = parseInt(current.attr("data-binindex"));
			// console.log(d.binlineIndex)

			let nextBinBoundIndex = d.binlineIndex + 1;
			let nextBinBound = thisPlot.querySelector(`[data-index="${nextBinBoundIndex}"]`);
			if (nextBinBound) {
				d.rangeMax = svg.select(`[data-index="${nextBinBoundIndex}"]`).data()[0].x;
			} else {
				//get right edge of last bin
				d.rangeMax = d.xscale.domain()[1];
			}

			let prevBinBoundIndex = d.binlineIndex - 1;
			let prevBinBound = thisPlot.querySelector(`[data-index="${prevBinBoundIndex}"]`);
			d.rangeMin = svg.select(`[data-index="${prevBinBoundIndex}"]`).data()[0].x;
			// console.log(d.rangeMin, d.rangeMax);
		})
		.on("drag", function (event, d) {
			if (Math.abs(event.dx) > 1) {

				let newX = event.x + d.deltaX;

				let values = formattedX(newX, d.xscale, key);

				if (values.bin < d.rangeMax && values.bin > d.rangeMin) {
					d3.select(this)
						.attr("transform", `translate(${newX}, 0)`);

					d.validX = values.bin;
					//update bin indicator
					d3.select(this).select("text")
						.text(values.format);
				} else {
					// console.log('out of range');
				}
				svg.select('.binlineghost')
					.attr("transform", `translate(${newX}, 0)`);
			}
		})
		.on("end", function (event, d) {

			svg.select('.binlines').attr('data-dragging', false);
			if (d.validX) {
				rawdatacopy.bins[d.binlineIndex] = d.validX;
				updatePlotNewBins(rawdatacopy);
			}

			let bindrag_event = {
				name: "plot_bindrag",
				category: "plot_interaction",
				label: key,
				value: d.binlineIndex
			}
			utils.sendAnalyticsEvent(bindrag_event);

		});

	dragBinHandler(binlines);

	//remove bins
	binlines.on('click', removeBinClickHandler);

	function updatePlotNewBins(rawdatacopy) {
		let thisStop = parseInt(thisPlot.dataset.activeStop);
		//update plots with new data
		let newplotdata = dataprocessor(rawdatacopy, getMetaData(key), currentplotdata);

		//copyover dimensions and scales
		newplotdata.dims = currentplotdata.dims;
		newplotdata.scales = currentplotdata.scales;

		//update X scale according to new bin rangesf
		newplotdata.scales.x = newplotdata.xdomains.map(range => {
			return d3.scaleLinear()
				.domain(range)
				.range([0, newplotdata.dims.width])
		});

		webPlots[key] = newplotdata; //save new data into global data 			
		// replot with new bin
		updatePlotSequence(thisStop, key);
		drawBins(svg, key, newplotdata, thisStop);
		//reassign event handlers
		let newBinLines = svg.selectAll(".binlinegroup");
		dragBinHandler(newBinLines);
		newBinLines.on('click', removeBinClickHandler);
		duration = 800; //reset transition duration;
	}
}

function clearBin() {
	let prevBin = document.querySelector('.activebin');
	if (prevBin) {
		prevBin.classList.remove('activebin');
	}
}

function insertIntoSortedArray(arr, num) {
	const index = arr.findIndex(element => element > num); // Find the index where the element should be inserted
	if (index === -1) {
		arr.push(num); // If the element is larger than all elements in the array, push it to the end
	} else {
		arr.splice(index, 0, num); // Insert the element at the found index
	}
	return arr;
}

function drawBars(key, plotdata, stop) {
	// console.log('drawBars', stop);
	// Compute values.
	let plot_container = document.querySelector(`#${key}-plot .plot-content`);
	let bardata = plotdata.data.values[stop];
	function questionFull(i) {
		return plotdata.data.qs[i]
	};

	let height = plotdata.dims.height;
	let width = plotdata.dims.width;

	// // Construct scales, axes, and formats.
	let x = plotdata.scales.x[stop];
	let y = plotdata.scales.y[stop];

	if (plot_container.querySelectorAll('.question-label').length < 1) {
		//initial setup to add bar elements to DOM
		bardata.forEach(function (d, i) {
			let bargroup = document.createElement('div');
			bargroup.id = d[0];
			bargroup.className = 'bargroup';

			let label = document.createElement('div');
			label.className = "question-label";
			label.innerText = questionFull(d[0]);
			bargroup.appendChild(label);

			let bar = document.createElement('div');
			bar.className = "bar";
			// bar.style.height = y.bandwidth()+'px';
			bargroup.appendChild(bar);

			let tip = document.createElement('div');
			tip.classList.add("bar-tip");
			bargroup.appendChild(tip);

			plot_container.appendChild(bargroup);
		});
	}

	//update with bar data

	let availableHeight = plot_container.offsetHeight;
	// calculate ratio to adjust Ys based on 600px height
	let heightRatio = availableHeight / plotdata.dims.height;
	//update with bar data
	bardata.forEach(function (d, i) {
		let bargroup = plot_container.querySelector('#' + d[0]);
		let posneg = "positive";
		if (d[1] < 0) {
			posneg = "negative";
		}
		let transY = y(d[0]) * heightRatio;
		bargroup.dataset.bar = posneg;
		bargroup.style.transform = `translateY(${transY}px)`;
		let this_bar = bargroup.querySelector('.bar');
		let barwidth = Math.abs(x(d[1]) - x(0));
		this_bar.style.width = 100 * (barwidth / width) + '%';
		let datapoint = (d[1] * 10).toFixed(2);
		bargroup.dataset.datavalue = datapoint;
		bargroup.querySelector('.bar-tip').innerHTML = `
		<div class="tip-question">${questionFull(d[0])}</div><div class="tip-datapt">${datapoint}</div>`;
	});

	document.getElementById(key + '-plot').setAttribute('data-active-stop', stop.toString());

}


function makePlot(svg, key, plotdata, stop, setup = true) {
	//MAIN PLOTTING FUNCTION, uses drawer function defined according to
	//the geometry of the data
	//if setup is true, adds the series group nodes, if false, updates existing nodes	

	if (plotdata.format == 'Bars') {
		drawBars(key, plotdata, stop);
	} else {
		let seriesLength = plotdata.labels.length;
		let seriesIndices = plotdata.stops[stop];
		plotdata.series.forEach((series, i) => {
			//we still draw all series for transition purposes
			if (setup) {
				//add group containers on initial setup
				svg.select(".seriesdata")
					.append('g')
					.attr("clip-path", `url(#${key}-clip)`)
					.attr("class", 'series-group')
					.attr("data-color", `${plotdata.colors[i]}`)
					.attr("data-series", i)
					.attr("data-series-state", "")

				svg.select(".hoverareas")
					.append('g')
					.attr("clip-path", `url(#${key}-clip)`)
					.attr("class", 'series-group hotspot-group')
					.attr("data-series", i)
					.attr("data-series-state", "")
			}
			//otherwise, just update existing series

			let thisSeriesData;
			if (Array.isArray(series.data)) {
				//support "from" branching — if there are multiple sources of data a single series 
				thisSeriesData = series.data[stop];
				if (!thisSeriesData) {
					//if a data point for that stop isn’t defined, 
					//use the data from the previous stop
					thisSeriesData = series.data[stop - 1];
				}
			} else {
				thisSeriesData = series.data;
			}

			if (thisSeriesData) {
				if (series.shape.includes('area')) {
					if (thisSeriesData.areas) {
						if (thisSeriesData.multi) { //multiple areas for each sereis
							drawArea(svg, key, thisSeriesData.areas, plotdata, i, stop, thisSeriesData.multi);
						} else {
							drawArea(svg, key, thisSeriesData.areas, plotdata, i, stop);
						}
					}
				}
				if (series.shape.includes('error')) {
					drawError(svg, key, thisSeriesData.errors, plotdata, i, stop);
					if (thisSeriesData.median) {
						//draw median for average plots
						drawLine(svg, key, thisSeriesData.median, plotdata, i, stop, "dotted");
					}
				}
				if (series.shape == 'dotteddotted') {
					drawLine(svg, key, thisSeriesData.lines.slice(0, 2), plotdata, i, stop, "dotted-1");
					drawLine(svg, key, thisSeriesData.lines.slice(2, 4), plotdata, i, stop, "dotted-2");
				} else if (series.shape.includes('dot')) {
					drawDots(svg, key, thisSeriesData.dots, plotdata, i, stop);
				}

				if (series.shape.includes('line')) {
					if (series.shape == 'thicklines') {
						drawLine(svg, key, thisSeriesData.lines, plotdata, i, stop, "thick");
					} else {
						drawLine(svg, key, thisSeriesData.lines, plotdata, i, stop);
					}
					//for graphs that only have lines and no areas
					//draw inivisible hidden lines to increase hover-over hotspot areas
					// if( series.shape == "line"){

					// }
					drawLine(svg, key, thisSeriesData.lines, plotdata, i, stop, "hotspot");
				}

			}

			if (plotdata.format == 'AgeAvg') {
				//average plots have different sequence indices structure
				let errorStops = plotdata.errorStops[stop];

				if (seriesIndices.includes(i)) {
					let thisErrorIndices = errorStops[i]; //list of alphas relevant for this series at this stop
					// console.log(errorStops, i, thisErrorIndices);
					//turn off non-relevant alphas
					if (thisErrorIndices) {
						let alphas = d3.selectAll(`#${key} g[data-series="${i}"] .area`);
						alphas
							.attr('opacity', function (d, i, n) {
								if (thisErrorIndices.includes(i)) {
									return 1;
								} else {
									return 0;
								}
							});
					}

				}
			}

			// conditionally turn opactiy on/off depending on active series for sequence
			let seriesGroup = d3.select('#' + key).selectAll(`g[data-series="${i}"]`);
			seriesGroup
				.attr('data-series-state', function () {
					if (seriesIndices.includes(i)) {
						return "active";
					} else {
						return "";
					}
				});

		}); //end for each series

		// show/hide series labels (these are DOM div elements, not part of svg)	
		//first hide
		let shownlegends = document.querySelectorAll('.visiblekey');
		shownlegends.forEach(l => {
			l.classList.remove('visiblekey');
		});
		//then show relevant key items
		seriesIndices.forEach(ind => {
			let legend = document.querySelector(`#${key}-plot .key-item[data-series-number="${ind}"]`);
			// console.log(legend);
			if (legend) {
				legend.classList.add('visiblekey');
			}
		});
	}
}


export function getMetaData(key) {
	return allplotinfo[key];
}

export function getLabelPostion(positions, i) {
	let label_position = '1t'; //set default label position at 2nd data point (index 1)
	if (positions[i] != '' && typeof positions[i] != 'undefined') {
		label_position = positions[i];
	}
	return label_position;
}

export function setupDimensions(plotdata) {
	// given a global data object with all plot information
	// sets up x and y scales for each plot
	// and appends to object
	let dim = DIMENSIONS;

	if (plotdata.format == "Bars") {
		dim = DIMENSIONS;
		if (utils.isMobile()) {
			dim = MOBILE_DIMENSIONS_BAR;
		}
	} else if (utils.isMobile()) {
		dim = MOBILE_DIMENSIONS;
	}

	plotdata.dims = dim;
	plotdata.dims.width = dim.size[0] - dim.margin.left - dim.margin.right;
	plotdata.dims.height = dim.size[1] - dim.margin.top - dim.margin.bottom;

	plotdata.scales = {
		x: [],
		y: []
	}

	if (plotdata.log && plotdata.log.length > 0) { //support logarithmic scales
		plotdata.log.forEach((logscale, seqindex) => {
			if (logscale[0] == 0) {
				plotdata.scales.x.push(
					d3.scaleLinear()
						.domain(plotdata.xdomains[seqindex])
						.range([0, plotdata.dims.width])
				);
			} else if (logscale[0] == 10) {
				plotdata.scales.x.push(
					d3.scaleLog()
						.domain(plotdata.xdomains[seqindex])
						.range([0, plotdata.dims.width])
				);
			}

			if (logscale[1] == 0) {
				plotdata.scales.y.push(
					d3.scaleLinear()
						.domain(plotdata.ydomains[seqindex])
						.range([plotdata.dims.height, 0])
				);
			} else if (logscale[1] == 10) {
				plotdata.scales.y.push(
					d3.scaleLog()
						.domain(plotdata.ydomains[seqindex])
						.range([plotdata.dims.height, 0])
				);
			}
		});
	} else {
		plotdata.scales = {
			x: plotdata.xdomains.map(range => {
				return d3.scaleLinear()
					.domain(range)
					.range([0, plotdata.dims.width])
			}),
			y: plotdata.ydomains.map(range => {
				if (plotdata.format == 'Bars') {
					return d3.scaleBand(range, [plotdata.dims.height, 0]).padding(0.4);
				} else {
					return d3.scaleLinear()
						.domain(range)
						.range([plotdata.dims.height, 0])
				}
			})
		}
	}
}

export function setupPlot(key, plotdata) {
	//INITIAL PLOT SETUPS
	let seriesIndices = plotdata.stops[0];

	// Define X and Y axis
	let x = plotdata.scales.x[0];
	let y = plotdata.scales.y[0]; //use first Y scale for initial setup

	let svg;

	if (plotdata.format !== 'Bars') {
		let plot = d3.select('#' + key + '-plot').select('.plot-content').append("svg");
		svg = plot.attr("viewBox", `0 0 ${plotdata.dims.size[0]} ${plotdata.dims.size[1]}`)
			.attr("class", plotdata.format)
			.append("g")
			.attr("id", key + '-svg')
			.attr("transform",
				"translate(" + plotdata.dims.margin.left + "," + plotdata.dims.margin.top + ")");

		//add clipping rectangle
		svg.append("clipPath") // define a clip path
			.attr("id", key + "-clip") // give the clipPath an ID
			.append("rect") //Append the shape for clipping
			.attr("x", 0)
			.attr("y", 0)
			.attr("width", plotdata.dims.width)
			.attr("height", plotdata.dims.height);

		drawAxis(svg, plotdata, x, y);

		//order of drawing: bins should be below series, 
		//but binlines above
		if (plotdata.bins) {
			svg.append("g").attr("class", "bins");
		}

		svg.append("g").attr("class", "seriesdata");
		svg.append("g").attr("class", "hoverareas");

		if (plotdata.bins) {
			svg.append("g").attr("class", "binlines");
			//add ghost binline for adding / updating bins
			svg.select('.binlines')
				.append("g")
				.attr("class", "binlineghost")
				.append("rect")
				.attr("width", 4)
				.attr("y", 0)
				.attr("height", plotdata.dims.height)
				.attr("class", "binline")
				.attr("transform", d => `translate(0, 0)`)

			svg.select('.binlineghost')
				.append("text")
				.attr("class", "bintip")
				.attr("y", 0)
				.attr("dx", '-0.5em')
				.attr("dy", '-0.5em')

			drawBins(svg, key, plotdata, 0);
		}
	}
	// Add plot contents for first stop(0) for initial setup
	makePlot(svg, key, plotdata, stop = 0, setup = true);
}


/*------------------------------
// SETUP FIGURE INDICATORS
--------------------------------*/

export function addIndicatorContainer(figArea, id) {
	let indicator = document.createElement('div');
	indicator.id = `${id}-indicator`;
	indicator.classList.add('indicator');
	let figContainer = document.getElementById(`${id}-fig`);
	let indicatorContainer = document.querySelector('.figure-indicators');
	//contains all figure and plot indicators
	if (figArea.classList.contains('plot-wrapper')) {
		indicator.classList.add('plotindicator');
	}
	if (figArea.classList.contains('fullbleed')) {
		figContainer.appendChild(indicator);
	} else {
		//only append to general indicator container for non-full width items
		indicatorContainer.appendChild(indicator);
		// positionIndicator(figArea, id);
	}
}

export function positionIndicator(figArea, id) {
	let indicator = document.getElementById(`${id}-indicator`);
	//reset existing styling
	indicator.removeAttribute('style');

	let indContainer = document.querySelector('.figure-indicators');
	let refTop = figArea.offsetTop;
	let figContainer = document.getElementById(`${id}-fig`);
	let refHeight = figArea.getBoundingClientRect().height;

	// console.log('resposition spans');

	if (utils.isMobile()) {
		let stickyflag = false;
		if (figContainer.style.position == "sticky") {
			figContainer.style.position = "static";
		}
		refTop = figContainer.getBoundingClientRect().top - indContainer.getBoundingClientRect().top;
		let firstText = figContainer.previousElementSibling;
		let nextText = figContainer.nextElementSibling;
		// console.log(refTop, refHeight, figContainer, firstText);
		if (figArea.classList.contains('xfade-wrapper') || figArea.classList.contains('plot-wrapper')) {
			//make static to calc proper values
			// refTop = figContainer.getBoundingClientRect().top - indContainer.getBoundingClientRect().top;
			//  //make back to sticky
		} else {
			refHeight = figContainer.offsetHeight;
		}

		if (stickyflag) {
			figContainer.style.position = "sticky";
		}

		// if( id == "quigley"){
		// 	refHeight = window.innerHeight * 6;
		// }
	}

	if (!figContainer.classList.contains('media-full') && !figArea.classList.contains('fullbleed')) {
		indicator.style.top = refTop + "px";
		indicator.style.height = refHeight + "px";
	}
}

/*------------------------------
// SETUP PLOT SEQUENCE INDICATORS
--------------------------------*/
export function positionSequenceTriggers(key) {
	//given plot id for text triggers that are in-place of text
	//adjust the heights of the spans to align with
	//relevant keywords
	let container = document.getElementById(key);
	let fig = document.getElementById(`${key}-fig`);

	//first, reset and remove style and flex overrides
	let spans = fig.querySelectorAll('.seqindicator');
	spans.forEach(s => {
		s.removeAttribute("style");
	});


	if (container.dataset.format !== 'Bars') {

		if (utils.isMobile()) {

		} else {
			let triggers = container.querySelectorAll('[data-seq]');
			if (triggers) {
				let this_id = container.id;
				let prevY = 0;
				triggers.forEach((text, tindex) => {
					let spanheight = text.offsetTop - prevY;
					let this_indicator_index = parseInt(text.dataset.seq) - 1;
					let this_indicator = document.querySelector(`#${this_id}-indicator [data-span="${this_indicator_index}"`);
					this_indicator.style.height = `${spanheight}px`;
					this_indicator.style.flex = 'none';
					// console.log(this_id, prevY, text, text.offsetTop, this_indicator_index, this_indicator, spanheight);
					prevY = prevY + spanheight;
				});
			}
		}
	}
}

export function setupPlotSequence(key) {
	//adds sequence indicators for plot indicators
	let plot = document.getElementById(key + '-plot');
	let plotdata = webPlots[key];
	// let stopCount = parseInt(plot.dataset.stops);
	let stopCount = plotdata.stops.length;
	plot.dataset.stops = stopCount;

	//change view on sequence triggers in text
	let container = document.getElementById(key + '-indicator');
	let figText = document.getElementById(key + '-fig').nextElementSibling;
	const paragraphs = Array.from(figText.children);
	if (container) {
		for (let s = 0; s < stopCount; s++) {
			if (!container.querySelectorAll('.seqIndicator').length > 0) {
				let seqIndicator = document.createElement('div');
				container.appendChild(seqIndicator);
				seqIndicator.classList.add(`${key}-seqindicator`, 'seqindicator');
				seqIndicator.dataset.span = s;
				seqIndicator.addEventListener('click', (event) => {
					scrollToActiveIndicator(s, key);
				});

				let io = `${key}-seq${s}`;
				if (!IOs[io]) {
					IOs[io] = createSequenceObserver(seqIndicator, s, key);
				}

				if (utils.isMobile()) {
					//for mobile tie triggers to paragraphs in textplot
					let iokey = `${key}-para${s}`;
					// console.log( iokey, IOs[iokey], paragraphs[s] )
					if (!IOs[iokey]) {
						let extradiv = document.createElement('div');
						if (paragraphs[s]) {
							// let newp  = paragraphs[s].cloneNode(true);
							// extradiv.appendChild(newp);
							extradiv.appendChild(paragraphs[s]);
						}
						extradiv.classList.add('seq-mobileindicator', 'scroll-overlay');
						// extradiv.dataset.span = s;
						extradiv.setAttribute('aria-hidden', true);
						figText.appendChild(extradiv);
						IOs[iokey] = createSequenceObserver(extradiv, s, key);

					}
				}
			}
		}

		if (utils.isMobile()) {
			if (stopCount < paragraphs.length) {
				for (let p = stopCount; p < paragraphs.length; p++) {
					let extradiv = document.createElement('div');
					extradiv.appendChild(paragraphs[p]);
					extradiv.classList.add('seq-mobileindicator', 'scroll-overlay');
					extradiv.setAttribute('aria-hidden', true);
					figText.appendChild(extradiv);
				}
			}
		}
		positionSequenceTriggers(key);
	}
}


function createSequenceObserver(elem, stop, key) {
	// observes the sequence spans within the active figure indicator
	// console.log(key, 'key', fig);
	let rootMargin = "-50% 0% -50% 0%";
	if (!elem.classList.contains('seqindicator')) {
		rootMargin = "0%";
	}

	let observer = new IntersectionObserver(function (entries) {
		let [entry] = entries;
		if (entry.isIntersecting) {
			let parent = entry.target.closest('.figarea');
			if (parent && parent.classList.contains('fullbleed')) {
				updatePlotSequence(stop, key);
			} else if (utils.isMobile() && entry.target.classList.contains('seqindicator')) {
				//don’t use IO intersection for the indicators on mobile
			} else {
				updatePlotSequence(stop, key);
			}
		} else if (!entry.isIntersecting) {
			// elem.classList.remove('active-tag');
		}
	}, {
		rootMargin: rootMargin,
		threshold: 0
	});

	observer.observe(elem);
	return observer;
}


export function updatePlotSequence(activeStop, key) {

	updateActiveIndicator(activeStop, key);

	// console.log('update sequence', activeStop, key);

	let svg = d3.select(`#${key}-svg`);

	let plotdata = webPlots[key];
	//transition axes
	updateXAxis(svg, plotdata, activeStop);
	updateYAxis(svg, plotdata, activeStop);

	//reset any plot tips
	if (plotdata.format !== 'Bars') {
		let tips = document.querySelector(`#${key}-plot`).querySelector('.plot-tips');
		tips.classList.remove('visible');
	}

	// Add plot contents	
	makePlot(svg, key, plotdata, activeStop, setup = false);

	let seq_event = {
		name: "plot_sequence",
		category: "plot_interaction",
		label: key,
		value: activeStop
	}
	utils.sendAnalyticsEvent(seq_event);
}

function scrollToActiveIndicator(activeStop, key) {
	let indicator = document.getElementById(key + '-indicator');
	let span = indicator.querySelector(`[data-span = "${activeStop}"]`);
	if (!utils.isMobile()) {
		window.scroll({ top: span.getBoundingClientRect().top + window.pageYOffset - document.documentElement.clientHeight * 0.5 + (span.offsetHeight / 2), behavior: "smooth" });
	}
}

export function updateActiveIndicator(activeStop, key) {
	//scroll to relevant span and add active indicator
	let activetag = document.querySelector('.active-tag');
	if (activetag) {
		activetag.classList.remove('active-tag');
	}
	let span = document.querySelector(`#${key}-indicator [data-span = "${activeStop}"]`);
	span.classList.add('active-tag');
}

export function setupLegend(key, plotdata) {
	let plot = document.getElementById(key);

	//ADD PLOT LABELS below plot
	//SETUP MOUSEOVERS for highlighting each series & active BIN
	if (typeof plotdata.labels !== 'undefined') {

		let labelsContainer = plot.querySelector('.plot-labels');

		let series_html = '';

		//bar graphs have different legend behavior, 
		//based on positive/negative rather than series
		if (plotdata.format == 'Bars') {
			let barposlabel = document.createElement('div');
			let barneglabel = document.createElement('div');
			barposlabel.dataset.bar = 'positive';
			barneglabel.dataset.bar = 'negative';

			let barlabels = [barposlabel, barneglabel];

			barlabels.forEach(label => {
				label.classList.add('key-item');
				label.innerHTML = `
					<div class="key-color"></div>
					<div class="key-label"></div>
				`;
				labelsContainer.appendChild(label);

				label.addEventListener('mouseover', function () {
					removeHighlights();
					let posneg = label.dataset.bar;
					// console.log(posneg);
					label.classList.add('highlight');
					let highlightbars = document.querySelectorAll(`.bargroup[data-bar="${posneg}"`);
					highlightbars.forEach(b => b.classList.add('highlight'));
				});

			});
			barposlabel.querySelector('.key-label').innerText = 'Positive indicator';
			barneglabel.querySelector('.key-label').innerText = 'Negative indicator';

		} else {
			//general plot label behavior
			//add xaxis label
			let xaxisdiv = plot.querySelector('.xaxis-label');
			xaxisdiv.innerText = plotdata.axes[0];

			plotdata.labels.forEach((label, i) => {
				// console.log(label[0]);
				// only add new label string if it hasn’t been added yet
				// for series including mutliple data shapes
				let labeldiv = document.createElement('div');

				labeldiv.classList.add('key-item');
				labeldiv.dataset.color = plotdata.colors[i];
				labeldiv.dataset.seriesNumber = i;
				labeldiv.innerHTML = `<div class="key-color"></div><div class="key-label">${label[0]}</div>`;

				//corresponding area hover triggers series highlight and tooltip					
				let seriesContainer = plot.querySelector(`g[data-series="${i}"]`);
				if (seriesContainer) {
					let areas = seriesContainer.querySelectorAll('.area');
					let hotspotline = plot.querySelector(`[data-series="${i}"] .hotspot`);
					// console.log('areas', areas);
					if (hotspotline) {
						hotspotline.addEventListener('mouseover', function () {
							// console.log('mouseover hotspot series', i);
							if (labelsContainer.querySelectorAll('.visiblekey').length > 1 && !seriesContainer.classList.contains('highlight')) {
								removeHighlights();
								highlightSeries(key, i);
							}
						});
						d3.select(hotspotline).on('mousemove', function (event, d) {
							// console.log('mousemove hotspot series', i);
							let currentStop = parseInt(plot.querySelector('.plot').dataset.activeStop);
							if (plotdata.bins) {
								let currentStop = parseInt(plot.querySelector('.plot').dataset.activeStop);
								let xscale = plotdata.scales.x[currentStop]; //use xscale at current stop
								let xcoord = xscale.invert(d3.pointer(event)[0]);
								// get relevant BIN	
								let bindata = webPlots[key].bins; //get latest bin data;					
								bindata.forEach((bin, j) => {
									if (xcoord >= bin.x && xcoord < bin.x + bin.width) {
										activeBin = j;
										return;
									}
								});
								let alreadyActiveBin = document.querySelector('.activebin');
								if (alreadyActiveBin) {
									alreadyActiveBin.classList.remove('activebin');
								}
								plot.querySelector(`[data-index="${activeBin}"]`).classList.add('activebin');
								showBinDataLabel(key, i, activeBin, event, currentStop);

								// d3.select(seriesContainer).selectAll('.area').on('mousemove', function (event, d) {
								// 	// console.log('area mousemove');

								// });
							} else {
								showXYDataLabel(key, i, event, currentStop);
							}

						});
					}
				}

				//Hovering over Legend highlights series
				labelsContainer.appendChild(labeldiv);
				labeldiv.addEventListener('mouseover', function () {
					removeHighlights();
					if (labelsContainer.querySelectorAll('.visiblekey').length > 1) { //if there are more than one series
						highlightSeries(key, i);
					}
				});
			}); //end for each label
		}


		//clear up labels
		let figure = document.querySelector(`#${key}-fig`);
		figure.addEventListener('mouseover', function (e) {
			target = e.target;
			let label = (target.classList.contains('key-label') || target.classList.contains('key-item'));
			if (target.classList.contains('hotspot') || target.classList.contains('area') || target.classList.contains('plot-tip') || label) {
				// console.log('dont clear');				
			} else {
				removeHighlights();
				hideDataLabel('tip-visible');	 //only hide data point indicator to keep bin indicator
				if (!document.querySelectorAll('.highlight').length > 0) {
					//if there are no more highlighted series, turn off highlight mode
					let plotContainer = document.querySelector(`#${key}-plot`);
					plotContainer.dataset.highlight = "false";
				}
			}
		});
		figure.addEventListener('mouseout', function () {
			hideDataLabel('visible');
			//hide entire tooltip, including bin indicator
			clearBin();
		});

	}//if plot labels are defined


	//HELPERS for show/hide indicators
	function removeHighlights() {
		// console.log('remove highlights');
		//remove highlight class from plot and legend
		let current_highlight = document.querySelectorAll(`.highlight`);
		if (current_highlight) {
			current_highlight.forEach(h => {
				h.classList.remove('highlight');
			});
		}
	}
	function highlightSeries(key, i) {
		let thisPlot = document.querySelector(`#${key}`);

		let activeSeries = thisPlot.querySelectorAll(`g[data-series="${i}"]`);
		activeSeries.forEach(s => s.classList.add('highlight'));

		// add key label highlight
		if (thisPlot.querySelector(`.plot-labels [data-series-number="${i}"]`)) {
			thisPlot.querySelector(`.plot-labels [data-series-number="${i}"]`).classList.add('highlight');
		}


		//indicate that there is a highlighted series and fade others
		let plotContainer = thisPlot.querySelector('.plot');
		if (plotContainer.dataset.highlight != "true") {
			plotContainer.dataset.highlight = "true";
		}

	}

	//SETUP HEADERS 
	let headercontainer = plot.querySelector('.label-headers');
	if (plotdata.headers) {
		if (plotdata.headers.length > 0) {
			headercontainer.parentNode.classList.add('multi-header');
			plotdata.headers.forEach((header, i) => {
				if (header.includes("|")) {
					let titles = header.split("|");
					headercontainer.innerHTML += `<div class="label-header" data-sequence-number="${i}">${titles[0]} <span class="multilabel-axis">${titles[1]}</span></div>`
				} else {
					headercontainer.innerHTML += `<div class="label-header" data-sequence-number="${i}">${header}</div>`
				}

			});
		}
	}

}


//LABEL UTILS
function showXYDataLabel(key, seriesIndex, event, thisStop = 0) {
	let figure = document.getElementById(`${key}-fig`);
	let tipContainer = figure.querySelector('.plot-tip');
	let container = figure.querySelector('.plot-tips');
	let plotdata = webPlots[key];
	let xScale = plotdata.scales.x[thisStop];
	let yScale = plotdata.scales.y[thisStop];

	var pos = d3.pointer(event);
	let xval = xScale.invert(pos[0]);
	let yval = yScale.invert(pos[1]);

	// console.log('XY mouseover',event);
	if (plotdata.axes[0] == "Year") {
		xval = Math.round(xval);
	} else if (plotdata.axes[0] == "Square meters per person") {
		xval = `${d3.format(',')(Math.round(xval))} m²/person`;
	} else if (key == 'cumpoparea') {
		xval = `${d3.format(',')(Math.round(xval))} miles²/person`;
	} else {
		xval = xval.toFixed(1);
	}

	yval = yval.toFixed(1);
	if (plotdata.axes[1].includes('population')) {
		yval = d3.format(',')(Math.round(yval));
		if (key == 'cumpoparea') {
			yval = yval + 'M';
		}
	} else if (plotdata.axes[1].includes('%')) {
		yval = yval + '%';
	}

	let seriesEl = figure.querySelector(`[data-series-number="${seriesIndex}"]`);
	let seriesLabel = seriesEl.querySelector('.key-label').innerText;
	let seriesColor = seriesEl.dataset.color;
	//populate tip text
	//[0,0], [0,1], [1,0], [1,1] for show neither, show only y, show only x 
	let text = [];
	let showCoordInfo = plotdata.hover;
	if (showCoordInfo[0] == 1) {
		text.push(xval);
	}
	if (showCoordInfo[1] == 1) {
		text.push(yval);
	}
	text = text.join('<span class="xydivider">,</span> ');

	if (figure.querySelectorAll('.visiblekey').length > 1) {
		text = `<span class="tip-serieslabel">${seriesLabel}:</span> ${text}`;
	}
	container.dataset.color = seriesColor;
	container.innerHTML = text;
	//position tip and make visible
	container.style.cssText = `top: ${event.clientY}px; left: ${event.clientX}px;`;
	if (!container.classList.contains('visible')) {
		container.classList.add('visible');
	}
}

function showBinDataLabel(key, seriesIndex, activeBinIndex, event, thisStop = 0) {
	let figure = document.getElementById(`${key}-fig`);
	let tipContainer = figure.querySelector('.plot-tip');
	let binContainer = figure.querySelector('.bin-tip');
	let seriesContainer = figure.querySelector('.series-tip');
	let container = figure.querySelector('.plot-tips');



	let plotdata = webPlots[key];

	let bininfo = plotdata.bins[activeBinIndex];
	// console.log(bininfo, activeBinIndex, plotdata.bins)
	if (seriesIndex == 'bin') {
		populateBinInfo(key, bininfo, activeBinIndex, plotdata.bins.length - 1);
		seriesContainer.innerText = "";
		container.setAttribute('data-color', "");
	} else {
		let seriesEl = figure.querySelector(`[data-series-number="${seriesIndex}"]`);
		let seriesLabel = seriesEl.querySelector('.key-label').innerText;
		let seriesColor = seriesEl.dataset.color;

		let xyinfo;
		if (Array.isArray(plotdata.series[seriesIndex].data)) {
			xyinfo = plotdata.series[seriesIndex].data[thisStop].lines[activeBinIndex];
		} else {
			xyinfo = plotdata.series[seriesIndex].data.lines[activeBinIndex];
		}
		populateBinInfo(key, bininfo, activeBinIndex, plotdata.bins.length - 1, xyinfo);

		container.setAttribute('data-color', seriesColor);
		if (figure.querySelectorAll('.visiblekey').length > 1) {
			seriesContainer.innerText = seriesLabel;
		} else {
			seriesContainer.innerText = "";
		}

		if (!tipContainer.classList.contains('tip-visible')) {
			tipContainer.classList.add('tip-visible');
		}
	}

	if (!binContainer.classList.contains('bin-visible')) {
		binContainer.classList.add('bin-visible');
	}

	//position tip and make visible
	container.style.cssText = `top: ${event.clientY}px; left: ${event.clientX}px;`;
	if (!container.classList.contains('visible')) {
		container.classList.add('visible');
	}
}

function populateBinInfo(key, bininfo, activeBinIndex, bintotal, xyinfo) {
	let tipContainer = document.querySelector(`#${key}-fig .plot-tip`);
	let binContainer = document.querySelector(`#${key}-fig .bin-tip`);
	let plotContainer = document.getElementById(key);

	let binmin = bininfo.x;
	let binmax = bininfo.x + bininfo.width;

	// console.log('index', activeBinIndex, bininfo, bintotal);
	// first and last bins are set to midpoints of bounds
	// calculate real min / max values for data labels
	if (activeBinIndex == 0) {
		binmin = bininfo.x - bininfo.width;
	} else if (activeBinIndex == bintotal) {
		binmax = bininfo.x + bininfo.width * 2;
	}

	if (plotContainer.dataset.format.includes('Density')) {
		binContainer.innerText = `${formatDensity(binmin)}—${formatDensity(binmax)} m²/person`;
	} else {
		binContainer.innerText = `Ages ${binmin}—${binmax}`;
	}

	if (xyinfo) {
		tipContainer.innerText = `${xyinfo.y.toFixed(2)}`;
	}

}

function hideDataLabel(selector) {
	// console.log('hide data label');
	let openTips = document.querySelectorAll('.' + selector);
	if (openTips) {
		openTips.forEach(el => el.classList.remove(selector));
	}
}

function formatDensity(data) {
	return d3.format(",")(Math.round(Math.pow(10, data)));
}



//DATA-Processing UTILS
export function setupBranching(sequencedata, d3data) {
	//given single sequence of raw plot data
	//duplicate data and add to previous sequence
	//to support "from" values
	// console.log('SETUPBRANCH', sequencedata, d3data);
	let fromFlag = false;
	let newSeriesData = [];
	//setup "from" series array data structure
	//with duplicate data from each series
	for (let i = 0; i < d3data.series.length; i++) {
		for (let j = 0; j < sequencedata.length; j++) {
			if (!newSeriesData[i]) {
				newSeriesData[i] = [];
			}
			newSeriesData[i].push(JSON.parse(JSON.stringify(d3data.series[i].data)));
		}
	}
	// console.log('default new data', newSeriesData );

	sequencedata.forEach((sequence, j) => {
		if (sequence.from) {
			fromFlag = true;
			let seq_indices = d3data.stops[j];

			sequence.from.forEach((fromSeriesIndex, d) => {
				let toSeriesIndex = seq_indices[d];
				if (fromSeriesIndex !== toSeriesIndex) {
					//overwrite "from" data for previous stop, j-1	
					newSeriesData[toSeriesIndex][j - 1] = JSON.parse(JSON.stringify(d3data.series[fromSeriesIndex].data));
				}
			});
		}
	});

	if (fromFlag) { //one of the stops uses a from sequence
		// console.log('FROM', newSeriesData);
		newSeriesData.forEach((arraydata, s) => {
			d3data.series[s].data = arraydata;
		});

	}
	return d3data;
}


export function weighted_ranks(arr, ws, zs) {
	let pairs = [];
	//create pairs of value and weights
	arr.forEach((noisyvalue, i) => {
		pairs.push([noisyvalue, ws[i]])
	});
	// console.log('pairs', pairs)	;	    
	//sort pairs list by value
	pairs = pairs.sort((a, b) => { return a[0] - b[0] });
	// console.log('sortedpairs', pairs);	  
	reverse_pairs = Array.from(pairs);
	reverse_pairs.reverse();

	function rank(pairs, z) {
		let s0 = 0;
		let s = 0;
		let e0 = '';
		let ret = '';
		let flag = false;
		for (let p = 0; p < pairs.length; p++) {
			//e,w == p[0], p[1]
			let e = pairs[p][0];
			let w = pairs[p][1];
			if (e0 == '') {
				e0 = e
			}
			s += w;
			if (s == z) {
				ret = e;
				flag = true;
				break
			} else if (s > z) {
				f = (z - s0) / (s - s0);
				ret = f * e + (1. - f) * e0;
				flag = true;
				break
			}
			e0 = e;
			s0 = s;
		}
		if (!flag) {
			ret = pairs[pairs.length - 1][0];
		}
		return ret;
	}

	let ranks = [[], []];
	zs.forEach(z => {
		ranks[0].push(rank(pairs, z));
		ranks[1].push(rank(reverse_pairs, z));
	});
	// console.log('ranks', ranks);		
	return ranks;
}

export function weighted_median(arr, W) {
	let ret;
	let pairs = []

	arr.forEach((value, i) => {
		pairs.push([value, W[i]]);
	});

	//sort pairs list by value
	pairs = pairs.sort((a, b) => { return a[0] - b[0] });

	let sums = 0;
	let lo = 0;
	let hi = 0;

	for (let p = 0; p < pairs.length; p++) {
		element = pairs[p][0];
		weight = pairs[p][1];
		sums += weight;
		if (sums >= 0.5) {
			lo = element //lower weighted median
			break;
		}
	}

	sums = 0;
	for (let p = pairs.length - 1; p >= 0; p--) {
		element = pairs[p][0];
		weight = pairs[p][1];
		sums += weight;
		if (sums >= 0.5) {
			hi = element; //higher weighted median
			break;
		}
	}

	ret = 0.5 * (lo + hi);
	return ret
}


function initializePlot(key, data, processData) {
	//main charting function	
	let plotdata = processData(data, getMetaData(key)); //d3-formatted data;	
	// console.log(key, plotdata.stops.length, plotdata.labels.length);
	webPlots[key] = plotdata; //save for print reference
	// console.log('rawdata', data, 'd3data', key, plotdata);

	setupDimensions(plotdata);
	setupPlot(key, plotdata);
	setupLegend(key, plotdata);

	let plot = document.querySelector(`#${key}-plot`);
	if (data.type == 'AgeCat' || data.type == 'AgeAvg' || data.type == 'DensityCat' || data.type == 'DensityAvg') {
		//setup bin updates with raw data processing function for this plot
		updateBins(key, data, processData);

		//activate/deactive bin updating mode
		plot.querySelector('.plot-binupdate').addEventListener('click', function () {
			plot.toggleAttribute('data-binupdate');

			let bintoggle = plot.hasAttribute('data-binupdate');
			let binactivate_event = {
				name: "plot_binactivate",
				category: "plot_interaction",
				label: key,
				value: bintoggle
			}
			utils.sendAnalyticsEvent(binactivate_event);
		});
	}

	let dl_button = plot.querySelector('.plot-data-dl');
	if (dl_button) {
		dl_button.addEventListener('click', function () {
			let datadownload_event = {
				name: "plot_datadownload",
				category: "plot_interaction",
				label: key,
				value: "download"
			}
			utils.sendAnalyticsEvent(datadownload_event);
		});
	}

}

export function setupKeyCommands() {
	//keyboards commands for navigating between sequences
	document.onkeydown = checkKey;

	function checkKey(e) {
		e = e || window.event;
		let keycode = e.keyCode;

		let currentPlot = document.querySelector('.active-fig .plot');
		// console.log('keydown', keycode, currentPlot);
		if (currentPlot) {
			let currentKey = currentPlot.id.replace("-plot", "");
			let parent = document.getElementById(`${currentKey}-indicator`);
			let nextId;
			let seq = 0;

			if (keycode == '38' || keycode == '40' && currentPlot) {
				seq = parseInt(currentPlot.dataset.activeStop);
				let flag = true;

				if (keycode == '38') {
					// up arrow
					if (seq > 0) {
						seq--;
						//go to previous sequence of same plot
						nextId = currentKey;
					} else if (parent.classList.contains('fullbleed-indicator')) {
						flag = "up";
					} else {
						let prev = parent.previousSibling;
						if (prev.classList.contains('plotindicator')) {
							let prevadjacent = (Math.abs(prev.getBoundingClientRect().bottom - parent.getBoundingClientRect().top) < 10);
							if (prev.hasChildNodes() && prevadjacent) {
								nextId = prev.id.replace('-indicator', '');
								let prevPlot = document.getElementById(`${nextId}-plot`);
								seq = parseInt(prevPlot.dataset.stops) - 1;
							} else {
								//no adjacent
								flag = false;
							}
						}
					}
					if (!nextId) {
						flag = "up";
					}
				} else if (e.keyCode == '40') {
					//down arrow
					let maxStops = parseInt(currentPlot.dataset.stops) - 1;
					if (seq < maxStops) {
						seq++;
						nextId = currentKey;
					} else if (parent.classList.contains('fullbleed-indicator')) {
						flag = "down";
					} else {
						//go to next plot if it is immediately after			
						let next = parent.nextSibling;
						if (next && next.classList.contains('plotindicator')) {
							let nextadjacent = (Math.abs(next.getBoundingClientRect().top - parent.getBoundingClientRect().bottom) < 10);
							if (next.hasChildNodes() && nextadjacent) {
								nextId = next.id.replace('-indicator', '');
								seq = 0;
							} else {
								flag = false;
							}
						}
					}
					if (!nextId) {
						flag = "down";
					}
				}

				if (flag) {
					e.preventDefault();
					let gavalue = flag;
					if (flag == "up") {
						window.scrollBy({ top: -window.innerHeight / 3, behavior: "smooth" });
					} else if (flag == "down") {
						window.scrollBy({ top: window.innerHeight / 3, behavior: "smooth" });
					} else {
						scrollToActiveIndicator(seq, nextId)
						gavalue = seq;
					}

					let plotevent = {
						name: "plot_arrowkey",
						category: "plot_interaction",
						label: nextId,
						value: gavalue
					}
					utils.sendAnalyticsEvent(plotevent);
				}
			}//if up or down key pressed 
		}
	}
}



