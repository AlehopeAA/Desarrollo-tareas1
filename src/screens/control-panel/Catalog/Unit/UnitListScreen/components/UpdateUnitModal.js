import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Dialog, DialogContent, DialogTitle, makeStyles } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import Button from 'components/CustomButtons/Button'
import GridContainer from 'components/Grid/GridContainer'
import CustomInput from 'components/CustomInput/CustomInput'
import GridItem from 'components/Grid/GridItem'
import SnackbarContent from 'components/Snackbar/SnackbarContent'
import { unitUpdateInfo, getUnits } from 'redux/actions/unitActions'
import { UNIT_UPDATE_RESET } from 'redux/constants/unitConstants'
import styles from '../styles/updateUnitModalStyles'

const useStyles = makeStyles(styles)

const UpdateUnitModal = ({ handleCloseModal, updateUnitModal, showUpdateUnit }) => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const [infoUnit, setInfoUnit] = useState(showUpdateUnit)

  const { loadingUnitUpdate, errorUnitUpdate, successUnitUpdate } = useSelector((state) => state.unitUpdate)

  useEffect(() => {
    if (successUnitUpdate) {
      dispatch(getUnits())
      setTimeout(() => {
        dispatch({ type: UNIT_UPDATE_RESET })
        handleCloseModal()
      }, 1000)
    }
  }, [successUnitUpdate])

  const updateUnitHandler = (e) => {
    e.preventDefault()
    dispatch(unitUpdateInfo(infoUnit))
  }
  return (
    <Dialog
      open={updateUnitModal}
      keepMounted
      onClose={handleCloseModal}
      aria-labelledby='notice-modal-slide-title'
      aria-describedby='notice-modal-slide-description'
    >
      <form onSubmit={updateUnitHandler} autoComplete='false'>
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
          <h4 className={classes.modalTitle}>{`Editar Unidad`}</h4>
        </DialogTitle>
        <DialogContent id='notice-modal-slide-description' className={classes.modalBody}>
          <GridContainer>
            <GridItem xs={12} sm={6}>
              <CustomInput
                labelText={'COD. UNIDAD'}
                id='codeUnit'
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  value: infoUnit.codigo_unidad,
                  onChange: (e) => setInfoUnit({ ...infoUnit, codigo_unidad: e.target.value }),
                  type: 'text',
                  required: true,
                }}
              />
            </GridItem>
            <GridItem xs={12} sm={6}>
              <CustomInput
                labelText={'DESCRIPCION'}
                id='description'
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  value: infoUnit.descripcion_unidad,
                  onChange: (e) => setInfoUnit({ ...infoUnit, descripcion_unidad: e.target.value }),
                  type: 'text',
                  required: true,
                }}
              />
            </GridItem>
            <GridItem xs={12} style={{ margin: '20px 0' }}>
              <Button type='submit' color={successUnitUpdate ? 'success' : 'primary'} block>
                {loadingUnitUpdate ? 'Actualizando...' : successUnitUpdate ? 'Unidad Actualizada' : 'Actualizar Unidad'}
              </Button>
            </GridItem>
          </GridContainer>
          {errorUnitUpdate && (
            <GridContainer>
              <GridItem xs={12}>
                <SnackbarContent message={errorUnitUpdate} color='danger' />
              </GridItem>
            </GridContainer>
          )}
        </DialogContent>
      </form>
    </Dialog>
  )
}

export default UpdateUnitModal
