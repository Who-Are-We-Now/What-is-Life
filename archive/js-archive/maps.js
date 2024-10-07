const getThreshold = () => {
  let data = [];
  for (let i = 0; i <= 1.0; i += 0.005) {
    data.push(i);
  }
  return data;
}


const handleChanges = (entries) => {
  entries.forEach(({ target, intersectionRatio }) => {
    const element = document.querySelector('.percentage__value-1');
    const percentage = Math.ceil(intersectionRatio * 100);
    const opacity = percentage / 100;
    
    element.firstChild.data = percentage + '%';
    target.style.opacity = opacity;
    
  });
}

const handleChanges2 = (entries) => {
  entries.forEach(({ target, intersectionRatio }) => {
    const element = document.querySelector('.percentage__value-2');

    const background = document.querySelector('.dark-mode');
    const nav = document.querySelector('.navlink');

    const percentage = Math.ceil(intersectionRatio * 100);
    const opacity = percentage / 100  * 1.5;


    element.firstChild.data = percentage + '%';
    target.style.opacity = opacity;
    background.style.opacity = opacity;


    if (opacity > .2) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
    
  });
}


const mapObserver = ({ target, handler, threshold }) => {
  const options = {
    root: null,
    rootMargin: "0px",
    threshold
  }
  const observer = new IntersectionObserver(handler, options);

  observer.observe(target);
}

const mapObserver2 = ({ target, handler, threshold }) => {
  const options = {
    root: null,
    rootMargin: "-30px",
    threshold
  }
  const observer2 = new IntersectionObserver(handler, options);

  observer2.observe(target);
}


document.addEventListener('DOMContentLoaded', (event) => {  
  const map = ['.map-scroll-1'];

  map.map((view) => {
    mapObserver({
      target: document.querySelector(view),
      handler: handleChanges,
      threshold: getThreshold()
    });  
  });

  const map2 = ['.map-scroll-2'];

  map2.map((view) => {
    mapObserver2({
      target: document.querySelector(view),
      handler: handleChanges2,
      threshold: getThreshold()
    });  
  });

});

