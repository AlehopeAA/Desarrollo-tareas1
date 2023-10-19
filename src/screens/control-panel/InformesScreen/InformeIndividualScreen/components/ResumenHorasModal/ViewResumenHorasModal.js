import { format } from 'date-fns'
import { Typography } from '@material-ui/core'
import GridContainer from 'components/Grid/GridContainer'
import GridItem from 'components/Grid/GridItem'
import ViewInfoActionModal from 'components/ReactTableActions/ViewInfo/ViewInfoActionModal'

const ViewResumenHorasModal = ({ viewInfo, closeViewInfoModal, info }) => {
  const { horas_trabajadas, horas_ausencias, horas_total, jornada_semanal, jornada_mensual, jornada_mensual_neta, dias_laborables, horas_teoricas, porcentaje_jornada, porcentaje_carga } = info
  
  return (
    <ViewInfoActionModal
      open={viewInfo}
      handleCloseModal={closeViewInfoModal}
      modalTitle={`Resumen horas laborales`}
      children={
        <GridContainer>
          <GridItem xs={12} md={6}>
            <Typography variant='body1' gutterBottom>
              Jornada laboral (semanal): <strong>{jornada_semanal} horas</strong>
            </Typography>
          </GridItem>
          <GridItem xs={12} md={6}>
            <Typography variant='body1' gutterBottom>
              Jornada laboral (mensual): <strong>{jornada_mensual} horas</strong>
            </Typography>
          </GridItem>
          <GridItem xs={12} md={6}>
            <Typography variant='body1' gutterBottom>
              Horas Trabajadas: <strong>{horas_trabajadas} horas</strong>
            </Typography>
          </GridItem>
          <GridItem xs={12} md={6}>
            <Typography variant='body1' gutterBottom>
              Horas ausencias: <strong>{horas_ausencias} horas</strong>
            </Typography>
          </GridItem>
          <GridItem xs={12}>
            <Typography variant='body1' gutterBottom>
              Días efectivos laborables: <strong>{dias_laborables} días</strong>
            </Typography>
          </GridItem>
          <GridItem xs={12}>
            <Typography variant='body1' gutterBottom>
              Total Horas registradas: <strong>{horas_total} horas</strong>
            </Typography>
          </GridItem>
          <GridItem xs={12}>
            <Typography variant='body1' gutterBottom>
              Horas mensuales Tipo (Jornada laboral teórica neta): <strong>{jornada_mensual_neta} horas</strong>
            </Typography>
          </GridItem>
          <GridItem xs={12}>
            <Typography variant='body1' gutterBottom>
              Horas teóricas máximas efectivas de trabajo: <strong>{horas_teoricas} horas</strong>
            </Typography>
          </GridItem>
          <GridItem xs={12} md={6}>
            <Typography variant='body1' gutterBottom>
              % Jornada efectiva: <strong>{porcentaje_jornada} %</strong>
            </Typography>
          </GridItem>
          <GridItem xs={12} md={6}>
            <Typography variant='body1' gutterBottom>
            % Carga de Trabajo: <strong>{porcentaje_carga} %</strong>
            </Typography>
          </GridItem>
        </GridContainer>
      }
    />
  )
}

export default ViewResumenHorasModal
