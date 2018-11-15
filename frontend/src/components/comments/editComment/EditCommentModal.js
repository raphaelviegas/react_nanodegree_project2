import React from 'react'
import PropTypes from 'prop-types'
import MaterialIcon from 'material-icons-react'
import EditCommentForm from './EditCommentForm'

const EditCommentModal =  (props) => {
  const {modalOpen, commentId, commentBody} = props
  return (
    <div>
        <div 
          className={`modal-overlay ${modalOpen}`} 
          onClick={props.onCloseModal}>
        </div>
        <div className={`modal edit-post-modal ${modalOpen}`}>
            <EditCommentForm
                commentId={commentId}
                commentBody={commentBody}
                closeModal={props.onCloseModal}
            />
          <div className="close-modal" onClick={props.onCloseModal}>
            <MaterialIcon icon="close"/>
          </div>
        </div>
    </div>
  )
}

EditCommentModal.propTypes = {
  modalOpen: PropTypes.string.isRequired,
  commentId: PropTypes.string.isRequired,
  commentBody: PropTypes.string.isRequired,
  onCloseModal: PropTypes.func.isRequired,
}

export default EditCommentModal