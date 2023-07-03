import { Typography } from '@material-ui/core'
import GridContainer from 'components/Grid/GridContainer'
import GridItem from 'components/Grid/GridItem'
import ViewInfoActionModal from 'components/ReactTableActions/ViewInfo/ViewInfoActionModal'

const ViewRoleInfoModal = ({ viewInfo, closeViewInfoModal, info }) => {
  const { id_rol, codigo_rol, descripcion_rol } = info
  return (
    <ViewInfoActionModal
      open={viewInfo}
      handleCloseModal={closeViewInfoModal}
      modalTitle={`Informacion de Rol`}
      children={
        <GridContainer>
          <GridItem xs={12} md={6}>
            <Typography variant='body1' gutterBottom>
              ID: <strong>{id_rol}</strong>
            </Typography>
          </GridItem>
          <GridItem xs={12} md={6}>
            <Typography variant='body1' gutterBottom>
              Codigo Rol: <strong>{codigo_rol}</strong>
            </Typography>
          </GridItem>
          <GridItem xs={12}>
            <Typography variant='body1' gutterBottom>
              Descripcion: <strong>{descripcion_rol}</strong>
            </Typography>
          </GridItem>
        </GridContainer>
      }
    />
  )
}

export default ViewRoleInfoModal
