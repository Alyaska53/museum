function randomGallery() {
  const pictureInnerContainer = document.querySelector('.picture-inner-container');

  let galleryLinks = [
  './assets/img/galery/galery1.jpg',
  './assets/img/galery/galery2.jpg',
  './assets/img/galery/galery3.jpg',
  './assets/img/galery/galery4.jpg',
  './assets/img/galery/galery5.jpg',
  './assets/img/galery/galery6.jpg',
  './assets/img/galery/galery7.jpg',
  './assets/img/galery/galery8.jpg',
  './assets/img/galery/galery9.jpg',
  './assets/img/galery/galery10.jpg',
  './assets/img/galery/galery11.jpg',
  './assets/img/galery/galery12.jpg',
  './assets/img/galery/galery13.jpg',
  './assets/img/galery/galery14.jpg',
  './assets/img/galery/galery15.jpg'
]

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  shuffle(galleryLinks);

  galleryLinks.map(function(el, index) {
    const img = document.createElement('img');
    img.classList.add('gallery-img')
    img.src = el;
    img.alt = `galery${index}`;
    pictureInnerContainer.append(img);
  });
}

randomGallery();


const galleryImages = document.querySelectorAll('.gallery-img');

if (galleryImages.length > 0) {
  window.addEventListener('scroll', animate);

  function animate() {
    for (let i = 0; i < galleryImages.length; i++) {
      const item = galleryImages[i];
      const itemHeight = item.offsetHeight;
      const animItemOffset = offset(item).top;
      const start = 2;
      let animItemPoint = window.innerHeight -  itemHeight / start;

      if ( itemHeight > window.innerHeight) {
        animItemPoint = window.innerHeight - window.innerHeight / start;
      }

      if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset +  itemHeight)) {
        item.classList.add('active-img');
      } else {
        item.classList.remove('active-img');
      }
    } 
  }
}

function offset(el) {
  const rect = el.getBoundingClientRect(),
        scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
        scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
}

setTimeout(animate, 300);