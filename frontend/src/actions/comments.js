import * as ServerAPI from '../helpers/ServerAPI'

export const LOAD_COMMENTS = 'LOAD_COMMENTS'
export const REMOVE_COMMENT = 'REMOVE_COMMENT'
export const VOTE_COMMENT = 'VOTE_COMMENT'
export const ADD_COMMENT = 'ADD_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'

//Local state
export function loadComments (comments) {
  return {
    type: LOAD_COMMENTS,
    payload: comments
  }
}
export function voteComment (id, voteScore) {
  return {
    type: VOTE_COMMENT,
    payload: {id, voteScore }
  }
}

export function removeComment (id) {
  return {
    type: REMOVE_COMMENT,
    payload: id
  }
}

export function addComment(comment) {
  return {
    type: ADD_COMMENT,
    payload: comment
  }
}

export function editComment (id, editContent) {
  return {
    type: EDIT_COMMENT,
    payload: {
      id,
      editContent
    }
  }
}

//Fetch requests
export const fetchComments = (postId) => dispatch => (
  ServerAPI.getComments(postId)
    .then(comments => dispatch(loadComments(comments)))
)

export const fetchVoteComment = (id, option) => dispatch => (
  ServerAPI.vote('comments', id, option)
    .then(comment => dispatch(voteComment(comment.id, comment.voteScore)))
)

export const fetchRemoveComment = (id) => dispatch => (
  ServerAPI.remove('comments', id)
    .then(comment => dispatch(removeComment(comment.id)))
)

export const fetchAddComment = (commentInfo) => dispatch => (
  ServerAPI.add('comments', commentInfo)
    .then(comment => dispatch(addComment(comment)))
)

export const fetchEditComment = (id, editContent) => dispatch => (
  ServerAPI.edit('comments', id, editContent)
    .then(()=> dispatch(editComment(id, editContent)))
)
