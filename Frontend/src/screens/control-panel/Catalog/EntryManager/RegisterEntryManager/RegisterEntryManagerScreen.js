import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SweetAlert from 'react-bootstrap-sweetalert'
import { makeStyles, Typography } from '@material-ui/core'
import GridContainer from 'components/Grid/GridContainer'
import GridItem from 'components/Grid/GridItem'
import Button from 'components/CustomButtons/Button'
import TransferList from 'components/TransferList/TransferList'
import ManagerDataSelect from './components/ManagerDataSelect'
import { getEntriesToManager, assignEntriesToManager } from 'redux/actions/entriesManagerActions'
import {
  ENTRIES_TO_MANAGER_LIST_RESET,
  ENTRIES_TO_MANAGER_REGISTER_RESET,
} from 'redux/constants/entriesManagerConstants'
import styles from './styles/registerTicketManagementStyles'

const useStyles = makeStyles(styles)

const RegisterEntryManagerScreen = () => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const [currentJobPositionId, setCurrentJobPositionId] = useState('')
  const [dataLeft, setDataLeft] = useState([])
  const [dataRight, setDataRight] = useState([])
  const [alert, setAlert] = useState(null)

  const { loadingEntriesToManagerList, successEntriesToManagerList, entriesToManagerList } = useSelector(
    (state) => state.entriesToManagerList
  )

  const { successEntriesToManagerRegister } = useSelector((state) => state.entriesToManagerRegister)

  useEffect(() => {
    if (successEntriesToManagerRegister) {
      setAlert(
        <SweetAlert
          success
          style={{ display: 'block', marginTop: '-100px' }}
          title='Hecho!'
          onConfirm={() => confirmSuccess()}
          onCancel={() => confirmSuccess()}
          confirmBtnCssClass={classes.confirmBtnCssClass}
        >
          Entradas asignadas correctamente
        </SweetAlert>
      )
    }
  }, [successEntriesToManagerRegister])

  useEffect(() => {
    return () => dispatch({ type: ENTRIES_TO_MANAGER_LIST_RESET })
  }, [dispatch])

  useEffect(() => {
    if (successEntriesToManagerList) {
      const { pendings, assigned } = entriesToManagerList
      setDataLeft(formatData(pendings))
      setDataRight(formatData(assigned))
    } else {
      setDataLeft([])
      setDataRight([])
    }
  }, [successEntriesToManagerList])

  const confirmSuccess = () => {
    setAlert(null)
    clearInputs()
  }

  const clearInputs = () => {
    dispatch({ type: ENTRIES_TO_MANAGER_LIST_RESET })
    dispatch({ type: ENTRIES_TO_MANAGER_REGISTER_RESET })
    setDataLeft([])
    setDataRight([])
    setCurrentJobPositionId('')
  }

  const formatData = (array) =>
    array.map((entry, i) => ({
      id: entry.id_tarea,
      fullName: (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '15px 0',
          }}
        >
          {' '}
          <div>
            <i> Tipo: </i>
            <b> {entry.tipo_tarea[0] + entry.tipo_tarea.slice(1).toLowerCase()}</b>
            <br />
            <i> Descripcion:</i>
            <b> {entry.descripcion_tarea} </b>
          </div>
          {entry.tipo_tarea == 'ORDINARIA' || entry.tipo_tarea == 'EXTRAORDINARIA' ?
             <div>
               <i>Perfiles: </i>
               {entry.codigo_perfil ? <b>{entry.codigo_perfil.map((cod) => ` ${cod}, `)} </b> : <b> - </b>}
             </div>
          :
            entry.tipo_tarea == 'ESPECIFICA' ?
              <div>
                <i>Puesto: </i>
                <b>{entry?.nombre} {entry?.apellido1} {entry?.apellido2 || ''}</b>
              </div>
             : <b>  </b>            
          }                      
        </div>
      ),
    }))

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(assignEntriesToManager(dataRight, currentJobPositionId))
  }

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)}>
        <GridContainer style={{ marginBottom: '16px' }}>
          <ManagerDataSelect
            disabled={successEntriesToManagerList}
            currentJobPositionId={currentJobPositionId}
            setCurrentJobPositionId={setCurrentJobPositionId}
          />
          <GridItem xs={4}>
            <Button
              disabled={successEntriesToManagerList || !currentJobPositionId}
              color='primary'
              onClick={() => dispatch(getEntriesToManager(currentJobPositionId))}
            >
              Buscar asignaciones
            </Button>
          </GridItem>
        </GridContainer>
        {loadingEntriesToManagerList ? (
          <>Cargando Datos...</>
        ) : (
          <>
            <TransferList
              titleRigth='ASIGNADOS'
              titleLeft='PENDIENTES DE ASIGNAR'
              dataLeft={dataLeft}
              dataRight={dataRight}
              setDataLeft={setDataLeft}
              setDataRight={setDataRight}
            />

            <GridContainer xs={12} style={{ marginTop: '20px', justifyContent: 'center' }}>
              <GridItem>
                <Button style={{ marginRight: '20px' }} color='primary' type='submit'>
                  Guardar
                </Button>
                <Button color='primary' onClick={() => clearInputs()}>
                  Cancelar
                </Button>
              </GridItem>
            </GridContainer>
          </>
        )}
      </form>
      {alert}
    </>
  )
}

export default RegisterEntryManagerScreen
