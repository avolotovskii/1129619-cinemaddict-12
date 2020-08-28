import AbstractView from "./abstract.js";

export const SortType = {
  DATE: `date`,
  RATING: `rating`,
  DEFAULT: `default`,
};

const createSortFilms = () => {
  return (
    `<ul class="sort">
      <li><a href="#" data-sort-type="${SortType.DEFAULT}" class="sort__button sort__button--active">Sort by default</a></li>
      <li><a href="#" data-sort-type="${SortType.DATE}" class="sort__button">Sort by date</a></li>
      <li><a href="#" data-sort-type="${SortType.RATING}" class="sort__button">Sort by rating</a></li>
    </ul>`
  );
};

export default class SortFilms extends AbstractView {
  constructor() {
    super();

    this._currenSortType = SortType.DEFAULT;
  }

  getTemplate() {
    return createSortFilms();
  }

  getSortType() {
    return this._currenSortType;
  }

  setSortTypeChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      const siblingsElement = Array.from(evt.target.parentNode.parentNode.children);

      if (evt.target.tagName !== `A`) {
        return;
      }

      const sortType = evt.target.dataset.sortType;

      if (this._currenSortType === sortType) {
        return;
      }

      siblingsElement.forEach((el) => {
        el.firstElementChild.classList.remove(`sort__button--active`);
      });

      this._currenSortType = sortType;

      evt.target.classList.add(`sort__button--active`);

      handler(this._currenSortType);
    });
  }
}
