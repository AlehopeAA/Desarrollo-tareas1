import { Typography } from '@material-ui/core'
import GridContainer from 'components/Grid/GridContainer'
import GridItem from 'components/Grid/GridItem'
import ViewInfoActionModal from 'components/ReactTableActions/ViewInfo/ViewInfoActionModal'

const ViewServiceInfoModal = ({ viewInfo, closeViewInfoModal, info }) => {
  const { id_servicio, codigo_servicio, descripcion_servicio } = info
  return (
    <ViewInfoActionModal
      open={viewInfo}
      handleCloseModal={closeViewInfoModal}
      modalTitle={`Informacion de Servicio`}
      children={
        <GridContainer>
          <GridItem xs={12} md={6}>
            <Typography variant='body1' gutterBottom>
              ID: <strong>{id_servicio}</strong>
            </Typography>
          </GridItem>
          <GridItem xs={12} md={6}>
            <Typography variant='body1' gutterBottom>
              Codigo Servicio: <strong>{codigo_servicio}</strong>
            </Typography>
          </GridItem>
          <GridItem xs={12}>
            <Typography variant='body1' gutterBottom>
              Descripcion: <strong>{descripcion_servicio}</strong>
            </Typography>
          </GridItem>
        </GridContainer>
      }
    />
  )
}

export default ViewServiceInfoModal
