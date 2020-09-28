import Observer from '../utils/observer.js';
import {FilterType} from "../mock-data.js";

export default class Filter extends Observer {
  constructor() {
    super();
    this._activeFilterType = FilterType.ALL;
  }

  setFilter(updateType, filterType) {
    this._activeFilterType = filterType;
    this._notify(updateType, filterType);
  }

  getFilter() {
    return this._activeFilterType;
  }
}
