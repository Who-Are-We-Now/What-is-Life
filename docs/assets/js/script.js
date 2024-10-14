import { Antikythera } from '@antikythera/antikythera';
import * as utils from "./global-utils";
import * as figutils from "./fig-utils";


let viewport; //store viewport state to compare against

/*------------------------------------------------
	External Links in new Tab
------------------------------------------------*/
function setupExternalLinks() {
	//make all 'http://..' link external
	const links = document.querySelectorAll("a[href^='https://'], a[href^='http://']")
	const host = window.location.hostname
	const isInternalLink = link => new URL(link).hostname === host

	links.forEach(link => {
		if (isInternalLink(link)) return
		link.setAttribute("target", "_blank")
		link.setAttribute("rel", "noopener")
	})
}


/*------------------------------------------------
	NAVIGATION
------------------------------------------------*/
function setupNav() {

	let nav = document.querySelector("nav");
	let toc = document.getElementById("toc");
	let navTitle = nav.querySelector(".nav-title")

	// TOC toggle
	function toggleMenu(event) {
		if (toc.classList.contains('display')) {
			toc.classList.remove('display');
			nav.classList.remove('menu-on');
			navTitle.classList.remove('arrow-up');
			document.body.classList.remove('noscroll');
		} else {
			let currentTOC = toc.querySelector('.is-active');
			currentTOC.scrollIntoView();

			toc.classList.add('display');
			nav.classList.add('menu-on');
			navTitle.classList.add('arrow-up');
			document.body.classList.add('noscroll');

		}
	};

	navTitle.addEventListener("click", toggleMenu, false);

	if (utils.isMobile()) {
		//replace anchors with fig-anchors instead for mobile
		let thumbs = toc.querySelectorAll('.thumb');
		thumbs.forEach(th => {
			let figlink = th.getAttribute('href') + '-fig';
			th.setAttribute("href", figlink);
		});
	}

	toc.addEventListener("click", function (event) {
		let target = event.target;
		if (target.closest(".toc-chapter")) {
			let parent = target.closest(".toc-chapter");
			if (!target.classList.contains('thumb')) {
				//navigate to chapter top
				let href = parent.id.replace('toc-', '');
				window.location.href = "/" + href;
			} else { //navigate to thumbnail position
				// console.log('nav to thumb');
				if (parent.classList.contains('is-active')) {
					toggleMenu();
				}
			}
		}

	});
}


/*------------------------------------------------
	Info Overlay
------------------------------------------------*/
function setupAboutOverlay() {


	//setup purchase
	let order_event = {
		name: "bookorder_click",
		category: "page_interaction"
	}
	utils.sendAnalyticsEvent(order_event);
}






/*------------------------------------------------
	Global listener functions
------------------------------------------------*/

window.addEventListener('load', function () {
	let hash = window.location.hash;
	// console.log(hash);	
	//store whether current layout is desktop /mobile
	viewport = utils.isMobile();
	// console.log('MOBILE VIEW', viewport);

	setupNav();
	setupAboutOverlay();

	let refExists = document.getElementById('footnote-popup');
	if (hash == '#about') {
		toggleInfoPopup();
	} else if (refExists) {
		utils.checkFNHash(hash);
	}

	figutils.initializeFigures();

	if (refExists) {
		//manage footnote bheavior
		let footnotes = document.querySelectorAll('.reference');
		footnotes.forEach(f => {
			f.addEventListener('click', function (e) {
				let fnId = f.id.replace('ft-', '');
				utils.showFootnote(fnId, event);
			});
		});

		window.addEventListener("hashchange", (e) => {
			let hash = window.location.hash;
			utils.checkFNHash(hash);
		}, false);
		if (utils.isMobile()) {
			window.addEventListener("scroll", function () {
				utils.hideFootnote();
			});
		}
	}

	let main = document.querySelector('main');
	main.addEventListener("click", function (event) {
		// console.log(event, event.target);
		if (refExists) {
			// let fnClicked = event.target.closest('.reference');
			if (event.target.closest('.reference')) {
			} else {
				utils.hideFootnote();
			}
		}
	});

	
	setupExternalLinks();

	// Reposition indicators on resize
	var delayRefresh = utils.debounce(function () {
		// console.log( viewport, utils.isMobile() );
		if (viewport !== utils.isMobile()) {
			//switching between mobile / destkop
			location.reload();
		} else {
			if (!utils.isMobile()) {
				figutils.repositionIndicators();
			}
		}
	}, 400);
	window.addEventListener("resize", delayRefresh);

});

