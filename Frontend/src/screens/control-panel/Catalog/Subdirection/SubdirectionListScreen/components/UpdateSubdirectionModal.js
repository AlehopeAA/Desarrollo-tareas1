import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Dialog, DialogContent, DialogTitle, makeStyles } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import Button from 'components/CustomButtons/Button'
import GridContainer from 'components/Grid/GridContainer'
import CustomInput from 'components/CustomInput/CustomInput'
import GridItem from 'components/Grid/GridItem'
import SnackbarContent from 'components/Snackbar/SnackbarContent'
import { SUBDIRECTION_UPDATE_RESET } from 'redux/constants/subdirectionConstants'
import { subdirectionUpdateInfo, getSubdirections } from 'redux/actions/subdirectionActions'
import styles from '../styles/updateSubdirectionModalStyles'

const useStyles = makeStyles(styles)

const UpdateSubdirectionModal = ({ handleCloseModal, updateSubdirectionModal, showUpdateSubdirection }) => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const [infoSubdirection, setInfoSubdirection] = useState(showUpdateSubdirection)

  const { loadingSubdirectionUpdate, errorSubdirectionUpdate, successSubdirectionUpdate } = useSelector(
    (state) => state.subdirectionUpdate
  )

  useEffect(() => {
    if (successSubdirectionUpdate) {
      dispatch(getSubdirections())
      setTimeout(() => {
        dispatch({ type: SUBDIRECTION_UPDATE_RESET })
        handleCloseModal()
      }, 1000)
    }
  }, [successSubdirectionUpdate])

  const updateSubdirectionHandler = (e) => {
    e.preventDefault()
    dispatch(subdirectionUpdateInfo(infoSubdirection))
  }
  return (
    <Dialog
      open={updateSubdirectionModal}
      keepMounted
      onClose={handleCloseModal}
      aria-labelledby='notice-modal-slide-title'
      aria-describedby='notice-modal-slide-description'
    >
      <form onSubmit={updateSubdirectionHandler} autoComplete='false'>
        <DialogTitle id='notice-modal-slide-title' disableTypography className={classes.modalHeader}>
          <Button
            justIcon
            className={classes.modalCloseButton}
            key='close'
            aria-label='Close'
            color='transparent'
            onClick={handleCloseModal}
          >
            <Close className={classes.modalClose} />
          </Button>
          <h4 className={classes.modalTitle}>{`Editar Subdireccion`}</h4>
        </DialogTitle>
        <DialogContent id='notice-modal-slide-description' className={classes.modalBody}>
          <GridContainer>
            <GridItem xs={12} md={6}>
              <CustomInput
                labelText={'COD. SUBDIRECCION'}
                id='codeSubdirection'
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  value: infoSubdirection.codigo_subdireccion,
                  onChange: (e) => setInfoSubdirection({ ...infoSubdirection, codigo_subdireccion: e.target.value }),
                  type: 'text',
                  required: true,
                }}
              />
            </GridItem>
            <GridItem xs={12} md={6}>
              <CustomInput
                labelText={'DESCRIPCION'}
                id='description'
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  value: infoSubdirection.descripcion_subdireccion,
                  onChange: (e) =>
                    setInfoSubdirection({ ...infoSubdirection, descripcion_subdireccion: e.target.value }),
                  type: 'text',
                  required: true,
                }}
              />
            </GridItem>
            <GridItem xs={12} style={{ margin: '20px 0' }}>
              <Button type='submit' color={successSubdirectionUpdate ? 'success' : 'primary'} block>
                {loadingSubdirectionUpdate
                  ? 'Actualizando...'
                  : successSubdirectionUpdate
                  ? 'Subdireccion Actualizada'
                  : 'Actualizar Subdireccion'}
              </Button>
            </GridItem>
          </GridContainer>
          {errorSubdirectionUpdate && (
            <GridContainer>
              <GridItem xs={12}>
                <SnackbarContent message={errorSubdirectionUpdate} color='danger' />
              </GridItem>
            </GridContainer>
          )}
        </DialogContent>
      </form>
    </Dialog>
  )
}

export default UpdateSubdirectionModal
