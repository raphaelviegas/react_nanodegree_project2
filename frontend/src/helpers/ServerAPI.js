
const api = "http://localhost:3001"


// Generate a unique token for storing your bookshelf data on the backend server.

let token = localStorage.token

if (!token)
    token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
    'Accept': 'application/json',
    'Authorization': token
}


export const getCategories = () =>
    fetch(`${api}/categories`, { headers })
        .then(res => res.json())
        .then(data => data.categories)

export const getPosts = () =>
    fetch(`${api}/posts`, { headers })
        .then(res => res.json())

// export const getPostsByCategory = (category) =>
//     fetch(`${api}/${category}/posts`, { headers })
//         .then(res => res.json())

// export const getPost = (id) =>
//     fetch(`${api}/posts/${id}`, { headers })
//         .then(res => res.json())

export const getComments = (id) =>
    fetch(`${api}/posts/${id}/comments`, { headers })
        .then(res => res.json())



//General methods for add, edit, vote and remove.
export const add = (path, content) =>
    fetch(`${api}/${path}`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(content)
    }).then(res => res.json())

export const edit = (path, id, content) =>
    fetch(`${api}/${path}/${id}`, {
        method: 'PUT',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(content)
    }).then(res => res.json())

export const vote = (path, id, option) =>
    fetch(`${api}/${path}/${id}`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(option)
    }).then(res => res.json())

export const remove = (path, id) =>
    fetch(`${api}/${path}/${id}`, {
        method: 'DELETE',
        headers
    }).then(res => res.json())

/* BOOKS API Example

export const get = (bookId) =>
  fetch(`${api}/books/${bookId}`, { headers })
    .then(res => res.json())
    .then(data => data.book)

export const getAll = () =>
  fetch(`${api}/books`, { headers })
    .then(res => res.json())
    .then(data => data.books)

export const update = (book, shelf) =>
  fetch(`${api}/books/${book.id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ shelf })
  }).then(res => res.json())

export const search = (query) =>
  fetch(`${api}/search`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query })
  }).then(res => res.json())
    .then(data => data.books)

*/