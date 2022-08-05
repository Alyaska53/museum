const burgerButton = document.querySelector('.menu-burger-button');
const welcomeContent = document.querySelector('.welcome-content');
const burgerMenu = document.querySelector('.burger-menu');

burgerButton.addEventListener('click', (e) => {
  welcomeContent.classList.toggle('none');
  burgerMenu.classList.toggle('open');
  burgerButton.classList.toggle('close-button');
});