import {
  FILM_NAMES,
  ORIGIN_TITLES,
  POSTER_LINKS,
  DIRECTORS,
  WRITERS,
  ACTORS,
  RELEASE_COUNTRIES,
  GENRES,
  FILM_DESCRIPTIONS,
  MIN_RATING,
  MAX_RATING,
  MIN_AGE_RATING,
  MAX_AGE_RATING,
  MIN_WRITERS,
  MAX_WRITERS,
  MIN_ACTORS,
  MIN_YEARS_RANGE,
  MAX_YEARS_RANGE,
  MIN_FILM_DURATION,
  MAX_FILM_DURATION,
  MIN_GENRES,
  MIN_DESCRIPTION,
  MIN_COMMENTS_AMOUNT,
  MAX_COMMENTS_AMOUNT,
  NUMBER_COMMAS,
} from "../mock-data.js";
import {
  getRandomIntegerNumber,
  getRandomArrayItem,
  getRandomDecimalNumber,
  getRandomArray,
  getFilmDuration,
  getRandomDate
} from "../utils.js";

const generateFilm = () => {
  return {
    title: getRandomArrayItem(FILM_NAMES),
    alternativeTitle: getRandomArrayItem(ORIGIN_TITLES),
    rating: getRandomDecimalNumber(MIN_RATING, MAX_RATING).toFixed(NUMBER_COMMAS),
    poster: getRandomArrayItem(POSTER_LINKS),
    ageRating: getRandomIntegerNumber(MIN_AGE_RATING, MAX_AGE_RATING),
    director: getRandomArrayItem(DIRECTORS),
    writers: getRandomArray(WRITERS, getRandomIntegerNumber(MIN_WRITERS, MAX_WRITERS)),
    actors: getRandomArray(ACTORS, getRandomIntegerNumber(MIN_ACTORS, ACTORS.length)),
    releaseDate: getRandomDate(MIN_YEARS_RANGE, MAX_YEARS_RANGE),
    releaseCountry: getRandomArrayItem(RELEASE_COUNTRIES),
    duration: getFilmDuration(getRandomIntegerNumber(MIN_FILM_DURATION, MAX_FILM_DURATION)),
    genres: getRandomArray(GENRES, getRandomIntegerNumber(MIN_GENRES, GENRES.length)),
    description: getRandomArray(FILM_DESCRIPTIONS, getRandomIntegerNumber(MIN_DESCRIPTION, FILM_DESCRIPTIONS.length)),
    commentsAmount: getRandomIntegerNumber(MIN_COMMENTS_AMOUNT, MAX_COMMENTS_AMOUNT),
    watchlist: Math.random() > 0.5,
    alreadyWatched: Math.random() > 0.5,
    isFavorite: Math.random() > 0.5,
  };
};

// перенес данные из film.js сюда

import {generateComments} from "../mock/comment.js";
import {createFilmGenresMarkup} from "../utils.js";

const genresMarkup = createFilmGenresMarkup(generateFilm.genres);

const comments = generateComments(generateFilm.commentsAmount);
const commentsLength = comments.length;

const generateFilms = (count) => {
  return new Array(count)
  .fill(``)
  .map(generateFilm);
};

export {
  generateFilms,
  genresMarkup,
  commentsLength,
  comments
};
