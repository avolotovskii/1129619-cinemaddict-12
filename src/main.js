import UserRank from "./view/user-rank";
import MainNavigation from "./view/main-navigation";
import SortFilms from "./view/sort-films";
import FilmsContainer from "./view/films-container";
import FilmsCard from "./view/film-card";
import FilmsList from "./view/films-list.js";
import ExtraFilmsContainer from "./view/extra-films-container";
import LoadMoreButtonTemplate from "./view/load-more-button";
import FooterStatistics from "./view/footer-statistics";
import PopupFilmDetails from "./view/popup-film-details";
import NoFilms from "./view/no-films.js";
import {generateFilms} from "./mock/film.js";
import {generateFilters} from "./mock/filters.js";
import {render, RenderPosition} from "./utils";

const TOTAL_FILMS_AMOUNT = 20;
const SHOWN_FILM_CARDS_AMOUNT = 5;
const FILM_CARDS_AMOUNT_BY_BUTTON = 5;

const EXTRA_FILM_CARDS_AMOUNT = 2;

const renderFilmCard = (filmsListElement, film) => {
  const body = document.querySelector(`body`);

  const openPopup = () => {
    body.appendChild(filmDetails.getElement());
  };

  const onFilmCardElementClick = () => {
    openPopup();
    document.addEventListener(`keydown`, onEscKeyDown);
  };

  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      onFilmDetailsCloseButtonClick();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const filmCard = new FilmsCard(film);
  const filmPoster = filmCard.getElement().querySelector(`.film-card__poster`);
  filmPoster.addEventListener(`click`, onFilmCardElementClick);

  const filmTitle = filmCard.getElement().querySelector(`.film-card__title`);
  filmTitle.addEventListener(`click`, onFilmCardElementClick);

  const filmComments = filmCard.getElement().querySelector(`.film-card__comments`);
  filmComments.addEventListener(`click`, onFilmCardElementClick);

  const filmDetails = new PopupFilmDetails(film);

  const filmDetailsCloseButton = filmDetails.getElement().querySelector(`.film-details__close-btn`);

  const onFilmDetailsCloseButtonClick = () => {
    body.removeChild(filmDetails.getElement());
  };

  filmDetailsCloseButton.addEventListener(`click`, onFilmDetailsCloseButtonClick);

  render(filmsListElement, filmCard.getElement(), RenderPosition.BEFOREEND);
};

const renderFilms = (filmsContainer, films) => {
  if (films.length === 0) {
    render(filmsContainer.getElement(), new NoFilms().getElement(), RenderPosition.BEFOREEND);
    return;
  }
  render(filmsContainer.getElement(), new FilmsList().getElement(), RenderPosition.BEFOREEND);

  const filmsListElement = filmsContainer.getElement().querySelector(`.films-list__container`);

  let shownFilmCardsAmount = SHOWN_FILM_CARDS_AMOUNT;
  films.slice(0, shownFilmCardsAmount)
    .forEach((filmCard) => {
      renderFilmCard(filmsListElement, filmCard);
    });

  const showMoreButton = new LoadMoreButtonTemplate();
  render(filmsContainer.getElement(), showMoreButton.getElement(), RenderPosition.BEFOREEND);

  const onShowMoreButtonClick = () => {
    const prevFilmsCount = shownFilmCardsAmount;
    shownFilmCardsAmount = shownFilmCardsAmount + FILM_CARDS_AMOUNT_BY_BUTTON;

    films.slice(prevFilmsCount, shownFilmCardsAmount)
    .forEach((filmCard) => renderFilmCard(filmsListElement, filmCard));

    if (shownFilmCardsAmount >= films.length) {
      showMoreButton.getElement().remove();
      showMoreButton.removeElement();
    }
  };

  showMoreButton.getElement().addEventListener(`click`, onShowMoreButtonClick);
};

const films = generateFilms(TOTAL_FILMS_AMOUNT);
const filters = generateFilters();

const siteHeader = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);

render(siteHeader, new UserRank().getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new MainNavigation(filters).getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new SortFilms().getElement(), RenderPosition.BEFOREEND);

const filmsContainer = new FilmsContainer();
render(siteMainElement, filmsContainer.getElement(), RenderPosition.BEFOREEND);
renderFilms(filmsContainer, films);

const renderExtraFilms = (title) => {
  const extraFilmsComponent = new ExtraFilmsContainer(title);
  render(filmsContainer.getElement(), extraFilmsComponent.getElement(), RenderPosition.BEFOREEND);
  const extraFilmsContainer = extraFilmsComponent.getElement().querySelector(`.films-list__container`);

  const extraFilmCards = generateFilms(EXTRA_FILM_CARDS_AMOUNT);
  extraFilmCards.forEach((filmCard) => {
    renderFilmCard(extraFilmsContainer, filmCard);
  });
};

renderExtraFilms(`Top Rated`);
renderExtraFilms(`Most Commented`);

const siteFooter = document.querySelector(`.footer`);
if (films.length !== 0) {
  render(siteFooter, new FooterStatistics(TOTAL_FILMS_AMOUNT.TOTAL).getElement(), RenderPosition.BEFOREEND);
} else {
  render(siteFooter, new FooterStatistics(0).getElement(), RenderPosition.BEFOREEND);
}
