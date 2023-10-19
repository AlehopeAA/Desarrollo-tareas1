import { format } from 'date-fns'
import { Typography, makeStyles } from '@material-ui/core'
import GridContainer from 'components/Grid/GridContainer'
import GridItem from 'components/Grid/GridItem'
import ViewInfoActionModal from 'components/ReactTableActions/ViewInfo/ViewInfoActionModal'
import styles from '../../styles/informeIndividualScreenStyles'

const useStyles = makeStyles(styles)
const ViewCorreccionHorasModal = ({ viewInfo, closeViewInfoModal, info }) => {
  const classes = useStyles()
  const { nivel_global, nivel_global_corregido, tipo_tarea, descripcion_tarea, horas, unidades, nivel_unidades, nivel_unidades_corregido, nivel_tiempo, nivel_tiempo_corregido, nivel_porcentaje_entrada, nivel_porcentaje_entrada_corregido, nivel_porcentaje_jornada, nivel_porcentaje_jornada_corregido, observaciones } = info
  
  return (
    <ViewInfoActionModal
      open={viewInfo}
      handleCloseModal={closeViewInfoModal}
      modalTitle={`Detalle Corrección`}
      children={
        <GridContainer>
          <GridItem xs={12}>
            <Typography variant='body1' gutterBottom>
              Tipo tarea: <strong>{tipo_tarea}</strong>
            </Typography>
          </GridItem>
          <GridItem xs={12}>
            <Typography variant='body1' gutterBottom>
              Descripción: <strong>{descripcion_tarea}</strong>
            </Typography>
          </GridItem>
          <GridItem xs={12} md={6}>
            <Typography variant='body1' gutterBottom>
              Horas dedicadas: <strong>{horas}</strong>
            </Typography>
          </GridItem>
          <GridItem xs={12} md={6}>
            <Typography variant='body1' gutterBottom>
              Unidades: <strong>{unidades}</strong>
            </Typography>
          </GridItem>
          <GridItem xs={12} md={6}>
            <Typography variant='body1' gutterBottom>
              Desempeño Unidades (Original): <span className={nivel_unidades == 'EXCELENTE'? classes.evaluacion_excelente : nivel_unidades == 'INSATISFACTORIO' ?  classes.evaluacion_insatisfactorio : nivel_unidades == 'SATISFACTORIO' ?  classes.evaluacion_satisfactorio : nivel_unidades == 'ALTO' ?  classes.evaluacion_alto : nivel_unidades == 'SIN DATOS' ?  classes.evaluacion_sindatos : classes.evaluacion_na }>{nivel_unidades}</span>
            </Typography>
          </GridItem>
          <GridItem xs={12} md={6}>
            <Typography variant='body1' gutterBottom>
              Desempeño Unidades (Corregido): <span className={nivel_unidades_corregido == 'EXCELENTE'? classes.evaluacion_excelente : nivel_unidades_corregido == 'INSATISFACTORIO' ?  classes.evaluacion_insatisfactorio : nivel_unidades_corregido == 'SATISFACTORIO' ?  classes.evaluacion_satisfactorio : nivel_unidades_corregido == 'ALTO' ?  classes.evaluacion_alto : nivel_unidades_corregido == 'SIN DATOS' ?  classes.evaluacion_sindatos : classes.evaluacion_na }>{nivel_unidades_corregido}</span>
            </Typography>
          </GridItem>
          <GridItem xs={12} md={6}>
            <Typography variant='body1' gutterBottom>
              Desempeño Tiempo (Original): <span className={nivel_tiempo == 'EXCELENTE'? classes.evaluacion_excelente : nivel_tiempo == 'INSATISFACTORIO' ?  classes.evaluacion_insatisfactorio : nivel_tiempo == 'SATISFACTORIO' ?  classes.evaluacion_satisfactorio : nivel_tiempo == 'ALTO' ?  classes.evaluacion_alto : nivel_tiempo == 'SIN DATOS' ?  classes.evaluacion_sindatos : classes.evaluacion_na }>{nivel_tiempo}</span>
            </Typography>
          </GridItem>
          <GridItem xs={12} md={6}>
            <Typography variant='body1' gutterBottom>
              Desempeño Tiempo (Corregido): <span className={nivel_tiempo_corregido == 'EXCELENTE'? classes.evaluacion_excelente : nivel_tiempo_corregido == 'INSATISFACTORIO' ?  classes.evaluacion_insatisfactorio : nivel_tiempo_corregido == 'SATISFACTORIO' ?  classes.evaluacion_satisfactorio : nivel_tiempo_corregido == 'ALTO' ?  classes.evaluacion_alto : nivel_tiempo_corregido == 'SIN DATOS' ?  classes.evaluacion_sindatos : classes.evaluacion_na }>{nivel_tiempo_corregido}</span>
            </Typography>
          </GridItem>
          <GridItem xs={12} md={6}>
            <Typography variant='body1' gutterBottom>
              Desempeño % Entrada (Original): <span className={nivel_porcentaje_entrada == 'EXCELENTE'? classes.evaluacion_excelente : nivel_porcentaje_entrada == 'INSATISFACTORIO' ?  classes.evaluacion_insatisfactorio : nivel_porcentaje_entrada == 'SATISFACTORIO' ?  classes.evaluacion_satisfactorio : nivel_porcentaje_entrada == 'ALTO' ?  classes.evaluacion_alto : nivel_porcentaje_entrada == 'SIN DATOS' ?  classes.evaluacion_sindatos : classes.evaluacion_na }>{nivel_porcentaje_entrada}</span>
            </Typography>
          </GridItem>
          <GridItem xs={12} md={6}>
            <Typography variant='body1' gutterBottom>
              Desempeño % Entrada (Corregido): <span className={nivel_porcentaje_entrada_corregido == 'EXCELENTE'? classes.evaluacion_excelente : nivel_porcentaje_entrada_corregido == 'INSATISFACTORIO' ?  classes.evaluacion_insatisfactorio : nivel_porcentaje_entrada_corregido == 'SATISFACTORIO' ?  classes.evaluacion_satisfactorio : nivel_porcentaje_entrada_corregido == 'ALTO' ?  classes.evaluacion_alto : nivel_porcentaje_entrada_corregido == 'SIN DATOS' ?  classes.evaluacion_sindatos : classes.evaluacion_na }>{nivel_porcentaje_entrada_corregido}</span>
            </Typography>
          </GridItem>
          <GridItem xs={12} md={6}>
            <Typography variant='body1' gutterBottom>
              Desempeño % Jornada (Original): <span className={nivel_porcentaje_jornada == 'EXCELENTE'? classes.evaluacion_excelente : nivel_porcentaje_jornada == 'INSATISFACTORIO' ?  classes.evaluacion_insatisfactorio : nivel_porcentaje_jornada == 'SATISFACTORIO' ?  classes.evaluacion_satisfactorio : nivel_porcentaje_jornada == 'ALTO' ?  classes.evaluacion_alto : nivel_porcentaje_jornada == 'SIN DATOS' ?  classes.evaluacion_sindatos : classes.evaluacion_na }>{nivel_porcentaje_jornada}</span>
            </Typography>
          </GridItem>
          <GridItem xs={12} md={6}>
            <Typography variant='body1' gutterBottom>
              Desempeño % Jornada (Corregido): <span className={nivel_porcentaje_jornada_corregido == 'EXCELENTE'? classes.evaluacion_excelente : nivel_porcentaje_jornada_corregido == 'INSATISFACTORIO' ?  classes.evaluacion_insatisfactorio : nivel_porcentaje_jornada_corregido == 'SATISFACTORIO' ?  classes.evaluacion_satisfactorio : nivel_porcentaje_jornada_corregido == 'ALTO' ?  classes.evaluacion_alto : nivel_porcentaje_jornada_corregido == 'SIN DATOS' ?  classes.evaluacion_sindatos : classes.evaluacion_na }>{nivel_porcentaje_jornada_corregido}</span>
            </Typography>
          </GridItem>
          <GridItem xs={12} md={6}>
            <Typography variant='body1' gutterBottom>
              Desempeño Global (Original): <span className={nivel_global == 'EXCELENTE'? classes.evaluacion_excelente : nivel_global == 'INSATISFACTORIO' ?  classes.evaluacion_insatisfactorio : nivel_global == 'SATISFACTORIO' ?  classes.evaluacion_satisfactorio : classes.evaluacion_alto }>{nivel_global}</span>
            </Typography>
          </GridItem>
          <GridItem xs={12} md={6}>
            <Typography variant='body1' gutterBottom>
              Desempeño Global (Corregido): <span className={nivel_global_corregido == 'EXCELENTE'? classes.evaluacion_excelente : nivel_global_corregido == 'INSATISFACTORIO' ?  classes.evaluacion_insatisfactorio : nivel_global_corregido == 'SATISFACTORIO' ?  classes.evaluacion_satisfactorio : classes.evaluacion_alto }>{nivel_global_corregido}</span>
            </Typography>
          </GridItem>
          <GridItem xs={12}>
            <Typography variant='body1' gutterBottom>
              Observaciones: <strong>{observaciones}</strong>
            </Typography>
          </GridItem>
        </GridContainer>
      }
    />
  )
}

export default ViewCorreccionHorasModal
