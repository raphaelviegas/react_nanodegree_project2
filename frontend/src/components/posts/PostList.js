import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { fetchRemovePost } from '../../actions/posts'
import PostCard from './PostCard'
import sortBy from 'sort-by'

export class PostList extends Component {
  static propTypes = {
    posts: PropTypes.array.isRequired,
    sortByOption: PropTypes.string.isRequired
  }

  removePost = (id) => {
    this.props.fetchRemovePost(id)
  }

  render() {
    const { posts, sortByOption } = this.props
    //SortBy
    const sortedPosts = [...posts].sort(sortBy(sortByOption))
    return (
      <div>
        {posts.length === 0
          ? <div className="noPosts"><h4>No posts to show</h4></div>
          : <div className="row">
            {
              sortedPosts.map((post, index) => {
                return <PostCard post={post} onRemovePost={this.removePost} key={index} />
              })
            }
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    posts: ownProps.posts,
    sortByOption: state.postsReducer.sortByOption
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchRemovePost: (id) => dispatch(fetchRemovePost(id))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostList));
