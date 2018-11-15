import React from 'react'
import PropTypes from 'prop-types'
import MaterialIcon from 'material-icons-react'
import EditPostForm from './EditPostForm'

const EditPostModal = (props) => {
  const {modalOpen,id, title, body} = props
  return (
    <div>
        <div 
          className={`modal-overlay ${modalOpen}`} 
          onClick={props.onCloseModal}>
        </div>
        <div className={`modal edit-post-modal ${modalOpen}`}>
            <EditPostForm
                id={id} 
                defaultTitle={title} 
                defaultBody={body} 
                onPostPageFormSubmited={props.onCloseModal}
                />
          <div className="close-modal" onClick={props.onCloseModal}>
            <MaterialIcon icon="close"/>
          </div>
        </div>
    </div>
  )
}

EditPostModal.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  modalOpen: PropTypes.string.isRequired,
  onCloseModal: PropTypes.func.isRequired,
}

export default EditPostModal