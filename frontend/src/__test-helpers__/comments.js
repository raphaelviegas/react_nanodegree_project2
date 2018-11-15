const uuidv4 = require('uuid/v4')

export const initialState = { comments: [] }

export const comments = [
    {
        id: '894tuq4ut84ut8v4t8wun89g',
        parentId: "8xf0y6ziyjabvozdd253nd",
        timestamp: 1468166872634,
        body: 'Hi there! I am a COMMENT.',
        author: 'thingtwo',
        voteScore: 6,
        deleted: false,
        parentDeleted: false
    },
    {
        id: '8tu4bsun805n8un48ve89',
        parentId: "8xf0y6ziyjabvozdd253nd",
        timestamp: 1469479767190,
        body: 'Comments. Are. Cool.',
        author: 'thingone',
        voteScore: -5,
        deleted: false,
        parentDeleted: false
    }
]

export const getCommentsId = '894tuq4ut84ut8v4t8wun89g'

export const removeComment = '894tuq4ut84ut8v4t8wun89g'

export const voteComment = {
    id: '894tuq4ut84ut8v4t8wun89g',
    voteScore: 10
}

let id = uuidv4()
export const addCommentInfo = {
    parentId: '8xf0y6ziyjabvozdd253nd',
    author: 'Test Author',
    body: 'Test Body',
    id
}

export const editCommentInfo = {
    id: '894tuq4ut84ut8v4t8wun89g',
    editContent: {
        body: 'Edited comment body',
        timestamp: Date.now()
    }
}