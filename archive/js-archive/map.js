const intersectionTh = () => {
  let data = [];
  for (let i = 0; i <= 1.0; i += 0.01) {
    data.push(i);
  }
  return data;
}

let bg = document.getElementById('darkbg');

function createMapObserver(params){ 
  const options = {
    rootMargin: "-50px 0px 0% 0px",
    threshold: intersectionTh()
  }

  let observer = new IntersectionObserver( function(entries){
   let [entry] = entries;
   console.log( 'IR', entry.intersectionRatio );
   if( entry.isIntersecting){

      if ( entry.target.getBoundingClientRect().top < 0 ){
        let diff = 1 - entry.intersectionRatio;
        thresholdOpacity(diff, params);
      }   
   }else{
      
   }
  }, options);
  
  observer.observe(params.target);
  
  return observer;
}

var darkObserver = new MutationObserver(function(mutations) {
  //observes the black marble image opacity, mirrors it to the darkmode background
    
    mutations.forEach(function(mutationRecord) {        
        let imgopacity = mutationRecord.target.style.opacity;
        console.log('style changed!', imgopacity);
        bg.style.opacity = imgopacity;
        let grayvalue = 255*imgopacity;
        document.body.style.color = `rgb(${grayvalue},${grayvalue},${grayvalue})`;

        // if( imgopacity > 0.6){
        //   document.body.style.color = 'white';
        // }else{
        //   document.body.style.removeProperty('color');
        // }
    });    
});


let previousY = 0
let previousRatio = 0
var containerObserver = new IntersectionObserver( function(entries){
  //removes darkmode features once map falls out of view
  let [entry] = entries;
  const currentY = entry.boundingClientRect.y;
  const currentRatio = entry.intersectionRatio;
  const isIntersecting = entry.isIntersecting;
  // Scrolling down/up
  console.log('CONATINER IR', currentRatio);

  let bgopacity = 1;
  if( currentRatio <= 0.2){
    bgopacity = currentRatio/0.2;
  }


  if (currentY < previousY) {
    if (currentRatio > previousRatio && isIntersecting) {
      console.log("Scrolling down enter");
    } else {
      console.log("Scrolling down leave");
      bg.style.opacity = bgopacity;
      if( bgopacity < 0.2){
        document.body.style.removeProperty('color');
      }
    }
  } else if (currentY > previousY && isIntersecting) {
    if (currentRatio < previousRatio) {
      console.log("Scrolling up leave");
    } else {
      console.log("Scrolling up enter");
      bg.style.opacity = bgopacity;
      let lastimg = document.getElementById('densitymap-map').querySelectorAll('.map')[2];
      if( lastimg.style.opacity !== 1 ){
         lastimg.style.opacity = 1;
      }
      document.body.style.color = 'white';
    }
  }

  previousY = currentY;
  previousRatio = currentRatio;

  }, {rootMargin: '0% 0% -50% 0%', threshold: intersectionTh() });


document.addEventListener('DOMContentLoaded', (event) => {  
  let map = document.getElementById('densitymap-fig');
  let maplayer = map.querySelector('.map-layer')
  let mapscroll = map.querySelector('.mapindicator');
  let maps = maplayer.querySelectorAll('.map-image');
  let figThresholds = buildThresholdList( maps.length );
  // let figThresholds = [0, 0.2, 0.3, 0.5, 0.7, 1];

  
  let map_params = {
    key: 'densitymap',
    target: mapscroll,
    maplayer: maplayer,
    images: maps,
    figThresholds: figThresholds,
    thInterval: figThresholds[1]
  }
  console.log(map_params);
  createMapObserver(map_params);

  var blackMarble = maps[2];
  darkObserver.observe(blackMarble, { attributes : true, attributeFilter : ['style'] });

  // containerObserver.observe(map);
});
