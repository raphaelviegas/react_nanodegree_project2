import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AddCommentModal from './AddCommentModal'

export class AddCommentButton extends Component {
    static propTypes = {
        parentId: PropTypes.string.isRequired,
    }

    state = {
        modalOpen: ''
    }

    openModal = () => this.setState(() => ({ modalOpen: 'modal-open' }))
    closeModal = () => this.setState(() => ({ modalOpen: '' }))

    render() {
        const { modalOpen } = this.state
        const { parentId } = this.props
        return (
            <div>
                <button
                    className="btn-flat blue-grey lighten-5 add-comment-btn"
                    onClick={() => this.openModal()}
                >Add nem Comment</button>
                <AddCommentModal
                    modalOpen={modalOpen}
                    onCloseModal={this.closeModal}
                    parentId={parentId}
                />
            </div>
        )
    }
}

export default AddCommentButton
