import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core'
import GridItem from 'components/Grid/GridItem'
import MultiSelectPuesto from 'components/MultiSelectPuestos/MultiSelectPuestos'
import { TEAM_WORK_LIST_RESET } from 'redux/constants/teamWorkConstants'
import { getTeamWorks } from 'redux/actions/teamWorkActions'
import styles from '../styles/multiSelectStyles'

const useStyles = makeStyles(styles)

const PuestosMultiSelect = ({ puestosData, setPuestosData }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [data, setData] = useState([])

  const { loadingTeamWorkList, successTeamWorkList, teamWorkListData, errorTeamWorkList } = useSelector(
    (state) => state.teamWorkList
  )

  useEffect(() => {
    return () => dispatch({ type: TEAM_WORK_LIST_RESET })
  }, [dispatch])

  useEffect(() => {
    if (!successTeamWorkList) {
      dispatch(getTeamWorks())
    } else {
      setData(teamWorkListData)
    }
  }, [successTeamWorkList])

  const handleChangeMultiData = (event) => {
    const {
      target: { value },
    } = event
    if (puestosData.map((puesto) => puesto.id_puesto).indexOf(value[value.length - 1].id_puesto) === -1) {
      setPuestosData(value)
    } else {
      setPuestosData(puestosData.filter((puesto) => puesto.id_puesto !== value[value.length - 1]?.id_puesto))
    }
  }

  return (
    <GridItem xs={12}>
      <MultiSelectPuesto
        label={'Puestos de trabajo'}
        data={data}
        multiData={puestosData}
        handleChangeMultiData={handleChangeMultiData}
      />
    </GridItem>
  )
}

export default PuestosMultiSelect
