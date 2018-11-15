import {
    IS_LOADING,
    LOAD_POSTS,
    REMOVE_POST,
    VOTE_POST,
    ORDER_POSTS,
    ADD_POST,
    EDIT_POST
} from '../actions/posts'

function postReducer(state = {
    posts: [],
    sortByOption: '-voteScore',
    invalidPost: false,
    loadingPosts: true,
}, action) {
    switch (action.type) {
        case IS_LOADING: {
            state = {
                ...state,
                loadingPosts: true
            }
            return state
        }
        case LOAD_POSTS:
            state = {
                ...state,
                loadingPosts: false,
                posts: action.payload
            }
            return state
        case REMOVE_POST:
            state = {
                ...state,
                posts: state.posts.filter(post => post.id !== action.payload)
            }
            return state
        case VOTE_POST:
            state = {
                ...state,
                posts: state.posts.map(post => {
                    if (post.id === action.payload.id) {
                        return {
                            ...post,
                            voteScore: action.payload.voteScore
                        }
                    }
                    return post
                }),
            }
            return state
        case ORDER_POSTS:
            state = {
                ...state,
                sortByOption: action.payload
            }
            return state
        case ADD_POST:
            let posts = state.posts.concat([action.payload])
            state = {
                ...state,
                loadingPosts: false,
                posts
            }
            return state
        case EDIT_POST:
            state = {
                ...state,
                posts: state.posts.map(post => {
                    if (post.id === action.payload.id) {
                        post.title = action.payload.editContent.title
                        post.body = action.payload.editContent.body
                    }
                    return post
                })
            }
            return state
        default:
            return state
    }
}

export default postReducer