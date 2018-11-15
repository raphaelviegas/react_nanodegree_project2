import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment';
import VoteScore from '../shared/VoteScore'

class Comment extends Component {
    static propTypes = {
        commentInfo: PropTypes.object.isRequired,
        onRemoveComment: PropTypes.func.isRequired,
        onEditComment: PropTypes.func.isRequired,
    }

    removeComment(id) {
        this.props.onRemoveComment(id)
    }

    editComment(id, body) {
        this.props.onEditComment(id, body)
    }

    render() {
        const { author, timestamp, body, voteScore, id } = this.props.commentInfo
        return (
            <li>
                <div className="card">
                    <div className="card-content">
                        <span className="card-title comment-title">Author: {author}</span>
                        <span className="card-date comment-date"><Moment format="DD/MMM/YY">{timestamp}</Moment></span>
                        <p className="card-body comment-body">{body}</p>
                    </div>
                    <div className="card-action comment-action">
                        <span className="comment-action-edit" onClick={() => this.editComment(id, body)}>Edit</span>
                        <span className="comment-action-remove" onClick={() => this.removeComment(id)}>Delete</span>
                    </div>
                    <div className="comment-vote-score">
                        <VoteScore size={12} score={voteScore} type='comment' id={id} />
                    </div>
                </div>
            </li>
        )
    }
}

export default Comment
