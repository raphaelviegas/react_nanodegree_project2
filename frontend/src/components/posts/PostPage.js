import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom'
import { fetchPosts, fetchRemovePost } from '../../actions/posts'
import MaterialIcon from 'material-icons-react'
import Moment from 'react-moment';
import VoteScore from '../shared/VoteScore'
import Comments from '../comments/Comments'
import EditPostModal from '../posts/editPost/EditPostModal'

export class PostPage extends Component {
    state = {
        modalOpen: ''
    }

    openModal = () => this.setState(() => ({ modalOpen: 'modal-open' }))
    closeModal = () => this.setState(() => ({ modalOpen: '' }))

    componentDidMount() {
        this.props.fetchPosts()
    }

    componentDidUpdate(prevProps) {
        if (this.props.id !== prevProps.id) {
            this.props.fetchPosts()
        }
    }

    removePost = (id) => {
        this.props.fetchRemovePost(id)
        this.props.history.push('/')
    }

    render() {
        const { postInfo } = this.props
        let invalidPost = (postInfo.length > 0) ? false : true
        return (
            <div>
                {invalidPost
                    ? <Redirect to="/error" />
                    : <div className="post-page">
                        {postInfo.map((post) => (
                            <div key={post.id}>
                                <div className="post-buttons">
                                    <div className="post-button-edit" onClick={() => this.openModal()}>
                                        <MaterialIcon icon="edit" size={20} />
                                    </div>
                                    <div className="post-button-remove" onClick={() => this.removePost(post.id)}>
                                        <MaterialIcon icon="delete" size={20} />
                                    </div>
                                </div>
                                <div className="container">
                                    <h4 className="post-title">{post.title}</h4>
                                    <div className="post-infos">
                                        <span className="post-author">Author: {post.author}</span>
                                        <span className="post-category">Category: {post.category}</span>
                                        <span className="post-date">
                                            <MaterialIcon icon="calendar_today" size={16} />
                                            <Moment format="DD/MMM/YY">{post.timestamp}</Moment>
                                        </span>
                                    </div>
                                    <VoteScore size={18} score={post.voteScore} type='post' id={post.id} />
                                    <p className="post-body">{post.body}</p>
                                    <Comments parentId={post.id} />
                                </div>
                                <EditPostModal
                                    modalOpen={this.state.modalOpen}
                                    onCloseModal={this.closeModal}
                                    id={post.id}
                                    title={post.title}
                                    body={post.body}
                                />
                            </div>
                        ))}
                    </div>
                }
            </div>
        )
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        id: ownProps.match.params.postId,
        postInfo: state.postsReducer.posts.filter(post => post.id === ownProps.match.params.postId)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchPosts: () => dispatch(fetchPosts()),
        fetchRemovePost: (id) => dispatch(fetchRemovePost(id))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostPage));
