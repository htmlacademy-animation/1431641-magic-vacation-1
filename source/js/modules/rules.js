export default () => {
  const rules = document.querySelectorAll(`.rules__item`);
  const lastRule = rules[rules.length - 1];
  const rulesLink = document.querySelector(`.rules__link`);

  rulesLink.classList.add(`btn--transparent`);
  lastRule.onanimationend = () => {
    rulesLink.classList.add(`animate`);

    setTimeout(() => {
      rulesLink.classList.remove(`animate`);
      rulesLink.classList.remove(`btn--transparent`);
    }, 300);
  };
};
