export const UPDATE_SEARCH = 'UPDATE_SEARCH';
export const UPDATE_FAVORITES = 'UPDATE_FAVORITES';
export const UPDATE_RESULTS = 'UPDATE_RESULTS';
export const UPDATE_QUERY = 'UPDATE_QUERY';
export const SET_SHOW_FAVORITES = 'SET_SHOW_FAVORITES';
export const UPDATE_CURRENT_PAGE = 'UPDATE_CURRENT_PAGE';
export const UPDATE_OFFSET = 'UPDATE_OFFSET';



export function updateSearch(e_or_value) {
  return {
    type: UPDATE_SEARCH,
    payload: e_or_value.target ? e_or_value.target.value : e_or_value
  }
}

export function updateFavorites(favorites) {
  return {
    type: UPDATE_FAVORITES,
    payload: favorites
  }
}

export function updateResults(results) {
  return {
    type: UPDATE_RESULTS,
    payload: results
  }
}

export function updateQuery(query) {
  return {
    type: UPDATE_QUERY,
    payload: query
  }
}

export function setShowFavorites(show_favorites) {
  return {
    type: SET_SHOW_FAVORITES,
    payload: show_favorites
  }
}

export function updateCurrentPage(page) {
  return {
    type: UPDATE_CURRENT_PAGE,
    payload: page
  }
}

export function updateOffset(offset) {
  return {
    type: UPDATE_OFFSET,
    payload: offset
  }
}