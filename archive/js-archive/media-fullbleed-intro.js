// console.log('fullbleed_intro.js');
function displayIntroImg() {
	let img = document.getElementsByClassName("media-full-intro");
	let imgPos = img[0].offsetTop + window.scrollY;

	// console.log('imageposition: ' + imgPos + '/scrollY: ' +  window.scrollY + '/clientrect: ' + img[0].getBoundingClientRect().top);
	if (imgPos < 1000) {
		img[0].classList.add('top'); 
	} else if((imgPos > 1000)) {
		img[0].classList.remove('top'); 
	}
}
document.addEventListener('DOMContentLoaded', displayIntroImg(), false);

document.addEventListener("scroll", (event) => {
	displayIntroImg();
});