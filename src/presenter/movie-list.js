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
    case SortType.RATINNG:
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
  }

  render(films) {
    const renderShowMoreButton = () => {
      if (shownFilmsCount >= films.length) {
        return;
      }

      const filmsListElement = container.querySelector(`.films-list__container`);
      render(filmsListElement, this._loadMoreButton, RenderPosition.AFTEREND);

      const onShowMoreButtonClick = () => {
        const prevFilmsCount = shownFilmsCount;
        shownFilmsCount = shownFilmsCount + FILM_CARDS_AMOUNT_BY_BUTTON;

        const sortedFilmCards = getSortedFilmCards(films, this._sortComponent.getSortType(), prevFilmsCount, shownFilmsCount);
        renderFilmCards(filmsListElement, sortedFilmCards);

        if (shownFilmsCount >= films.length) {
          remove(this._loadMoreButton);
        }
      };

      this._loadMoreButton.setClickHandler(() => {
        onShowMoreButtonClick();
      });
    };

    const container = this._container.getElement();

    if (films.length === 0) {
      render(container, this._noFilms, RenderPosition.BEFOREEND);
      return;
    }
    render(container, this._sortComponent, RenderPosition.BEFOREEND);
    render(container, this._filmsList, RenderPosition.BEFOREEND);

    const filmsListElement = container.querySelector(`.films-list__container`);

    let shownFilmsCount = SHOWN_FILM_CARDS_AMOUNT;
    renderFilmCards(filmsListElement, films.slice(0, shownFilmsCount));
    renderShowMoreButton();

    render(container, this._loadMoreButton, RenderPosition.BEFOREEND);

    this._sortComponent.setSortTypeChangeHandler((sortType) => {
      shownFilmsCount = FILM_CARDS_AMOUNT_BY_BUTTON;

      const sortedFilmCards = getSortedFilmCards(films, sortType, 0, shownFilmsCount);

      filmsListElement.innerHTML = ``;

      renderFilmCards(filmsListElement, sortedFilmCards);
      renderShowMoreButton();
    });
  }
}
