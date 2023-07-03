'use strict'

const asyncHandler = require('express-async-handler')
const { queryPromise } = require('../../utils/queryPromises')
const db = require('../../config/mysql/db')

// @desc    Create task
// @route   POST /api/tareas
// @access  Private/Admin
const registerTask = asyncHandler(async (req, res) => {
  const { profilesData, createTask, sameTask } = req.body
  let profilesIds = []
  let sameTasksIds = []
  let newTasksValues = []
  let taskSaved = []
  let taskExisting = []
  let lastInsertId = ''
  let findTasksProfile = ''
  let profilesAndTasksMerged = []

  if (sameTask.length === 0 && createTask.length === 0) {
    return res.status(400).json({ message: 'Debes seleccionar al menos una tarea para asignarle al perfil' })
  }

  if (!profilesData.length) {
    return res.status(400).json({ message: 'Debes seleccionar al menos un perfil para asignarle la tarea' })
  }

  profilesIds = profilesData.map((item) => item.id_perfil)  

  if (createTask.length > 0) {
    const descriptionTasks = createTask.map((task) => `'${task.descripcion_tarea}'`)

    const tasksExistQuery = `
    SELECT * FROM tareas 
    INNER JOIN tareas_perfil 
    ON tareas.id_tarea = tareas_perfil.id_tarea 
    WHERE (
      tareas_perfil.id_perfil IN (${profilesIds}) 
      AND 
      tareas.descripcion_tarea IN (${descriptionTasks.toString()})
    )`

    const taskExist = await queryPromise(tasksExistQuery)

    if (taskExist.length > 0) {
      return res.status(400).json({ message: 'ya existe una tarea con esa descripción en perfil' })
    }
  }

  if (sameTask.length > 0) {
    sameTasksIds = sameTask.map((task) => task.id_tarea)

    for (let i = 0; i < profilesIds.length; i++) {
      for (let j = 0; j < sameTasksIds.length; j++) {
        findTasksProfile = `SELECT * FROM tareas_perfil WHERE tareas_perfil.id_tarea = ${sameTasksIds[j]} and tareas_perfil.id_perfil = ${profilesIds[i]} `
        taskExisting = await queryPromise(findTasksProfile)
      
        if (!taskExisting.length || taskExisting.length == 0) {
          profilesAndTasksMerged.push(`('${sameTasksIds[j]}'`, `'${profilesIds[i]}')`)
        }
      }
    }
  }

  if (createTask.length > 0) {
    createTask.map(async (task) => {
      const insertTaskValues = `(
        '${task.descripcion_tarea}',
        '${task.codigo_trazabilidad}',
        '${task.id_tipo_tarea}',
        '${task.cuantificable}',
        '${task.activo}',
        '${task.fecha_alta}',
        '${task.indicador}',
        '${task.entrada}',
        '${task.compartida}',
        '${task.dificultad}',
        '${task.acumulativa}')
        `
      newTasksValues.push(insertTaskValues)
    })
  }

  const insertTaskQuery = `
  INSERT INTO tareas (
    descripcion_tarea,
    codigo_trazabilidad,
    id_tipo_tarea,
    cuantificable,
    activo,
    fecha_alta,
    indicador,
    entrada,
    compartida,
    dificultad,
    acumulativa) VALUES 
    ${newTasksValues.toString()}
  `
  if (createTask.length > 0) {
    taskSaved = await queryPromise(insertTaskQuery)
    const maxIdTaskQuery = `
    SELECT MAX(id_tarea) from tareas 
  `
    lastInsertId = await queryPromise(maxIdTaskQuery)
  }

  const allIdsTasks = []
  if (createTask.length > 0) {
    for (let i = taskSaved.insertId; i <= lastInsertId[0]['MAX(id_tarea)']; i++) {
      allIdsTasks.push(i)
    }
  }
  
  for (let i = 0; i < profilesIds.length; i++) {
    allIdsTasks.map((taskID) => {
        profilesAndTasksMerged.push(`(${taskID}, ${profilesIds[i]})`)
    })
  }
  
  if (profilesAndTasksMerged.length>0) {
    const insertTaskProfilesQuery = `
      INSERT INTO tareas_perfil (
        id_tarea,
        id_perfil 
        ) VALUES 
          ${profilesAndTasksMerged.toString()}
      `
    await queryPromise(insertTaskProfilesQuery)
  }
  res.json({ message: 'Tareas registradas correctamente' })
})

module.exports = registerTask
