import UserRank from "./view/user-rank";
import FilterPresenter from "./presenter/filter";
import FilmsContainer from "./view/films-container";
import MovieList from "./presenter/movie-list.js";
import FooterStatistics from "./view/footer-statistics";
import FilmsModel from "./models/films.js";
import FilterModel from "./models/filter.js";
import {generateFilms} from "./mock/film.js";
import {render, RenderPosition} from "./utils/render.js";

const TOTAL_FILMS_AMOUNT = 20;

const films = generateFilms(TOTAL_FILMS_AMOUNT);
const filmsModel = new FilmsModel();
filmsModel.setFilms(films);
const filterModel = new FilterModel();

const siteHeader = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);

render(siteHeader, new UserRank(), RenderPosition.BEFOREEND);
const filterController = new FilterPresenter(siteMainElement, filterModel, filmsModel);
filterController.render();

const filmsContainer = new FilmsContainer();
const movieList = new MovieList(filmsContainer, filmsModel, filterModel, filterController);

render(siteMainElement, filmsContainer, RenderPosition.BEFOREEND);
movieList.render(films);

const siteFooter = document.querySelector(`.footer`);
if (films.length !== 0) {
  render(siteFooter, new FooterStatistics(TOTAL_FILMS_AMOUNT.TOTAL), RenderPosition.BEFOREEND);
} else {
  render(siteFooter, new FooterStatistics(0), RenderPosition.BEFOREEND);
}
