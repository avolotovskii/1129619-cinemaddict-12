import FilmsList from "../view/films-list.js";
import SortFilms, {SortType} from "../view/sort-films.js";
import LoadMoreButton from "../view/load-more-button";
import NoFilms from "../view/no-films.js";
import MoveController from "./move-controller.js";
import {render, remove, RenderPosition} from "../utils/render.js";
import {getDateFromString} from "../utils/common.js";

const SHOWN_FILM_CARDS_AMOUNT = 5;
const FILM_CARDS_AMOUNT_BY_BUTTON = 5;

const renderFilmCards = (filmsListElement, films, onDataChange, onViewChange) => {
  return films.map((film) => {
    const movieController = new MoveController(filmsListElement, onDataChange, onViewChange);
    movieController.render(film);

    return movieController;
  });
};

const getSortedFilmCards = (films, sortType, from, to) => {
  let sortedFilms = [];
  const showFilms = films.slice();

  switch (sortType) {
    case SortType.DATE:
      sortedFilms = showFilms.sort((a, b) => getDateFromString(b.releaseDate) - getDateFromString(a.releaseDate));
      break;
    case SortType.RATING:
      sortedFilms = showFilms.sort((a, b) => b.rating - a.rating);
      break;
    case SortType.DEFAULT:
      sortedFilms = showFilms;
      break;
  }

  return sortedFilms.slice(from, to);
};

export default class MovieList {
  constructor(container, filmsModel) {
    this._container = container;
    this._filmsModel = filmsModel;
    this._showedMovie = [];
    this._filmsList = new FilmsList();
    this._sortComponent = new SortFilms();
    this._loadMoreButton = new LoadMoreButton();
    this._noFilms = new NoFilms();
    this._shownFilmsCount = SHOWN_FILM_CARDS_AMOUNT;
    this._filmsListElement = this._filmsList.getElement().querySelector(`.films-list__container`);

    this._onDataChange = this._onDataChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onShowMoreButtonClick = this._onShowMoreButtonClick.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
    this._filmsModel.setFilterChangeHandler(this._onFilterChange);
  }

  _onShowMoreButtonClick(films) {
    const prevFilmsCount = this._shownFilmsCount;
    this._shownFilmsCount = this._shownFilmsCount + FILM_CARDS_AMOUNT_BY_BUTTON;
    films = this._filmsModel.getFilms();

    const sortedFilmCards = getSortedFilmCards(films, this._sortComponent.getSortType(), prevFilmsCount, this._shownFilmsCount);
    const newFilmCards = renderFilmCards(this._filmsListElement, sortedFilmCards, this._onDateChange, this._onViewChange);

    this._showedMovie = this._showedMovie.concat(newFilmCards);

    if (this._shownFilmsCount >= films.length) {
      remove(this._loadMoreButton);
    }
  }

  _renderShowMoreButton() {
    remove(this._loadMoreButton);
    if (this._shownFilmsCount >= this._filmsModel.getFilms().length) {
      return;
    }

    render(this._filmsListElement, this._loadMoreButton, RenderPosition.AFTEREND);

    this._loadMoreButton.setClickHandler(this._onShowMoreButtonClick);
  }

  render() {
    const container = this._container.getElement();
    const films = this._filmsModel.getFilms();

    if (films.length === 0) {
      render(container, this._noFilms, RenderPosition.BEFOREEND);
      return;
    }

    render(container, this._sortComponent, RenderPosition.BEFOREEND);
    render(container, this._filmsList, RenderPosition.BEFOREEND);

    this._renderFilms(films.slice(0, this._shownFilmsCount));

    this._renderShowMoreButton();
  }

  _removeFilms() {
    this._showedMovie.forEach((movieController) => movieController.destroy());
    this._showedMovie = [];
  }

  _renderFilms(films) {
    const newFilmCards = renderFilmCards(this._filmsListElement, films, this._onDataChange, this._onViewChange);
    this._showedMovie = this._showedMovie.concat(newFilmCards);
    this._shownFilmsCount = this._showedMovie.length;
  }

  _updateFilms(count) {
    this._removeFilms();
    this._renderFilms(this._filmsModel.getFilms().slice(0, count));
    this._renderLoadMoreButton();
  }

  _onDataChange(movieController, oldData, newData) {
    const isSuccess = this._filmsModel.updateFilm(oldData.id, newData);

    if (isSuccess) {
      movieController.render(newData);
    }
  }

  _onViewChange() {
    this._showedMovie.forEach((it) => it.setDefaultView());
  }

  _onSortTypeChange(sortType) {
    this._shownFilmsCount = FILM_CARDS_AMOUNT_BY_BUTTON;

    const sortedFilmCards = getSortedFilmCards(this._filmsModel.getFilms(), sortType, 0, this._shownFilmsCount);
    this._removeFilms();
    this._renderFilms(sortedFilmCards);

    this._renderShowMoreButton();
  }

  _onFilterChange() {
    this._updateFilms(SHOWN_FILM_CARDS_AMOUNT);
  }
}
