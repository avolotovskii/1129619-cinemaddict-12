import {createUserRank} from "./view/user-rank";
import {createMainNavigation} from "./view/main-navigation";
import {createSortFilms} from "./view/sort-films";
import {createFilmsContainer} from "./view/films-container";
import {createFilmsList} from "./view/film-list";
import {createExtraFilmsContainer} from "./view/extra-films-container";
import {createLoadMoreButtonTemplate} from "./view/load-more-button";
import {createExtraCardFilm} from "./view/extra-card-film";
import {createFooterStatistics} from "./view/footer-statistics";
import {createPopupFilmDetails} from "./view/popup-film-details";
import {generateFilms} from "./mock/film.js";
import {generateFilters} from "./mock/filters.js";

const EXTRA_FILM_CONTAINERS_AMOUNT = 2;
const TOTAL_FILMS_AMOUNT = 20;
const FILM_CARDS_AMOUNT_BY_BUTTON = 5;
const SHOWN_FILM_CARDS_AMOUNT = 5;

const mockFilms = generateFilms(TOTAL_FILMS_AMOUNT);
const filters = generateFilters();

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);

render(siteHeaderElement, createUserRank());
render(siteMainElement, createMainNavigation(filters), `afterbegin`);
render(siteMainElement, createSortFilms());
render(siteMainElement, createFilmsContainer());

const films = document.querySelector(`.films`);
const filmsList = films.querySelector(`.films-list`);
const filmsListContainer = films.querySelector(`.films-list__container`);
const renderFilmCards = (cardsAmount, container) => {
  Array(cardsAmount).fill(``).forEach((el, i) => {
    render(container, createFilmsList(mockFilms[i]));
  });
};

render(filmsList, createLoadMoreButtonTemplate());
Array(EXTRA_FILM_CONTAINERS_AMOUNT).fill(``).forEach(() => {
  render(films, createExtraFilmsContainer());
});

let shownFilmCardsAmount = SHOWN_FILM_CARDS_AMOUNT;

renderFilmCards(shownFilmCardsAmount, filmsListContainer);

const showMoreButton = filmsList.querySelector(`.films-list__show-more`);
const onShowMoreButtonClick = () => {
  const prevFilmsCount = shownFilmCardsAmount;
  shownFilmCardsAmount = shownFilmCardsAmount + FILM_CARDS_AMOUNT_BY_BUTTON;

  mockFilms.slice(prevFilmsCount, shownFilmCardsAmount)
  .forEach((film) => render(filmsListContainer, createFilmsList(film)));

  if (shownFilmCardsAmount >= mockFilms.length) {
    showMoreButton.remove();
  }
};

showMoreButton.addEventListener(`click`, onShowMoreButtonClick);

const filmsListExtraContainer = films.querySelectorAll(`.films-list--extra`);
filmsListExtraContainer.forEach((el) => {
  const filmsListExtra = el.querySelector(`.films-list__container`);
  Array(EXTRA_FILM_CONTAINERS_AMOUNT).fill(``).forEach(() => {
    render(filmsListExtra, createExtraCardFilm());
  });
});

const footer = document.querySelector(`.footer`);
render(footer, createFooterStatistics());
render(footer, createPopupFilmDetails(mockFilms[0]), `afterend`);

const popup = document.querySelector(`.film-details`);
const popupCloseButton = popup.querySelector(`.film-details__close-btn`);

const onPopupCloseButtonClick = () => {
  popup.remove();
};
popupCloseButton.addEventListener(`click`, onPopupCloseButtonClick);
