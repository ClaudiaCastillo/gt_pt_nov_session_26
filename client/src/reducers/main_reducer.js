import { 
  UPDATE_RESULTS, 
  UPDATE_SEARCH, 
  UPDATE_QUERY, 
  UPDATE_OFFSET, 
  UPDATE_FAVORITES, 
  SET_SHOW_FAVORITES,
  UPDATE_CURRENT_PAGE
} from '../actions/main_actions';

export function reducer(state, {type, payload}) {
  switch (type) {
    case UPDATE_SEARCH:
      return { ...state, search: payload };
    case UPDATE_QUERY:
      return { ...state, query: payload };
    case UPDATE_RESULTS:
      return { ...state, results: payload };
    case UPDATE_CURRENT_PAGE:
      return { ...state, current_page: payload };
    case UPDATE_OFFSET:
      return { ...state, offset: payload };
    case UPDATE_FAVORITES:
      return { ...state, favorites: payload };
    case SET_SHOW_FAVORITES:
      return { ...state, show_favorites: payload };
    default:
      return state;
  }
}