import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { fetchPosts } from '../../actions/posts'
import PostList from '../posts/PostList'
import OrderPosts from '../shared/OrderPosts'

export class PostsPage extends Component {
    static propTypes = {
        posts: PropTypes.array.isRequired
    }

    componentDidMount() {
        this.props.fetchPosts()
        let elems = document.querySelectorAll('.dropdown-trigger');
        // eslint-disable-next-line
        let instances = M.Dropdown.init(elems, { alignment: 'right', constrainWidth: false })
    }

    render() {
        return (
            <div>
                <div className="category-title">
                    Showing All Posts
                <OrderPosts />
                </div>
                <div className="divider"></div>
                <PostList posts={this.props.posts} />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        posts: state.postsReducer.posts,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchPosts: () => dispatch(fetchPosts())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsPage)
