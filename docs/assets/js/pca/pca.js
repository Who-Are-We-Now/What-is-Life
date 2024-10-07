import * as THREE from 'three';
import * as TWEEN from '@tweenjs/tween.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';	
import * as utils from "../global-utils";

let pcadata = require('./pcadata.json');
let pcalabels = require('./pcalabels.json');
let labels = pcalabels.seq; //labels and sizes per stop


const duration = 600; //transition duration
//setup 
const views = [
	{x: 0, y: -2, z: 12 },
	{x: 0, y: -2, z: 12 },
	{x: 2, y: -2, z: 12 },
	{x: -2, y: -2, z: 12 }
	]

export function setupPCAPlot(){
	const pcaplot = document.getElementById('pcaplot');
	const pcaContainer = pcaplot.parentNode;
	const infoElement = document.getElementById('pcatip');

	//stores plot-relevant info
	const pcaPlotData = {
		stop: 0,
		sequence: [ [0,1,2,3], [4,5,6,7], [8,9], [10,11] ],
		alphas: {},
		colors: {},
		sizes: {}
	}


	var renderer = new THREE.WebGLRenderer({
		antialias: true
	});
	
	var w = 1400;
	var h = 640;

	renderer.setSize(w, h);
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setClearColor(0xFFFFFF, 1.0);

	var camera = new THREE.PerspectiveCamera(45, w / h, 1, 10000);
	
	camera.position.x = views[0].x;
	camera.position.y = views[0].y;
	camera.position.z = views[0].z;

	var scene = new THREE.Scene();

	var scatterPlot = new THREE.Object3D();
	scene.add(scatterPlot);

	scatterPlot.rotation.y = 0;

	function v(x, y, z) {
		return new THREE.Vector3(x, y, z);
	}


	pcaplot.appendChild(renderer.domElement);


	const geometry = new THREE.BufferGeometry();
	let positions = [];
	let colors = [];
	let sizes = [];
	let alphas = [];
	pcadata.forEach( pt => {
		var x = pt.x;
		var y = pt.y;
		var z = pt.z;

		positions.push(x, y, z);
		let seriesindex = pt["0"] - 1;

		let labeldata = labels[0][seriesindex];
		let rgb = labeldata[2];

			colors.push( rgb[0]/255, rgb[1]/255, rgb[2]/255 ); //rgb[0]/255, rgb[1]/255, rgb[2]/255
			sizes.push( labeldata[3]*2 ); //labeldata[3]/10
			alphas.push( labeldata[4] ); //labeldata[4]
		});
	
	const positionsArray = new Float32Array(positions);
	const colorsArray = new Float32Array(colors);
	const sizesArray = new Float32Array(sizes);
	const alphasArray = new Float32Array(alphas);

	pcaPlotData.alphas = alphasArray;
	pcaPlotData.colors = colorsArray;
	pcaPlotData.sizes = sizesArray;

	// Create buffer attributes for the positions and colors
	const positionAttribute = new THREE.BufferAttribute(positionsArray, 3);
	const colorAttribute = new THREE.BufferAttribute(colorsArray, 3);
	const sizeAttribute = new THREE.BufferAttribute(sizesArray, 1);
	const alphaAttribute = new THREE.BufferAttribute(alphasArray, 1);

	geometry.setAttribute('position', positionAttribute);
	geometry.setAttribute('color', colorAttribute);
	geometry.setAttribute('size', sizeAttribute);
	geometry.setAttribute('alpha', alphaAttribute);

	// Create a shader material for circular points
	const vertexShader = `
	attribute float size;
	attribute float alpha;

	varying vec3 vColor;
	varying float vAlpha;

	void main() {
		vColor = color;
		vAlpha = alpha;
		gl_PointSize = size;
		gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
	}
	`;

	const fragmentShader = `
	varying vec3 vColor;
	varying float vAlpha;
	void main() {
		float r = length(gl_PointCoord - vec2(0.5, 0.5));
		if (r > 0.5) discard;
		gl_FragColor = vec4(vColor, vAlpha);
	}
	`;

	const material = new THREE.ShaderMaterial({
		vertexShader: vertexShader,
		fragmentShader: fragmentShader,
		transparent: true,
		depthTest: false,
		vertexColors: true
	});

	let points = new THREE.Points(geometry, material);
	scatterPlot.add(points);


	let controls = new OrbitControls( camera, renderer.domElement );
	controls.enableDamping = true;
	controls.enableZoom =  false;
	controls.enablePan = true;

	// Disable animation of OrbitControls
	controls.autoRotate = false;

	 // Output camera statistics on OrbitControls change
	controls.addEventListener('change', () => {
		const cameraPosition = camera.position;
		// console.log( `Camera Position: x: ${cameraPosition.x.toFixed(2)}, y: ${cameraPosition.y.toFixed(2)}, z: ${cameraPosition.z.toFixed(2)}` );
	});

	function setupPCAIndicators(){
		let pcaStopCount = views.length;

		let pcaIndicatorContainer = document.getElementById('pca3d-indicator');
		// console.log(pcaStopCount, pcaIndicatorContainer)
		let pcafigText = document.getElementById('pca3d-fig').nextElementSibling;
		const pcaparagraphs = Array.from(pcafigText.children);

		if( pcaIndicatorContainer ){
			for( s = 0; s<pcaStopCount; s++){
				let pcaSeqIndicator = document.createElement('div');	
				pcaIndicatorContainer.appendChild(pcaSeqIndicator);
				pcaSeqIndicator.classList.add(`pca-seqindicator`, 'seqindicator');
				pcaSeqIndicator.dataset.span = s;
				createPCASequenceObserver(pcaSeqIndicator, s); //react to scroll;
				pcaSeqIndicator.addEventListener('click', (event) => {
					updatePCASequence(s);
					// updateActiveIndicator(index, key);			
				});

				if( utils.isMobile() ){
					let iokey = `pca3d-para${s}`;
					let extradiv = document.createElement('div');
					if( pcaparagraphs[s] ){
						extradiv.appendChild( pcaparagraphs[s] );
					}
					extradiv.classList.add('seq-mobileindicator', 'scroll-overlay');
					extradiv.setAttribute('aria-hidden', true);
					pcafigText.appendChild(extradiv);
					createPCASequenceObserver(extradiv, s); //react to scroll;
				}
			}
		}
	}

	function tweenCamera(camera, position) {        
		new TWEEN.Tween(camera.position).to({
			x: position.x,
			y: position.y,
			z: position.z
		}, duration)
		.easing(TWEEN.Easing.Quadratic.InOut)
		.start();
	}

	function updatePCASequence(stop){
		// console.log('PCA stop', stop);
		pcaPlotData.stop = stop;

			//update active stop indicator on container
		pcaContainer.dataset.activeStop = stop;

		let keys = pcaContainer.querySelectorAll('.key-item');
		keys.forEach( key=> key.classList.remove('visiblekey') );

		let activeKeys = pcaPlotData.sequence[stop];
		activeKeys.forEach( keyIndex =>{
			pcaContainer.querySelector(`[data-series-number="${keyIndex}"]`).classList.add('visiblekey');
		});

		let newLabelData  = labels[stop];
		tweenCamera(camera, views[stop]);

			//update colors and alphas
		let colors = points.geometry.attributes.color;
		let alphas = points.geometry.attributes.alpha;
		let sizes = points.geometry.attributes.size;

		let newalphas = [];
		let newcolors = [];
		let newsizes = [];
			// console.log(alphas.array);
		pcadata.forEach( (pt, index) => {

				let ref = pt[String(stop)]; //cross-reference to labeldata

				if( ref == 0 ){
					newalphas.push(0);
					newcolors.push(1,1,1);
					newsizes.push(0);
				}else{
					let seriesindex = ref - 1;
					let newlabeldata = labels[stop][seriesindex];
					let newrgb = newlabeldata[2];
					// sizes.array[index] = ; 				
					// alphas.array[index] = newlabeldata[4]; 
					newsizes.push(newlabeldata[3]*2);
					newalphas.push(newlabeldata[4]);
					newcolors.push( newrgb[0]/255, newrgb[1]/255, newrgb[2]/255 );   			            
					// newcolorarray.slice(index*3, 3, ); 
				}
				
			});

		const sizetween = new TWEEN.Tween(sizes.array)
		.to(newsizes, duration)
		.onUpdate(function () {
						 // Update the opacity of the point
						 // opacitiesArray[i] = this.opacity;
						 sizes.needsUpdate = true; // Update the buffer attribute
						})
		.start()

		const colortween = new TWEEN.Tween(colors.array)
		.to(newcolors, duration)
		.onUpdate(function () {
						 // Update the opacity of the point
						 // opacitiesArray[i] = this.opacity;
						 colors.needsUpdate = true; // Update the buffer attribute
						})
		.start()

		const alphatween = new TWEEN.Tween(alphas.array)
		.to(newalphas, duration)
		.onUpdate(function () {
						 // Update the opacity of the point
						 // opacitiesArray[i] = this.opacity;
						 alphas.needsUpdate = true; // Update the buffer attribute
						})
		.start()
	}

 // Create an animation loop
	const animate = () => {
		requestAnimationFrame(animate);
		TWEEN.update();
		camera.lookAt(scene.position);
		renderer.render(scene, camera);

	};
	// Setup Intersection observer for sequence indicators
	function createPCASequenceObserver(elem, stop) {
			// console.log(key, 'key', fig);
		let observer = new IntersectionObserver(function(entries) {
			let [entry] = entries;

			if (entry.isIntersecting) {
				// console.log(key, 'intersecting', stop);
				//update active indicator
				let aind = document.querySelector('.active-tag');
				if (aind) {
					aind.classList.remove('active-tag');
				}
				elem.classList.add('active-tag');
				updatePCASequence(stop);
			} else if (!entry.isIntersecting) {
					// elem.classList.remove('active-tag');
			}
		}, {
			rootMargin: '-50% 0% -50% 0%',
			threshold: 0
		});
		observer.observe(elem);
		return observer;
	}

		// Handle mousemove events
		// Create a raycaster to detect mouseover events
	const raycaster = new THREE.Raycaster();
	raycaster.params.Points.threshold = 0.05;

	const pointer = new THREE.Vector2();

	function showLabelonHover(event) {
			// Calculate mouse coordinates
		const rect = renderer.domElement.getBoundingClientRect();
		pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
		pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

			// Update the raycaster
		raycaster.setFromCamera( pointer, camera );

		let intersects = raycaster.intersectObject( points );
		const alphaattributes = points.geometry.attributes.alpha;
		let pointalpha;
		let INTERSECTED;

		if (intersects.length > 0) {
			if ( INTERSECTED != intersects[ 0 ].index ) {
					INTERSECTED = intersects[0].index; //index of mouseover point
					
					// Get the color and label name
					let pointlabelSeq = labels[pcaPlotData.stop];
					let pointlabelRef = pcadata[INTERSECTED][String(pcaPlotData.stop)];
					if( pointlabelRef !== 0 ){
						let pointlabelData = pointlabelSeq[ pointlabelRef - 1 ];
						let seriesName = pointlabelData[1];
						let seriesColor = pointlabelData[2];
						// Display the coordinates of the first intersected point
						const point = intersects[0].point;
						
						infoElement.innerHTML = `${seriesName}<br>PCA1: ${point.x.toFixed(2)}, PCA2: ${point.y.toFixed(2)}, PCA3: ${point.z.toFixed(2)}`;
						infoElement.style.cssText = `color: rgb(${seriesColor[0]}, ${seriesColor[1]}, ${seriesColor[2]}); top: ${event.clientY}px; left: ${event.clientX}px; `;
						if( !infoElement.classList.contains('visible') ){
							infoElement.classList.add('visible');
						};
					}						
				}
			}else if ( INTERSECTED !== null ) {
				INTERSECTED = null;
				infoElement.classList.remove('visible');
		}       
	}

	// Add event listeners for mousemove events
	renderer.domElement.addEventListener('mousemove', showLabelonHover, false);

	setupPCAIndicators();
	animate();
	resizeCanvas();

 // Add event listeners for window resize events
	window.addEventListener('resize', resizeCanvas );
	
	function resizeCanvas(){
	  const width = pcaplot.offsetWidth;
	  const height = pcaplot.offsetHeight;
	  // console.log('pca', width, height);
	  renderer.setSize(width, height);
	  camera.aspect = width / height;
	  camera.updateProjectionMatrix();
	}

	window.addEventListener('scroll', function(){
		infoElement.classList.remove('visible'); //hide tooltip
	});

}
