import { makeStyles, Typography } from '@material-ui/core'

import GridContainer from 'components/Grid/GridContainer'
import GridItem from 'components/Grid/GridItem'
import ViewInfoActionModal from 'components/ReactTableActions/ViewInfo/ViewInfoActionModal'

import styles from '../styles/ObjectiveModalStyle'

const useStyles = makeStyles(styles)

const ViewTaskInfo = ({ closeViewActivityInfoModal, info }) => {
  const classes = useStyles()

  const {
    id_tarea,
    descripcion_tarea,
    id_puesto,
    tipo_tarea,
    indicador,
    cuantificable,
    entrada,
    compartida,
    dificultad,
    acumulativa,
    activo,
    fecha_alta,
    fecha_baja,
    perfiles,
  } = info

  return (
    <ViewInfoActionModal
      open={true}
      handleCloseModal={closeViewActivityInfoModal}
      modalTitle={`Información de la tarea`}
      children={
        <GridContainer>
          <GridItem xs={12} md={12}>
            <Typography variant='body1' gutterBottom>
              Descripción: <b>{descripcion_tarea}</b>
            </Typography>
            <Typography variant='body1' gutterBottom>
              ID de la tarea: <b>{id_tarea}</b>
            </Typography>
            <Typography variant='body1' gutterBottom>
              Fecha de alta: <b>{fecha_alta.slice(0, 10)} </b>
            </Typography>

            <Typography variant='body1' gutterBottom>
              Perfiles: <b>{perfiles || '-'}</b>
            </Typography>
          </GridItem>
          <GridItem className={classes.resourcesContainer} xs={12} md={12}>
            {id_puesto && (
              <Typography variant='body1' gutterBottom>
                ID del puesto: <b>{id_puesto}</b>
              </Typography>
            )}
            {tipo_tarea === 'EXTRAORDINARIA' ||
              (tipo_tarea === 'ORDINARIA' && (
                <Typography variant='body1' gutterBottom>
                  Tipo de tarea: <b>{tipo_tarea}</b>
                </Typography>
              ))}
          </GridItem>
          <GridItem className={classes.resourcesContainer} style={{ margin: '20px 0' }} xs={12} md={12}>
            <GridItem className={classes.resourcesItem} style={{ margin: '20px 0' }} xs={6} md={6}>
              <Typography variant='body1' className={classes.resourcesTitle} gutterBottom>
                Indicador: <b>{indicador}</b>
              </Typography>
              <Typography variant='body1' className={classes.resourcesTitle} gutterBottom>
                Cuantificable: <b>{cuantificable}</b>
              </Typography>
              <Typography variant='body1' className={classes.resourcesTitle} gutterBottom>
                Entrada: <b>{entrada}</b>
              </Typography>
            </GridItem>
            <GridItem className={classes.resourcesItem} style={{ margin: '20px 0' }} xs={6} md={6}>
              <Typography variant='body1' className={classes.resourcesTitle} gutterBottom>
                Compartida: <b>{compartida}</b>
              </Typography>
              <Typography variant='body1' className={classes.resourcesTitle} gutterBottom>
                Dificultad: <b>{dificultad}</b>
              </Typography>
              <Typography variant='body1' className={classes.resourcesTitle} gutterBottom>
                Acumulativa: <b>{acumulativa} </b>
              </Typography>
            </GridItem>
          </GridItem>
          {activo === 'NO' && (
            <GridItem className={classes.resourcesItem} xs={12} md={12}>
              <h3 className={classes.resourcesTitle}>
                <b>Tarea desactivada</b>
              </h3>
              <Typography className={classes.resourcesTitle} variant='body1' gutterBottom>
                Fecha de baja: <b>{fecha_baja.slice(0, 10)} </b>
              </Typography>
            </GridItem>
          )}
        </GridContainer>
      }
    />
  )
}

export default ViewTaskInfo
