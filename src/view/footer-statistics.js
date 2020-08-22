import AbstractView from "./abstract.js";

const createFooterStatistics = (number) => {
  return (
    `<section class="footer__statistics">
      <p>${number} movies inside</p>
    </section>`
  );
};

export default class FooterStatistics extends AbstractView {
  constructor(number) {
    super();
    this._number = number;
  }

  getTemplate() {
    return createFooterStatistics(this._number);
  }
}
