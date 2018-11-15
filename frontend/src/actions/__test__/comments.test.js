import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import {
    LOAD_COMMENTS,
    REMOVE_COMMENT,
    VOTE_COMMENT,
    ADD_COMMENT,
    EDIT_COMMENT
} from '../comments';
import * as actions from '../comments'
import {
    initialState,
    comments,
    removeComment,
    voteComment,
    addCommentInfo,
    editCommentInfo,
    getCommentsId
} from '../../__test-helpers__/comments'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

describe('Comments Action Creator', () => {
    beforeEach(() => {
        fetch.resetMocks()
    })

    it('Should dispatch a LOAD_COMMENTS action', () => {
        expect(actions.loadComments(comments))
            .toEqual({
                type: LOAD_COMMENTS,
                payload: comments
            })
    })

    it('Should dispatch a VOTE_COMMENT action', () => {
        expect(actions.voteComment(voteComment.id, voteComment.voteScore))
            .toEqual({
                type: VOTE_COMMENT,
                payload: voteComment
            })
    })

    it('Should dispatch a REMOVE_COMMENT action', () => {
        expect(actions.removeComment(removeComment))
            .toEqual({
                type: REMOVE_COMMENT,
                payload: removeComment
            })
    })

    it('Should dispatch a ADD_COMMENT action', () => {
        expect(actions.addComment(addCommentInfo))
            .toEqual({
                type: ADD_COMMENT,
                payload: addCommentInfo
            })
    })

    it('Should dispatch a EDIT_COMMENT action', () => {
        expect(actions.editComment(editCommentInfo.id, editCommentInfo.editContent))
            .toEqual({
                type: EDIT_COMMENT,
                payload: {
                    id: editCommentInfo.id,
                    editContent: editCommentInfo.editContent
                }
            })
    })

    it('Should execute fetchComments and return the categories array of objects', () => {
        const filteredComments = comments.filter(comment => comment.id !== getCommentsId)
        fetch.once(JSON.stringify({ filteredComments }))
        const store = mockStore(initialState)
        const expectedActions = [
            { type: LOAD_COMMENTS, payload: { filteredComments } }
        ]
        return store.dispatch(actions.fetchComments(getCommentsId))
            .then(() => {
                expect(store.getActions())
                    .toEqual(expectedActions)
            })
    })

    it('Should execute fetchVoteComment with option downVote and return the updated comments array of objects', () => {
        fetch.once(JSON.stringify(voteComment))
        const store = mockStore(initialState)
        const expectedActions = [
            {
                type: VOTE_COMMENT, payload: {
                    id: voteComment.id,
                    voteScore: voteComment.voteScore
                }
            }
        ]
        return store.dispatch(actions.fetchVoteComment(voteComment.id, { option: 'downVote' }))
            .then(() => {
                expect(store.getActions())
                    .toEqual(expectedActions)
            })
    })

    it('Should execute fetchVoteComment with option upVote and return the updated comments array of objects', () => {
        fetch.once(JSON.stringify(voteComment))
        const store = mockStore(initialState)
        const expectedActions = [
            {
                type: VOTE_COMMENT, payload: {
                    id: voteComment.id,
                    voteScore: voteComment.voteScore
                }
            }
        ]
        return store.dispatch(actions.fetchVoteComment(voteComment.id, { option: 'upVote' }))
            .then(() => {
                expect(store.getActions())
                    .toEqual(expectedActions)
            })
    })

    it('Should execute fetchRemoveComment and return the updated posts array of objects', () => {
        const id = removeComment
        fetch.once(JSON.stringify({ id }))
        const store = mockStore(initialState)
        const expectedActions = [
            { type: REMOVE_COMMENT, payload: id }
        ]
        return store.dispatch(actions.fetchRemoveComment(removeComment))
            .then(() => {
                expect(store.getActions())
                    .toEqual(expectedActions)
            })
    })

    it('Should execute fetchAddComment and return the updated comments array of objects', () => {
        fetch.once(JSON.stringify({ addCommentInfo }))
        const store = mockStore(initialState)
        const expectedActions = [
            { type: ADD_COMMENT, payload: { addCommentInfo } }
        ]
        return store.dispatch(actions.fetchAddComment(addCommentInfo))
            .then(() => {
                expect(store.getActions())
                    .toEqual(expectedActions)
            })
    })

    it('Should execute fetchEditComment and return the updated comments array of objects', () => {
        fetch.once(JSON.stringify({ editCommentInfo }))
        const store = mockStore(initialState)
        const expectedActions = [
            { type: EDIT_COMMENT, payload: editCommentInfo }
        ]
        return store.dispatch(actions.fetchEditComment(editCommentInfo.id, editCommentInfo.editContent))
            .then(() => {
                expect(store.getActions())
                    .toEqual(expectedActions)
            })
    })
})