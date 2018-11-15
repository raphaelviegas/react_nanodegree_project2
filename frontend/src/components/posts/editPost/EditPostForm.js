import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { fetchEditPost } from '../../../actions/posts'

export class EditPostForm extends Component {
    static propTypes = {
        defaultTitle: PropTypes.string.isRequired,
        defaultBody: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        postCardFormSubmited: PropTypes.func,
        postPageFormSubmited: PropTypes.func,
    }

    state = {
        title: '',
        body: '',
    }

    componentDidMount() {
        this.setState({
            title: this.props.defaultTitle,
            body: this.props.defaultBody
        })
    }

    onFormChange = (value, inputField) => {
        this.setState({ [inputField]: value })
    }

    onFormSubmit = ({ title, body, id }) => {
        let editContent = { title, body }
        this.props.fetchEditPost(id, editContent)
        this.props.postCardFormSubmited && this.props.postCardFormSubmited()
        this.props.postPageFormSubmited && this.props.postPageFormSubmited()
    }

    render() {
        const { title, body } = this.state
        const { id } = this.props
        return (
            <div className="edit-form">
                <form className="col s12">
                    <div className="row form-row">
                        <div className="input-field col s12">
                            <input
                                placeholder="This is an example title"
                                type="text"
                                value={title}
                                onChange={(event) => this.onFormChange(event.target.value, 'title')}
                            />
                            <label>Post Title</label>
                        </div>
                        <div className="input-field col s12">
                            <textarea
                                placeholder="Type some text"
                                type="text"
                                value={body}
                                onChange={(event) => this.onFormChange(event.target.value, 'body')}
                                className="materialize-textarea" />
                            <label>Body</label>
                        </div>
                    </div>
                </form>
                <button
                    className="btn white-text cyan darken-4 btn-flat btn-small right"
                    onClick={() => this.onFormSubmit({ title, body, id })}
                >Edit Post</button>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        defaultTitle: ownProps.defaultTitle,
        defaultBody: ownProps.defaultBody,
        id: ownProps.id,
        postCardFormSubmited: ownProps.onPostCardFormSubmited,
        postPageFormSubmited: ownProps.onPostPageFormSubmited
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchEditPost: (id, editContent) => dispatch(fetchEditPost(id, editContent))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditPostForm));
