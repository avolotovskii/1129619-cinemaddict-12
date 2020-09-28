import FilterView from "../view/filter.js";
import {FilterType} from "../mock-data.js";
import {render, replace, RenderPosition} from "../utils/render.js";
import {getFilmsByFilter} from "../utils/filter.js";

export default class FilterPresenter {
  constructor(container, filterModel, filmsModel) {
    this._container = container;
    this._filmsModel = filmsModel;
    this._filterModel = filterModel;

    this._activeFilterType = FilterType.ALL;
    this._filterComponent = null;

    this._onFilterChange = this._onFilterChange.bind(this);
  }

  render() {
    const container = this._container;
    const allFilms = this._filmsModel.getFilms();

    const filters = Object.values(FilterType).map((filterType) => {
      return {
        name: filterType,
        count: getFilmsByFilter(allFilms, filterType).length,
        checked: filterType === this._activeFilterType,
      };
    });
    const oldComponent = this._filterComponent;

    this._filterComponent = new FilterView(filters);
    this._filterComponent.setFilterChangeHandler(this._onFilterChange);

    if (oldComponent) {
      replace(this._filterComponent, oldComponent);
    } else {
      render(container, this._filterComponent, RenderPosition.BEFOREEND);
    }
  }

  _onFilterChange(filterType) {
    this._filterModel.setFilter(`MAJOR`, filterType);
    this._activeFilterType = filterType;
  }
}
