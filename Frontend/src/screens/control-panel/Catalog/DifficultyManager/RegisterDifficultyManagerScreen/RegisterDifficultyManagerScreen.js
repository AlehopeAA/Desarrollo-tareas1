import { useState, useEffect } from 'react'
import SweetAlert from 'react-bootstrap-sweetalert'
import { makeStyles } from '@material-ui/core'
import GridContainer from 'components/Grid/GridContainer'
import GridItem from 'components/Grid/GridItem'
import Button from 'components/CustomButtons/Button'
import TransferList from 'components/TransferList/TransferList'
import styles from './styles/registerDifficultyManagerStyles'
import { assignDifficultiesToManager } from 'redux/actions/difficultiesManagerActions'
import { DIFFICULTIES_TO_MANAGER_LIST_RESET } from 'redux/constants/difficultiesManagerConstants'
import { DIFFICULTIES_TO_MANAGER_REGISTER_RESET } from 'redux/constants/difficultiesManagerConstants'
import { useDispatch, useSelector } from 'react-redux'
import ManagerDataSelect from '../../EntryManager/RegisterEntryManager/components/ManagerDataSelect'
import { getDifficultiesToManager } from 'redux/actions/difficultiesManagerActions'

const useStyles = makeStyles(styles)

const RegisterDifficultyManagerScreen = () => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const [currentJobPositionId, setCurrentJobPositionId] = useState('')
  const [dataLeft, setDataLeft] = useState([])
  const [dataRight, setDataRight] = useState([])
  const [alert, setAlert] = useState(null)

  const { loadingDifficultiesToManagerList, successDifficultiesToManagerList, difficultiesToManagerList } = useSelector(
    (state) => state.difficultiesToManagerList
  )

  const {
    loadingDifficultiesToManagerRegister,
    successDifficultiesToManagerRegister,
    difficultiesToManagerRegister,
  } = useSelector((state) => state.difficultiesToManagerRegister)

  useEffect(() => {
    if (successDifficultiesToManagerRegister) {
      setAlert(
        <SweetAlert
          success
          style={{ display: 'block', marginTop: '-100px' }}
          title='Hecho!'
          onConfirm={() => confirmSuccess()}
          onCancel={() => confirmSuccess()}
          confirmBtnCssClass={classes.confirmBtnCssClass}
        >
          Gestor de Dificultad guardado correctamente
        </SweetAlert>
      )
    }
  }, [successDifficultiesToManagerRegister])
  useEffect(() => {
    return () => dispatch({ type: DIFFICULTIES_TO_MANAGER_LIST_RESET })
  }, [dispatch])
  useEffect(() => {
    if (successDifficultiesToManagerList) {
      const { pendings, assigned } = difficultiesToManagerList
      setDataLeft(formatData(pendings))
      setDataRight(formatData(assigned))
    }
  }, [successDifficultiesToManagerList])

  const confirmSuccess = () => {
    setAlert(null)
    clearInputs()
  }

  const clearInputs = () => {
    dispatch({ type: DIFFICULTIES_TO_MANAGER_LIST_RESET })
    dispatch({ type: DIFFICULTIES_TO_MANAGER_REGISTER_RESET })
    setDataLeft([])
    setDataRight([])
    setCurrentJobPositionId('')
  }
  const formatData = (array) =>
    array.map((difficulty, i) => ({
      id: difficulty.id_tarea,
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
            <b> {difficulty.tipo_tarea[0] + difficulty.tipo_tarea.slice(1).toLowerCase()}</b>
            <br />
            <i> Descripcion:</i>
            <b> {difficulty.descripcion_tarea} </b>
          </div>
          <div>
            <i>Perfiles: </i>
            {difficulty.codigo_perfil ? <b>{difficulty.codigo_perfil.map((cod) => ` ${cod}, `)} </b> : <b> - </b>}
          </div>
        </div>
      ),
    }))

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(assignDifficultiesToManager(dataRight, currentJobPositionId))
  }

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)}>
        <GridContainer style={{ marginBottom: '16px' }}>
          <ManagerDataSelect
            disabled={successDifficultiesToManagerList}
            currentJobPositionId={currentJobPositionId}
            setCurrentJobPositionId={setCurrentJobPositionId}
          />
          <GridItem xs={4}>
            <Button
              disabled={successDifficultiesToManagerList || !currentJobPositionId}
              color='primary'
              onClick={() => dispatch(getDifficultiesToManager(currentJobPositionId))}
            >
              Buscar puestos de trabajo
            </Button>
          </GridItem>
        </GridContainer>
        {!loadingDifficultiesToManagerList ? (
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
                <Button style={{ marginRight: '20px' }} color='primary' onClick={handleSubmit}>
                  Guardar
                </Button>
                <Button color='primary' onClick={() => clearInputs()}>
                  Cancelar
                </Button>
              </GridItem>
            </GridContainer>{' '}
          </>
        ) : (
          <>Cargando Datos...</>
        )}
      </form>
      {alert}
    </>
  )
}

export default RegisterDifficultyManagerScreen
