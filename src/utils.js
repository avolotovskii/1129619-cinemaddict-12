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

const getRandomDate = (date1, date2) => {
  function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }
  date1 = new Date(date1).getTime();
  date2 = new Date(date2).getTime();
  if (date1 > date2) {
    return new Date(getRandomArbitrary(date2, date1)).toLocaleDateString();
  } else {
    return new Date(getRandomArbitrary(date1, date2)).toLocaleDateString();
  }
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


export {
  getRandomIntegerNumber,
  getRandomArrayItem,
  getRandomDecimalNumber,
  getRandomArray,
  getFilmDuration,
  getShortDescription,
  getRandomDate,
  createFilmGenresMarkup
};
