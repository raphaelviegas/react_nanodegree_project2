import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import {
    IS_LOADING,
    LOAD_POSTS,
    REMOVE_POST,
    VOTE_POST,
    ORDER_POSTS,
    ADD_POST,
    EDIT_POST
} from '../posts';
import * as actions from '../posts'
import {
    initialState,
    posts,
    removePost,
    votePost,
    addPostInfo,
    editPostInfo
} from '../../__test-helpers__/posts'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

describe('Posts Action Creator', () => {
    beforeEach(() => {
        fetch.resetMocks()
    })

    it('Should dispatch a IS_LOADING action', () => {
        expect(actions.isLoading())
            .toEqual({
                type: IS_LOADING,
            })
    })

    it('Should dispatch a LOAD_POSTS action', () => {
        expect(actions.loadPosts(posts))
            .toEqual({
                type: LOAD_POSTS,
                payload: posts
            })
    })

    it('Should dispatch a VOTE_POST action', () => {
        expect(actions.votePost(votePost.id, votePost.voteScore))
            .toEqual({
                type: VOTE_POST,
                payload: votePost
            })
    })

    it('Should dispatch a REMOVE_POST action', () => {
        expect(actions.removePost(removePost))
            .toEqual({
                type: REMOVE_POST,
                payload: removePost
            })
    })

    it('Should dispatch a ORDER_POST action', () => {
        expect(actions.orderPosts('timestamp'))
            .toEqual({
                type: ORDER_POSTS,
                payload: 'timestamp'
            })
    })

    it('Should dispatch a ADD_POST action', () => {
        expect(actions.addPost(addPostInfo))
            .toEqual({
                type: ADD_POST,
                payload: addPostInfo
            })
    })

    it('Should dispatch a EDIT_POST action', () => {
        expect(actions.editPost(editPostInfo.id, editPostInfo.editContent))
            .toEqual({
                type: EDIT_POST,
                payload: {
                    id: editPostInfo.id,
                    editContent: editPostInfo.editContent
                }
            })
    })

    it('Should execute fetchPosts and return the posts array of objects', () => {
        fetch.once(JSON.stringify({ posts }))
        const store = mockStore(initialState)
        const expectedActions = [
            { type: LOAD_POSTS, payload: { posts } }
        ]
        return store.dispatch(actions.fetchPosts())
            .then(() => {
                expect(store.getActions())
                    .toEqual(expectedActions)
            })
    })

    it('Should execute fetchVotePost with option downVote and return the updated posts array of objects', () => {
        fetch.once(JSON.stringify(votePost))
        const store = mockStore(initialState)
        const expectedActions = [
            {
                type: VOTE_POST, payload: {
                    id: votePost.id,
                    voteScore: votePost.voteScore
                }
            }
        ]
        return store.dispatch(actions.fetchVotePost(votePost.id, { option: 'downVote' }))
            .then(() => {
                expect(store.getActions())
                    .toEqual(expectedActions)
            })
    })

    it('Should execute fetchVotePost with option upVote and return the updated posts array of objects', () => {
        fetch.once(JSON.stringify(votePost))
        const store = mockStore(initialState)
        const expectedActions = [
            {
                type: VOTE_POST, payload: {
                    id: votePost.id,
                    voteScore: votePost.voteScore
                }
            }
        ]
        return store.dispatch(actions.fetchVotePost(votePost.id, { option: 'upVote' }))
            .then(() => {
                expect(store.getActions())
                    .toEqual(expectedActions)
            })
    })

    it('Should execute fetchRemovePost and return the updated posts array of objects', () => {
        const id = removePost
        fetch.once(JSON.stringify({ id }))
        const store = mockStore(initialState)
        const expectedActions = [
            { type: REMOVE_POST, payload: id }
        ]
        return store.dispatch(actions.fetchRemovePost(removePost))
            .then(() => {
                expect(store.getActions())
                    .toEqual(expectedActions)
            })
    })

    it('Should execute fetchAddPost and return the updated posts array of objects', () => {
        fetch.once(JSON.stringify({ addPostInfo }))
        const store = mockStore(initialState)
        const expectedActions = [
            { type: ADD_POST, payload: { addPostInfo } }
        ]
        return store.dispatch(actions.fetchAddPost(addPostInfo))
            .then(() => {
                expect(store.getActions())
                    .toEqual(expectedActions)
            })
    })

    it('Should execute fetchEditPost and return the updated posts array of objects', () => {
        fetch.once(JSON.stringify({ editPostInfo }))
        const store = mockStore(initialState)
        const expectedActions = [
            { type: EDIT_POST, payload: editPostInfo }
        ]
        return store.dispatch(actions.fetchEditPost(editPostInfo.id, editPostInfo.editContent))
            .then(() => {
                expect(store.getActions())
                    .toEqual(expectedActions)
            })
    })

})