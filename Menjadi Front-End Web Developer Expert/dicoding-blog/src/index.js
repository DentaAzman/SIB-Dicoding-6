import './styles/main.css';
import './styles/responsive.css';

const menu = document.querySelector('#menu');
const hero = document.querySelector('.hero');
const drawer = document.querySelector('#drawer');
const main = document.querySelector('main');

menu.addEventListener('click', (event) => {
  drawer.classList.toggle('open');
  event.stopPropagation();
});

hero.addEventListener('click', () => {
  drawer.classList.remove('open');
});

main.addEventListener('click', () => {
  drawer.classList.remove('open');
});
