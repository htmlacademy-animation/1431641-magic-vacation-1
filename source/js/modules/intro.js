class AccentTypographyBuild {
  constructor(elementSelector, timer, classForActivate, property) {
    this._TIME_SPACE = 100;

    this._elementSelector = elementSelector;
    this._timer = timer;
    this._classForActivate = classForActivate;
    this._property = property;
    this._element = document.querySelector(this._elementSelector);
    this._timeOffset = 0;

    this.prePareText();
  }

  createElement(letter) {
    const span = document.createElement(`span`);

    span.textContent = letter;

    return span;
  }

  destroyAnimation() {
    this._element.classList.remove(this._classForActivate);
  }

  prePareText() {
    if (!this._element) {
      return;
    }

    const text = this._element.textContent
      .trim()
      .split(` `)
      .filter((latter) => latter !== ``);
    const content = text.reduce((fragmentParent, word, i) => {
      const wordContainer = document.createElement(`span`);
      const wordElement = Array.from(word).reduce((fragment, latter) => {
        fragment.appendChild(this.createElement(latter));
        return fragment;
      }, document.createDocumentFragment());

      this._setTimeOffset(wordElement.childNodes, i);

      wordContainer.classList.add(`text__word`);
      wordContainer.appendChild(wordElement);

      fragmentParent.appendChild(wordContainer);

      return fragmentParent;
    }, document.createDocumentFragment());

    this._element.innerHTML = ``;
    this._element.appendChild(content);
  }

  runAnimation() {
    if (!this._element) {
      return;
    }

    this._element.classList.add(this._classForActivate);
  }

  _randomInteger(min, max) {
    let rand = min + Math.random() * (max + 1 - min);

    return Math.floor(rand);
  }

  _setTimeOffset(spansNodeList, wordOrderNumber) {
    const lengthUseful = 4;
    const cycles = Math.ceil(spansNodeList.length / lengthUseful);
    let startIndex;

    for (let i = 0; i <= cycles; i++) {
      startIndex = i === 0 ? 0 : (startIndex = i * lengthUseful);

      const spans = Array.prototype.slice.apply(spansNodeList, [
        startIndex,
        startIndex + lengthUseful
      ]);

      spans.forEach((span) => {
        const up = wordOrderNumber === 0 ? 1 : 2;
        const timeOffset = this._randomInteger(100 * up, 250 * up);

        span.style.transition = `${this._property} ${this._timer}ms cubic-bezier(0.16, 1, 0.3, 1) ${timeOffset}ms`;
      });
    }
  }
}

export default () => {
  const animationIntroTitleTextLine = new AccentTypographyBuild(
      `.intro__title`,
      500,
      `active`,
      `transform`
  );
  const animationIntroDateTextLine = new AccentTypographyBuild(
      `.intro__date`,
      300,
      `active`,
      `transform`
  );

  setTimeout(() => {
    animationIntroTitleTextLine.runAnimation();
  }, 500);

  setTimeout(() => {
    animationIntroDateTextLine.runAnimation();
  }, 1200);
};
