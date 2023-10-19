import { format } from 'date-fns'
import { Typography } from '@material-ui/core'
import GridContainer from 'components/Grid/GridContainer'
import GridItem from 'components/Grid/GridItem'
import ViewInfoActionModal from 'components/ReactTableActions/ViewInfo/ViewInfoActionModal'

const ViewTaskInfoModal = ({ viewInfo, closeViewInfoModal, info }) => {
  const {
    id_tarea,
    id_tipo_tarea,
    descripcion_tarea,
    fecha_alta,
    fecha_baja,
    activo,
    indicador,
    cuantificable,
    entrada,
    compartida,
    dificultad,
    acumulativa,
    codigo_trazabilidad,
    codigo_perfil,
  } = info
  return (
    <ViewInfoActionModal
      open={viewInfo}
      handleCloseModal={closeViewInfoModal}
      modalTitle={`Informacion de Tarea`}
      children={
        <GridContainer>
          <GridItem xs={12} md={6}>
            <Typography variant='body1' gutterBottom>
              ID: <strong>{id_tarea}</strong>
            </Typography>
          </GridItem>
          <GridItem xs={12} md={6}>
            <Typography variant='body1' gutterBottom>
              Tipo: <strong>{id_tipo_tarea === 2 ? 'ORDINARIA' : 'EXTRAORDINARIA'}</strong>
            </Typography>
          </GridItem>
          <GridItem xs={12}>
            <Typography variant='body1' gutterBottom>
              Descripcion: <strong>{descripcion_tarea}</strong>
            </Typography>
          </GridItem>
          <GridItem xs={12} md={6}>
            <Typography variant='body1' gutterBottom>
              Indicador: <strong>{indicador}</strong>
            </Typography>
          </GridItem>
          <GridItem xs={12} md={6}>
            <Typography variant='body1' gutterBottom>
              Cuantificable: <strong>{cuantificable}</strong>
            </Typography>
          </GridItem>
          <GridItem xs={12} md={6}>
            <Typography variant='body1' gutterBottom>
              Entrada: <strong>{entrada}</strong>
            </Typography>
          </GridItem>
          <GridItem xs={12} md={6}>
            <Typography variant='body1' gutterBottom>
              Compartida: <strong>{compartida}</strong>
            </Typography>
          </GridItem>
          <GridItem xs={12} md={6}>
            <Typography variant='body1' gutterBottom>
              Dificultad: <strong>{dificultad}</strong>
            </Typography>
          </GridItem>
          <GridItem xs={12} md={6}>
            <Typography variant='body1' gutterBottom>
              Acumulativa: <strong>{acumulativa}</strong>
            </Typography>
          </GridItem>
          <GridItem xs={12} md={6}>
            <Typography variant='body1' gutterBottom>
              Perfiles: <strong>{codigo_perfil.toString().replaceAll(',', ' ; ') || ''}</strong>
            </Typography>
          </GridItem>
          <GridItem xs={12} md={6}>
            <Typography variant='body1' gutterBottom>
              Código trazabilidad: <strong>{codigo_trazabilidad}</strong>
            </Typography>
          </GridItem>
          <GridItem xs={12} md={12}>
            <Typography variant='body1' gutterBottom>
              Fecha de Alta: <strong>{format(new Date(fecha_alta), 'dd-MM-yyyy')}</strong>
            </Typography>
          </GridItem>
          {fecha_baja !== null && (
            <GridItem xs={12} md={12}>
              <Typography variant='body1' gutterBottom>
                Fecha de Baja: <strong>{format(new Date(fecha_baja), 'dd-MM-yyyy')}</strong>
              </Typography>
            </GridItem>
          )}
          <GridItem xs={12} md={12}>
            <Typography variant='body1' gutterBottom>
              Activo: <strong>{activo === 'SI' ? 'SI' : 'NO'}</strong>
            </Typography>
          </GridItem>
        </GridContainer>
      }
    />
  )
}

export default ViewTaskInfoModal
