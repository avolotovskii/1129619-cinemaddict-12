import {createElement} from "../utils.js";

const createFooterStatistics = (number) => {
  return (
    `<section class="footer__statistics">
      <p>${number} movies inside</p>
    </section>`
  );
};

export default class FooterStatistics {
  constructor(number) {
    this._number = number;
    this._element = null;
  }

  getTemplate() {
    return createFooterStatistics(this._number);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
