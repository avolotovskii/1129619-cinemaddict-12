import AbstractView from "./abstract.js";

export const createExtraFilmsContainer = (title) => {
  return (
    `<section class="films-list--extra">
      <h2 class="films-list__title">${title}</h2>
      <div class="films-list__container"></div>
    </section>`
  );
};

export default class ExtraFilmsContainer extends AbstractView {

  getTemplate() {
    return createExtraFilmsContainer(this._title);
  }
}
