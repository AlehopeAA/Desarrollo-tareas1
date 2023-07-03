import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core'
import GridItem from 'components/Grid/GridItem'
import MultiSelectModalidad from 'components/MultiSelectStrings/MultiSelectStrings'
import styles from '../styles/multiSelectStyles'

const useStyles = makeStyles(styles)

const ModalidadesMultiSelect = ({ modalidadesData, setModalidadesData }) => {
  const classes = useStyles()
  const [data, setData] = useState(['Oficina', 'Teletrabajo', 'N/A'])
  
  const handleChangeMultiData = (event) => {
    const {
      target: { value },
    } = event
    if (modalidadesData.map((modalidad) => modalidad).indexOf(value) === -1) {
      setModalidadesData(value)
    } else {
      setModalidadesData(modalidadesData.filter((modalidad) => modalidad !== value))
    }
  }

  return (
    <GridItem xs={12}>
      <MultiSelectModalidad
        label={'Modalidad'}
        data={data}
        multiData={modalidadesData}
        handleChangeMultiData={handleChangeMultiData}
      />
    </GridItem>
  )
}

export default ModalidadesMultiSelect
