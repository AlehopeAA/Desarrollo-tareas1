import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Dialog, DialogActions, DialogContent, DialogTitle, makeStyles } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import Typography from '@mui/material/Typography'
import Button from 'components/CustomButtons/Button'
import styles from '../styles/deleteTeamModalStyles'
import GridContainer from 'components/Grid/GridContainer'
import GridItem from 'components/Grid/GridItem'
import DesactiveTeamModal from './DesactiveTeamModal'
import { deleteTeamWork } from 'redux/actions/teamWorkActions'
import SweetAlert from 'react-bootstrap-sweetalert'


const useStyles = makeStyles(styles)

const DeleteTeamModal = ({ handleCloseDeleteTeamModal, deleteTeamModal, showDeleteTeamInfo, alert }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  console.log(showDeleteTeamInfo)
  const [desactiveTeamModal, setDesactiveTeamModal] = useState(false)

  const [perfilesTareasCompartidasBool, setPerfilesTareasCompartidas] = useState(false)
  const [mensajeAlertaActiviadesCompartidas, setMensajeAlertaActiviadesCompartidas] = useState("")
    const [alertDelete, setAlertDelete] = useState(null)


  const { successTeamWorkDelete } = useSelector((state) => state.teamWorkDelete)
  useEffect(() => {
    if (successTeamWorkDelete) {
      handleCloseDeleteTeamModal()
    }
  }, [successTeamWorkDelete])
  const handleDeleteTeam = (e) => {
    e.preventDefault()
    console.log("Pasa por aqui?")
    actualizarEstados(showDeleteTeamInfo)
    dispatch(deleteTeamWork(showDeleteTeamInfo.id_puesto))
  }

  const handleCloseDesactiveTeamModal = () => {
    setDesactiveTeamModal(false)
    handleCloseDeleteTeamModal()
    console.log("se cierra el modal ??")
  }

  const actualizarEstados = (jobPosition) => {
    var messageTareasCompartidas = "";
    var perfilesTareasCompartidas = ""
    console.log( jobPosition)
    jobPosition.tareas_compartidas.forEach((profile)=>
    {
      if (profile.count_tareas_compartidas > 0) {
        perfilesTareasCompartidas += ` ${profile.codigo_perfil},`
      }
    });
    console.log(perfilesTareasCompartidas)
    console.log(perfilesTareasCompartidas.length)
  
    messageTareasCompartidas = `El trabajador incativado tenía alguna tarea compartida en el perfil ${perfilesTareasCompartidas}
    por favor revise el reparto de % de responsabilidad de los trabajadores que continúan desarrollando esta/s tareas/s compartidas/s.` 
   if(perfilesTareasCompartidas.length > 0){
      setMensajeAlertaActiviadesCompartidas(messageTareasCompartidas)
      console.log(messageTareasCompartidas)
  
      setPerfilesTareasCompartidas(perfilesTareasCompartidas)
      console.log(perfilesTareasCompartidasBool)
    }
  }
  const alertPerfilActividadesCompartidas = () => {
    console.log(perfilesTareasCompartidasBool + "popopopopo" + mensajeAlertaActiviadesCompartidas)
    if(perfilesTareasCompartidasBool){
      setAlertDelete(
        <SweetAlert
          info
          style={{ display: 'block', marginTop: '-100px' }}
          title='Aviso!'
          onConfirm={() => {
          // Restablecer los estados a sus valores iniciales
          setPerfilesTareasCompartidas(false);
          setMensajeAlertaActiviadesCompartidas("");
          setAlertDelete(null);
        }}
          onCancel={() => setAlertDelete(null)}
          confirmBtnCssClass={classes.button + ' ' + classes.success}
        >
         {mensajeAlertaActiviadesCompartidas}
        </SweetAlert>
      )
    }else{
      setAlertDelete(null)
    }
  }


  return (
    <>
      <Dialog
        classes={{
          root: classes.modalRoot,
          paper: classes.modal,
        }}
        open={deleteTeamModal}
        keepMounted
        onClose={handleCloseDeleteTeamModal}
        aria-labelledby='team-modal-delete-title'
        aria-describedby='team-modal-delete-description'
      >
        <form onSubmit={handleDeleteTeam}>
          <DialogTitle id='team-modal-delete-title' disableTypography className={classes.modalHeader}>
            <Button
              justIcon
              className={classes.modalCloseButton}
              key='close'
              aria-label='Close'
              color='transparent'
              onClick={handleCloseDeleteTeamModal}
            >
              <Close className={classes.modalClose} />
            </Button>
            <h4>Eliminar Puesto de Trabajo</h4>
          </DialogTitle>
          <DialogContent id='team-modal-delete-description' className={classes.modalBody}>
            <GridContainer>
              <GridItem xs={12}>
                <Typography>Va a eliminar el puesto de trabajo {showDeleteTeamInfo?.cod_ayre}</Typography>
                <Typography>¿Está seguro que desea continuar?</Typography>
              </GridItem>
            </GridContainer>
          </DialogContent>
          <DialogActions className={classes.modalFooter}>
            <GridContainer>
              <GridItem xs={6}>
                <Button onClick={handleCloseDeleteTeamModal} block>
                  No
                </Button>
              </GridItem>
              <GridItem xs={6}>
                <Button type='onSubmit' color='primary' block>
                  Si
                </Button>
              </GridItem>
            </GridContainer>
          </DialogActions>
        </form>
      </Dialog>
      {desactiveTeamModal && (
        <DesactiveTeamModal
          handleCloseDesactiveTeamModal={handleCloseDesactiveTeamModal}
          desactiveTeamModal={desactiveTeamModal}
          showDesactiveTeamInfo={showDeleteTeamInfo}
        />
      )}
    </>
  )
}

export default DeleteTeamModal
