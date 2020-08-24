import FilmsCard from "../view/film-card";
import FilmsList from "../view/films-list.js";
import LoadMoreButtonTemplate from "../view/load-more-button";
import PopupFilmDetails from "../view/popup-film-details";
import NoFilms from "../view/no-films.js";
import {render, openPopup, closePopup, remove, RenderPosition} from "../utils/render.js";

const SHOWN_FILM_CARDS_AMOUNT = 5;
const FILM_CARDS_AMOUNT_BY_BUTTON = 5;

const renderFilmCard = (filmsListElement, film) => {
  const body = document.querySelector(`body`);

  const onFilmCardElementClick = () => {
    openPopup(body, filmDetails);
    document.addEventListener(`keydown`, onEscKeyDown);
  };

  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      closePopup(body, filmDetails);
      document.removeEventListener(`keydown`, onEscKeyDown);
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
    closePopup(body, filmDetails);
  });

  render(filmsListElement, filmCard, RenderPosition.BEFOREEND);
};

export default class MovieList {
  constructor(container) {
    this._container = container;
    this._filmsListComponent = new FilmsList();
    this._showMoreButtonComponent = new LoadMoreButtonTemplate();
    this._noFilmsComponent = new NoFilms();
  }

  render(films) {
    const container = this._container.getElement();

    if (films.length === 0) {
      render(container, this._noFilms, RenderPosition.BEFOREEND);
      return;
    }
    render(container, this._filmsList, RenderPosition.BEFOREEND);

    const filmsListElement = container.querySelector(`.films-list__container`);

    let shownFilmCardsAmount = SHOWN_FILM_CARDS_AMOUNT;
    films.slice(0, shownFilmCardsAmount)
      .forEach((filmCard) => {
        renderFilmCard(filmsListElement, filmCard);
      });

    render(container, this._showMoreButton, RenderPosition.BEFOREEND);

    const onShowMoreButtonClick = () => {
      const prevFilmsCount = shownFilmCardsAmount;
      shownFilmCardsAmount = shownFilmCardsAmount + FILM_CARDS_AMOUNT_BY_BUTTON;

      films.slice(prevFilmsCount, shownFilmCardsAmount)
      .forEach((filmCard) => renderFilmCard(filmsListElement, filmCard));

      if (shownFilmCardsAmount >= films.length) {
        remove(this._showMoreButton);
        this._showMoreButton.removeElement();
      }
    };

    this._showMoreButton.setClickHandler(() => {
      onShowMoreButtonClick();
    });
  }
}
