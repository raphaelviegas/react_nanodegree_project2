import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { fetchAddPost, isLoading } from '../../../actions/posts'
const uuidv4 = require('uuid/v4')

export class AddPostForm extends Component {
    static propTypes = {
        categories: PropTypes.array.isRequired,
    }

    state = {
        title: '',
        body: '',
        author: '',
        category: 'none',
        error: false
    }

    onFormChange = (value, inputField) => {
        this.setState({ [inputField]: value })
    }

    onResetForm = () => {
        this.setState({
            title: '',
            body: '',
            author: '',
            error: false
        })
    }

    onFormSubmit = ({ title, body, author, category }) => {
        //Check if each the field are filled
        let error = false
        if (title === '') { error = true }
        if (body === '') { error = true }
        if (author === '') { error = true }
        if (category === 'none') { error = true }
        //Check if all the field are filled. If not, show an error message
        if (error === false) {
            let timestamp = Date.now()
            let id = uuidv4()
            let postInfo = { title, body, author, category, timestamp, id }
            this.addPost(postInfo)
        } else {
            this.setState(state => {
                state = { ...state, error }
                return state
            })
        }
    }

    addPost = (postInfo) => {
        this.props.isLoading()
        this.props.fetchAddPost(postInfo)
        this.props.history.push(`/${postInfo.category}/${postInfo.id}`)
    }

    render() {
        const { categories } = this.props
        const { title, body, author, category, error } = this.state
        return (
            <div>
                <div className="modal-content">
                    <h4>Add new post</h4>
                    <form className="col s-12">
                        <div className="row form-row">
                            <div className="input-field col s12">
                                <input
                                    className="input-title"
                                    placeholder="This is an example title"
                                    type="text"
                                    value={title}
                                    onChange={(event) => this.onFormChange(event.target.value, 'title')}
                                />
                                <label>Post Title</label>
                            </div>
                            <div className="input-field col s12 m6">
                                <input
                                    className="input-author"
                                    placeholder="Author's name"
                                    type="text"
                                    value={author}
                                    onChange={(event) => this.onFormChange(event.target.value, 'author')}
                                />
                                <label>Post Author</label>
                            </div>
                            <div className="col s12 m6">
                                <label>Post Category</label>
                                <select
                                    className="browser-default category-select"
                                    defaultValue={category}
                                    onChange={(event) => this.onFormChange(event.target.value, 'category')}
                                >
                                    <option value="none">Choose category</option>
                                    {categories.map(category => {
                                        return <option value={category.path} key={category.path}>{category.name}</option>
                                    })}
                                </select>
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
                </div>
                <div className="modal-footer">
                    {//Check if there is an error on the form
                        error === true && <p className="form-error-message">Error! Please fill all the field before submitting the form</p>
                    }
                    <button
                        className="red-text text-darken-2 btn-flat btn-reset-form"
                        onClick={() => this.onResetForm()}
                    >Reset form</button>
                    <button
                        className="btn white-text cyan darken-4 btn-flat btn-add-post"
                        onClick={() => this.onFormSubmit({ title, author, body, category })}
                    >Add Post</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        categories: state.categoriesReducer.categories,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAddPost: (postInfo) => dispatch(fetchAddPost(postInfo)),
        isLoading: () => dispatch(isLoading())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddPostForm));
