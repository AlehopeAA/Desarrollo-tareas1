import { useEffect, useState } from 'react'
import { Box, List, ListItemText, ListItem, Checkbox, ListItemIcon } from '@material-ui/core'
import ListItemButton from '@mui/material/ListItemButton'
import GridContainer from 'components/Grid/GridContainer'
import GridItem from 'components/Grid/GridItem'
import CustomInput from 'components/CustomInput/CustomInput'

const UserProfileInputs = ({ userInformation }) => {
  const [perfiles, setPerfiles] = useState([])
  const [validadores, setValidadores] = useState([])
  const [responsables, setResponsables] = useState([])
  const [tareas, setTareas] = useState([])
  const [tareasFavoritas, setTareasFavoritas] = useState([])
  const [objetivos, setObjetivos] = useState([])

  useEffect(() => {
    if (userInformation && userInformation.profileInfo) {
      const {
        profileInfo: { perfiles, tareas, validadores, responsables, favoritas, objetivos },
      } = userInformation
      setPerfiles(perfiles)
      setValidadores(validadores)
      setResponsables(responsables)
      setTareas(tareas)
      setTareasFavoritas(favoritas)
      setObjetivos(objetivos)
    }
  }, [userInformation])

  const isFavoriteTask = (taskId) => tareasFavoritas?.some((fav) => fav.id_tarea === taskId)

  return (
    <GridItem xs={12}>
      <GridContainer style={{ marginBottom: '26px' }}>
        <GridItem xs={12} md={6}>
          <CustomInput
            labelText={'Nombre'}
            id='name'
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              value: `${userInformation.nombre} ${userInformation.apellido1} ${userInformation.apellido2}`,
              disabled: true,
            }}
          />
        </GridItem>
        <GridItem xs={12} md={6}>
          <CustomInput
            labelText='Codigo de Puesto'
            id='codigopuesto'
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              type: 'number',
              value: userInformation.codigo_puesto,
              disabled: true,
            }}
          />
        </GridItem>
        <GridItem xs={12} md={6}>
          <CustomInput
            labelText='Denominacion de Puesto'
            id='denominacion'
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              value: userInformation?.denominacion_puesto || '',
              disabled: true,
            }}
          />
        </GridItem>
        <GridItem xs={12} md={6}>
          <CustomInput
            labelText='Jornada Laboral'
            id='jornada'
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              value: `${userInformation.jornada_laboral} horas`,
              disabled: true,
            }}
          />
        </GridItem>
        <GridItem xs={12} md={4} style={{ marginTop: '10px' }}>
          <Box
            style={{
              width: '100%',
              maxHeight: '100%',
              background: '#F9F9F9',
              borderRadius: '10px',
              padding: '5px',
            }}
          >
            <h4 style={{ textAlign: 'center', fontWeight: 400, color: '#336699' }}>Perfiles</h4>
            <List>
              {perfiles && perfiles.length > 0 ? (
                perfiles?.map((perfil) => {
                  return (
                    <ListItem key={perfil.id_perfil}>
                      <ListItemText primary={perfil.codigo_perfil} />
                    </ListItem>
                  )
                })
              ) : (
                <ListItem>
                  <ListItemText primary='Aun no tiene Perfiles asignados' />
                </ListItem>
              )}
            </List>
          </Box>
        </GridItem>
        <GridItem xs={12} md={4} style={{ marginTop: '10px' }}>
          <Box
            style={{
              width: '100%',
              height: '100%',
              background: '#F9F9F9',
              borderRadius: '10px',
              padding: '5px',
            }}
          >
            <h4 style={{ textAlign: 'center', fontWeight: 400, color: '#336699' }}>Responsables</h4>
            <List>
              {responsables && responsables.length > 0 ? (
                responsables.map((responsable) => {
                  return (
                    <ListItem key={responsable.id_responsable}>
                      <ListItemText
                        primary={`${responsable.nombre} ${responsable.apellido1} ${responsable?.apellido2 || ''}`}
                      />
                    </ListItem>
                  )
                })
              ) : (
                <ListItem>
                  <ListItemText primary='Aun no tiene responsables asignados' />
                </ListItem>
              )}
            </List>
          </Box>
        </GridItem>
        <GridItem xs={12} md={4} style={{ marginTop: '10px' }}>
          <Box
            style={{
              width: '100%',
              height: '100%',
              background: '#F9F9F9',
              borderRadius: '10px',
              padding: '5px',
            }}
          >
            <h4 style={{ textAlign: 'center', fontWeight: 400, color: '#336699' }}>Validadores</h4>
            <List>
              {validadores && validadores.length > 0 ? (
                validadores.map((validador) => {
                  return (
                    <ListItem key={validador.id_validador}>
                      <ListItemText
                        primary={`${validador.nombre} ${validador.apellido1} ${validador?.apellido2 || ''}`}
                      />
                    </ListItem>
                  )
                })
              ) : (
                <ListItem>
                  <ListItemText primary='Aun no tiene validadores asignados' />
                </ListItem>
              )}
            </List>
          </Box>
        </GridItem>
        <GridItem xs={12} style={{ marginTop: '10px' }}>
          <Box
            style={{
              width: '100%',
              maxHeight: '400px',
              background: '#F9F9F9',
              borderRadius: '10px',
              padding: '5px',
              overflow: 'auto',
            }}
          >
            <h4 style={{ textAlign: 'center', fontWeight: 400, color: '#336699' }}>Tareas (marcadas las favoritas)</h4>
            <List>
              {tareas && tareas.length > 0 ? (
                tareas.map((tarea) => {
                  return (
                    <ListItem key={tarea.id_tarea}>
                      <ListItemButton dense>
                        <ListItemIcon>
                          <Checkbox edge='start' checked={isFavoriteTask(tarea.id_tarea)} disableRipple />
                        </ListItemIcon>
                        <ListItemText primary={`${tarea.descripcion_tarea}`} />
                      </ListItemButton>
                    </ListItem>
                  )
                })
              ) : (
                <ListItem>
                  <ListItemText primary='Aun no tiene tareas asignados' />
                </ListItem>
              )}
            </List>
          </Box>
        </GridItem>
      </GridContainer>
    </GridItem>
  )
}

export default UserProfileInputs
