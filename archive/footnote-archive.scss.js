function jumpToftHash(id) {  //jump down to location of footnote when accessed with fn URL
	var thisFN = document.getElementById('fnref-' + id);
	console.log('jump', thisFN)
	if (thisFN) {
		console.log('scroll to fn');
		var rect = thisFN.getBoundingClientRect();
		var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		var targetOffsetTop = rect.top + scrollTop;
		var viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
		var targetTopPosition = targetOffsetTop - (viewportHeight / 2);
		
		
		window.scrollTo({
			top: targetTopPosition,
			behavior: 'auto'
		});
		triggerFootnote( thisFN );
		// thisFN.scrollIntoView({ behavior: "auto", block: "center" });
		
	}
}

function toggleFHash(hash){
	// Make ajax call to fetch content for location.hash
	let mediaId = hash.replace('#', '').toString();
	// console.log(mediaId);
	var parent = event.target.parentElement;
	var FNno = parent.id.split('-')[1];
	// console.log(parent, FNno, curFNno, FNpopup.classList);
	if (event.target.classList.contains('footnote-ref')) {
		//if already open, remove popup
		if (FNpopup.classList.contains('visible') &&
			curFNno == FNno) {
			FNpopup.classList.remove('visible');
			utils.updateHash('ft-' + FNno, 'remove');
		} else {
			//open popup
			triggerFootnote( thisFN );
			//add hash
			var parent = event.target.parentElement;
			var FNno = parent.id.split('-')[1];
			utils.updateHash('ft-' + FNno, 'add');
			curFNno = FNno;
		}
	} else {
		//remove popup
		FNpopup.classList.remove('visible');
		utils.updateHash('ft-' + FNno, 'revert');
		curFNno = null;
	}
}


function alignFootnotes() {
	let chapter = document.getElementsByTagName("main")[0];
	let article = chapter.getElementsByTagName("article")[0];
	let pLeft = article.getElementsByTagName("p")[0].offsetLeft;
	// let pWidth = article.getElementsByTagName("p")[0].clientWidth;
	let fts = document.getElementsByClassName("reference");
	let ftWidth = fts[0].offsetWidth + parseInt(window.getComputedStyle(fts[0]).marginLeft, 10) + parseInt(window.getComputedStyle(fts[0]).marginRight, 10);

	for (var i = 0; i < fts.length; i++) {
		fts[i].style.cssText = 'position: relative;'

		if ((fts[i].offsetLeft - pLeft) <= ftWidth) {
			fts[i].style.cssText = 'position: absolute;'
			// console.log('ft-' + (i + 1) + ': ' + (fts[i].offsetLeft - pLeft));

		}
	}
}