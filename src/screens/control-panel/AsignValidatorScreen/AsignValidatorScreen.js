import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SweetAlert from 'react-bootstrap-sweetalert'
import { makeStyles } from '@material-ui/core'
import GridContainer from 'components/Grid/GridContainer'
import GridItem from 'components/Grid/GridItem'
import TransferList from 'components/TransferList/TransferList'
import Button from 'components/CustomButtons/Button'
import AsignValidatorFilter from './components/AsignValidatorFilter'
import { getTeamWorksValidator, registerTeamWorkByValidator } from 'redux/actions/teamWorkActions'
import { TEAM_WORKS_BY_VALIDATOR_RESET, TEAM_WORK_REGISTER_BY_VALIDATOR_RESET } from 'redux/constants/teamWorkConstants'
import styles from './styles/asignValidatorScreenStyles'
const useStyles = makeStyles(styles)

const AsignValidatorScreen = () => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const [dataLeft, setDataLeft] = useState([])
  const [dataRight, setDataRight] = useState([])
  const [alert, setAlert] = useState(null)
  const [currentJobPositionId, setCurrentJobPositionId] = useState('')

  const { loadingTeamWorksByValidator, successTeamWorksByValidator, teamWorksByValidatorData } = useSelector(
    (state) => state.teamWorksByValidator
  )

  const { loadingTeamWorkByValidatorRegister, successTeamWorkByValidatorRegister } = useSelector(
    (state) => state.teamWorkRegisterByValidator
  )

  useEffect(() => {
    if (successTeamWorksByValidator) {
      const namesAndLastNamesRigth = []
      const namesAndLastNamesLeft = []

      teamWorksByValidatorData?.assigned?.map((jobPosition) => {
        namesAndLastNamesRigth.push({
          id: jobPosition.id_puesto,
          fullName: `${jobPosition?.nombre} ${jobPosition?.apellido1} ${jobPosition?.apellido2}`,
        })
      })
      teamWorksByValidatorData?.pendings?.map((jobPosition) => {
        namesAndLastNamesLeft.push({
          id: jobPosition.id_puesto,
          fullName: `${jobPosition?.nombre} ${jobPosition?.apellido1} ${jobPosition?.apellido2}`,
        })
      })
      setDataRight(namesAndLastNamesRigth)
      setDataLeft(namesAndLastNamesLeft)
    }
  }, [successTeamWorksByValidator])

  useEffect(() => {
    if (successTeamWorkByValidatorRegister) {
      setAlert(
        <SweetAlert
          success
          style={{ display: 'block', marginTop: '-100px' }}
          title='GUARDADO!'
          onConfirm={() => confirmSuccess()}
          onCancel={() => hideAlert()}
          confirmBtnCssClass={classes.button + ' ' + classes.success}
        >
          La asignacion de validador/es ha sido guardada correctamente
        </SweetAlert>
      )
      setDataLeft([])
      setDataRight([])
      setCurrentJobPositionId('')
      dispatch({ type: TEAM_WORKS_BY_VALIDATOR_RESET })
      dispatch({ type: TEAM_WORK_REGISTER_BY_VALIDATOR_RESET })
    }
  }, [successTeamWorkByValidatorRegister])

  useEffect(() => {
    return () => dispatch({ type: TEAM_WORKS_BY_VALIDATOR_RESET })
  }, [dispatch])

  const confirmSuccess = () => {
    setAlert(null)
  }
  const hideAlert = () => {
    setAlert(null)
  }

  const handleTeamWorkByValidator = () => {
    const teams = {
      pending: dataLeft,
      assigned: dataRight,
      validatorId: currentJobPositionId,
    }

    dispatch(registerTeamWorkByValidator(teams))
  }
  const cancelAction = () => {
    dispatch({ type: TEAM_WORKS_BY_VALIDATOR_RESET })
    dispatch({ type: TEAM_WORK_REGISTER_BY_VALIDATOR_RESET })
    setDataLeft([])
    setDataRight([])
    setCurrentJobPositionId('')
  }
  return (
    <>
      <GridItem xs={8}>
        <GridContainer>
          <AsignValidatorFilter
            currentJobPositionId={currentJobPositionId}
            setCurrentJobPositionId={setCurrentJobPositionId}
          />
          <GridItem xs={4}>
            <Button disabled={!currentJobPositionId} color='primary' onClick={() => dispatch(getTeamWorksValidator(currentJobPositionId))}>
              Buscar asignaciones
            </Button>
          </GridItem>
        </GridContainer>
      </GridItem>
      <div style={{ marginTop: '50px', width: '100%' }}>
        {loadingTeamWorksByValidator ? (
          <>Cargando</>
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
                <Button
                  style={{ marginRight: '20px' }}
                  color={successTeamWorkByValidatorRegister ? `success` : 'primary'}
                  onClick={() => handleTeamWorkByValidator()}
                >
                  {loadingTeamWorkByValidatorRegister
                    ? `Cargando`
                    : successTeamWorkByValidatorRegister
                    ? `Hecho`
                    : `Guardar`}
                </Button>
                <Button color='primary' onClick={() => cancelAction()}>
                  Cancelar
                </Button>
              </GridItem>
            </GridContainer>
            {alert}
          </>
        )}
      </div>
    </>
  )
}

export default AsignValidatorScreen
