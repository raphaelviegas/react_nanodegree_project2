import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { fetchComments, fetchRemoveComment } from '../../actions/comments'
import MaterialIcon from 'material-icons-react'
import sortBy from 'sort-by'
import AddCommentButton from './addComment/AddCommentButton'
import EditCommentModal from './editComment/EditCommentModal'
import Comment from './Comment'
import M from "materialize-css/dist/js/materialize.min.js"

export class Comments extends Component {
    static propTypes = {
        parentId: PropTypes.string.isRequired,
        comments: PropTypes.array.isRequired
    }

    state = {
        sortByOption: '-voteScore',
        commentId: '',
        commentBody: '',
        editModalOpen: ''
    }

    showEditModal = (id, body) => this.setState(
        () => ({ editModalOpen: 'modal-open', commentId: id, commentBody: body })
    )

    hideEditModal = () => this.setState(
        () => ({ editModalOpen: '', commentId: '', commentBody: '', })
    )

    componentDidMount() {
        this.props.fetchComments(this.props.parentId)
        let elems = document.querySelectorAll('.dropdown-trigger');
        // eslint-disable-next-line
        let instances = M.Dropdown.init(elems, { alignment: 'right', constrainWidth: false, hover: false });
    }

    removeComment = (id) => {
        this.props.fetchRemoveComment(id)
    }

    changeSortCriteria = (option) => {
        switch (option) {
            case 'voteScore':
                this.setState({ sortByOption: 'voteScore' })
                break
            case '-voteScore':
                this.setState({ sortByOption: '-voteScore' })
                break
            case 'timestamp':
                this.setState({ sortByOption: 'timestamp' })
                break
            case '-timestamp':
                this.setState({ sortByOption: '-timestamp' })
                break
            default:
                break
        }
    }

    render() {
        const { comments, parentId } = this.props
        const commentCount = comments.length
        const { sortByOption, commentId, commentBody, editModalOpen } = this.state
        //Sort By
        comments.sort(sortBy(sortByOption))
        return (
            <div className="post-comments">
                <div className="post-comments-title">
                    Comments: {commentCount}
                    <div className="order-by">
                        <a className='dropdown-trigger' data-target='dropdown1'><MaterialIcon icon="sort" size={22} /></a>
                        <ul id='dropdown1' className='dropdown-content'>
                            <li><span>Vote Score</span></li>
                            <li><a className="order-button" onClick={() => this.changeSortCriteria('voteScore')}>Ascending</a></li>
                            <li><a className="order-button" onClick={() => this.changeSortCriteria('-voteScore')}>Descending</a></li>
                            <li className="divider" tabIndex="-1"></li>
                            <li><span>Date</span></li>
                            <li><a className="order-button" onClick={() => this.changeSortCriteria('timestamp')}>Ascending</a></li>
                            <li><a className="order-button" onClick={() => this.changeSortCriteria('-timestamp')}>Descending</a></li>
                        </ul>
                    </div>
                </div>
                <div className="divider"></div>
                {commentCount === 0
                    ? <div className="noComments"><h6>No comments to show</h6></div>
                    : <ul className="comments">
                        {comments.map(comment => (
                            <Comment
                                commentInfo={comment}
                                key={comment.id}
                                onRemoveComment={this.removeComment}
                                onEditComment={this.showEditModal}
                            />
                        ))}
                    </ul>
                }
                <AddCommentButton parentId={parentId} />
                <EditCommentModal
                    modalOpen={editModalOpen}
                    commentId={commentId}
                    commentBody={commentBody}
                    onCloseModal={this.hideEditModal}
                />
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        parentId: ownProps.parentId,
        comments: state.commentsReducer.comments
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchComments: (parentId) => dispatch(fetchComments(parentId)),
        fetchRemoveComment: (id) => dispatch(fetchRemoveComment(id))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Comments));