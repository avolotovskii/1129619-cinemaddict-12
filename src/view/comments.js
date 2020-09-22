import AbstractView from "./abstract.js";

const EMOJIS = [`smile`, `sleeping`, `puke`, `angry`];

const createEmojiMarkup = (emojiList) => {
  return emojiList
  .map((emoji) => {
    return (
      `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emoji}" value="${emoji}">
    <label class="film-details__emoji-label" for="emoji-${emoji}">
      <img src="./images/emoji/${emoji}.png" width="30" height="30" alt="emoji">
    </label>`
    );
  })
  .join(`\n`);
};

const createCommentsListMarkup = (comment) => {
  const {emoji, text, author, date} = comment;
  return (
    `<li class="film-details__comment">
        <span class="film-details__comment-emoji">
        <img src="./images/emoji/${emoji}.png" width="55" height="55" alt="emoji-${emoji}">
        </span>
        <div>
          <p class="film-details__comment-text">${text}</p>
          <p class="film-details__comment-info">
            <span class="film-details__comment-author">${author}</span>
            <span class="film-details__comment-day">${date}</span>
            <button class="film-details__comment-delete">Delete</button>
          </p>
        </div>
      </li>`
  );
};

const createCommentsSectionTemplate = (comments) => {
  const commentsList = comments.map((comment) => {
    return createCommentsListMarkup(comment);
  }).join(`\n`);
  const emojiList = createEmojiMarkup(EMOJIS);
  return (
    `<div class="form-details__bottom-container">
    <section class="film-details__comments-wrap">
    <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

    <ul class="film-details__comments-list">
      ${commentsList}
    </ul>

    <div class="film-details__new-comment">
      <div for="add-emoji" class="film-details__add-emoji-label"></div>

      <label class="film-details__comment-label">
        <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
      </label>

      <div class="film-details__emoji-list">
        ${emojiList}
      </div>
    </div>
  </section>
</div>`
  );
};

export default class Comment extends AbstractView {
  constructor(comments) {
    super();

    this._comments = comments;
  }

  getTemplate() {
    return createCommentsSectionTemplate(this._comments);
  }
}
