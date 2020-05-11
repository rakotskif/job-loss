import textBalancer from 'text-balancer';
import scrollama from 'scrollama';
import throttle from 'just-throttle';
import 'd3-jetpack/essentials';

import './scripts/helpers/d3-wrappers';
import './scripts/page';
import './scripts/posting-graphics';
import './scripts/canceled-internships';
// import './scripts/industry-impact';

/* Navbar fade ins */

const navbar = document.getElementById('navbar');

const hideNav = () => {
  navbar.classList.remove('show-nav-links');
  navbar.classList.add('only-eye-logo');
};
const showNav = () => navbar.classList.remove('only-eye-logo');

const scroller = scrollama();
scroller
  .setup({
    step: ['h1.headline', '#postings-scrolly'].map(
      document.querySelector.bind(document),
    ),
    offset: 0.01,
  })
  .onStepEnter(({ index, direction }) => {
    if (index === 0 && direction === 'down') showNav();
    if (index === 1) hideNav();
  })
  .onStepExit(({ index, direction }) => {
    if (index === 0 && direction === 'up') hideNav();
    if (index === 1) showNav();
  });

window.addEventListener('resize', throttle(scroller.resize, 500));

// Mobile navbar hamburger trigger

export function hamburgerTrigger() {
  navbar.classList.toggle('show-nav-links');
}

// Text balance headline, deck, and image captions

if (window.innerWidth <= 460) {
  textBalancer.balanceText('.headline');
}
