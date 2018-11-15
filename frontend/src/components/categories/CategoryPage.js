import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { fetchPosts } from '../../actions/posts'
import PostList from '../posts/PostList'
import OrderPosts from '../shared/OrderPosts'

export class CategoryPage extends Component {
    static propTypes = {
        category: PropTypes.string.isRequired,
        categories: PropTypes.array.isRequired,
        posts: PropTypes.array.isRequired
    }

    verifyCategory() {
        if (this.props.categories.length > 0) {
            let categoryExists = false
            // eslint-disable-next-line
            this.props.categories.map(item => {
                if (item.path === this.props.category) {
                    categoryExists = true
                }
            })
            if (categoryExists === false) {
                this.props.history.push('/error')
            }
        }
    }

    componentDidMount() {
        this.props.fetchPosts()
        this.verifyCategory()
    }

    componentDidUpdate(prevProps) {
        if (this.props.category !== prevProps.category) {
            this.props.fetchPosts()
            this.verifyCategory()
        }
    }

    render() {
        const { posts, category } = this.props
        const categoryPosts = posts.filter(post => post.category === category)
        return (
            <div>
                <div className="category-title">
                    Category: <span>{this.props.category}</span>
                    <OrderPosts />
                </div>
                <div className="divider"></div>
                <PostList posts={categoryPosts} />
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        category: ownProps.match.params.category,
        categories: state.categoriesReducer.categories,
        posts: state.postsReducer.posts,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchPosts: () => dispatch(fetchPosts())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryPage)
