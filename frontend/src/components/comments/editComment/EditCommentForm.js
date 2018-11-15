import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {fetchEditComment} from '../../../actions/comments'

export class EditCommentForm extends Component {
    static propTypes = {
        commentId: PropTypes.string.isRequired,
        commentBody: PropTypes.string.isRequired,
        closeModal: PropTypes.func.isRequired
    }

    state = {
        body: '',
    }

    fillDefaultValue (body) {
        this.setState({
            body
        })
    }

    componentDidMount () {
        this.fillDefaultValue (this.props.commentBody)
    }

    componentDidUpdate(prevProps){
        if (this.props.commentBody !== prevProps.commentBody) {
            this.fillDefaultValue (this.props.commentBody)
        }
    }

    onFormChange = (value, inputField) => {
        this.setState({[inputField]: value})
    }

    onFormSubmit = (body, id) => {
        let timestamp = Date.now()
        let commentInfo = {body, timestamp}
        this.props.fetchEditComment(id, commentInfo)
        this.props.closeModal()
    }

    render() {
        const {body} = this.state
        const {commentId} = this.props
        return (
            <div>
                <div className="modal-content">
                    <h4>Edit comment</h4>
                    <form className="col s12">
                        <div className="row form-row">
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
                        className="btn white-text cyan darken-4 btn-flat"
                        onClick={() => this.onFormSubmit(body, commentId)}
                    >Edit Comment</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        commentId: ownProps.commentId,
        commentBody: ownProps.commentBody,
        closeModal: ownProps.closeModal
    }
}
  
const mapDispatchToProps = (dispatch) => {
    return {
        fetchEditComment: (id, commentInfo) => dispatch(fetchEditComment(id, commentInfo))
    }
}
  
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditCommentForm));
