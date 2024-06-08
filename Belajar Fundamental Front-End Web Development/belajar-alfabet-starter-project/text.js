document.addEventListener('DOMContentLoaded', () => {
  const switcher = document.querySelector('#switcher');
  const size = document.querySelector('#currentSize');
  const result = document.querySelector('.result');
  const box = document.querySelector('.box');

  switcher.addEventListener('change', (event) => {
    result.style.flexDirection = event.target.value;
  });

  setInterval(() => {
    const value = window.getComputedStyle(box).flexBasis;
    size.textContent = Number.parseInt(value);
  }, 0);
});
