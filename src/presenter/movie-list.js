import FilmsList from "../view/films-list.js";
import SortFilms, {SortType} from "../view/sort-films.js";
import LoadMoreButton from "../view/load-more-button";
import NoFilms from "../view/no-films.js";
import MovieController from "./movie-controller.js";
import ExtraFilmsContainer from "../view/extra-films-container.js";
import {render, remove, RenderPosition} from "../utils/render.js";
import {getFilmsByFilter} from "../utils/filter.js";
import {getDateFromString} from "../utils/common.js";

const SHOWN_FILM_CARDS_AMOUNT = 5;
const FILM_CARDS_AMOUNT_BY_BUTTON = 5;
const FILM_CARDS_EXTRA = 2;

export default class MovieList {
  constructor(container, filmsModel, filterModel, filterController) {
    this._container = container;
    this._filmsModel = filmsModel;
    this._showedMovie = [];
    this._filmsList = new FilmsList();
    this._filterModel = filterModel;
    this._filterController = filterController;
    this._sortComponent = new SortFilms();
    this._loadMoreButton = new LoadMoreButton();
    this._noFilms = new NoFilms();
    this._topRatedFilms = new ExtraFilmsContainer(`Top Rated`);
    this._mostCommentedFilms = new ExtraFilmsContainer(`Most Commented`);
    this._shownFilmsCount = SHOWN_FILM_CARDS_AMOUNT;
    this._movieController = {};
    this._currentSortType = SortType.DEFAULT;
    this._filteredFilms = [];
    this._filmsListElement = this._filmsList.getElement().querySelector(`.films-list__container`);

    this._onDataChange = this._onDataChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onShowMoreButtonClick = this._onShowMoreButtonClick.bind(this);
    this._handleModelAction = this._handleModelAction.bind(this);

    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
    this._filmsModel.addObserver(this._handleModelAction);
    this._filterModel.addObserver(this._handleModelAction);
  }

  _onShowMoreButtonClick() {
    const prevFilmsCount = this._shownFilmsCount;
    this._shownFilmsCount = this._shownFilmsCount + FILM_CARDS_AMOUNT_BY_BUTTON;

    const sortedFilmCards = this._getSortedFilmCards(this._filteredFilms, this._sortComponent.getSortType(), prevFilmsCount, this._shownFilmsCount);
    const newFilmCards = this._renderFilmCards(this._filmsListElement, sortedFilmCards, this._onDataChange, this._onViewChange);

    this._showedMovie = this._showedMovie.concat(newFilmCards);

    if (this._shownFilmsCount >= this._filteredFilms.length) {
      remove(this._loadMoreButton);
    }
  }

  _getSortedFilmCards(films, sortType, from, to) {
    let sortedFilms = [];
    const showFilms = films.slice();

    switch (sortType) {
      case SortType.DATE:
        sortedFilms = showFilms.sort((a, b) => getDateFromString(b.releaseDate) - getDateFromString(a.releaseDate));
        break;
      case SortType.RATING:
        sortedFilms = showFilms.sort((a, b) => b.rating - a.rating);
        break;
      case SortType.COMMENTS:
        sortedFilms = showFilms.sort((a, b) => b.comments.length - a.comments.length);
        break;
      case SortType.DEFAULT:
        sortedFilms = showFilms;
        break;
    }

    this._currentSortType = sortType;

    return sortedFilms.slice(from, to);
  }

  _renderShowMoreButton() {
    remove(this._loadMoreButton);
    if (this._shownFilmsCount >= this._filteredFilms.length) {
      return;
    }

    render(this._filmsListElement, this._loadMoreButton, RenderPosition.AFTEREND);

    this._loadMoreButton.setClickHandler(this._onShowMoreButtonClick);
  }

  render() {
    const container = this._container.getElement();
    const films = this._filmsModel.getFilms();
    const filterType = this._filterModel.getFilter();
    this._filteredFilms = getFilmsByFilter(films, filterType);

    if (this._filteredFilms.length === 0) {
      render(container, this._noFilms, RenderPosition.BEFOREEND);
      return;
    }

    render(container, this._sortComponent, RenderPosition.BEFOREEND);
    render(container, this._filmsList, RenderPosition.BEFOREEND);

    this._renderFilms(this._filteredFilms.slice(0, this._shownFilmsCount));

    this._renderShowMoreButton();
    this._renderTopRatedFilms(this._filteredFilms);
    this._renderMostCommentedFilms(this._filteredFilms);
  }

  _removeFilms() {
    this._showedMovie.forEach((movieController) => movieController.destroy());
    this._showedMovie = [];
  }

  _renderFilms(films) {
    const newFilmCards = this._renderFilmCards(this._filmsListElement, films, this._onDataChange, this._onViewChange);
    this._showedMovie = this._showedMovie.concat(newFilmCards);
    this._shownFilmsCount = this._showedMovie.length;
  }

  _renderFilmCards(filmsListElement, films, onDataChange, onViewChange) {
    return films.map((film) => {
      const movieController = new MovieController(filmsListElement, onDataChange, onViewChange);
      movieController.render(film);
      if (this._movieController[film.id]) {
        this._movieController[film.id].push(movieController)
      } else {
        this._movieController[film.id] = [movieController];
      }

      return movieController;
    });
  }

  _clearFilmsBoard({resetRenderedTaskCount = false, resetSortType = false} = {}) {
    Object
      .values(this._movieController)
      .forEach((presenters) => presenters.forEach((presenter) => presenter.destroy()));
    this._movieController = {};

    remove(this._sortComponent);
    remove(this._noFilms);
    remove(this._loadMoreButton);

    if (resetRenderedTaskCount) {
      this._shownFilmsCount = SHOWN_FILM_CARDS_AMOUNT;
      this._showedMovie = [];
    }

    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }
  }

  _onDataChange(movieController, oldData, newData) {
    const isSuccess = this._filmsModel.updateFilm(oldData.id, newData);

    if (isSuccess) {
      movieController.render(newData);
      this._filterController.render(newData);
    }
  }

  _onViewChange() {
    this._showedMovie.forEach((it) => it.setDefaultView());
  }

  _onSortTypeChange(sortType) {
    this._shownFilmsCount = FILM_CARDS_AMOUNT_BY_BUTTON;

    const sortedFilmCards = this._getSortedFilmCards(this._filmsModel.getFilms(), sortType, 0, this._shownFilmsCount);
    this._removeFilms();
    this._renderFilms(sortedFilmCards);

    this._renderShowMoreButton();
  }

  _handleModelAction(updateType, update) {
    switch (updateType) {
      case `PATCH`:
        this._movieController[update.id].forEach((presenter) => presenter.init(update));
        break;
      case `MINOR`:
        this._clearFilmsBoard();
        this.render();
        break;
      case `MAJOR`:
        this._clearFilmsBoard({resetRenderedTaskCount: true, resetSortType: true});
        this.render();
        break;
    }
  }

  _renderTopRatedFilms(films) {
    const container = this._container.getElement();
    render(container, this._topRatedFilms, RenderPosition.BEFOREEND);
    const topRatedFilmsContainer = this._topRatedFilms.getElement().querySelector(`.films-list__container`);
    const topRatedFilms = this._getSortedFilmCards(films, SortType.RATING, 0, FILM_CARDS_EXTRA);
    this._renderFilmCards(topRatedFilmsContainer, topRatedFilms, this._onDataChange, this._onViewChange);
  }

  _renderMostCommentedFilms(films) {
    const container = this._container.getElement();
    render(container, this._mostCommentedFilms, RenderPosition.BEFOREEND);
    const mostCommentedFilmsContainer = this._mostCommentedFilms.getElement().querySelector(`.films-list__container`);
    const mostCommentedFilms = this._getSortedFilmCards(films, SortType.COMMENTS, 0, FILM_CARDS_EXTRA);
    this._renderFilmCards(mostCommentedFilmsContainer, mostCommentedFilms, this._onDataChange, this._onViewChange);
  }
}
