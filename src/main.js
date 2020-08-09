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

const TASK_FILMS = 5;
const EXTRA_FILM_CONTAINERS_AMOUNT = 2;

const mockFilms = generateFilms(TASK_FILMS);

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);

render(siteHeaderElement, createUserRank());
render(siteMainElement, createMainNavigation(), `afterbegin`);
render(siteMainElement, createSortFilms());
render(siteMainElement, createFilmsContainer());

const films = document.querySelector(`.films`);
const filmsList = films.querySelector(`.films-list`);
const filmsListContainer = films.querySelector(`.films-list__container`);
Array(TASK_FILMS).fill(``).forEach((el, i) => {
  render(filmsListContainer, createFilmsList(mockFilms[i]));
});

render(filmsList, createLoadMoreButtonTemplate());
Array(EXTRA_FILM_CONTAINERS_AMOUNT).fill(``).forEach(() => {
  render(films, createExtraFilmsContainer());
});

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
