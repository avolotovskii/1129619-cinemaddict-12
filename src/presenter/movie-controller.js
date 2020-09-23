import FilmCard from "../view/film-card.js";
import FilmDetails from "../view/popup-film-details.js";
import {render, remove, replace, RenderPosition} from "../utils/render.js";

const Mode = {
  DEFAULT: `default`,
  DETAILS: `details`,
};

const body = document.querySelector(`body`);

export default class MovieController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._mode = Mode.DEFAULT;
    this._filmCard = null;
    this._filmDetails = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  render(film) {
    const oldFilmCard = this._filmCard;
    const oldFilmDetails = this._filmDetails;

    this._filmCard = new FilmCard(film);
    this._filmDetails = new FilmDetails(film);

    const openPopup = () => {
      body.appendChild(this._filmDetails.getElement());
    };

    const onFilmCardElementClick = () => {
      this._mode = Mode.DETAILS;
      openPopup(document.body, this._filmDetails);
      document.addEventListener(`keydown`, this._onEscKeyDown);
    };

    this._filmCard.setPosterClickHandler(() => {
      this._onViewChange();
      onFilmCardElementClick();
    });

    this._filmCard.setTitleClickHandler(() => {
      this._onViewChange();
      onFilmCardElementClick();
    });

    this._filmCard.setCommentsClickHandler(() => {
      this._onViewChange();
      onFilmCardElementClick();
    });

    this._filmCard.setWatchedButtonClickHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(this, film, Object.assign({}, film, {
        alreadyWatched: !film.alreadyWatched,
      }));
    });

    this._filmCard.setWatchlistButtonClickHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(this, film, Object.assign({}, film, {
        watchlist: !film.watchlist,
      }));
    });

    this._filmCard.setFavoritesButtonClickHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(this, film, Object.assign({}, film, {
        isFavorite: !film.isFavorite,
      }));
    });

    this._filmDetails.setCloseButtonClickHandler(() => {
      remove(this._filmDetails);
      this._filmDetails.clearCommentData();
      this._mode = Mode.DETAILS;
    });

    this._filmDetails.setWatchedButtonClickHandler(() => {
      this._onDataChange(this, film, Object.assign({}, film, {
        alreadyWatched: !film.alreadyWatched,
      }));
    });

    this._filmDetails.setWatchlistButtonClickHandler(() => {
      this._onDataChange(this, film, Object.assign({}, film, {
        watchlist: !film.watchlist,
      }));
    });

    this._filmDetails.setFavoritesButtonClickHandler(() => {
      this._onDataChange(this, film, Object.assign({}, film, {
        isFavorite: !film.isFavorite,
      }));
    });

    this._filmDetails.setEmojiClickHandler((evt) => {
      const currentEmoji = evt.target.value;
      const emojiContainer = document.querySelector(`.film-details__add-emoji-label`);
      emojiContainer.innerHTML = `<img src="images/emoji/${currentEmoji}.png" width="55" height="55" alt="emoji-${currentEmoji}">`;
    });

    this._filmDetails.setDeleteButtonClickHandler((evt) => {
      evt.preventDefault();

      const deleteButton = evt.target;
      const currentComment = deleteButton.closest(`.film-details__comment`);
      const commentItems = this._filmDetails.getElement().querySelectorAll(`.film-details__comment`);
      const commentsList = Array.from(commentItems);
      const currentCommentIndex = commentsList.indexOf(currentComment);
      const comments = film.comments;
      comments.splice(currentCommentIndex, 1);

      this._onDataChange(this, film, Object.assign({}, film, {comments}));
    });

    this._filmDetails.setAddCommentHandler((evt) => {
      const isCtrlandEnter = evt.key === `Enter` && (evt.ctrlKey || evt.metaKey);

      if (isCtrlandEnter) {
        const newComment = this._filmDetails.getCommentData();
        const newCommentsList = film.comments.concat(newComment);

        this._onDataChange(this, film, Object.assign({}, film, {
          comments: newCommentsList,
        }));
      }
    });

    if (oldFilmDetails && oldFilmCard) {
      replace(this._filmCard, oldFilmCard);
      replace(this._filmDetails, oldFilmDetails);
    } else {
      render(this._container, this._filmCard, RenderPosition.BEFOREEND);
    }
  }

  destroy() {
    remove(this._filmCard);
    remove(this._filmDetails);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      remove(this._filmDetails);
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      remove(this._filmDetails);
      this._filmDetails.clearCommentData();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }
}
