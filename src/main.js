import UserRank from "./view/user-rank";
import MainNavigation from "./view/main-navigation";
import FilmsContainer from "./view/films-container";
import MovieList from "./presenter/movie-list.js";
import FooterStatistics from "./view/footer-statistics";
import ExtraFilms from "./view/extra-films.js";
import {generateFilms} from "./mock/film.js";
import {generateFilters} from "./mock/filters.js";
import {render, RenderPosition} from "./utils/render.js";

const TOTAL_FILMS_AMOUNT = 20;
const EXTRA_FILM_CARDS_AMOUNT = 2;

const films = generateFilms(TOTAL_FILMS_AMOUNT);
const filters = generateFilters();

const siteHeader = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);

render(siteHeader, new UserRank(), RenderPosition.BEFOREEND);
render(siteMainElement, new MainNavigation(filters), RenderPosition.BEFOREEND);

const filmsContainer = new FilmsContainer();
const movieList = new MovieList(filmsContainer);

render(siteMainElement, filmsContainer, RenderPosition.BEFOREEND);
movieList.render(films);

const topRatedController = new ExtraFilms(filmsContainer, `Top Rated`);
const mostCommentedController = new ExtraFilms(filmsContainer, `Most Commented`);
const extraFilmCards = generateFilms(EXTRA_FILM_CARDS_AMOUNT);

if (films.length !== 0) {
  topRatedController.renderExtraFilms(extraFilmCards);
  mostCommentedController.renderExtraFilms(extraFilmCards);
}

const siteFooter = document.querySelector(`.footer`);
if (films.length !== 0) {
  render(siteFooter, new FooterStatistics(TOTAL_FILMS_AMOUNT.TOTAL), RenderPosition.BEFOREEND);
} else {
  render(siteFooter, new FooterStatistics(0), RenderPosition.BEFOREEND);
}
