import {
  UPDATE_SEARCH, 
  UPDATE_FAVORITES,
  UPDATE_RESULTS,
  UPDATE_QUERY,
  SET_SHOW_FAVORITES,
  UPDATE_CURRENT_PAGE,
  UPDATE_OFFSET
} from '../actions/actions';

export function reducer(state, {type, payload}) {
  switch (type) {
    case UPDATE_SEARCH:
      return { ...state, search: payload };
    case UPDATE_FAVORITES:
      return { ...state, favorites: payload }
    case UPDATE_RESULTS:
      return { ...state, results: payload }
    case UPDATE_QUERY:
      return { ...state, query: payload }
    case SET_SHOW_FAVORITES:
      return { ...state, show_favorites: payload }
    case UPDATE_CURRENT_PAGE:
      return { ...state, current_page: payload }
    case UPDATE_OFFSET:
      return { ...state, offset: payload }
    default:
      return state;
  }
}