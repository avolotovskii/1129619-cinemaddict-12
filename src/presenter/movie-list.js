import FilmsCard from "../view/film-card";
import FilmsList from "../view/films-list.js";
import SortFilms, {SortType} from "../view/sort-films.js";
import LoadMoreButton from "../view/load-more-button";
import PopupFilmDetails from "../view/popup-film-details";
import NoFilms from "../view/no-films.js";
import {render, remove, RenderPosition} from "../utils/render.js";
import {getDateFromString} from "../utils/common.js";

const SHOWN_FILM_CARDS_AMOUNT = 5;
const FILM_CARDS_AMOUNT_BY_BUTTON = 5;

const renderFilmCard = (filmsListElement, film) => {
  const body = document.querySelector(`body`);

  const openPopup = () => {
    body.appendChild(filmDetails.getElement());
  };

  const closePopup = () => {
    body.removeChild(filmDetails.getElement());
    document.removeEventListener(`keydown`, onEscKeyDown);
  };

  const onFilmCardElementClick = () => {
    openPopup();
    document.addEventListener(`keydown`, onEscKeyDown);
  };

  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      closePopup();
    }
  };

  const filmCard = new FilmsCard(film);

  filmCard.setPosterClickHandler(() => {
    onFilmCardElementClick();
  });

  filmCard.setTitleClickHandler(() => {
    onFilmCardElementClick();
  });

  filmCard.setCommentsClickHandler(() => {
    onFilmCardElementClick();
  });

  const filmDetails = new PopupFilmDetails(film);


  filmDetails.setCloseButtonClickHandler(() => {
    closePopup();
  });

  render(filmsListElement, filmCard, RenderPosition.BEFOREEND);
};

const renderFilmCards = (filmListElement, films) => {
  films.forEach((film) => {
    renderFilmCard(filmListElement, film);
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
    this._filmsList = new FilmsList();
    this._sortComponent = new SortFilms();
    this._loadMoreButton = new LoadMoreButton();
    this._noFilms = new NoFilms();
    this._shownFilmsCount = SHOWN_FILM_CARDS_AMOUNT;
    this._filmsListElement = this._filmsList.getElement().querySelector(`.films-list__container`);
  }

  _showMore(films) {
    const prevFilmsCount = this._shownFilmsCount;
    this._shownFilmsCount = this._shownFilmsCount + FILM_CARDS_AMOUNT_BY_BUTTON;

    const sortedFilmCards = getSortedFilmCards(films, this._sortComponent.getSortType(), prevFilmsCount, this._shownFilmsCount);
    renderFilmCards(this._filmsListElement, sortedFilmCards);

    if (this._shownFilmsCount >= films.length) {
      remove(this._loadMoreButton);
    }
  }

  render(films) {
    const renderShowMoreButton = () => {
      if (this._shownFilmsCount >= films.length) {
        return;
      }
      render(this._filmsListElement, this._loadMoreButton, RenderPosition.AFTEREND);
    };

    const container = this._container.getElement();

    if (films.length === 0) {
      render(container, this._noFilms, RenderPosition.BEFOREEND);
      return;
    }
    render(container, this._sortComponent, RenderPosition.BEFOREEND);
    render(container, this._filmsList, RenderPosition.BEFOREEND);

    renderFilmCards(this._filmsListElement, films.slice(0, this._shownFilmsCount));
    renderShowMoreButton();

    this._loadMoreButton.setClickHandler(() => {
      this._showMore(films);
    });

    this._sortComponent.setSortTypeChangeHandler((sortType) => {
      this._shownFilmsCount = FILM_CARDS_AMOUNT_BY_BUTTON;

      const sortedFilmCards = getSortedFilmCards(films, sortType, 0, this._shownFilmsCount);

      this._filmsListElement.innerHTML = ``;

      renderFilmCards(this._filmsListElement, sortedFilmCards);
      renderShowMoreButton();
    });
  }
}
