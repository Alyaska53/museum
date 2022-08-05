const buttonBook = document.querySelector('.book');

buttonBook.addEventListener('click', function (e) {
  const x = e.clientX;
  const y = e.clientY;

  const buttonTop = e.target.offsetTop;
  const buttonLeft = e.target.offsetLeft;

  const xInside = x - buttonLeft;
  const yInside = y - buttonTop;

  const circleEffect = document.createElement('span');
  circleEffect.classList.add('circle-effect');
  circleEffect.style.top = yInside + 'px';
  circleEffect.style.left = xInside + 'px';

  this.appendChild(circleEffect);

  setTimeout(() => circleEffect.remove(), 500);
});