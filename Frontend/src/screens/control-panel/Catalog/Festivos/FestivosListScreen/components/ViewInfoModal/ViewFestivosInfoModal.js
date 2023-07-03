import { Typography } from '@material-ui/core'
import GridContainer from 'components/Grid/GridContainer'
import GridItem from 'components/Grid/GridItem'
import ViewInfoActionModal from 'components/ReactTableActions/ViewInfo/ViewInfoActionModal'

const ViewFestivosInfoModal = ({ viewInfo, closeViewInfoModal, info }) => {
  const { id_calendario, dia, mes, anio } = info
  return (
    <ViewInfoActionModal
      open={viewInfo}
      handleCloseModal={closeViewInfoModal}
      modalTitle={`Informacion de Festivo`}
      children={
        <GridContainer>
          <GridItem xs={12} md={6}>
            <Typography variant='body1' gutterBottom>
              ID: <strong>{id_calendario}</strong>
            </Typography>
          </GridItem>
          <GridItem xs={12} md={6}>
            <Typography variant='body1' gutterBottom>
              Día: <strong>{dia}</strong>
            </Typography>
          </GridItem>
          <GridItem xs={12} md={6}>
            <Typography variant='body1' gutterBottom>
              Mes: <strong>{mes}</strong>
            </Typography>
          </GridItem>
          <GridItem xs={12} md={6}>
            <Typography variant='body1' gutterBottom>
              Año: <strong>{anio}</strong>
            </Typography>
          </GridItem>
        </GridContainer>
      }
    />
  )
}

export default ViewFestivosInfoModal
