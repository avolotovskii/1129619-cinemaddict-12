import {MAX_DESCRIPTION_DURATION} from "../mock-data.js";
import {createElement, getShortDescription} from "../utils.js";

export const createFilmsCard = (film) => {
  const {title, rating, releaseDate, duration, genres, poster, description, comments, watchlist, alreadyWatched, isFavorite} = film;
  const genre = genres[0];
  const shortDescription = getShortDescription(description.join(` `), MAX_DESCRIPTION_DURATION);
  const watchlistButtonActiveClass = watchlist ? `` : `film-card__controls-item--active`;
  const alreadyWatchedButtonActiveClass = alreadyWatched ? `` : `film-card__controls-item--active`;
  const isFavoriteButtonActiveClass = isFavorite ? `` : `film-card__controls-item--active`;

  return (
    `<article class="film-card">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${releaseDate}</span>
        <span class="film-card__duration">${duration}</span>
        <span class="film-card__genre">${genre}</span>
      </p>
      <img src="./${poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${shortDescription}</p>
      <a class="film-card__comments">${comments.length} comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${watchlistButtonActiveClass}">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${alreadyWatchedButtonActiveClass}">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite ${isFavoriteButtonActiveClass}">Mark as favorite</button>
      </form>
    </article>`
  );
};

export default class FilmCard {
  constructor(film) {
    this._film = film;
    this._element = null;
  }

  getTemplate() {
    return createFilmsCard(this._film);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

