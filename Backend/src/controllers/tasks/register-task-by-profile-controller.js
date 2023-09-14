'use strict'

const asyncHandler = require('express-async-handler')
const { queryPromise } = require('../../utils/queryPromises')
const db = require('../../config/mysql/db')

// @desc    Create task
// @route   POST /api/tareas
// @access  Private/Admin
const registerTask = asyncHandler(async (req, res) => {
  // console.log(req)
  const { profilesData, createTask, sameTask } = req.body
  let profilesIds = []
  let sameTasksIds = []
  let newTasksValues = []
  let taskSaved = []
  let taskExisting = []
  let lastInsertId = ''
  let findTasksProfile = ''
  let profilesAndTasksMerged = []
  let objetivesTrueData = []



  // console.log(createTask)


  if (sameTask.length === 0 && createTask.length === 0) {
    return res.status(400).json({ message: 'Debes seleccionar al menos una tarea para asignarle al perfil' })
  }

  if (!profilesData.length) {
    return res.status(400).json({ message: 'Debes seleccionar al menos un perfil para asignarle la tarea' })
  }



  profilesIds = profilesData.map((item) => item.id_perfil)

  // for (let i = 0; i < createTask.length; i++) {

  //   tasksIds.push(createTask[i].id_tarea)
  // }

  const tasksIds = createTask.map((task) => `${task.id_tarea}`)


  if (createTask.length > 0) {
    const descriptionTasks = createTask.map((task) => `'${task.descripcion_tarea}'`)
    console.log(descriptionTasks.toString())
    const tasksExistQuery = `
    SELECT * FROM tareas 
    INNER JOIN tareas_perfil 
    ON tareas.id_tarea = tareas_perfil.id_tarea 
    WHERE (
      tareas_perfil.id_perfil IN (${profilesIds}) 
      AND 
      tareas.descripcion_tarea IN (${descriptionTasks.toString()})
    )`

    const objetivesQuery = `
    SELECT
      *
    FROM objetivos  
    WHERE (id_tarea IN (${tasksIds})
    )
    `

    const taskExist = await queryPromise(tasksExistQuery)

    const objetivesData = await queryPromise(objetivesQuery)

   console.log(tasksIds)

   if (objetivesData.length > 0) {
    objetivesData.map(async (objetive) => {
      console.log(objetive)
      const insertObjetiveValues = `
        '${objetive.dificultad}',
        ${objetive.unidades_minimo},
        ${objetive.unidades_medio},
        ${objetive.unidades_maximo},
        ${objetive.porcentaje_entrada_minimo},
        ${objetive.porcentaje_entrada_medio},
        ${objetive.porcentaje_entrada_maximo},
        ${objetive.tiempo_minimo},
        ${objetive.tiempo_medio},
        ${objetive.tiempo_maximo},
        ${objetive.porcentaje_jornada_minimo},
        ${objetive.porcentaje_jornada_medio},
        ${objetive.porcentaje_jornada_maximo},
        '${objetive.magnitud_temporal}',
        sysdate())
        `

      objetivesTrueData.push(insertObjetiveValues)
    })
  }
  console.log(objetivesTrueData)
    console.log(objetivesData)

    if (taskExist.length > 0) {
      return res.status(400).json({ message: 'Ya existe una tarea con esa descripción en el perfil seleccionado' })
    }


  }

  if (sameTask.length > 0) {
    sameTasksIds = sameTask.map((task) => task.id_tarea)

    for (let i = 0; i < profilesIds.length; i++) {
      for (let j = 0; j < sameTasksIds.length; j++) {
        findTasksProfile = `SELECT * FROM tareas_perfil WHERE tareas_perfil.id_tarea = ${sameTasksIds[j]} and tareas_perfil.id_perfil = ${profilesIds[i]} `
        taskExisting = await queryPromise(findTasksProfile)
        if (taskExisting.length > 0) {
          return res.status(400).json({ message: 'Ya existe una tarea con esa descripción en el perfil seleccionado' })
        }
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
  console.log(newTasksValues)
  if (createTask.length > 0) {
    console.log(insertTaskQuery)

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
  if (objetivesTrueData.length > 0 && allIdsTasks.length > 0) {
    for(let i = 0; i < allIdsTasks.length;i++){
      objetivesTrueData[i] = `(
        '${allIdsTasks[i]}',`+objetivesTrueData[i]
    }
  }

  console.log('id tarea nueva ' + allIdsTasks)

  // const insertObjetives = createTask.map((task) => `${task.id_tarea}`)



console.log(objetivesTrueData)
console.log(newTasksValues);

const newTaskObjetivesQuery = `
  INSERT INTO objetivos (
      id_tarea,
      dificultad,
      unidades_minimo,
      unidades_medio,
      unidades_maximo,
      porcentaje_entrada_minimo,
      porcentaje_entrada_medio,
      porcentaje_entrada_maximo,
      tiempo_minimo,
      tiempo_medio,
      tiempo_maximo,
      porcentaje_jornada_minimo,
      porcentaje_jornada_medio,
      porcentaje_jornada_maximo,
      magnitud_temporal,
      fecha_ultima_modificacion) VALUES 
      ${objetivesTrueData.toString()}
    `
if (objetivesTrueData.length > 0) {
  console.log(newTaskObjetivesQuery)
  console.log(insertTaskQuery)
  const objetivesSuccess = await queryPromise(newTaskObjetivesQuery)

     console.log('exito ' + objetivesSuccess)
}

    

 

  // for await (let objetivo of objetivesTrueData) {
    
  //   const newTaskObjetivesQuery = `
  //   INSERT INTO objetivos (
  //     id_tarea,
  //     dificultad,
  //     unidades_minimo,
  //     unidades_medio,
  //     unidades_maximo,
  //     porcentaje_entrada_minimo,
  //     porcentaje_entrada_medio,
  //     porcentaje_entrada_maximo,
  //     tiempo_minimo,
  //     tiempo_medio,
  //     tiempo_maximo,
  //     porcentaje_jornada_minimo,
  //     porcentaje_jornada_medio,
  //     porcentaje_jornada_maximo,
  //     magnitud_temporal,
  //     fecha_ultima_modificacion,
  //   ) VALUES (${allIdsTasks[cont]},${objetivo})
  //   `
  //   const objetivesSuccess = await queryPromise(newTaskObjetivesQuery)

  //   console.log('exito ' + objetivesSuccess)

  //   cont++
  // }
  // for (let i = 0; i < objetivesTrueData.length; i++) {
  //   console.log(i + objetivesTrueData[i])

  // }

  // for (let i = 0; i < allIdsTasks.length; i++) {
  //   console.log('HOLAHOLAHOLA')
  //   const newTaskObjetivesQuery = `
  //     INSERT INTO objetivos (
  //       id_tarea,
  //       dificultad,
  //       unidades_minimo,
  //       unidades_medio,
  //       unidades_maximo,
  //       porcentaje_entrada_minimo,
  //       porcentaje_entrada_medio,
  //       porcentaje_entrada_maximo,
  //       tiempo_minimo,
  //       tiempo_medio,
  //       tiempo_maximo,
  //       porcentaje_jornada_minimo,
  //       porcentaje_jornada_medio,
  //       porcentaje_jornada_maximo,
  //       magnitud_temporal,
  //       fecha_ultima_modificacion,
  //     ) VALUES (${allIdsTasks[i]},${objetivesData[i]})
  //     `
  //     const objetivesSuccess = await queryPromise(newTaskObjetivesQuery)

  //     console.log('exito '+objetivesSuccess)
  // }

  // const newTaskObjetivesQuery = `
  //     INSERT INTO objetivos (
  //       id_tarea,
  //       dificultad,
  //       unidades_minimo,
  //       unidades_medio,
  //       unidades_maximo,
  //       porcentaje_entrada_minimo,
  //       porcentaje_entrada_medio,
  //       porcentaje_entrada_maximo,
  //       tiempo_minimo,
  //       tiempo_medio,
  //       tiempo_maximo,
  //       porcentaje_jornada_minimo,
  //       porcentaje_jornada_medio,
  //       porcentaje_jornada_maximo,
  //       magnitud_temporal,
  //       fecha_ultima_modificacion,
  //     ) VALUES (${allIdsTasks[i]},${objetivesData[i]})
  //     `

  // const taskExist = await queryPromise(tasksExistQuery)

  for (let i = 0; i < profilesIds.length; i++) {
    allIdsTasks.map((taskID) => {
      profilesAndTasksMerged.push(`(${taskID}, ${profilesIds[i]})`)
    })
  }

  if (profilesAndTasksMerged.length > 0) {
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
