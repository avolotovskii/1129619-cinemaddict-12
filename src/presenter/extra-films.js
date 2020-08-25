import ExtraFilmsContainer from "../view/extra-films-container.js";
import FilmCard from "../view/film-card.js";
import FilmDetails from "../view/popup-film-details.js";
import {render, openPopup, closePopup, RenderPosition} from "../utils/render.js";

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

  const filmCard = new FilmCard(film);

  filmCard.setPosterClickHandler(() => {
    onFilmCardElementClick();
  });

  filmCard.setTitleClickHandler(() => {
    onFilmCardElementClick();
  });

  filmCard.setCommentsClickHandler(() => {
    onFilmCardElementClick();
  });

  const filmDetails = new FilmDetails(film);

  filmDetails.setCloseButtonClickHandler(() => {
    closePopup(body, filmDetails);
  });

  render(filmsListElement, filmCard, RenderPosition.BEFOREEND);
};

export default class ExtraFilms {
  constructor(container, title) {
    this._container = container;
    this._title = title;
    this._extraFilmsContainer = new ExtraFilmsContainer(this._title);
  }

  renderExtraFilms(extraFilms) {
    const container = this._container.getElement();
    render(container, this._extraFilmsContainer, RenderPosition.BEFOREEND);
    const extraFilmsContainer = this._extraFilmsContainer.getElement().querySelector(`.films-list__container`);

    extraFilms.forEach((filmCard) => {
      renderFilmCard(extraFilmsContainer, filmCard);
    });
  }
}
