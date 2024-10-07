/*------------------------------
//PRINT PLOTS
--------------------------------*/

//PRINT UTILS
export function processPrintData(printData, webData) {
	let newData = JSON.parse(JSON.stringify(webData)); //deep copy
	// override sequence / scope from print file
	if (printData.i) {
		newData.stops = [printData.i];
	}
	if (printData.type == 'AgeAvg' || printData.type == 'DensityAvg') {
		//find relevant error stop for this print plot
		let p_indices = [];
		let p_errorIndices = {};
		printData.i.forEach(stopIndex => {
			p_indices.push(parseInt(Object.keys(stopIndex)[0]));
			p_errorIndices[Object.keys(stopIndex)[0]] = Object.values(stopIndex)[0];
		});

		newData.stops = [p_indices];
		newData.errorStops = [p_errorIndices];
	}
	if (printData.y) {
		newData.ydomains = [printData.y];
	}
	if (printData.x) {
		newData.xdomains = [printData.x];
	}
	if (newData.log && newData.log.length > 0) {
		if (printData.log) {
			newData.log = [printData.log];
		} else {
			newData.log = [newData.log[0]];
		}
	}

	if (printData.type == 'Bars') {
		newData.data.values = [newData.data.values[printData.i]]
		newData.ydomains = [newData.ydomains[printData.i]]
	}
	return newData;
}

export function downloadSVG(key) {
	//outputs SVG Data as spring
	//to create a file that is zipped
	let inlineStyles = `.line{fill: none; stroke-width: 1px; }
	.line.thick{stroke-width: 6px; }
	.line.dotted{stroke-dasharray: 5; } 
	.area, .dot{stroke: none; opacity: 0.4; }
	.bin{stroke: none; fill: none; }
	.bin.alt{fill: rgb(202 198 197); opacity: 0.4; }
	.tick line{fill: none; stroke-width: 0.5px; stroke: rgb(202 198 197);} 
	`;

	for (const colorName in colors) {
		let rgb = colors[colorName];
		inlineStyles += `
		.${colorName} .area, .${colorName} .dot{
			fill: rgb( ${rgb} );
		}
		.${colorName} .series-label,.${colorName} .label{
			fill: rgb( ${rgb} );	
		}
		.${colorName} .line{
			stroke: rgb( ${rgb} );
		}
		`
	};

	if (key == 'genderpca3xy') {
		inlineStyles += `
		.series2 .dot{
			opacity: 0.6;
		}
		.series3 .dot{
			opacity: 0.6;
		}`;
	}

	const svg = document.querySelector(`#${key} svg`);
	console.log('download SVGs', key, svg);
	if (svg) {
		//generate inline SVG styles with hard-coded rgb values
		let style = document.createElementNS("http://www.w3.org/2000/svg", 'style');
		svg.prepend(style);
		style.innerHTML = inlineStyles;

		//print: remove unnecessary labels for SVG downloads
		let d3svg = d3.select(`#${key} svg`);
		d3svg.attr("xmlns", "http://www.w3.org/2000/svg")
			.selectAll('[opacity="0"]').remove();
		d3svg.selectAll('.datatip').remove();
		d3svg.selectAll('.label').remove();
		d3svg.selectAll('.binline').remove();
		// d3svg.selectAll('.domain').remove();
		// d3svg.selectAll('.tick text').remove();
		const base64doc = btoa(unescape(encodeURIComponent(svg.outerHTML)));
		return base64doc;
	}

}

function loadPrintPlots( ){
	// PROCESS PRINT PLOTS AFTER WEB PLOTS
	for( const keyPrint in printData ){
		let printPlotData = printData[keyPrint];
		let plotF = PLOT_TYPES[ printPlotData.type ];
		if ( plotF ){
			try {
				printChart(keyPrint, printPlotData);
			}catch( error ){
				console.error(keyPrint, error);
			}
		}
	}

	// SETUP SVG DOWNLOAD
	const svgDLAll = document.querySelector('#exportAll');
	if ( svgDLAll ){
		const printPlots = document.querySelectorAll('div[id$="-print"]');
		svgDLAll.addEventListener('click', function(){
			console.log('DL');
			var zip = new JSZip();

			printPlots.forEach( el=>{
				let name = el.id;
				zip.file(name+'.svg', downloadSVG(name), {base64: true});
			});

			// Generate the zip file asynchronously
			zip.generateAsync({type:"blob"})
				.then(function(content) {
					// Force down of the Zip file
					FileSaver.saveAs(content, "WAWNsvgs.zip");
				});
		});
	}

	const svgDLEach = document.querySelectorAll('.dl-each');
	if( svgDLEach ){
		svgDLEach.forEach( button =>{
			button.addEventListener('click', function(){
				var zip = new JSZip();
				let plotkey = button.id.replace("export", "");
				zip.file(plotkey+'.svg', downloadSVG(plotkey), {base64: true});
				zip.generateAsync({type:"blob"})
					.then(function(content) {
						// Force down of the Zip file
						FileSaver.saveAs(content, plotkey+".zip");
					});
			});	
		});
	}
}

function printChart(key, data){
//setup print data and plot print plot
	let id =  data.name.toLowerCase();			
	id = isNaN(id.slice(-1)) ? id : id.slice(0, -1); //remove number if it is numbered

	let webPlotData = webPlots[id]; //get corrensponding data from web data
	if (typeof webPlotData == 'undefined'){ //if this is a numbered plot, don't strip the numbers
		webPlotData = webPlots[data.name.toLowerCase()]
	}

	let printPlotData = processPrintData(data, webPlotData);
	console.log('KEY', key)
	if( key == 'married1-print'){
		//exception: use different print data for this plot
		console.log(key, 'print', data);
		loadmarried();

		async function loadmarried(){
			const json = await fetch('/assets/data/married1.json');
			if(!json.ok){
				console.log(key, json.status, json.statusText);
			}else{
				const marriedjson = await json.json();
				const marrriedwebdata = agecat.processData(marriedjson, getMetaData('married'));
				const specialprintdata = processPrintData(data, marrriedwebdata);
				setupDimensions(specialprintdata, DIMENSIONS_PRINT);
				setupPlot(key, specialprintdata);
			}
		}
	}else{
		setupDimensions(printPlotData, DIMENSIONS_PRINT);
		setupPlot(key, printPlotData);
	}
	// console.log('printplotdata', key, printPlotData);

	let dots = document.querySelector('#'+key).querySelectorAll('.dot');
	//add radius as inline attribute since CSS won't apply
	if( key == 'genderpca3xy-print'){
		let r = 1;
		dots.forEach( d=>{
			if( d.parentNode.classList.contains('series2') || d.parentNode.classList.contains('series3') ){
				//larger circle;
				r = 3;
			}else{
				r = 1;
			}
			d.setAttribute("r", r);
		}); 
	}else if(dots){
		dots.forEach( d=>{
			d.setAttribute("r", 3);
		});
	}
}

