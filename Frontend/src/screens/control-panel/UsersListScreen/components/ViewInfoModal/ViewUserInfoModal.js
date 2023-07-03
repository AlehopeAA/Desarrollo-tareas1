import { format } from 'date-fns'
import { Typography } from '@material-ui/core'
import GridContainer from 'components/Grid/GridContainer'
import GridItem from 'components/Grid/GridItem'
import ViewInfoActionModal from 'components/ReactTableActions/ViewInfo/ViewInfoActionModal'

const ViewUserInfoModal = ({ viewInfo, closeViewInfoModal, info }) => {
  const {
    nombre,
    apellido1,
    apellido2,
    cod_ayre,
    codigo_puesto,
    denominacion_puesto,
    fecha_alta,
    fecha_baja,
    jornada_laboral,
    activo,
  } = info
  return (
    <ViewInfoActionModal
      open={viewInfo}
      handleCloseModal={closeViewInfoModal}
      modalTitle={`Informacion de ${nombre}`}
      children={
        <GridContainer>
          <GridItem xs={12} md={6}>
            <Typography variant='body1' gutterBottom>
              COD.AYRE: <strong>{cod_ayre}</strong>
            </Typography>
          </GridItem>
          <GridItem xs={12} md={6}>
            <Typography variant='body1' gutterBottom>
              Codigo de Puesto: <strong>{codigo_puesto}</strong>
            </Typography>
          </GridItem>
          <GridItem xs={12} md={12}>
            <Typography variant='body1' gutterBottom>
              Nombre: <strong>{`${nombre} ${apellido1} ${apellido2}`}</strong>
            </Typography>
          </GridItem>
          <GridItem xs={12} md={12}>
            <Typography variant='body1' gutterBottom>
              Denominacion del Puesto: <strong>{denominacion_puesto}</strong>
            </Typography>
          </GridItem>
          <GridItem xs={12} md={12}>
            <Typography variant='body1' gutterBottom>
              Jornada Laboral: <strong>{jornada_laboral}</strong> horas
            </Typography>
          </GridItem>
          <GridItem xs={12} md={12}>
            <Typography variant='body1' gutterBottom>
              Fecha de Alta: <strong>{format(new Date(fecha_alta), 'yyyy-MM-dd')}</strong>
            </Typography>
          </GridItem>
          {fecha_baja !== null && (
            <GridItem xs={12} md={12}>
              <Typography variant='body1' gutterBottom>
                Fecha de Baja: <strong>{fecha_baja}</strong>
              </Typography>
            </GridItem>
          )}
          <GridItem xs={12} md={12}>
            <Typography variant='body1' gutterBottom>
              Activo: <strong>{activo === 'SI' ? 'Si' : 'No'}</strong>
            </Typography>
          </GridItem>
        </GridContainer>
      }
    />
  )
}

export default ViewUserInfoModal
