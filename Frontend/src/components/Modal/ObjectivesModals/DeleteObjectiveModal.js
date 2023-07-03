import { makeStyles } from '@material-ui/core'

import styles from '../styles/ObjectiveModalStyle'
import DeleteActionModal from 'components/ReactTableActions/Delete/DeleteActionModal'

const useStyles = makeStyles(styles)

const DeleteObjective = ({ sendDelete, closeDeleteActivityModal, deleteActivityModal, deleteActivityInfo }) => {
  const handleDelete = (e) => {
    e.preventDefault()
    sendDelete(deleteActivityInfo.id_objetivo)
    closeDeleteActivityModal()
  }

  return (
    <DeleteActionModal
      open={deleteActivityModal}
      handleCloseModal={closeDeleteActivityModal}
      handleSubmit={handleDelete}
      modalTitle={`Eliminar Objetivo`}
      showDeleteInfo={deleteActivityInfo.descripcion_tarea}
    ></DeleteActionModal>
  )
}

export default DeleteObjective
