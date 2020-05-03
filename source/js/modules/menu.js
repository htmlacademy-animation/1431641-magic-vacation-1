export default () => {
  let header = document.querySelector(`.js-header`);
  let menuToggler = document.querySelector(`.js-menu-toggler`);
  let menuLinks = document.querySelectorAll(`.js-menu-link`);
  let historyLinkIndex;
  const rulesLink = document.querySelector(`.rules__link`);
  const screenIntro = document.querySelector(`.screen--intro`);
  const screenPrizes = document.querySelector(`.screen--prizes`);
  const socialBlockToggler = document.querySelector(`.social-block__toggler`);
  const screenFill = document.querySelector(`.screen-fill`);

  const isHistoryActive = () => {
    return (
      historyLinkIndex &&
      menuLinks[historyLinkIndex].className.includes(`active`)
    );
  };

  const setScreenFillStyles = (opacity, height) => {
    screenFill.style.opacity = opacity;
    screenFill.style.height = height;
  };

  const setSectionAnimate = (section) => {
    section.classList.add(`animated`);
    setTimeout(() => section.classList.remove(`animated`), 200);
  };

  if (menuToggler) {
    menuToggler.addEventListener(`click`, function () {
      if (header.classList.contains(`page-header--menu-opened`)) {
        header.classList.remove(`page-header--menu-opened`);
        document.body.classList.remove(`menu-opened`);
      } else {
        header.classList.add(`page-header--menu-opened`);
        document.body.classList.add(`menu-opened`);
      }
    });
  }

  for (let i = 0; i < menuLinks.length; i++) {
    if (menuLinks[i].dataset.href === `story`) {
      historyLinkIndex = i;
    }

    menuLinks[i].addEventListener(`click`, function (event) {
      if (window.innerWidth < 1025) {
        header.classList.remove(`page-header--menu-opened`);
        document.body.classList.remove(`menu-opened`);
      }

      if (!event) {
        return;
      }

      if (event.target.dataset.href === `prizes` && isHistoryActive()) {
        event.preventDefault();

        screenPrizes.classList.add(`animated`);
        setScreenFillStyles(`1`, `100%`);

        setTimeout(() => {
          menuLinks[historyLinkIndex].classList.remove(`active`);
          setScreenFillStyles(`0`, `0%`);
          menuLinks[historyLinkIndex + 1].click();
          screenPrizes.classList.remove(`animated`);
        }, 200);
      } else if (event.target.dataset.href === `prizes`) {
        setSectionAnimate(screenPrizes);
      } else if (event.target.dataset.href === `top`) {
        setSectionAnimate(screenIntro);
      } else if (event.target.dataset.href === `rules`) {
        rulesLink.classList.add(`btn--transparent`);
      }
    });
  }

  window.addEventListener(`load`, () => {
    socialBlockToggler.classList.add(`start-animated`);
    setTimeout(() => {
      socialBlockToggler.classList.remove(`start-animated`);
      socialBlockToggler.classList.add(`end-animated`);
    }, 300);
  });
};
