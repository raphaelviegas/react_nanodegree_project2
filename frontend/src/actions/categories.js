import * as ServerAPI from '../helpers/ServerAPI'

export const LOAD_CATEGORIES = 'LOAD_CATEGORIES'

//Local state
export function loadCategories(categories) {
  return {
    type: LOAD_CATEGORIES,
    payload: categories
  }
}


//Fetch requests
export const fetchCategories = () => dispatch => (
  ServerAPI.getCategories()
    .then(categories => dispatch(loadCategories(categories)))
);

