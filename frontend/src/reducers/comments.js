import {
    LOAD_COMMENTS, 
    REMOVE_COMMENT, 
    VOTE_COMMENT,
    EDIT_COMMENT,
    ADD_COMMENT
} from '../actions/comments'

function commentsReducer (state = {
    comments: [],
}, action) {
    switch (action.type) {
        case LOAD_COMMENTS:
            state = {
                ...state,
                comments: action.payload
            }
            return state
        case REMOVE_COMMENT:
            state ={
                ...state,
                comments: state.comments.filter(comment => comment.id !== action.payload)
            }
            return state
        case VOTE_COMMENT:
            state ={
                ...state,
                comments: state.comments.map(comment => {
                    if (comment.id === action.payload.id) {
                        comment.voteScore = action.payload.voteScore
                    }
                    return comment
                })
            }
            return state
        case ADD_COMMENT:
            let comments = state.comments.concat([action.payload])
            state = {
                ...state,
                comments
            }
            return state
        case EDIT_COMMENT:
            state = {
                ...state,
                comments: state.comments.map(comment => {
                    if (comment.id === action.payload.id) {
                        comment.timestamp = action.payload.editContent.timestamp
                        comment.body = action.payload.editContent.body
                    }
                    return comment
                })
            }
            return state
        default:
            return state
    }
}

export default commentsReducer