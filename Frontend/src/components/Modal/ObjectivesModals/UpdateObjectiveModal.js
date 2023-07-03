import { useEffect, useState } from 'react'

import { InputLabel, makeStyles, MenuItem, Select as Selectable, Typography } from '@material-ui/core'

import GridContainer from 'components/Grid/GridContainer'
import GridItem from 'components/Grid/GridItem'
import UpdateActionModal from 'components/ReactTableActions/Update/UpdateActionModal'
import CustomInput from 'components/CustomInput/CustomInput'
import ObjetiveDificultySelect from 'components/ObjetiveDificultySelect/ObjetiveDificultySelect'

import styles from '../styles/ObjectiveModalStyle'
import { objetiveAbsenceRegisterReducer } from 'redux/reducers/objetivesAbsencesReducer'

const useStyles = makeStyles(styles)

const UpdateObjective = ({
  updateSuccess,
  updateError,
  sendUpdateInfo,

  closeUpdateActivityModal,
  info,
}) => {
  const classes = useStyles()

  const {
    id_objetivo,
    id_tarea,
    descripcion_tarea,
    tardif,
    codigo_perfil,
    dificultad,
    unidades_maximo,
    unidades_medio,
    unidades_minimo,
    porcentaje_entrada_minimo,
    porcentaje_entrada_medio,
    porcentaje_entrada_maximo,
    porcentaje_jornada_minimo,
    porcentaje_jornada_medio,
    porcentaje_jornada_maximo,
    tiempo_minimo,
    tiempo_medio,
    tiempo_maximo,
    magnitud_temporal,
    nombre, 
    apellido1, 
    apellido2,
  } = info
  const initialState = {
    id_objetivo,
    task: id_tarea,
    tardif: tardif,
    descripcion_tarea: descripcion_tarea,
    codigo_perfil: codigo_perfil,
    dificulty: dificultad,
    unit_min: unidades_minimo,
    unit_mid: unidades_medio,
    unit_max: unidades_maximo,
    entry_min: porcentaje_entrada_minimo,
    entry_mid: porcentaje_entrada_medio,
    entry_max: porcentaje_entrada_maximo,
    time_min: tiempo_minimo,
    time_mid: tiempo_medio,
    time_max: tiempo_maximo,
    magnitud_temporal: magnitud_temporal,
    working_min: porcentaje_jornada_minimo,
    working_mid: porcentaje_jornada_medio,
    working_max: porcentaje_jornada_maximo,
    nombre: nombre, 
    apellido1: apellido1, 
    apellido2: apellido2,
  }
  const [objective, setObjective] = useState(initialState)

  useEffect(() => {
    if (objective.unit_min || objective.unit_mid || objective.unit_max) {
      if (!objective.magnitud_temporal || objective.magnitud_temporal == '' ) {
         setObjective({ ...objective, magnitud_temporal: 'Dia' })
      }
    } else setObjective({ ...objective, magnitud_temporal: '' })
  }, [objective.unit_min, objective.unit_mid, objective.unit_max])

  const handleInputs = (event, index) => {
    const { value, id } = event.target
    const name = findResourceName(index, id)
    setObjective({ ...objective, [name]: value })
  }
  const findResourceName = (index, id) => {
    const resourceName = `${index <= 1 ? (index === 0 ? 'unit' : 'entry') : index === 2 ? 'time' : 'working'}_${id}`
    return resourceName
  }
  const handleUpdate = (e) => {
    e.preventDefault()
    sendUpdateInfo(objective)
    closeUpdateActivityModal()
  }
  return (
    <UpdateActionModal
      handleCloseModal={closeUpdateActivityModal}
      modalTitle={`Editar Objetivo`}
      open={true}
      successUpdate={updateSuccess}
      errorUpdate={updateError}
      handleSubmit={handleUpdate}
      children={
        <GridContainer>
          <GridItem xs={12} md={12}>
            {codigo_perfil && (
              <Typography variant='body1' gutterBottom>
                Perfil: <b>{codigo_perfil}</b>
              </Typography>
            )}
            {nombre && (
              <Typography variant='body1' gutterBottom>
                Puesto: <b>{nombre} {apellido1} {apellido2}</b>
              </Typography>
            )}
            <Typography variant='body1' gutterBottom>
                Tarea: <b>{descripcion_tarea}</b>
              </Typography>
          </GridItem>
          <GridItem xs={12} className={classes.selector}>
            <ObjetiveDificultySelect disabled={objective?.tardif == 'NO'} dificultySelect={objective} setDificultySelect={setObjective} />
            {objective.magnitud_temporal && (
              <GridItem xs={6}>
                <InputLabel>Magnitud temporal</InputLabel>
                <Selectable
                  MenuProps={{
                    className: classes.selectMenu,
                  }}
                  className={classes.select}
                  value={objective.magnitud_temporal}
                  onChange={(e) => setObjective({ ...objective, magnitud_temporal: e.target.value })}
                  inputProps={{
                    name: 'magnitud_temporal',
                    id: 'magnitud_temporal',
                  }}
                >
                  {['Dia', 'Semana', 'Mes'].map((time, index) => (
                    <MenuItem
                      classes={{ root: classes.selectMenuItem, selected: classes.selectMenuItemSelected }}
                      value={time}
                      key={index}
                    >
                      {time}
                    </MenuItem>
                  ))}
                </Selectable>
              </GridItem>
            )}
          </GridItem>
          {['Unidades', '% con respecto a la entrada', 'Tiempo (min/ud)', '% con respecto a la jornada'].map((label, index) => (
            <GridItem key={index} xs={12} className={classes.sectionContainer}>
              <InputLabel id={label} className={classes.resourcesTitle}>
                {label}
              </InputLabel>
              <GridItem xs={12} className={classes.resourcesContainer}>
                <GridItem xs={4}>
                  <CustomInput
                    labelText={'Mínimo'}
                    id='min'
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      onChange: (e) => handleInputs(e, index),
                      type: 'number',
                      value: objective[findResourceName(index, 'min')],
                    }}
                  />
                </GridItem>
                <GridItem xs={4}>
                  <CustomInput
                    labelText={'Medio'}
                    id='mid'
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      onChange: (e) => handleInputs(e, index),
                      type: 'number',
                      value: objective[findResourceName(index, 'mid')],
                    }}
                  />
                </GridItem>
                <GridItem xs={4}>
                  <CustomInput
                    labelText={'Máximo'}
                    id='max'
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      onChange: (e) => handleInputs(e, index),
                      type: 'number',
                      value: objective[findResourceName(index, 'max')],
                    }}
                  />
                </GridItem>
              </GridItem>
            </GridItem>
          ))}
        </GridContainer>
      }
    />
  )
}

export default UpdateObjective
