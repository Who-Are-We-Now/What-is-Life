// console.log('darkmode.js');
const intersection_darkmode = () => {
  let data = [];
  for (let i = 0; i <= 0.5; i += 0.01) {
    data.push(i);
  }
  return data;
}

const options = {
  rootMargin: "0px 0px 0px 0px",
  threshold: intersection_darkmode()
};

function createDarkModeObserver(target, options) {
  let observer = new IntersectionObserver(function (entries) {
    let [entry] = entries;
    let top = entry.boundingClientRect.top;
    let color = 255;
    let midpoint = entry.boundingClientRect.height / 2;

    if (top > midpoint) {
      color = 255 - (255 * entry.intersectionRatio * 2);
      console.log('top > midpoint');
    } else if (top < midpoint) {
      color = 0;
      console.log('top < midpoint');
    } else {
      color = 0;
      console.log('else');

    }

    if (color > 220) { // setup clean black/white
      color = 255;
    } else if (color < 0) {
      color = 0;
    }

    console.log('intersection ratio: ' + entry.intersectionRatio + ' / rgb code: ' + color);

    if (entry.isIntersecting) {
      document.body.style.setProperty('--darkmodecolor', color);
      // document.body.classList.add('bodydark');
    } else {
      document.body.style.setProperty('--darkmodecolor', 255);
      // document.body.classList.remove('bodydark');
    }
    if (color < 50) {
      document.body.classList.add('bodydark');
    } else {
      document.body.classList.remove('bodydark');
    }
  }, options);

  observer.observe(target);
  return observer;
}

document.addEventListener('DOMContentLoaded', (event) => {

  let id = 'foetus26weeks';
  let figitem = document.getElementById(id);
  if( !figitem ){
    id = 'overviewfx';
    figitem = document.getElementById(id);
    console.log('darkmode for overviewfx');
  }
  if( figitem){
    console.log(id);
    let indicator = document.getElementById(id+'-indicator');
    console.log(indicator);
    const options = {
      rootMargin: "0px 0px 0px 0px",
      threshold: intersection_darkmode()
    };
    createDarkModeObserver(indicator, options);
  }
});