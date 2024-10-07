import * as utils from "./global-utils";
import * as plotutils from "./plot-utils";
// import * as pca from "./pca/pca";


export function initializeFigures() {
	const plots = document.querySelectorAll('.plot');
	plotutils.loadPlotData(plots, setupFigures);
}

//register scroll listeners
let XFs = {};
let quigleyListener = false;
function setupFigures() {
	//setup showing/hiding of all figures
	//first setup heights of full-width items
	const figureAreas = document.querySelectorAll(".figarea");
	figureAreas.forEach(f => {
		let key = f.id;
		let fig = document.getElementById(key + '-fig');
		if (fig) {
			plotutils.addIndicatorContainer(f, key);

			let figIndicator = document.getElementById(`${key}-indicator`);

			let xfade = false;
			if (fig.classList.contains('crossfade')) {
				xfade = true;
				let figSpan = document.getElementById(key + '-indicator');
				let images = fig.querySelectorAll('figure');
				let xfadeText = fig.nextElementSibling;
				let xfadeparagraphs = Array.from(xfadeText.children);
				//SETUP CROSSFADE INDICATORS
				for (let i = 0; i < images.length; i++) {
					let xfadeindicator = document.createElement('div');
					xfadeindicator.classList.add(`${key}-xfadeindicator`, 'xfadeindicator', 'spanindicator');
					xfadeindicator.dataset.span = i;
					figSpan.appendChild(xfadeindicator);

					if (utils.isMobile() && !document.getElementById(key).classList.contains('map-full-wrapper')) {
						let extradiv = document.createElement('div');
						extradiv.classList.add('xfade-mobileindicator', 'scroll-overlay');
						extradiv.setAttribute('aria-hidden', true);
						extradiv.dataset.span = i;

						//APPEND MOBILE DIVS
						if (xfadeparagraphs[i]) {
							// let thisp = xfadeparagraphs[i].cloneNode(true);
							extradiv.appendChild(xfadeparagraphs[i]);
							xfadeText.appendChild(extradiv);
							console.log(xfadeText);
						} else {
							xfadeText.appendChild(extradiv);
						}
					}
				};
				if (!XFs[key]) {
					// console.log('register xf', key);
					XFs[key] = function () { xFadeImages(key) };
				}
				// console.log('xfades comparison', images.length, xfadeparagraphs.length);
			}

			if (key == 'quigley') { //not crossfade but needs scroll
				let player = document.getElementById('quigley-scale');
				player.load("/assets/media/quigley/WAWN-Quigley-Scale-Lottie.json");
				quigleyListener = function () { quigleyScroll(player); }
				player.addEventListener("ready", () => {
					player.seek(13);
				});

				if (utils.isMobile()) {
					let qText = fig.nextElementSibling;
					let qparagraphs = Array.from(qText.children);
					qparagraphs.forEach(para => {
						let extradiv = document.createElement('div');
						extradiv.classList.add('scroll-overlay');
						extradiv.setAttribute('aria-hidden', true);
						extradiv.appendChild(para);
						qText.appendChild(extradiv);
					});
				}
			}

			const darkmodeoptions = {
				rootMargin: "0px 0px 0px 0px",
				threshold: THRESHOLDS()
			};
			//FULLBLEEED Darkmode
			if (key == 'overviewfx') {
				let trigger = document.getElementById('overviewfx-indicator');
				createDarkModeObserver(trigger, darkmodeoptions);
			};
			if (key == 'densitymap') {
				let trigger = document.querySelector('#densitymap-indicator [data-span="1"]');
				createDarkModeObserver(trigger, darkmodeoptions);
			};
			//Inline Darkmode
			if (key == 'foetus26weeks') {
				let trigger = document.getElementById('foetus26weeks-indicator');
				if (utils.isMobile()) {
					trigger = document.getElementById('foetus26weeks-fig');
				}
				createDarkModeObserver(trigger, darkmodeoptions);
			};
			if (key == 'lightsout') {
				let trigger = document.getElementById('lightsout-indicator');
				if (utils.isMobile()) {
					trigger = document.getElementById('lightsout-fig');
				}
				createDarkModeObserver(trigger, darkmodeoptions);
			};

			if (key == 'pca3d') {
				// console.log('makePCA');
				pca.setupPCAPlot();
			}

			if (fig.classList.contains('chart')) {
				//setup sequence behavior for web plots
				plotutils.setupPlotSequence(key);
			}

			if (!fig.classList.contains('media-full')) {
				plotutils.positionIndicator(f, key);
			}
			if (utils.isMobile()) {
				createFigureObserver(fig, key, xfade);
			} else {
				createFigureObserver(figIndicator, key, xfade);
			}


		}
	}); //end foreach figureArea
	plotutils.setupKeyCommands();

	//INTERLUDE
	if (document.body.classList.contains('interlude')) {
		let interfigs = document.querySelectorAll('.figure');
		interfigs.forEach(fig => {
			key = fig.id;
			createFigureObserver(fig, key, false);
		});
	}
}


/*------------------------------
// UPDATE INDICATOR POSITIONS
--------------------------------*/

export function repositionIndicators() {
	// //remove active states
	// let getActive = document.querySelector('.active-fig');
	// if( getActive ){
	// 	getActive.classList.remove('active-fig');
	// }
	let figureAreas = document.querySelectorAll('.figarea');
	figureAreas.forEach(f => {
		let key = f.id.replace('-text', '');
		plotutils.positionIndicator(f, key);
		if (f.classList.contains('plot-wrapper')) {
			plotutils.positionSequenceTriggers(key);
		}
	});
}



let fixedIndicator = document.querySelector('.fixed-indicator');
let timeoutId = null;


function createFigureObserver(elem, key, xfade) {
	//observes the intersection of figure indicator in gutter
	let fig = document.getElementById(key + '-fig');
	let video = document.getElementById(key + '-video');

	let options = { rootMargin: '-50% 0% -50% 0%', threshold: 0 };

	if (utils.isMobile()) {
		if (xfade || fig.classList.contains('media-full') || fig.classList.contains('chart') || key == "quigley" || fig.classList.contains('map')) {
			options = { rootMargin: '0%', threshold: 0 };
		} else {
			options = { rootMargin: '0%', threshold: 0.25 };
		}
	}

	// if( video ){
	// 	options = { rootMargin: '0%', threshold: 0.5};
	// }

	let figstatus = "";
	// console.log(key, 'key', fig);
	let observer = new IntersectionObserver(function (entries) {
		let [entry] = entries;

		if (entry.isIntersecting) {
			// console.log(key, 'Figure-Intersection:', entry.intersectionRatio);
			//remove active fig from previous
			let prevActiv = document.querySelector('.active-fig');
			let prevIndicator = document.querySelector('.active-figindicator');
			if (prevActiv) {
				prevActiv.classList.remove('active-fig');
				clearTimeout(timeoutId);
				if (prevIndicator) {
					prevIndicator.classList.remove('active-figindicator');
					clearTimeout(timeoutId);
				}
			}
			//add active flag to figure and corresponding indicator
			fig.classList.add('active-fig');
			elem.classList.add('active-figindicator');
			utils.startTimeout(fig, timeoutId);
			//setup image animations
			if (xfade) {
				window.addEventListener('scroll', XFs[key]);
			}


			if (key == 'quigley') {
				//quigley plot has a lottie-based animation tied to scroll
				//not based on span indicator visibility
				window.addEventListener('scroll', quigleyListener);
			}
			if (video) {
				//VIDEO AUTOPLAY
				video.play()
			}
			utils.updateHash(key, 'add');

		} else if (!entry.isIntersecting) {
			// console.log('unintersect', key);
			fig.classList.remove('active-fig');
			let activeIndicator = document.getElementById(`${key}-indicator`);
			if (activeIndicator) {
				activeIndicator.classList.remove('active-figindicator');
			}

			clearTimeout(timeoutId);
			// console.log('unintersect', key);

			if (xfade) {
				window.removeEventListener('scroll', XFs[key]);
			}
			// if ( quigleyListener ){
			// 	window.removeEventListener('scroll', quigleyListener);
			// }

			if (document.querySelector('.active-fig')) {
				//there is a new active fig
				utils.updateHash(key, 'update');
			} else {
				utils.updateHash(key, 'remove');
			}
			if (video) {
				//VIDEO AUTOPLAY
				video.pause()
			}

			// if( figstatus == "" ){
			// 	document.body.classList.remove(figstatus);
			// } 			
		}
		// if( figstatus !== ""){
		// 	document.body.classList.add(figstatus);
		// }else{
		// 	document.body.classList.remove(figstatus);
		// }


		if (document.querySelector('.active-fig') && fig.classList.contains('media-full')) {
			figstatus = "figactive-full"
		} else if (document.querySelector('.active-fig') && document.getElementById(key).classList.contains('fullbleed')) {
			figstatus = "figactive-full"
		} else if (document.querySelector('.active-fig')) {
			figstatus = "figactive"
		} else {
			figstatus = "none";
			// fixedIndicator.classList.remove('show-line-left');
			// fixedIndicator.classList.remove('show-line');
		}
		document.body.dataset.figstatus = figstatus;

	}, options);

	observer.observe(elem);
	return observer;
}

const MIDPOINT = window.innerHeight / 2;
// console.log('MIDPOINT:', MIDPOINT);

const THRESHOLDS = () => {
	let data = [];
	for (let i = 0; i <= 1; i += 0.01) {
		data.push(i);
	}
	return data;
}


function sigmoid(x) {
	return 1 / (1 + Math.exp(-x));
}

function xFadeImages(key) {
	let parentfig = document.querySelector(`#${key}-fig`);
	if (parentfig) {
		let isMap = parentfig.classList.contains('map');
		let sigRatio = 12; // Default ratio
		if (isMap) {
			sigRatio = 36;
		}
		// console.log('xfaderunning', key);
		// let span_container = document.getElementById(key + '-indicator');
		let xfade_indicators = document.querySelectorAll(`#${key}-indicator .xfadeindicator`);
		if (utils.isMobile() && !document.getElementById(key).classList.contains('map-full-wrapper')) {
			//setup xfade triggers;
			xfade_indicators = document.querySelectorAll(`#${key} .xfade-mobileindicator`);
			// console.log('xfadewithmobile', xfade_indicators);
			// xfade_indicators = document.querySelectorAll(`#${key}-mobile-indicator .xfadeindicator`);

		}
		if (xfade_indicators.length > 0) {

			xfade_indicators.forEach(target => {
				let xfadeindex = parseInt(target.dataset.span);
				let xfadefig = parentfig.querySelector(`[data-xfadeindex="${xfadeindex}"]`);
				// console.log('setup xfade spans',key,target, xfadeindex);

				if (xfadeindex > 0) {
					let indTop = target.getBoundingClientRect().top;
					let indHeight = target.offsetHeight;
					let indDiff = indHeight / 2; //distance above and below the MIDPOINT to conduct fade

					let th = indTop - indDiff;
					if (th < MIDPOINT) {
						// Map the distance to a value suitable for the sigmoid function
						let distance = MIDPOINT - th;
						let scaledDistance = (distance - (indHeight / 2)) / (indHeight / sigRatio); // Adjust scaling as needed

						let opacity = sigmoid(scaledDistance);
						xfadefig.style.opacity = opacity;
					} else {
						if (parentfig.dataset.activeFade == xfadeindex) {
							parentfig.dataset.activeFade = 0;
						}
						xfadefig.style.opacity = 0;
					}
				}
			});
		}
	}
}


function createDarkModeObserver(target, options) {
	let observer = new IntersectionObserver(function (entries) {
		let [entry] = entries;
		let top = entry.boundingClientRect.top;
		let color = 255;
		// let MIDPOINT = entry.boundingClientRect.height / 2;

		if (top > MIDPOINT) {
			color = 255 - (255 * entry.intersectionRatio * 2);
		} else if (top < MIDPOINT) {
			color = 0;
		} else {
			color = 0;
		}

		if (color > 240) { // setup clean black/white
			color = 255;
		} else if (color > 150) {
			document.body.classList.remove('bodydark');
		} else if (color < 0) {
			color = 0;
		}

		// console.log('intersection ratio: ' + entry.intersectionRatio + ' / rgb code: ' + color);
		if (entry.isIntersecting) {
			document.body.style.setProperty('--darkmodecolor', color);
			if (color <= 150) {
				document.body.classList.add('bodydark');
			}
		} else {
			document.body.style.setProperty('--darkmodecolor', 255);
			if (document.body.classList.contains('bodydark')) {
				document.body.classList.remove('bodydark');
			}

		}

	}, options);

	observer.observe(target);
	return observer;
}



function quigleyScroll(player) {
	//get distance to midpoint
	let frameStart = 13;
	let frameRange = 100 - frameStart;
	let qInd = document.getElementById('quigley-indicator');

	if (utils.isMobile()) {
		qInd = document.getElementById('quigley');
	}
	let qHeight = qInd.offsetHeight;
	let qTop = qInd.getBoundingClientRect().top;
	let qDistance = MIDPOINT - (qTop + .1 * qHeight);
	let qRatio = qDistance / (qHeight * .8);

	let totalRatio = (MIDPOINT - qTop) / qInd.offsetHeight;
	let frame = qRatio * frameRange + frameStart;
	if (totalRatio > .9) {
		frame = 100;
	} else if (totalRatio < .1) {
		frame = frameStart;
	}

	let qLabels = document.querySelectorAll('.quigley-framelabel');
	let activeLabel;
	for (let q = 0; q < qLabels.length; q++) {
		qLabelElement = qLabels[q];
		let keyframe = parseInt(qLabelElement.dataset.frame);
		if (frame >= keyframe) {
			activeLabel = qLabelElement;
		}
	}

	let previousFrame = document.querySelector('.visibleframe');
	if (previousFrame) {
		previousFrame.classList.remove('visibleframe');
	}
	if (!activeLabel.classList.contains('visibleframe')) {
		activeLabel.classList.add('visibleframe');
	}

	// console.log('quigley scroll', qDistance, qRatio, frame);
	player.seek(parseInt(frame));
}
