// modules
import chat from './modules/chat.js';
import footer from './modules/footer.js';
import form from './modules/form.js';
import FullPageScroll from './modules/full-page-scroll';
import menu from './modules/menu.js';
import mobileHeight from './modules/mobile-height-adjust.js';
import result from './modules/result.js';
import rules from './modules/rules.js';
import slider from './modules/slider.js';
import social from './modules/social.js';

// init modules
mobileHeight();
slider();
menu();
footer();
chat();
result();
form();
social();
rules();

const fullPageScroll = new FullPageScroll();
fullPageScroll.init();

window.addEventListener(`load`, () => {
  const body = document.querySelector(`body`);

  body.classList.add(`loaded`);
});
