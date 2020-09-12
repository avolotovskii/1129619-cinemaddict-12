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
  constructor(container) {
    this._container = container;
    this._films = [];
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

    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
  }

  _showMore(films) {
    const prevFilmsCount = this._shownFilmsCount;
    this._shownFilmsCount = this._shownFilmsCount + FILM_CARDS_AMOUNT_BY_BUTTON;

    const sortedFilmCards = getSortedFilmCards(this._films, this._sortComponent.getSortType(), prevFilmsCount, this._shownFilmsCount);
    const newFilmCards = renderFilmCards(this._filmsListElement, sortedFilmCards, this._onDateChange, this._onViewChange);

    this._showedMovie = this._showedMovie.concat(newFilmCards);

    if (this._shownFilmsCount >= films.length) {
      remove(this._loadMoreButton);
    }
  }

  _renderShowMoreButton() {
    if (this._shownFilmsCount >= this._films.length) {
      return;
    }

    render(this._filmsListElement, this._loadMoreButton, RenderPosition.AFTEREND);
  }

  render(films) {
    this._films = films;
    const container = this._container.getElement();

    if (films.length === 0) {
      render(container, this._noFilms, RenderPosition.BEFOREEND);
      return;
    }

    render(container, this._sortComponent, RenderPosition.BEFOREEND);
    render(container, this._filmsList, RenderPosition.BEFOREEND);

    const newFilmCards = renderFilmCards(this._filmsListElement, this._films.slice(0, this._shownFilmsCount), this._onDateChange, this._onViewChange);
    this._showedMovie = this._showedMovie.concat(newFilmCards);

    this._renderShowMoreButton();

    this._loadMoreButton.setClickHandler(() => {
      this._showMore(films);
    });
  }

  _onDataChange(oldData, newData) {
    const index = this._films.findIndex((it) => it === oldData);

    if (index === -1) {
      return;
    }

    this._films = [].concat(this._films.slice(0, index), newData, this._films.slice(index + 1));

    this._showedMovie[index].render(this._films[index]);
  }

  _onViewChange() {
    this._showedMovie.forEach((it) => it.setDefaultView());
  }

  _onSortTypeChange(sortType) {
    this._shownFilmsCount = FILM_CARDS_AMOUNT_BY_BUTTON;

    const sortedFilmCards = getSortedFilmCards(this._films, sortType, 0, this._shownFilmsCount);

    this._filmsListElement.innerHTML = ``;

    const newFilmCards = renderFilmCards(this._filmsListElement, sortedFilmCards, this._onDataChange, this._onViewChange);
    this._showedMovieControllers = newFilmCards;

    this._renderShowMoreButton();
  }
}
