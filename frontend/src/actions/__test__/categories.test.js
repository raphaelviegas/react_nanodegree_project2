import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { categories, initialState } from '../../__test-helpers__/categories'
import { LOAD_CATEGORIES } from '../categories'
import * as actions from '../categories'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)
const store = mockStore(initialState)


describe('Category Action Creator', () => {
    it('Should dispatch a LOAD_CATEGORIES action', () => {
        expect(actions.loadCategories(categories))
            .toEqual({
                type: LOAD_CATEGORIES,
                payload: categories
            })
    })

    it('Should execute fetchCategories and return the categories array of objects', () => {
        fetch.once(JSON.stringify({ categories }))
        const expectedActions = [
            { type: LOAD_CATEGORIES, payload: categories }
        ]
        return store.dispatch(actions.fetchCategories())
            .then(() => {
                expect(store.getActions())
                    .toEqual(expectedActions)
            })
    })
})