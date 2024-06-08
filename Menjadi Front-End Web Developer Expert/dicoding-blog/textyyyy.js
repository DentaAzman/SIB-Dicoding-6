/* .... */
const mainElement = document.querySelector('main');
 
/* .... */
 
mainElement.addEventListener('click', event => {
  drawerElement.classList.remove('open');
  event.stopPropagation();
});