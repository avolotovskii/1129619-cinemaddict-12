import {COMMENT_EMOJIS, COMMENT_TEXTS, COMMENT_AUTHORS, DATES} from "../mock-data.js";
import {getRandomArrayItem, formatCommentDate} from "../utils/common.js";

const generateComment = () => {
  return {
    id: String(new Date() + Math.random()),
    text: getRandomArrayItem(COMMENT_TEXTS),
    emoji: getRandomArrayItem(COMMENT_EMOJIS),
    author: getRandomArrayItem(COMMENT_AUTHORS),
    date: formatCommentDate(getRandomArrayItem(DATES)),
  };
};

const generateComments = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateComment);
};

export {generateComments};
