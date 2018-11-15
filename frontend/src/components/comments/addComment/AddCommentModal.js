import React from 'react'
import PropTypes from 'prop-types'
import MaterialIcon from 'material-icons-react'
import AddCommentForm from './AddCommentForm'

const AddCommentModal =  (props) => {
  const {modalOpen, parentId} = props
  return (
    <div>
        <div 
          className={`modal-overlay ${modalOpen}`} 
          onClick={props.onCloseModal}>
        </div>
        <div className={`modal edit-post-modal ${modalOpen}`}>
            <AddCommentForm
                parentId={parentId}
                closeModal={props.onCloseModal}
            />
          <div className="close-modal" onClick={props.onCloseModal}>
            <MaterialIcon icon="close"/>
          </div>
        </div>
    </div>
  )
}

AddCommentModal.propTypes = {
  modalOpen: PropTypes.string.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  parentId: PropTypes.string.isRequired
}

export default AddCommentModal