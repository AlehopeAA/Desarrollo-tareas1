import { useEffect, useState } from 'react'
import { Card, FormControl, InputLabel, MenuItem, Select } from '@material-ui/core'
import GridContainer from 'components/Grid/GridContainer'
import GridItem from 'components/Grid/GridItem'
import CardBody from 'components/Card/CardBody'
import CreateTaskExtOrdOther from './components/CreateTaskExtOrdOther'
import DuplicateTaskExtOrdOther from './components/DuplicateTaskExtOrdOther'

const RegisterTaskOtherScreen = () => {
  const [taskType, setTaskType] = useState('')

  useEffect(() => {
    return () => setTaskType('')
  }, [])

  return (
    <>
      <GridContainer>
        <GridItem xs={12} md={8} style={{ margin: 'auto' }}>
          <Card>
            <CardBody>
              <GridContainer>
                <GridItem xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id='task-action-type'>Tipo de Registro</InputLabel>
                    <Select
                      labelId='task-action-type'
                      id='task-action-type'
                      value={taskType}
                      label='task-action-type'
                      onChange={(e) => setTaskType(e.target.value)}
                    >
                      <MenuItem value={'create'}>Crear tarea nueva</MenuItem>
                      <MenuItem value={'duplicate'}>Duplicar tareas de perfil</MenuItem>
                    </Select>
                  </FormControl>
                </GridItem>
                {taskType === 'create' ? (
                  <CreateTaskExtOrdOther taskType={taskType} setTaskType={setTaskType} />
                ) : taskType === 'duplicate' ? (
                  <DuplicateTaskExtOrdOther taskType={taskType} setTaskType={setTaskType} />
                ) : (
                  <></>
                )}
              </GridContainer>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </>
  )
}

export default RegisterTaskOtherScreen
