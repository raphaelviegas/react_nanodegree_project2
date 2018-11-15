import {
    IS_LOADING,
    LOAD_POSTS,
    REMOVE_POST,
    VOTE_POST,
    ORDER_POSTS,
    ADD_POST,
    EDIT_POST
} from '../../actions/posts'
import {
    initialState,
    posts,
    removePost,
    votePost,
    addPostInfo,
    editPostInfo
} from '../../__test-helpers__/posts'
import postReducer from '../posts'
const uuidv4 = require('uuid/v4')

describe('Posts Reducer', () => {
    it('Should handle initial state', () => {
        expect(postReducer(undefined, {}))
            .toEqual({
                ...initialState
            })
    })

    it('Should dispatch IS_LOADING action', () => {
        expect(postReducer({}, { type: IS_LOADING }))
            .toEqual({ loadingPosts: true })
    })

    it('Should dispatch LOAD_POSTS action', () => {
        expect(postReducer({}, { type: LOAD_POSTS, payload: posts }))
            .toEqual({
                loadingPosts: false,
                posts
            })
    })

    it('Should dispatch REMOVE_POST action', () => {
        const id = removePost
        const removedPosts = posts.filter(post => post.id !== id)
        expect(postReducer({ posts }, { type: REMOVE_POST, payload: id }))
            .toEqual({
                posts: removedPosts
            })
    })

    it('Should dispatch VOTE_POST action', () => {
        const actionPayload = votePost
        const votedPosts = posts.map(post => {
            if (post.id === actionPayload.id) {
                return {
                    ...post,
                    voteScore: actionPayload.voteScore
                }
            }
            return post
        })
        expect(postReducer({ posts }, { type: VOTE_POST, payload: actionPayload }))
            .toEqual({
                posts: votedPosts
            })
    })

    it('Should dispatch ODER_POSTS action', () => {
        expect(postReducer({}, { type: ORDER_POSTS, payload: 'voteScore' }))
            .toEqual({ sortByOption: 'voteScore' })
        expect(postReducer({ sortByOption: 'voteScore' }, { type: ORDER_POSTS, payload: 'timestamp' }))
            .toEqual({ sortByOption: 'timestamp' })
        expect(postReducer({ sortByOption: 'timestamp' }, { type: ORDER_POSTS, payload: 'commentCount' }))
            .toEqual({ sortByOption: 'commentCount' })
    })

    it('Should dispatch ADD_POST action', () => {
        const addedPostInfo = addPostInfo
        const addedPost = posts.concat([addedPostInfo])
        expect(postReducer({ posts }, { type: ADD_POST, payload: addedPostInfo }))
            .toEqual({
                loadingPosts: false,
                posts: addedPost
            })
    })

    it('Should dispatch EDIT_POST action', () => {
        const editedPostInfo = editPostInfo
        const editedPosts = posts.map(post => {
            if (post.id === editedPostInfo.id) {
                post.title = editedPostInfo.editContent.title
                post.body = editedPostInfo.editContent.body
            }
            return post
        })
        expect(postReducer({ posts }, { type: EDIT_POST, payload: editedPostInfo }))
            .toEqual({
                posts: editedPosts
            })
    })
})