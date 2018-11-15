import {
    LOAD_COMMENTS,
    REMOVE_COMMENT,
    VOTE_COMMENT,
    EDIT_COMMENT,
    ADD_COMMENT
} from '../../actions/comments'
import {
    initialState,
    comments,
    removeComment,
    voteComment,
    addCommentInfo,
    editCommentInfo,
    getCommentsId
} from '../../__test-helpers__/comments'

import commentsReducer from '../comments'

describe('Comments Reducer', () => {
    it('Should handle initial state', () => {
        expect(commentsReducer(undefined, {}))
            .toEqual({
                ...initialState
            })
    })

    it('Should dispatch LOAD_COMMENTS action', () => {
        const filteredComments = comments.filter(comment => comment.id !== getCommentsId)
        expect(commentsReducer({}, { type: LOAD_COMMENTS, payload: filteredComments }))
            .toEqual({
                comments: filteredComments
            })
    })

    it('Should dispatch REMOVE_COMMENT action', () => {
        const id = removeComment
        const removedComments = comments.filter(comment => comment.id !== id)
        expect(commentsReducer({ comments }, { type: REMOVE_COMMENT, payload: id }))
            .toEqual({
                comments: removedComments
            })
    })

    it('Should dispatch VOTE_COMMENT action', () => {
        const actionPayload = voteComment
        const votedComments = comments.map(comment => {
            if (comment.id === actionPayload.id) {
                return {
                    ...comment,
                    voteScore: actionPayload.voteScore
                }
            }
            return comment
        })
        expect(commentsReducer({ comments }, { type: VOTE_COMMENT, payload: actionPayload }))
            .toEqual({
                comments: votedComments
            })
    })

    it('Should dispatch ADD_COMMENT action', () => {
        const addedCommentInfo = addCommentInfo
        const addedComments = comments.concat([addedCommentInfo])
        expect(commentsReducer({ comments }, { type: ADD_COMMENT, payload: addedCommentInfo }))
            .toEqual({
                comments: addedComments
            })
    })

    it('Should dispatch EDIT_COMMENT action', () => {
        const editedCommentInfo = editCommentInfo
        const editedComments = comments.map(comment => {
            if (comment.id === editedCommentInfo.id) {
                comment.timestamp = editedCommentInfo.editContent.timestamp,
                    comment.body = editedCommentInfo.editContent.body
            }
            return comment
        })
        expect(commentsReducer({ comments }, { type: EDIT_COMMENT, payload: editedCommentInfo }))
            .toEqual({ comments: editedComments })
    })
})