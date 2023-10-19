import { format } from 'date-fns'
import { Typography } from '@material-ui/core'
import GridContainer from 'components/Grid/GridContainer'
import GridItem from 'components/Grid/GridItem'
import ViewInfoActionModal from 'components/ReactTableActions/ViewInfo/ViewInfoActionModal'

const ViewProfileInfoModal = ({ viewInfo, closeViewInfoModal, info }) => {
  const { id_perfil, codigo_perfil, descripcion_perfil, activo, fecha_alta, fecha_baja } = info
  return (
    <ViewInfoActionModal
      open={viewInfo}
      handleCloseModal={closeViewInfoModal}
      modalTitle={`Informacion de Perfil`}
      children={
        <GridContainer>
          <GridItem xs={12} md={6}>
            <Typography variant='body1' gutterBottom>
              ID: <strong>{id_perfil}</strong>
            </Typography>
          </GridItem>
          <GridItem xs={12} md={6}>
            <Typography variant='body1' gutterBottom>
              Codigo Perfil: <strong>{codigo_perfil}</strong>
            </Typography>
          </GridItem>
          <GridItem xs={12}>
            <Typography variant='body1' gutterBottom>
              Descripcion: <strong>{descripcion_perfil}</strong>
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

export default ViewProfileInfoModal
