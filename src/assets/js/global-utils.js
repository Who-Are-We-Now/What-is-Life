let oldHash;

export function updateHash(key, mode) {
	//add or remove anchor in the url	
	//add anchor
	const location = window.location.toString().split('#')[0];
	currentHash = window.location.hash;
	// console.log('updatehash', mode, key, oldHash);
	if (mode == 'add') {
		let hash = '#' + key;
		if (hash !== oldHash) {
			// console.log('hash is working');
			history.replaceState(null, null, location + hash);
			if (!currentHash.includes('ft-')) {
				oldHash = currentHash;
			}
		}
	} else if (mode == 'update') {
		// update hash
		history.replaceState(null, null, location + currentHash);
	} else if (mode == 'revert') {
		if (currentHash.includes('ft-')) {
			history.replaceState(null, null, location + oldHash);
		}
	} else {
		//remove
		history.replaceState(null, null, location);
		oldHash = '';
	}
}



export function startTimeout(element, timeoutId) {
		// Clear any existing timeout
		clearTimeout(timeoutId);

		// Start a new timeout
		timeoutId = setTimeout(() => {
				if (element.classList.contains('active-fig')) {
			let eventName = window.location.pathname + element.id.split('-fig')[0];
			sendAnalyticsEvent({
				name: eventName, 
								category: "figure_interaction",
								label: element.id,
								value: 1 // assuming 1 seconds delay
						});
						sendAnalyticsEvent({
								name: "element_still_active",
								category: "figure_interaction",
								label: element.id,
								value: 1 // assuming 1 seconds delay
						});
				}
		}, 1000); // 1 second delay
}

export function sendAnalyticsEvent(eventDetails) {
		// Send event to Google Analytics
	if( typeof ga == 'function'){
		gtag('event', eventDetails.name, {
				'event_category': eventDetails.category,
				'event_label': eventDetails.label,
				'value': eventDetails.value
		});
	}
}

const mobileWidth = 850; //threshold at which plots collapse into one column
export function isMobile(){
	return window.innerWidth < mobileWidth;
}

export function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};


/*------------------------------------------------
	Footnote Utils
------------------------------------------------*/
export function checkFNHash(hash){
	if( hash.startsWith('#ft-') ){
		let ftId = hash.replace('#ft-', '');
		console.log('show fn', ftId);
		showFootnote(ftId);
	}
}
export function showFootnote( fnId, event ){
	let thisFN = document.getElementById(`ft-${fnId}`);
	if( thisFN ){
		let FNpopup = document.getElementById("footnote-popup");
		//get XY cords of activated footnote
		console.log(fnId, thisFN);
		thisFN.dataset.fn = "active-fn";

		let id_x = thisFN.offsetLeft + thisFN.offsetWidth; //offsetRight
		let id_y = thisFN.getBoundingClientRect().top + window.scrollY;
		let position = "absolute";
		let anchor_x = "left";

		let content = document.querySelector("article p");
		let rightMargin = (window.innerWidth - content.offsetWidth) / 2;
		if ( isMobile()) {
			if( event ){
				//we have a click event triggering the footnote
				if (event.target.closest('.seq-mobileindicator') ){
					//footnote on mobile overlay
					position = "fixed";
					id_y = event.clientY;
					id_x = event.clientX;
				}
			}
			if (id_x >= window.innerWidth * 0.6) {
				//when footnote xcord locates near the right margin
				id_y = id_y + 20;
				id_x = rightMargin;
				anchor_x = "right";
			}
		} else {
			id_y = id_y - 13;
			id_x = id_x + 10;
		}

		FNpopup.style.cssText = `top: ${id_y}px; ${anchor_x}: ${id_x}px; position: ${position}`;
		FNpopup.innerHTML = populateContentPopup(fnId);
		FNpopup.classList.add('visible');
		updateHash('ft-' + fnId, 'add');
	}
}

function populateContentPopup(fnid) {
	//populate foootnote popup contents from hidden reference (copy)
	let FNpopup_text = `<span class="footnote-number" id="ref-${fnid}">${fnid}</span>`;
	let FNcopy = document.getElementById("fn" + fnid);

	//get reference text
	let FNcontent = FNcopy.getElementsByTagName('p');
	for (let i = 0; i < FNcontent.length; i++) {
		FNpopup_text += FNcontent[i].innerHTML;
	}
	// console.log(FNpopup_text);
	return FNpopup_text;
}

export function hideFootnote( ){
	let FNpopup = document.getElementById("footnote-popup");

	if( FNpopup.classList.contains('visible')  ){
		let FNno = FNpopup.querySelector('.footnote-number').innerText;
		let thisFN = document.getElementById('ft-'+FNno);
		console.log(FNno, 'hidfn');
		FNpopup.classList.remove('visible');
		if( FNno ){
			updateHash('ft-' + FNno, 'revert');	
		}			
		thisFN.dataset.fn = "";
	}	
}
