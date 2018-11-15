import React from 'react'
import { Switch, Route } from 'react-router-dom'
import PostsPage from '../posts/PostsPage'
import CategoryPage from '../categories/CategoryPage'
import PostPage from '../posts/PostPage'
import AddPostPage from '../posts/addPost/AddPostPage'
import Error from '../main/Error'

const SwitchRoutes = () => {
    return (
        <Switch>
            <Route exact path="/" component={PostsPage} />
            <Route exact path="/addPost" component={AddPostPage} />
            <Route exact path="/error" component={Error} />
            <Route exact path="/:category" component={CategoryPage} />
            <Route path="/:category/:postId" component={PostPage} />
            <Route component={Error} />
        </Switch>
    )
}

export default SwitchRoutes