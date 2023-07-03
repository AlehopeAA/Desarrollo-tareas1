import { Dialog, DialogContent, DialogTitle, makeStyles } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import Button from 'components/CustomButtons/Button'
import GridContainer from 'components/Grid/GridContainer'
import CustomInput from 'components/CustomInput/CustomInput'
import GridItem from 'components/Grid/GridItem'
import styles from '../styles/updateDepartamentModalStyles'

const useStyles = makeStyles(styles)

const ViewDepartamentModal = ({ handleCloseViewModal, viewDepartamentModal, showViewDepartament }) => {
  const classes = useStyles()

  return (
    <Dialog
      open={viewDepartamentModal}
      keepMounted
      onClose={handleCloseViewModal}
      aria-labelledby='notice-modal-slide-title'
      aria-describedby='notice-modal-slide-description'
    >
      <DialogTitle id='notice-modal-slide-title' disableTypography className={classes.modalHeader}>
        <Button
          justIcon
          className={classes.modalCloseButton}
          key='close'
          aria-label='Close'
          color='transparent'
          onClick={handleCloseViewModal}
        >
          <Close className={classes.modalClose} />
        </Button>
        <h4 className={classes.modalTitle}>Información de Departamento</h4>
      </DialogTitle>
      <DialogContent id='notice-modal-slide-description' className={classes.modalBody}>
        <GridContainer>
          <GridItem xs={12} md={6}>
            <CustomInput
              labelText={'COD. DEPARTAMENTO'}
              id='codeDepartament'
              formControlProps={{
                fullWidth: true,
              }}
              inputProps={{
                value: showViewDepartament.codigo_departamento,
                type: 'text',
                disabled: true,
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
                value: showViewDepartament.descripcion_departamento,
                type: 'text',
                disabled: true,
              }}
            />
          </GridItem>
          <GridItem xs={12} style={{ margin: '20px 0 0', display: 'flex', justifyContent: 'flex-end' }}>
            <Button type='submit' color='primary' onClick={handleCloseViewModal} block>
              Cerrar
            </Button>
          </GridItem>
        </GridContainer>
      </DialogContent>
    </Dialog>
  )
}

export default ViewDepartamentModal
