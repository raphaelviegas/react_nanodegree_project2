const uuidv4 = require('uuid/v4')

export const initialState = {
    posts: [],
    sortByOption: '-voteScore',
    invalidPost: false,
    loadingPosts: true,
}

export const posts = [
    {
        id: '8xf0y6ziyjabvozdd253nd',
        timestamp: 1467166872634,
        title: 'Udacity is the best place to learn React',
        body: 'Everyone says so after all.',
        author: 'thingtwo',
        category: 'react',
        voteScore: 10,
        deleted: false,
        commentCount: 2
    },
    {
        id: '6ni6ok3ym7mf1p33lnez',
        timestamp: 1468479767190,
        title: 'Learn Redux in 10 minutes!',
        body: 'Just kidding. It takes more than 10 minutes to learn technology.',
        author: 'thingone',
        category: 'redux',
        voteScore: -5,
        deleted: false,
        commentCount: 0
    }
]

export const removePost = '8xf0y6ziyjabvozdd253nd'

export const votePost = {
    id: '8xf0y6ziyjabvozdd253nd',
    voteScore: 10
}

let id = uuidv4()
export const addPostInfo = {
    author: "Test Author",
    body: "Test Body",
    category: "Test",
    title: "Test Title",
    timestamp: Date.now(),
    id
}

export const editPostInfo = {
    id: '8xf0y6ziyjabvozdd253nd',
    editContent: {
        title: 'Edited post title',
        body: 'Edited post body'
    }
}