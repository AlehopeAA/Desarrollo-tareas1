import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Dialog, DialogTitle, DialogContent, DialogActions, makeStyles } from '@material-ui/core'
import Button from '../../CustomButtons/Button'
import GridContainer from 'components/Grid/GridContainer'
import GridItem from 'components/Grid/GridItem'
import Typography from '@mui/material/Typography'
import { Close } from '@material-ui/icons'
import { investmentAnnulationRequest } from 'redux/actions/investmentActions'
import { INVESTMENT_ANNULATION_REQUEST_RESET, INVESTMENT_MY_LIST_RESET } from 'redux/constants/investmentConstants'
import { PROJECT_LIST_RESET } from 'redux/constants/projectConstant'
import SnackbarContent from 'components/Snackbar/SnackbarContent'
import styles from '../styles/confirmDeleteStyles'

const useStyles = makeStyles(styles)

const ConfirmDeleteInvestmentModal = ({ handleCloseInvestmentModal, investmentModal, showInvestmentInfo }) => {
  const dispatch = useDispatch()
  const classes = useStyles()

  const {
    successInvestmentDeclineMyRequest,
    errorInvestmentDeclineMyRequest,
    loadingInvestmentDeclineMyRequest,
  } = useSelector((state) => state.investmentDeclineMyRequest)

  useEffect(() => {
    if (successInvestmentDeclineMyRequest) {
      dispatch({ type: INVESTMENT_MY_LIST_RESET })
      dispatch({ type: INVESTMENT_ANNULATION_REQUEST_RESET })
      dispatch({ type: PROJECT_LIST_RESET })
    }
  }, [successInvestmentDeclineMyRequest])

  const handleDeclineInvestment = (e) => {
    e.preventDefault()
    dispatch(investmentAnnulationRequest({ _id: showInvestmentInfo?._id }))
  }

  return (
    <Dialog
      classes={{
        root: classes.modalRoot,
        paper: classes.modal,
      }}
      open={investmentModal}
      keepMounted
      onClose={handleCloseInvestmentModal}
      aria-labelledby='notice-modal-slide-title'
      aria-describedby='notice-modal-slide-description'
    >
      <form onSubmit={handleDeclineInvestment}>
        <DialogTitle id='notice-modal-slide-title' disableTypography className={classes.modalHeader}>
          <Button
            justIcon
            className={classes.modalCloseButton}
            key='close'
            aria-label='Close'
            color='transparent'
            onClick={handleCloseInvestmentModal}
          >
            <Close className={classes.modalClose} />
          </Button>
          <h4>{`Retirar inversión`}</h4>
        </DialogTitle>

        <DialogContent id='notice-modal-slide-description' className={classes.modalBody}>
          <GridContainer>
            <GridItem xs={12}>
              <Typography>¿Estás seguro que queres retirar la inversión de {showInvestmentInfo?.amount}?</Typography>
            </GridItem>
            <GridItem xs={12}>
              <Typography>Esta solicitud quedará pendiente hasta que sea revisada por un administrador.</Typography>
            </GridItem>
          </GridContainer>
        </DialogContent>
        {errorInvestmentDeclineMyRequest && (
          <GridContainer>
            <GridItem xs={6}>
              <SnackbarContent message={errorInvestmentDeclineMyRequest} color='danger' />
            </GridItem>
          </GridContainer>
        )}
        <DialogActions className={classes.modalFooter}>
          <GridContainer>
            <GridItem xs={6}>
              <Button onClick={handleCloseInvestmentModal} block>
                Cancelar
              </Button>
            </GridItem>
            <GridItem xs={6}>
              <Button type='onSubmit' color='github' block>
                Confirmar
              </Button>
            </GridItem>
          </GridContainer>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default ConfirmDeleteInvestmentModal
