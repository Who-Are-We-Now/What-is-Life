console.log('mapjs');

let maps = document.querySelectorAll('.map');
let map_params = {} //holds data to setup image crossfades;

if( maps ){
  let map = document.getElementById('densitymap-fig');
  let mapfig = map.querySelector('figure');
  let mapindicator = document.getElementById('densitymap-indicator');
  let mapitems = map.querySelectorAll('.map-image');
  let indicatoritems =  mapindicator.querySelectorAll('.indicator');

  let blackMarble = maps[2];
  let bg = document.getElementById('darkbg');


  indicatoritems.forEach( ind=>{
    createMapObserver(ind);
  });

  let opacity = 0;
  const handleMapFade = function( ){
    let thismapseq = mapfig.dataset.activemapseq;
    let figTop = indicatoritems[thismapseq].getBoundingClientRect().top;
    // let diff = (midpoint - figTop)  /  midpoint;
    // console.log("%", thismapseq, figTop, diff);
    console.log(thismapseq, figTop);

    if( figTop > midpoint ){
      opacity = 1 - (figTop-midpoint)/midpoint;
    }else{
      opacity = 1;
      console.log(thismapseq, console.log('dontchange'));
    }
    
    console.log('OPAC', thismapseq, opacity);
    mapitems[thismapseq].style.opacity = opacity;
  }

  function createMapObserver(target){ 
    const options = {
      rootMargin: "-50px 0px 0px 0px",
      threshold: 0
    }
    
    let observer = new IntersectionObserver( function(entries){
      let [entry] = entries;
      let mapindex = target.dataset.mapseq;
      let top = entry.boundingClientRect.top;
     // console.log(entries);
      console.log( mapindex, top);
     // let opacity = (entry.intersectionRatio - 0.5)/ 0.5;
      if (entry.isIntersecting) {  
        mapfig.dataset.activemapseq = mapindex; 
        console.log('intersecting', mapindex);
        document.addEventListener('scroll', handleMapFade );

      }else{
        document.removeEventListener('scroll', handleMapFade );
      }
     // console.log('set', mapindex, 'to', opacity);
     // maps[mapindex].style.opacity = opacity;

    }, options);

    observer.observe(target);
    return observer;
  }
}
