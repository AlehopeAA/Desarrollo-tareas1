import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Dialog, DialogContent, DialogTitle, makeStyles } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import Button from 'components/CustomButtons/Button'
import GridContainer from 'components/Grid/GridContainer'
import CustomInput from 'components/CustomInput/CustomInput'
import GridItem from 'components/Grid/GridItem'
import SnackbarContent from 'components/Snackbar/SnackbarContent'
import { ROLE_UPDATE_RESET } from 'redux/constants/roleConstants'
import { roleUpdateInfo, getRoles } from 'redux/actions/roleActions'
import styles from '../styles/updateRoleModalStyles'

const useStyles = makeStyles(styles)

const UpdateRoleModal = ({ handleCloseModal, updateRoleModal, showUpdateRole }) => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const [infoRole, setInfoRole] = useState(showUpdateRole)

  const { loadingRoleUpdate, errorRoleUpdate, successRoleUpdate } = useSelector((state) => state.roleUpdate)

  useEffect(() => {
    if (successRoleUpdate) {
      dispatch(getRoles())
      setTimeout(() => {
        dispatch({ type: ROLE_UPDATE_RESET })
        handleCloseModal()
      }, 1000)
    }
  }, [successRoleUpdate])

  const updateRoleHandler = (e) => {
    e.preventDefault()
    dispatch(roleUpdateInfo(infoRole))
  }
  return (
    <Dialog
      open={updateRoleModal}
      keepMounted
      onClose={handleCloseModal}
      aria-labelledby='notice-modal-slide-title'
      aria-describedby='notice-modal-slide-description'
    >
      <form onSubmit={updateRoleHandler} autoComplete='false'>
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
          <h4 className={classes.modalTitle}>{`Editar Rol`}</h4>
        </DialogTitle>
        <DialogContent id='notice-modal-slide-description' className={classes.modalBody}>
          <GridContainer>
            <GridItem xs={12} md={6}>
              <CustomInput
                labelText={'COD. ROL'}
                id='codeRole'
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  value: infoRole.codigo_rol,
                  onChange: (e) => setInfoRole({ ...infoRole, codigo_rol: e.target.value }),
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
                  value: infoRole.descripcion_rol,
                  onChange: (e) => setInfoRole({ ...infoRole, descripcion_rol: e.target.value }),
                  type: 'text',
                  required: true,
                }}
              />
            </GridItem>
            <GridItem xs={12} style={{ margin: '20px 0' }}>
              <Button type='submit' color={successRoleUpdate ? 'success' : 'primary'} block>
                {loadingRoleUpdate ? 'Actualizando...' : successRoleUpdate ? 'Rol Actualizado' : 'Actualizar Rol'}
              </Button>
            </GridItem>
          </GridContainer>
          {errorRoleUpdate && (
            <GridContainer>
              <GridItem xs={12}>
                <SnackbarContent message={errorRoleUpdate} color='danger' />
              </GridItem>
            </GridContainer>
          )}
        </DialogContent>
      </form>
    </Dialog>
  )
}

export default UpdateRoleModal
