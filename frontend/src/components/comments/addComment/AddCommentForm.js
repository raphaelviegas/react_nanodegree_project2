import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { fetchAddComment } from '../../../actions/comments'
const uuidv4 = require('uuid/v4')

export class AddCommentForm extends Component {
    static propTypes = {
        parentId: PropTypes.string.isRequired,
        closeModal: PropTypes.func.isRequired,
    }

    state = {
        body: '',
        author: '',
    }

    onFormChange = (value, inputField) => {
        this.setState({ [inputField]: value })
    }

    onResetForm = () => {
        this.setState({
            body: '',
            author: '',
        })
    }

    onFormSubmit = ({ body, author, parentId }) => {
        let timestamp = Date.now()
        let id = uuidv4()
        let commentInfo = { id, body, author, timestamp, parentId }
        this.props.fetchAddComment(commentInfo)
        this.onResetForm()
        this.props.closeModal()
    }

    render() {
        const { body, author } = this.state
        const { parentId } = this.props
        return (
            <div>
                <div className="modal-content">
                    <h4>Add new comment</h4>
                    <form className="col s12">
                        <div className="row form-row">
                            <div className="input-field col s12 ">
                                <input
                                    placeholder="Author's name"
                                    type="text"
                                    value={author}
                                    onChange={(event) => this.onFormChange(event.target.value, 'author')}
                                />
                                <label>Comment Author</label>
                            </div>
                            <div className="input-field col s12">
                                <textarea
                                    placeholder="Type some text"
                                    type="text"
                                    value={body}
                                    onChange={(event) => this.onFormChange(event.target.value, 'body')}
                                    className="materialize-textarea" />
                                <label>Comment Body</label>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="modal-footer">
                    <button
                        className="red-text text-darken-2 btn-flat addCommentButton btn-reset-comment"
                        onClick={() => this.onResetForm()}
                    >Reset form</button>
                    <button
                        className="btn white-text cyan darken-4 btn-flat addCommentButton btn-add-comment"
                        onClick={() => this.onFormSubmit({ author, body, parentId })}
                    >Add Comment</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        parentId: ownProps.parentId,
        closeModal: ownProps.closeModal
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAddComment: (commentInfo) => dispatch(fetchAddComment(commentInfo))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddCommentForm));
