import * as ServerAPI from '../helpers/ServerAPI'

export const IS_LOADING = 'IS_LOADING'
export const LOAD_POSTS = 'LOAD_POSTS'
export const REMOVE_POST = 'REMOVE_POST'
export const VOTE_POST = 'VOTE_POST'
export const ORDER_POSTS = 'ORDER_POSTS'
export const ADD_POST = 'ADD_POST'
export const EDIT_POST = 'EDIT_POST'

//Local state
export function isLoading() {
  return {
    type: IS_LOADING
  }
}

export function loadPosts(posts) {
  return {
    type: LOAD_POSTS,
    payload: posts
  }
}

export function votePost(id, voteScore) {
  return {
    type: VOTE_POST,
    payload: { id, voteScore }
  }
}

export function removePost(id) {
  return {
    type: REMOVE_POST,
    payload: id
  }
}

export function orderPosts(orderOption) {
  return {
    type: ORDER_POSTS,
    payload: orderOption
  }
}

export function addPost(post) {
  return {
    type: ADD_POST,
    payload: post
  }
}

export function editPost(id, editContent) {
  return {
    type: EDIT_POST,
    payload: {
      id,
      editContent
    }
  }
}

//Fetch requests
export const fetchPosts = () => dispatch => (
  ServerAPI.getPosts()
    .then(posts => dispatch(loadPosts(posts)))
)

export const fetchVotePost = (id, option) => dispatch => (
  ServerAPI.vote('posts', id, option)
    .then(post => dispatch(votePost(post.id, post.voteScore)))
)

export const fetchRemovePost = (id) => dispatch => (
  ServerAPI.remove('posts', id)
    .then(post => dispatch(removePost(post.id)))
)

export const fetchAddPost = (postInfo) => dispatch => (
  ServerAPI.add('posts', postInfo)
    .then(post => dispatch(addPost(post)))
)

export const fetchEditPost = (id, editContent) => dispatch => (
  ServerAPI.edit('posts', id, editContent)
    .then(() => dispatch(editPost(id, editContent)))
)





