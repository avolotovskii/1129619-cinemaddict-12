const MAX_DESCRIPTION_DURATION = 139;

const MIN_RATING = 0;
const MAX_RATING = 10;
const MIN_AGE_RATING = 0;
const MAX_AGE_RATING = 18;
const MIN_WRITERS = 0;
const MAX_WRITERS = 3;
const MIN_ACTORS = 1;
const MIN_FILM_DURATION = 60;
const MAX_FILM_DURATION = 300;
const MIN_GENRES = 1;
const MIN_DESCRIPTION = 1;
const MIN_COMMENTS_AMOUNT = 0;
const MAX_COMMENTS_AMOUNT = 5;
const NUMBER_COMMAS = 1;

const FILM_NAMES = [
  `Made for Each Other`,
  `The Dance of Life`,
  `Sagebrush Trail`,
  `The Man with the Golden Arm`,
  `Santa Claus Conquers the Martians`,
  `Popeye the Sailor Meets Sindbad the Sailor`,
];

const ORIGIN_TITLES = [
  `A Lion Who Sold The Void`,
  `A Lion On Us`,
  `Laziness In Us`,
  `A Shark Who Sold The Floor`,
  `A Man In The Floor`,
  `A Tale Of A Little Bird In Himself`,
];

const POSTER_LINKS = [
  `images/posters/made-for-each-other.png`,
  `images/posters/popeye-meets-sinbad.png`,
  `images/posters/sagebrush-trail.jpg`,
  `images/posters/santa-claus-conquers-the-martians.jpg`,
  `images/posters/the-dance-of-life.jpg`,
  `images/posters/the-great-flamarion.jpg`,
  `images/posters/the-man-with-the-golden-arm.jpg`,
];

const DIRECTORS = [
  `Quentin Tarantino`,
  `Clint Eastwood`,
  `Brad Pitt`,
  `Brad Bird`,
  `Chrostopher Nolan`,
  `Konstantin Habenskiy`,
];

const WRITERS = [
  `Brad Bird`,
  `Robert Rodrigues`,
  `Takeshi Kitano`,
  `Hayao Miazaki`,
  `Robert Zemeckis`,
  `Martin Scorsese`,
  `Stephen King`,
];

const ACTORS = [
  `Winona Ryder`,
  `Matt Damon`,
  `Tom Hanks`,
  `Angelina Jolie`,
  `Christian Bale`,
  `Gary Oldman`,
  `Julianne Moore`,
  `Ralph Fiennes`,
  `Morgan Freeman`,
  `Leonardo DiCaprio`,
  `Michael Caine`,
  `Keanu Reeves`,
];

const RELEASE_COUNTRIES = [
  `Russia`,
  `USA`,
  `France`,
  `Spain`,
  `China`,
  `Finland`,
  `Italy`,
];

const GENRES = [
  `Action`,
  `Sci-Fi`,
  `Comedy`,
  `Adventure`,
  `Animation`,
  `Thriller`,
  `Horror`,
  `Musical`,
];

const FILM_DESCRIPTIONS = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus.`,
];

const COMMENT_EMOJIS = [
  `angry`,
  `puke`,
  `sleeping`,
  `smile`,
];

const COMMENT_TEXTS = [
  `Good!`,
  `Bad!`,
  `Very very nice`,
  `Almost four hours? Seriously?`,
];

const COMMENT_AUTHORS = [
  `Evgeniy Onegin`,
  `Allen Blake`,
  `Andy Panda`,
  `Anna Karenina`,
  `Mihail Krug`,
];

const DATES = [
  `2014-03-11T10:55:50.535Z`,
  `2017-12-05T14:44:55.559Z`,
  `2000-07-31T06:11:52.261Z`,
  `2004-06-16T23:47:02.983Z`,
  `1993-06-13T05:36:11.243Z`,
  `2001-08-19T23:47:52.810Z`,
  `2013-06-05T17:14:49.575Z`,
];

const FilterType = {
  ALL: `All movies`,
  WATCHLIST: `Watchlist `,
  HISTORY: `History `,
  FAVORITES: `Favorites `,
};

export {
  MAX_DESCRIPTION_DURATION,
  FILM_NAMES,
  ORIGIN_TITLES,
  POSTER_LINKS,
  DIRECTORS,
  WRITERS,
  ACTORS,
  RELEASE_COUNTRIES,
  GENRES,
  FILM_DESCRIPTIONS,
  COMMENT_EMOJIS,
  COMMENT_TEXTS,
  COMMENT_AUTHORS,
  MIN_RATING,
  MAX_RATING,
  MIN_AGE_RATING,
  MAX_AGE_RATING,
  MIN_WRITERS,
  MAX_WRITERS,
  MIN_ACTORS,
  MIN_FILM_DURATION,
  MAX_FILM_DURATION,
  MIN_GENRES,
  MIN_DESCRIPTION,
  MIN_COMMENTS_AMOUNT,
  MAX_COMMENTS_AMOUNT,
  NUMBER_COMMAS,
  DATES,
  FilterType,
};
