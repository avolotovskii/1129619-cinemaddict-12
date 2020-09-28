import AbstractSmart from "./abstract-smart.js";
import Comments from "./comments.js";
import {createFilmGenresMarkup} from "../utils/common.js";
import moment from "moment";
import {formatCommentDate} from "../utils/common.js";
import {encode} from "he";

export const createPopupFilmDetails = (film) => {
  const {title,
    alternativeTitle,
    rating,
    poster,
    ageRating,
    director,
    writers,
    actors,
    releaseDate,
    releaseCountry,
    duration,
    genres,
    description,
    comments,
    watchlist,
    alreadyWatched,
    isFavorite
  } = film;

  const genresMarkup = createFilmGenresMarkup(genres);

  const watchlistButtonChecked = watchlist ? `` : `checked`;
  const alreadyWatchedButtonChecked = alreadyWatched ? `` : `checked`;
  const isFavoriteButtonChecked = isFavorite ? `` : `checked`;
  const commentsSection = new Comments(comments).getTemplate();

  return (
    `<section class="film-details">
    <form class="film-details__inner" action="" method="get">
      <div class="form-details__top-container">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
        <div class="film-details__info-wrap">
          <div class="film-details__poster">
            <img class="film-details__poster-img" src="./${poster}" alt="">

            <p class="film-details__age">${ageRating}+</p>
          </div>

          <div class="film-details__info">
            <div class="film-details__info-head">
              <div class="film-details__title-wrap">
                <h3 class="film-details__title">${title}</h3>
                <p class="film-details__title-original">Original: ${alternativeTitle}</p>
              </div>

              <div class="film-details__rating">
                <p class="film-details__total-rating">${rating}</p>
              </div>
            </div>

            <table class="film-details__table">
              <tr class="film-details__row">
                <td class="film-details__term">Director</td>
                <td class="film-details__cell">${director}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Writers</td>
                <td class="film-details__cell">${writers}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Actors</td>
                <td class="film-details__cell">${actors}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Release Date</td>
                <td class="film-details__cell">${releaseDate}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Runtime</td>
                <td class="film-details__cell">${duration}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Country</td>
                <td class="film-details__cell">${releaseCountry}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">${genres.length === 1 ? `Genre` : `Genres`}</td>
                <td class="film-details__cell">${genresMarkup}</td>
              </tr>
            </table>

            <p class="film-details__film-description">
              ${description}
            </p>
          </div>
        </div>

        <section class="film-details__controls">
          <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${watchlistButtonChecked}>
          <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

          <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${alreadyWatchedButtonChecked}>
          <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

          <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${isFavoriteButtonChecked}>
          <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
        </section>
      </div>
      ${commentsSection}
    </form>
  </section>`
  );
};

export default class PopupFilmDetails extends AbstractSmart {
  constructor(film) {
    super();
    this._film = film;
  }

  getTemplate() {
    return createPopupFilmDetails(this._film);
  }

  setCloseButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, handler);
  }

  setWatchlistButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-details__control-label--watchlist`)
    .addEventListener(`click`, handler);
  }

  setWatchedButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-details__control-label--watched`)
    .addEventListener(`click`, handler);
  }

  setFavoritesButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-details__control-label--favorite`)
      .addEventListener(`click`, handler);
  }

  setEmojiClickHandler(handler) {
    this.getElement().querySelector(`.film-details__emoji-list`)
    .addEventListener(`change`, handler);
  }

  setDeleteButtonClickHandler(handler) {
    const deleteButtons = this.getElement().querySelectorAll(`.film-details__comment-delete`);
    Array.from(deleteButtons).forEach((button) => {
      button.addEventListener(`click`, handler);
    });
  }

  setAddCommentHandler(handler) {
    const commentField = this.getElement().querySelector(`.film-details__comment-input`);
    commentField.addEventListener(`keydown`, handler);
  }

  getCommentData() {
    const emojiElement = this.getElement().querySelector(`.film-details__add-emoji-label`).firstElementChild;
    const emojiName = emojiElement.alt.substring((`emoji-`).length);

    const comment = encode(this.getElement().querySelector(`.film-details__comment-input`).value);
    const date = moment().format();
    const emotion = emojiElement ? emojiName : ``;

    return {
      id: String(new Date() + Math.random()),
      text: comment,
      emoji: emotion,
      author: `User`,
      date: formatCommentDate(date),
    };
  }

  clearCommentData() {
    const comment = this.getElement().querySelector(`.film-details__comment-input`);
    comment.value = ``;
    const emoji = this.getElement().querySelector(`.film-details__add-emoji-label`).firstElementChild;

    if (emoji) {
      emoji.remove();
    }
  }
}
