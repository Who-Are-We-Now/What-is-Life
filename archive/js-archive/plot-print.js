const D3Node = require('d3-node');
const d3 = require('d3');
const fs = require('fs');
const path = require('path');
const data = require('./../../../docs/assets/js/allplotdata.json');
const plotcolors = require('./../../_data/plotcolors.json');

const AgeCat = require('./plot-types/agecat.js');
const Bars = require('./plot-types/bars.js'); 
const XY = require('./plot-types/xy.js'); 


let folder = path.join(__dirname, '../../../', '/docs/assets/svg/');      
if (!fs.existsSync(folder)){
	//make directory if it doesn’t exist
	fs.mkdirSync(folder);
};

function makePlot(key, sequence, plot_no, colors) {
	if(key){
		let plotdata = data[key];

		//generate inline SVG styles with hard-coded rgb values
		let inlineStyles=`.line{fill: none; stroke-width: 1px; }
		 .area, .dot{stroke: none; opacity: 0.4; }
		 .bin{stroke: none; fill: none; }
		 .bin.alt{fill: rgb(202 198 197); opacity: 0.4; }
		 .gridline line, .domain{fill: none; stroke-width: 1px; stroke: rgb(202 198 197); }
		 .bar.area{opacity:1.0;}
		 `;
		colors.forEach( (c,i) =>{
			let rgb;
			plotcolors.forEach(color =>{
				if (color.name == c){
					rgb = color.value;
					inlineStyles+=`
						.series${i}.area, .series${i}.dot{
							fill: rgb(${rgb});
						}
						.series${i}.line{
							stroke: rgb(${rgb});
						}
					`
				}
			});     
		});

		let d3n = new D3Node(
		{
			styles: inlineStyles
		});

		let plot = d3n.createSVG();

		let exported = false;
		switch(plotdata.format){
			case "AgeCat":
				AgeCat.exportChart(key, plotdata, plot);
				exported = true;
				break;
			case "Bars":
				Bars.exportChart(key, plotdata, plot);
				exported = true;
				break;
			case "XY":
				XY.exportChart(key, plotdata, plot);
				exported = true;
				break;
		}

		if(exported){
			//if SVG successfully written
			//output as fille
			let svg_output = d3n.svgString();
			// console.log(svg_output);

			//output static SVG files
			let pathname = path.join(folder, `${plot_no}-${key}.svg`);
			fs.writeFile(pathname, svg_output, { flag: 'w+' }, (err)  => {
					// throws an error, you could also catch it here
					if (err) throw err;
					// success case, the file was saved
					console.log('SVG', key, 'written!');
			});
		}else{
			console.log('SVG', key, 'plot type not yet supported');
		}
	}
}

module.exports = makePlot;