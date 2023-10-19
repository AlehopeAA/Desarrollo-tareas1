import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core'
import GridItem from 'components/Grid/GridItem'
import MultiSelectNivel from 'components/MultiSelectNiveles/MultiSelectNiveles'
import styles from '../styles/multiSelectStyles'

const useStyles = makeStyles(styles)

const NivelesMultiSelect = ({ nivelesData, setNivelesData }) => {
  const classes = useStyles()
  const [data, setData] = useState(['INSATISFACTORIO', 'SATISFACTORIO', 'ALTO', 'EXCELENTE'])

  

  const handleChangeMultiData = (event) => {
    const {
      target: { value },
    } = event
    if (nivelesData.map((nivel) => nivel).indexOf(value) === -1) {
      setNivelesData(value)
    } else {
      setNivelesData(nivelesData.filter((nivel) => nivel !== value))
    }
  }

  return (
    <GridItem xs={12}>
      <MultiSelectNivel
        label={'Nivel de desempeño'}
        data={data}
        multiData={nivelesData}
        handleChangeMultiData={handleChangeMultiData}
      />
    </GridItem>
  )
}

export default NivelesMultiSelect
