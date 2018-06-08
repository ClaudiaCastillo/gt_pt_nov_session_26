import * as actions from './actions';
import axios from 'axios';

// Helpers
function getUserFavorites() {
  return axios.get(`/api/favorites?email=${localStorage.getItem('user_email')}`);
}

function deleteFavorite(gif_id) {
  return axios.delete(`/api/gif?gif_id=${gif_id}&email=${localStorage.getItem('user_email')}`);
}


export function changePage(up) {
  return (dispatch, getState) => {
    let { offset, current_page } = getState();

    if ( !up && current_page < 2 ) return;

    dispatch(actions.updateCurrentPage(up ? current_page + 1 : current_page > 1 ? current_page -1 : current_page));
    dispatch(actions.updateOffset(up ? offset + 25 : current_page > 1 ? offset - 25 : offset));

    dispatch(getSearchResults('page'));
  }
}


export function switchTab(show_favorites) {
  return (dispatch, getState) => {
    if (show_favorites) {
      getUserFavorites()
        .then(res => {
          dispatch(actions.updateFavorites(res.data ? res.data : []));
          dispatch(actions.setShowFavorites(true));
        });
    } else dispatch(actions.setShowFavorites(false));
  }
}

export function setFavorite(gif, index, favorite_listing) {
  return (dispatch, getState) => {
    let email = localStorage.getItem('user_email');
    let { results } = getState();

    if (!gif.favorite && !favorite_listing) {
      axios.post('/api/giphy', {
        gif_id: gif.id,
        url: gif.url,
        email: email
      }).then(res => {
        results[index].favorite = true;
        dispatch(actions.updateResults([...results]));
      });
    } else {
      deleteFavorite(favorite_listing ? gif.gif_id : gif.id)
        .then(() => {
          if (favorite_listing) {
            let { favorites } = getState();

            favorites.splice(index, 1);
            dispatch(actions.updateFavorites([...favorites]));
          } else {
            results[index].favorite = false;
            dispatch(actions.updateResults([...results]));
          }
        });
    }
  }
}

export function getSearchResults(e) {
  return (dispatch, getState) => {
    let key = e.keyCode || e.which;
    let api_key = '3K2ZmyEMrXGGyR7EGBGnbti1HZNk2TZL';
    let is_page = e === 'page';

    if (is_page || e.target.tagName === 'I' || key === 13) {
      getUserFavorites()
        .then(res => {
          dispatch(actions.updateFavorites(res.data ? res.data : []));

          let { search, favorites, query, offset } = getState();
          console.log(offset);
          search = is_page ? query : search;

          axios.get(`https://api.giphy.com/v1/gifs/search?api_key=${api_key}&q=${search}&offset=${offset}`)
            .then(res => {
              let results = [];

              res.data.data.forEach(gif => {
                let image = new Image();
                let src = gif.images.downsized.url;

                image.src = src;
                image.onload = () => {
                  results.push({ 
                    id: gif.id, 
                    url: src, 
                    favorite: favorites ? favorites.find(fav => fav.gif_id === gif.id) ? true : false : false });
                  dispatch(actions.updateResults([...results]));

                  image.remove();
                }
              });

              dispatch(actions.updateQuery(search));
              dispatch(actions.updateSearch(''));
              dispatch(actions.setShowFavorites(false));
            });
        })
    }
  }
}