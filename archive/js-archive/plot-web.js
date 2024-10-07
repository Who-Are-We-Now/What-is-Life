import agecat from "./plot-types/agecat";

function main( ){
//pulls json file with all plot data
	fetch('/assets/js/allplotdata.json')
		.then(response => response.json())
		.then(data => {
			console.log(data);

			// data output for plot spreadsheet
			for (const key in data) {
				if(data[key].format){
					console.log(key, data[key].format, 'stops=', data[key].stops.length);
				}else if (data[key].type){
					if(data[key].seq){
						console.log(key, data[key].type, data[key].seq.length);
					}else{
						console.log(key, data[key].type, 'no sequence defined');
					}					
				}else{
					console.log(key, 'no type defined');
				}
			}

			const plots =  document.querySelectorAll('.plot');

			plots.forEach( el =>{
				let key = el.id;   
				let plotdata = data[key]; //get plot data from attribute

				if( plotdata && plotdata.format ){
					// let plotname =  plotdata.format.toLowerCase();
					// plotname.chart(key, plotdata);
					if (plotdata.format=="AgeCat"){
						agecat.chart(key, plotdata);
					}else if (plotdata.format=="AgeAvg"){
						ageavg.chart(key, plotdata);
					}else if (plotdata.format=="Bars"){
						bars.chart(key, plotdata);
					}else if (plotdata.format=="XY"){
						xy.chart(key, plotdata);
					}else if (plotdata.format=="PCA"){
						pca.chart(key, plotdata);
					}else if (plotdata.format=="DensityCat"){
						densitycat.chart(key, plotdata);
					}

					if( !key.includes('-print') ){
						//setup scroll behavior for web plots
						setupPlotSequence( key, plotdata);	
					}
				}

			});
		 setupLabelHovers();
	});
}



// instantiate the scrollama
let scrollers = {}
const scroller = scrollama();

function setupPlotSequence(key, plotdata){
	//sets up scroll-activated sequences
	//setup scroller for each
	scrollers[key] = scrollama();

	scrollers[key]
		.setup({
		  step: `#${key}-area .step`,
		  offset: 0.5
		})
		.onStepEnter((response) => {
		  // { element, index, direction }  
		  let frame = response.index;
		  //activate corresponding data in chart
		  try {
			  if( plotdata.format == "AgeCat"){
			  	agecat.plotSequence(key, plotdata, frame);
			  }
			  if( plotdata.format == "AgeAvg"){
			  	ageavg.plotSequence(key, plotdata, frame);
			  }
			  if( plotdata.format == "XY"){
			  	xy.plotSequence(key, plotdata, frame);
			  }
			  if( plotdata.format == "PCA"){
			  	pca.plotSequence(key, plotdata, frame);
			  }
			  if( plotdata.format == "Bars"){
			  	bars.plotSequence(key, plotdata, frame);
			  }
				if (plotdata.format=="DensityCat"){
					densitycat.plotSequence(key, plotdata, frame);
				} 
			}catch (error) {
			  console.error(key, frame, error);
			}

			//activate corresponding plot labels
			try {			 
			  let current_active = document.querySelectorAll(`#${key} .active`);
			  if( current_active.length > 0 ){
			  	current_active.forEach( el =>{
			  		el.classList.remove('active');
			  	});
			  }			
			  
			  // console.log( plotdata.stops[frame] );
			  

			  if( plotdata.stops[frame].length>0 ){
			  	// console.log('activate', frame, plotdata.stops[frame]);
			  	plotdata.stops[frame].forEach( i =>{
			  		//for each series in the stop, showcase the relevant tooltip and series label
			  		//keylabels
			  		let activeSeries = document.querySelector(`#${key} .key-item.series${i}`);
			  		if(  activeSeries != null ){
			  			activeSeries.classList.add('active');	
			  		}else{
			  			console.log(key, frame, 'active stop not present');
			  		}			  		
			  		//tooltips
			  		// document.querySelector(`#${key} .tooltip.series${i}`).classList.add('active');
			  	});
			  }
			}catch (error) {
			  console.error(key, frame, error);
			}		 
		})
		.onStepExit((response) => {
		  // { element, index, direction }
		});
}

function setupLabelHovers(){
	//when user hovers over key at the bottom of each plot
	//the corresponding svg series is highlighted
	let keyLabels = document.querySelectorAll('.key-item');
	keyLabels.forEach( el =>{
		el.addEventListener("mouseover", event =>{
			let selectedSeries = el.classList[1];
			el.classList.add('highlight');
			let selectedPlot = el.closest('.plot');
			let selectedSvgSeries = selectedPlot.querySelector('g.'+selectedSeries);
			selectedSvgSeries.classList.add('highlight');
		});
		el.addEventListener("mouseout", event =>{
			document.querySelectorAll('.highlight').forEach( el=>{
				el.classList.remove('highlight');
			});
		});
	})
}
