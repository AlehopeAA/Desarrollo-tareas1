import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core'
import GridItem from 'components/Grid/GridItem'
import MultiSelectIndicadores from 'components/MultiSelectStrings/MultiSelectStrings'
import styles from '../styles/multiSelectStyles'

const useStyles = makeStyles(styles)

const IndicadoresMultiSelect = ({ indicadoresData, setIndicadoresData }) => {
  const classes = useStyles()
  const [data, setData] = useState(['Unidades','Tiempo','% entrada', '% jornada'])


  const handleChangeMultiData = (event) => {
    const {
      target: { value },
    } = event
    if (indicadoresData.map((indicador) => indicador).indexOf(value) === -1) {
      setIndicadoresData(value)
    } else {
      setIndicadoresData(indicadoresData.filter((indicador) => indicador !== value))
    }
  }

  return (
    <GridItem xs={12}>
      <MultiSelectIndicadores
        label={'Indicadores'}
        data={data}
        multiData={indicadoresData}
        handleChangeMultiData={handleChangeMultiData}
      />
    </GridItem>
  )
}

export default IndicadoresMultiSelect
