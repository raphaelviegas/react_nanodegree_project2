import { LOAD_CATEGORIES } from '../../actions/categories'
import { initialState, categories } from '../../__test-helpers__/categories'
import categoryReducer from '../categories'

describe('Category Reducer', () => {
    it('Should handle initial state', () => {
        expect(categoryReducer(undefined, {}))
            .toEqual({
                ...initialState
            })
    })
    it('Should dispatch LOAD_CATEGORIES action', () => {
        expect(categoryReducer({}, {
            type: LOAD_CATEGORIES, payload: categories
        }))
            .toEqual({ categories })
    })
})