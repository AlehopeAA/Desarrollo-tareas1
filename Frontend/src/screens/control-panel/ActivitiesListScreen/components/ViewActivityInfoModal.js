import { format } from 'date-fns'
import { Typography } from '@material-ui/core'
import GridContainer from 'components/Grid/GridContainer'
import GridItem from 'components/Grid/GridItem'
import ViewInfoActionModal from 'components/ReactTableActions/ViewInfo/ViewInfoActionModal'

const ViewActivityInfoModal = ({ viewActivityInfo, closeViewActivityInfoModal, info }) => {
  const {
    tarea_codigo_trazabilidad,
    descripcion_tarea,
    fecha_actividad,
    horas,
    modalidad,
    observaciones,
    codigos_trazabilidad,
    unidades,
    validada,
    fecha_creacion,
  } = info

  return (
    <ViewInfoActionModal
      open={viewActivityInfo}
      handleCloseModal={closeViewActivityInfoModal}
      modalTitle={`Información de Actividad`}
      children={
        <GridContainer>
          <GridItem xs={12} md={6}>
            <Typography variant='body1' gutterBottom>
              Fecha de Actividad: <strong>{format(new Date(fecha_actividad), 'dd-MM-yyyy')}</strong>
            </Typography>
          </GridItem>
          <GridItem xs={12} md={6}>
            <Typography variant='body1' gutterBottom>
              Fecha de Creacion: <strong>{format(new Date(fecha_creacion), 'dd-MM-yyyy')}</strong>
            </Typography>
          </GridItem>

          <GridItem xs={6}>
            <Typography variant='body1' gutterBottom>
              Validada: <strong>{validada}</strong>
            </Typography>
          </GridItem>
          <GridItem xs={12} md={6}>
            <Typography variant='body1' gutterBottom>
              Modalidad: <strong>{modalidad}</strong>
            </Typography>
          </GridItem>
          <GridItem xs={12} md={6}>
            <Typography variant='body1' gutterBottom>
              Horas: <strong>{horas}</strong>
            </Typography>
          </GridItem>

          <GridItem xs={12} md={6}>
            <Typography variant='body1' gutterBottom>
              Unidades: <strong>{unidades}</strong>
            </Typography>
          </GridItem>
          {tarea_codigo_trazabilidad != 'NO' && (                                    
              <GridItem xs={12} md={6}>
                <Typography variant='body1' gutterBottom>
                  {tarea_codigo_trazabilidad}: <strong>{codigos_trazabilidad.length > 0 ? codigos_trazabilidad.join(', '): '-'}</strong>
                </Typography>
              </GridItem>
          )}
          <GridItem xs={12}>
            <Typography variant='body1' gutterBottom>
              Descripción de Tarea: <strong>{descripcion_tarea ? descripcion_tarea : '-'}</strong>
            </Typography>
          </GridItem>
          <GridItem xs={12}>
            <Typography variant='body1' gutterBottom>
              Observaciones: <strong>{observaciones ? observaciones : '-'}</strong>
            </Typography>
          </GridItem>
        </GridContainer>
      }
    />
  )
}

export default ViewActivityInfoModal
