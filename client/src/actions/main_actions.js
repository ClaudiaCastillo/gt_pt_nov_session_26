import axios from 'axios';

export const UPDATE_RESULTS = 'UPDATE_RESULTS';
export const UPDATE_SEARCH = 'UPDATE_SEARCH';
export const UPDATE_QUERY = 'UPDATE_QUERY';
export const UPDATE_CURRENT_PAGE = 'UPDATE_CURRENT_PAGE';
export const UPDATE_OFFSET = 'UPDATE_OFFSET';
export const UPDATE_FAVORITES = 'UPDATE_FAVORITES';
export const SET_SHOW_FAVORITES = 'SET_SHOW_FAVORITES';

// Helpers
function getUserFavorites() {
  return axios.get(`/api/favorites?email=${localStorage.getItem('user_email')}`);
}

function deleteFavorite(gif_id) {
  return axios.delete(`/api/gif/?gif_id=${gif_id}&email=${localStorage.getItem('user_email')}`);
}

// Update Actions
function updateResults(results) {
  return {
    type: UPDATE_RESULTS,
    payload: results
  }
}

function updateQuery(query) {
  return {
    type: UPDATE_QUERY,
    payload: query
  }
}

function updateCurrentPage(page) {
  return {
    type: UPDATE_CURRENT_PAGE,
    payload: page
  }
}

function updateOffset(offset) {
  return {
    type: UPDATE_OFFSET,
    payload: offset
  }
}

function updateFavorites(favorites) {
  return {
    type: UPDATE_FAVORITES,
    payload: favorites
  }
}

export function updateSearch(e) {
  return {
    type: UPDATE_SEARCH,
    payload: e.target ? e.target.value : e
  }
}

// Dispatches
export function switchTab(show_favorites) {
  return dispatch => {
    if (show_favorites) {
      getUserFavorites()
        .then(res => {
          dispatch(updateFavorites(res.data ? res.data : []));
          dispatch(setShowFavorites(true));
        });

    } else dispatch(setShowFavorites(false));
  }
}

export function changePage(up) {
  return (dispatch, getState) => {
    let { offset, current_page } = getState();

    if (!up && current_page < 2) return;

    dispatch(updateCurrentPage(up ? current_page + 1 : current_page > 1 ? current_page - 1 : current_page));
    dispatch(updateOffset(up ? offset + 25 : current_page > 1 ? offset - 25 : offset));

    dispatch(getSearchResults('page'));
  }
}

export function setShowFavorites(show_favorites) {
  return {
    type: SET_SHOW_FAVORITES,
    payload: show_favorites
  }
}

export function setFavorite(gif, index, favorite_listing) {
  return (dispatch, getState) => {
    let email = localStorage.getItem('user_email');
    let { results } = getState();

    if (!gif.favorite && !favorite_listing) {
      axios.post('/api/gif', {
        gif_id: gif.id,
        url: gif.url,
        email: email
      }).then(res => {
        results[index].favorite = true;

        dispatch(updateResults([...results]));
      });
    } else {
      deleteFavorite(favorite_listing ? gif.gif_id : gif.id)
        .then(() => {

          if ( favorite_listing ) {
            let { favorites } = getState();

            favorites.splice(index, 1);
            dispatch(updateFavorites([...favorites]));
          } else {
            results[index].favorite = false;
            dispatch(updateResults([...results]));
          }

        });
    }
  }
}

export function getSearchResults(e) {
  return (dispatch, getState) => {
    let is_page = e === 'page';
    let key = e.keyCode || e.which;
    
    if ( is_page || e.target.tagName === 'I' || key === 13 ) {

      getUserFavorites()
      .then(res => {
        dispatch(updateFavorites(res.data));

        let api_url = 'https://api.giphy.com/v1/gifs/search';
        let api_key = '3K2ZmyEMrXGGyR7EGBGnbti1HZNk2TZL';
        let { search, offset, favorites, query } = getState();

        search = is_page ? query : search;

        axios.get(`${api_url}?api_key=${api_key}&q=${search}&offset=${offset}`)
          .then(({ data: gifs }) => {
            let results = [];

            gifs.data.forEach(gif => {
              let image = new Image();
              let src = gif.images.downsized.url;

              image.src = src;
              image.onload = () => {
                results.push({ 
                  id: gif.id, 
                  url: src, 
                  favorite: favorites.find(fav => fav.gif_id === gif.id) ? true : false 
                });

                dispatch(updateResults([...results]));

                image.remove();
              }
            });

            dispatch(updateQuery(search));
            dispatch(updateSearch(''));
            dispatch(setShowFavorites(false));
          });
      });

    }
  }
}




