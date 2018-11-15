import { LOAD_CATEGORIES } from '../actions/categories'

function categoryReducer(state = {
    categories: []
}, action) {
    switch (action.type) {
        case LOAD_CATEGORIES:
            state = {
                ...state,
                categories: action.payload
            }
            return state
        default:
            return state
    }
}

export default categoryReducer