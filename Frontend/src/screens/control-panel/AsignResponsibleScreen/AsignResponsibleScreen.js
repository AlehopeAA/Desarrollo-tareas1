import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SweetAlert from 'react-bootstrap-sweetalert'
import { makeStyles } from '@material-ui/core'
import GridContainer from 'components/Grid/GridContainer'
import GridItem from 'components/Grid/GridItem'
import TransferList from 'components/TransferList/TransferList'
import Button from 'components/CustomButtons/Button'
import AsignResponsibleFilter from './components/AsignResponsibleFilter'
import { getTeamWorksResponsible, registerTeamWorkByResponsible, registerTeamWorkProfileByValidatorOrResponsible } from 'redux/actions/teamWorkActions'
import {
  TEAM_WORKS_BY_RESPONSIBLE_RESET,
  TEAM_WORK_REGISTER_BY_RESPONSIBLE_RESET,
  PROFILE_REGISTER_BY_VALIDATORRESPONSIBLE_RESET,
} from 'redux/constants/teamWorkConstants'
import styles from './styles/asignResponsibleScreenStyles'

const useStyles = makeStyles(styles)

const AsignResponsibleScreen = () => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const [dataLeft, setDataLeft] = useState([])
  const [dataRight, setDataRight] = useState([])
  const [alert, setAlert] = useState(null)
  const [currentJobPositionId, setCurrentJobPositionId] = useState('')
  const [findPerfiles, setFindPerfiles] = useState(false);


  const { loadingTeamWorksByResponsible, successTeamWorksByResponsible, teamWorksByResponsibleData } = useSelector(
    (state) => state.teamWorksByResponsible
  )

  const { loadingTeamWorkByResponsibleRegister, successTeamWorkByResponsibleRegister } = useSelector(
    (state) => state.teamWorkRegisterByResponsible
  )

  const { successProfileByValidatorResponsibleRegister } = useSelector(
    (state) => state.profileRegisterByValidator
  )

  useEffect(() => {
    if (successTeamWorksByResponsible) {
      if (findPerfiles === true) {
        const perfilesRight = []
        const pergilesLeft = []
        teamWorksByResponsibleData?.assigned?.map((perfil) => {
          perfilesRight.push({
            id: perfil.id_perfil,
            fullName: `${perfil?.codigo_perfil}`,
          })
        })
        teamWorksByResponsibleData?.pendings?.map((perfil) => {
          pergilesLeft.push({
            id: perfil.id_perfil,
            fullName: `${perfil?.codigo_perfil}`,
          })
        })
        setDataRight(perfilesRight)
        setDataLeft(pergilesLeft)
      } else {
        const namesAndLastNamesRigth = []
        const namesAndLastNamesLeft = []

        teamWorksByResponsibleData?.assigned?.map((jobPosition) => {
          namesAndLastNamesRigth.push({
            id: jobPosition.id_puesto,
            fullName: `${jobPosition?.nombre} ${jobPosition?.apellido1} ${jobPosition?.apellido2}`,
          })
        })
        teamWorksByResponsibleData?.pendings?.map((jobPosition) => {
          namesAndLastNamesLeft.push({
            id: jobPosition.id_puesto,
            fullName: `${jobPosition?.nombre} ${jobPosition?.apellido1} ${jobPosition?.apellido2}`,
          })
        })
        setDataRight(namesAndLastNamesRigth)
        setDataLeft(namesAndLastNamesLeft)
      }
    }
  }, [successTeamWorksByResponsible])

  useEffect(() => {
    if (successTeamWorkByResponsibleRegister) {
      setAlert(
        <SweetAlert
          success
          style={{ display: 'block', marginTop: '-100px' }}
          title='GUARDADO!'
          onConfirm={() => confirmSuccess()}
          onCancel={() => hideAlert()}
          confirmBtnCssClass={classes.button + ' ' + classes.success}
        >
          La asignacion de responsable/s ha sido guardada correctamente
        </SweetAlert>
      )
      setDataLeft([])
      setDataRight([])
      setCurrentJobPositionId('')
      dispatch({ type: TEAM_WORKS_BY_RESPONSIBLE_RESET })
      dispatch({ type: TEAM_WORK_REGISTER_BY_RESPONSIBLE_RESET })
    }
  }, [successTeamWorkByResponsibleRegister])

  useEffect(() => {
    console.log(successProfileByValidatorResponsibleRegister)

    if (successProfileByValidatorResponsibleRegister) {
      setAlert(
        <SweetAlert
          success
          style={{ display: 'block', marginTop: '-100px' }}
          title='GUARDADO!'
          onConfirm={() => confirmSuccess()}
          onCancel={() => hideAlert()}
          confirmBtnCssClass={classes.button + ' ' + classes.success}
        >
          La asignacion de responsable/es ha sido guardada correctamente
        </SweetAlert>
      )
      setDataLeft([])
      setDataRight([])
      setCurrentJobPositionId('')
      dispatch({ type: TEAM_WORKS_BY_RESPONSIBLE_RESET })
      dispatch({ type: PROFILE_REGISTER_BY_VALIDATORRESPONSIBLE_RESET })
    }
  }, [successProfileByValidatorResponsibleRegister])


  useEffect(() => {
    return () => dispatch({ type: TEAM_WORKS_BY_RESPONSIBLE_RESET })
  }, [dispatch])

  const confirmSuccess = () => {
    setAlert(null)
  }
  const hideAlert = () => {
    setAlert(null)
  }

  const handleTeamWorkByResponsible = () => {
    const teams = {
      pending: dataLeft,
      assigned: dataRight,
      validatorId: currentJobPositionId,
    }

    console.log(teams)
    if (findPerfiles === true) {

      dispatch(registerTeamWorkProfileByValidatorOrResponsible(teams))
    } else {
      dispatch(registerTeamWorkByResponsible(teams))
    }
  }

  const cancelAction = () => {
    dispatch({ type: TEAM_WORKS_BY_RESPONSIBLE_RESET })
    dispatch({ type: TEAM_WORK_REGISTER_BY_RESPONSIBLE_RESET })
    setDataLeft([])
    setDataRight([])
    setCurrentJobPositionId('')
  }

  return (
    <GridContainer>
      <GridItem xs={8}>
        <GridContainer>
          <AsignResponsibleFilter
            currentJobPositionId={currentJobPositionId}
            setCurrentJobPositionId={setCurrentJobPositionId}
          />
          <GridItem xs={4}>
            <Button disabled={!currentJobPositionId} color='primary' onClick={() => dispatch(getTeamWorksResponsible(currentJobPositionId), setFindPerfiles(true))}>
              Buscar puestos de trabajo
            </Button>
          </GridItem>
          <GridItem xs={2}>
            <Button disabled={!currentJobPositionId} color='primary' onClick={() => dispatch(getTeamWorksResponsible(currentJobPositionId + "_P"), setFindPerfiles(true))}>
              Buscar perfiles
            </Button>
          </GridItem>
        </GridContainer>
      </GridItem>
      <div style={{ marginTop: '50px', width: '100%' }}>
        {loadingTeamWorksByResponsible ? (
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
                  color={successTeamWorkByResponsibleRegister ? `success` : 'primary'}
                  onClick={() => handleTeamWorkByResponsible()}
                >
                  {loadingTeamWorkByResponsibleRegister
                    ? `Cargando`
                    : successTeamWorkByResponsibleRegister
                      ? `Hecho`
                      : `Guardar`}
                </Button>
                <Button color='primary' onClick={() => cancelAction()}>
                  Cancelar
                </Button>
              </GridItem>
            </GridContainer>
          </>
        )}
      </div>
      {alert}
    </GridContainer>
  )
}

export default AsignResponsibleScreen
