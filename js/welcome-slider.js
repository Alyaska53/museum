const slide = document.querySelector('.welcome-slider-content');
const squares = document.querySelectorAll('.slider-square');
const prevButton = document.querySelector('.arrow-slider-left');
const nextButton = document.querySelector('.arrow-slider-right');
const number = document.querySelector('.first-slide-number');

const SLIDER_LINKS = [
  './assets/img/welcome-slider/1.jpg',
  './assets/img/welcome-slider/2.jpg',
  './assets/img/welcome-slider/3.jpg',
  './assets/img/welcome-slider/4.jpg',
  './assets/img/welcome-slider/5.jpg'
];

let index = 0;
let isEnabled = true;

const activeSlide = n => {
  slide.style.background = `url(${SLIDER_LINKS[n]})`;
}

const activeSquare = n => {
  for (square of squares) {
    square.classList.remove('active');
  }
  squares[n].classList.add('active');
}

const activeSlideNumber = (n) => {
  number.innerText = `0${n + 1}`;
}

const currentSlide = n => {
  activeSlide(n);
  activeSquare(n);
  activeSlideNumber(n);
}

const nextSlide = () => {
  if (index == SLIDER_LINKS.length - 1) {
      index = 0;
      currentSlide(index);
  } else {
      index++;
      currentSlide(index);
  }
}

const prevSlide = () => {
  if (index == 0) {
      index = SLIDER_LINKS.length - 1;
      currentSlide(index);
  } else {
      index--;
      currentSlide(index);
  }
}

squares.forEach((item, indexOfSquare) => {
  item.addEventListener('click', () => {
      index = indexOfSquare;
      currentSlide(index);
  })
})

const intervalSlider = () => {
  if (index == SLIDER_LINKS.length - 1) {
    index = 0;
    currentSlide(index);
  } else {
    index++;
    currentSlide(index);
  }
}

setInterval(intervalSlider, 3000);

nextButton.addEventListener('click', nextSlide);
prevButton.addEventListener('click', prevSlide);

const swipeWatch = (el) => {
  let surface = el;   
  let startX = 0;
  let startY = 0;
  let distX = 0;
  let distY = 0;

  let startTime = 0;
  let finishTime = 0; 

  let swipeLength = 100;
  let restraint = 100; 
  let allowedTime = 500;

  surface.addEventListener('mousedown', function(e) {
      startX = e.pageX;
      startY = e.pageY;
      startTime = new Date().getTime();
      e.preventDefault();
  });

  surface.addEventListener('mouseup', function(e) {
      distX = e.pageX - startX;
      distY = e.pageY - startY;
      finishTime = new Date().getTime() - startTime;

      if (finishTime <= allowedTime) {
          if (Math.abs(distX) >= swipeLength && Math.abs(distY) <= restraint) {
              if (distX > 0) {
                  if (isEnabled) {
                      prevSlide(index);
                  }
              } else {
                  if (isEnabled) {
                      nextSlide(index);
                  }
              }
          }
      }
      e.preventDefault();
  });
}

swipeWatch(slide);