import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core'
import CustomInput from 'components/CustomInput/CustomInput'
import GridItem from 'components/Grid/GridItem'
import MultiSelectProfile from 'components/MultiSelectProfiles/MultiSelectProfiles'
import { PROFILE_LIST_RESET } from 'redux/constants/profileConstants'
import { getProfiles } from 'redux/actions/profileActions'

const CreateTaskOther = ({ taskOther, setTaskOther, profilesData, setProfilesData }) => {
  const dispatch = useDispatch()

  const { successProfileList, loadingProfileList, profiles, errorProfileList } = useSelector(
    (state) => state.profileList
  )

  useEffect(() => {
    return () => dispatch({ type: PROFILE_LIST_RESET })
  }, [dispatch])

  useEffect(() => {
    if (!successProfileList) {
      dispatch(getProfiles())
    }
  }, [successProfileList])

  const handleChangeMultiData = (event) => {
    const {
      target: { value },
    } = event
    if (profilesData.map((profile) => profile.id_perfil).indexOf(value[value.length - 1].id_perfil) === -1) {
      setProfilesData(value)
    } else {
      setProfilesData(profilesData.filter((profile) => profile.id_perfil !== value[value.length - 1]?.id_perfil))
    }
  }

  return (
    <>
      <GridItem xs={12}>
        <CustomInput
          labelText={'DESCRIPCION'}
          id='description'
          formControlProps={{
            fullWidth: true,
          }}
          inputProps={{
            value: taskOther.descripcion_tarea,
            onChange: (e) => setTaskOther({ ...taskOther, descripcion_tarea: e.target.value }),
            type: 'text',
            required: true,
          }}
        />
      </GridItem>
      <GridItem xs={12}style={{ marginTop: '10px' }}>
        <FormControl fullWidth>
          <InputLabel id='task-type'>Tipo de Tarea</InputLabel>
          <Select
            labelId='task-type'
            id='task-type'
            value={taskOther.task_type}
            label='task-type'
            onChange={(e) => setTaskOther({ ...taskOther, task_type: e.target.value })}
          >
            <MenuItem value={'EXTRAORDINARIA'}>EXTRAORDINARIA</MenuItem>
            <MenuItem value={'ORDINARIA'}>ORDINARIA</MenuItem>
          </Select>
        </FormControl>
      </GridItem>
      <GridItem xs={12} md={6}>
        <FormControl fullWidth>
          <InputLabel id='cuantificable'>Cuantificable</InputLabel>
          <Select
            labelId='cuantificable'
            id='cuantificable'
            value={taskOther.cuantificable}
            label='Cuantificable'
            onChange={(e) => setTaskOther({ ...taskOther, cuantificable: e.target.value })}
          >
            <MenuItem value={'SI'}>SI</MenuItem>
            <MenuItem value={'NO'}>NO</MenuItem>
          </Select>
        </FormControl>
      </GridItem>
      <GridItem xs={12} md={6}>
        <FormControl fullWidth>
          <InputLabel id='indicador'>Indicador</InputLabel>
          <Select
            labelId='indicador'
            id='indicador'
            value={taskOther.indicador}
            label='Indicador'
            onChange={(e) => setTaskOther({ ...taskOther, indicador: e.target.value })}
          >
            <MenuItem value={'SI'}>SI</MenuItem>
            <MenuItem value={'NO'}>NO</MenuItem>
          </Select>
        </FormControl>
      </GridItem>
      <GridItem xs={12} md={6}>
        <FormControl fullWidth>
          <InputLabel id='entrada'>Entrada</InputLabel>
          <Select
            labelId='entrada'
            id='entrada'
            value={taskOther.entrada}
            label='Entrada'
            onChange={(e) => setTaskOther({ ...taskOther, entrada: e.target.value })}
          >
            <MenuItem value={'SI'}>SI</MenuItem>
            <MenuItem value={'NO'}>NO</MenuItem>
          </Select>
        </FormControl>
      </GridItem>
      <GridItem xs={12} md={6}>
        <FormControl fullWidth>
          <InputLabel id='compartida'>Compartida</InputLabel>
          <Select
            labelId='compartida'
            id='compartida'
            value={taskOther.compartida}
            label='Compartida'
            onChange={(e) => setTaskOther({ ...taskOther, compartida: e.target.value })}
          >
            <MenuItem value={'SI'}>SI</MenuItem>
            <MenuItem value={'NO'}>NO</MenuItem>
          </Select>
        </FormControl>
      </GridItem>
      <GridItem xs={12} md={6}>
        <FormControl fullWidth>
          <InputLabel id='dificultad'>Dificultad</InputLabel>
          <Select
            labelId='dificultad'
            id='dificultad'
            value={taskOther.dificultad}
            label='Dificultad'
            onChange={(e) => setTaskOther({ ...taskOther, dificultad: e.target.value })}
          >
            <MenuItem value={'SI'}>SI</MenuItem>
            <MenuItem value={'NO'}>NO</MenuItem>
          </Select>
        </FormControl>
      </GridItem>
      <GridItem xs={12} md={6}>
        <FormControl fullWidth>
          <InputLabel id='acumulativa'>Acumulativa</InputLabel>
          <Select
            labelId='acumulativa'
            id='acumulativa'
            value={taskOther.acumulativa}
            label='Acumulativa'
            onChange={(e) => setTaskOther({ ...taskOther, acumulativa: e.target.value })}
          >
            <MenuItem value={'SI'}>SI</MenuItem>
            <MenuItem value={'NO'}>NO</MenuItem>
          </Select>
        </FormControl>
      </GridItem>
      <GridItem xs={12} style={{ marginTop: '16px' }}>
        <MultiSelectProfile
          label={'Perfiles'}
          data={profiles}
          multiData={profilesData}
          handleChangeMultiData={handleChangeMultiData}
        />
      </GridItem>
    </>
  )
}

export default CreateTaskOther
