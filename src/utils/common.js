import moment from "moment";
const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(Math.random() * ((max + 1) - min));
};

const getRandomArrayItem = (data) => {
  const randomIndex = getRandomIntegerNumber(0, data.length - 1);

  return data[randomIndex];
};

const getRandomDecimalNumber = (min, max) => {
  return min + Math.random() * (max - min);
};

const shuffleArray = (data) => {
  let j;
  for (let i = data.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    [data[j], data[i]] = [data[i], data[j]];
  }
  return data;
};

const getRandomArray = (data, number) => {
  const arrayCopy = data.slice();
  const randomArray = shuffleArray(arrayCopy).slice(0, number);
  return randomArray;
};

const getFilmDuration = (duration) => {
  let hours = Math.floor(duration / 60);
  let minutes = duration % 60;
  const filmDuration = `${hours}h ${minutes}m`;
  return filmDuration;
};

const getShortDescription = (text, maxLength) => {
  let shortDescription = text;
  if (text.length > maxLength) {
    shortDescription = text.slice(0, maxLength);
    shortDescription += `&#133`;
  }
  return shortDescription;
};

const createFilmGenresMarkup = (genres) => {
  return genres
  .map((genre) => {
    return (
      `<span class="film-details__genre">${genre}</span>`
    );
  })
  .join(`\n`);
};

const formatDate = (date) => {
  return moment(date).format(`DD MMMM YYYY`);
};

const formatCommentDate = (date) => {
  return moment(date).fromNow();
};

const getDateFromString = (date) => {
  return moment(date).valueOf();
};

export {
  getRandomIntegerNumber,
  getRandomArrayItem,
  getRandomDecimalNumber,
  getRandomArray,
  getFilmDuration,
  getShortDescription,
  formatDate,
  formatCommentDate,
  createFilmGenresMarkup,
  getDateFromString
};
