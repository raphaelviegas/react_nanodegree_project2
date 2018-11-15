import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import MaterialIcon from 'material-icons-react'
import VoteScore from '../shared/VoteScore'
import EditPostForm from '../posts/editPost/EditPostForm'

class PostCard extends Component {
    static propTypes = {
        post: PropTypes.object.isRequired,
        onRemovePost: PropTypes.func.isRequired
    }

    state = {
        showEdit: '',
    }

    showEdit = () => this.setState(() => ({ showEdit: 'card-reveal-active' }))
    hideEdit = () => this.setState(() => ({ showEdit: '' }))

    removePost(id) {
        this.props.onRemovePost(id)
    }
    render() {
        const { id, title, body, author, voteScore, commentCount, category } = this.props.post
        const { showEdit } = this.state
        return (
            <div className="col s12 m6">
                <div className="card grey lighten-4">
                    <div className="card-content">
                        <span className="card-title truncate">{title}</span>
                        <span className="card-author">{author}</span>
                        <p>{body}</p>
                    </div>
                    <div className="card-action valign-wrapper">
                        <VoteScore size={16} score={voteScore} type='post' id={id} />
                        <Link className="align-right" to={`/${category}/${id}`}>Show Post</Link>
                    </div>
                    <div className="card-comments">
                        <span className="card-comments-number">{commentCount}</span>
                    </div>
                    <div className="card-buttons">
                        <div className="card-button-edit" onClick={() => this.showEdit()}>
                            <MaterialIcon icon="edit" size={14} />
                        </div>
                        <div className="card-button-delete" onClick={() => this.removePost(id)}>
                            <MaterialIcon icon="delete" size={14} />
                        </div>
                    </div>
                    <div className={`card-reveal ${showEdit}`}>
                        <EditPostForm
                            id={id}
                            defaultTitle={title}
                            defaultBody={body}
                            onPostCardFormSubmited={this.hideEdit}
                        />
                        <div className="hide-edit" onClick={() => this.hideEdit()}>
                            <MaterialIcon icon="close" color="#c3c3c3" />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default PostCard
