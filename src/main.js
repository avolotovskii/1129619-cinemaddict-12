import UserRank from "./view/user-rank";
import MainNavigation from "./view/main-navigation";
import SortFilms from "./view/sort-films";
import FilmsContainer from "./view/films-container";
// import FilmsCard from "./view/film-card";
// import FilmsList from "./view/films-list.js";
import ExtraFilmsContainer from "./view/extra-films-container";
import MovieList from "./presenter/movie-list.js";
// import LoadMoreButtonTemplate from "./view/load-more-button";
import FooterStatistics from "./view/footer-statistics";
// import PopupFilmDetails from "./view/popup-film-details";
// import NoFilms from "./view/no-films.js";
import {generateFilms} from "./mock/film.js";
import {generateFilters} from "./mock/filters.js";
import {render, RenderPosition} from "./utils/render.js";

const TOTAL_FILMS_AMOUNT = 20;
// const SHOWN_FILM_CARDS_AMOUNT = 5;
// const FILM_CARDS_AMOUNT_BY_BUTTON = 5;
const EXTRA_FILM_CARDS_AMOUNT = 2;

// const renderFilmCard = (filmsListElement, film) => {
//   const body = document.querySelector(`body`);

//   const onFilmCardElementClick = () => {
//     openPopup(body, filmDetails);
//     document.addEventListener(`keydown`, onEscKeyDown);
//   };

//   const onEscKeyDown = (evt) => {
//     const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

//     if (isEscKey) {
//       closePopup(body, filmDetails);
//       document.removeEventListener(`keydown`, onEscKeyDown);
//     }
//   };

// const filmCard = new FilmsCard(film);

// filmCard.setPosterClickHandler(() => {
//   onFilmCardElementClick();
// });

// filmCard.setTitleClickHandler(() => {
//   onFilmCardElementClick();
// });

// filmCard.setCommentsClickHandler(() => {
//   onFilmCardElementClick();
// });

// const filmDetails = new PopupFilmDetails(film);

// const filmDetailsCloseButton = filmDetails.getElement().querySelector(`.film-details__close-btn`);

// подумать что с ним делать
// closePopup(body, filmDetails);
// const onFilmDetailsCloseButtonClick = () => {
//   body.removeChild(filmDetails.getElement());
//   document.removeEventListener(`keydown`, onEscKeyDown);
// };

// filmDetailsCloseButton.addEventListener(`click`, onFilmDetailsCloseButtonClick);

//   render(filmsListElement, filmCard, RenderPosition.BEFOREEND);
// };

// const renderFilms = (filmsContainer, films) => {
//   if (films.length === 0) {
//     render(filmsContainer.getElement(), new NoFilms(), RenderPosition.BEFOREEND);
//     return;
//   }
//   render(filmsContainer.getElement(), new FilmsList(), RenderPosition.BEFOREEND);

// const filmsListElement = filmsContainer.getElement().querySelector(`.films-list__container`);

// let shownFilmCardsAmount = SHOWN_FILM_CARDS_AMOUNT;
// films.slice(0, shownFilmCardsAmount)
//   .forEach((filmCard) => {
//     renderFilmCard(filmsListElement, filmCard);
//   });

// const showMoreButton = new LoadMoreButtonTemplate();
//   render(filmsContainer.getElement(), showMoreButton, RenderPosition.BEFOREEND);

//   const onShowMoreButtonClick = () => {
//     const prevFilmsCount = shownFilmCardsAmount;
//     shownFilmCardsAmount = shownFilmCardsAmount + FILM_CARDS_AMOUNT_BY_BUTTON;

//     films.slice(prevFilmsCount, shownFilmCardsAmount)
//     .forEach((filmCard) => renderFilmCard(filmsListElement, filmCard));

//     if (shownFilmCardsAmount >= films.length) {
//       remove(showMoreButton);
//       showMoreButton.removeElement();
//     }
//   };

//   showMoreButton.setClickHandler(`click`, onShowMoreButtonClick);
// };

const films = generateFilms(TOTAL_FILMS_AMOUNT);
const filters = generateFilters();

const siteHeader = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);

render(siteHeader, new UserRank(), RenderPosition.BEFOREEND);
render(siteMainElement, new MainNavigation(filters), RenderPosition.BEFOREEND);
render(siteMainElement, new SortFilms(), RenderPosition.BEFOREEND);

const filmsContainer = new FilmsContainer();
// render(siteMainElement, filmsContainer, RenderPosition.BEFOREEND);
// renderFilms(filmsContainer, films);
const movieList = new MovieList(filmsContainer);

// const renderExtraFilms = (title) => {
//   const extraFilmsComponent = new ExtraFilmsContainer(title);
//   render(filmsContainer.getElement(), extraFilmsComponent, RenderPosition.BEFOREEND);
//   const extraFilmsContainer = extraFilmsComponent.getElement().querySelector(`.films-list__container`);

//   const extraFilmCards = generateFilms(EXTRA_FILM_CARDS_AMOUNT);
//   extraFilmCards.forEach((filmCard) => {
//     renderFilmCard(extraFilmsContainer, filmCard);
//   });
// };

render(siteMainElement, filmsContainer, RenderPosition.BEFOREEND);
movieList.render(films);

const topRatedController = new ExtraFilmsContainer(filmsContainer, `Top Rated`);
const mostCommentedController = new ExtraFilmsContainer(filmsContainer, `Most Commented`);
const extraFilmCards = generateFilms(EXTRA_FILM_CARDS_AMOUNT);

// renderExtraFilms(`Top Rated`);
// renderExtraFilms(`Most Commented`);

topRatedController.renderExtraFilms(extraFilmCards);
mostCommentedController.renderExtraFilms(extraFilmCards);

const siteFooter = document.querySelector(`.footer`);
if (films.length !== 0) {
  render(siteFooter, new FooterStatistics(TOTAL_FILMS_AMOUNT.TOTAL), RenderPosition.BEFOREEND);
} else {
  render(siteFooter, new FooterStatistics(0), RenderPosition.BEFOREEND);
}
