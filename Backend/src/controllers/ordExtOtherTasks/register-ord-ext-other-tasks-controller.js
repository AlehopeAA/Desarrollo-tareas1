'use strict'

const asyncHandler = require('express-async-handler')
const db = require('../../config/mysql/db')

// @desc    Create general task
// @route   POST /api/tareasordextotras
// @access  Private/Admin
const registeOrdExtOtherTask = asyncHandler(async (req, res) => {
  const {
    task_type,
    descripcion_tarea,
    codigo_trazabilidad,
    fecha_alta,
    cuantificable,
    indicador,
    entrada,
    compartida,
    dificultad,
    acumulativa,
    profilesData,
  } = req.body

  const active = 'SI'
  let allIdProfiles = []

  const matchTaskType = (task_type) => {
    switch (task_type) {
      case 'ORDINARIA':
        return 2
      case 'EXTRAORDINARIA':
        return 3
    }
  }

  const taskTypeId = matchTaskType(task_type)

  profilesData.map((profile) => {
    allIdProfiles.push(profile.id_perfil)
  })

  const existDescriptionQuery = `
    SELECT * 
    FROM tareas 
    INNER JOIN tipos_tarea 
    ON tareas.id_tipo_tarea = tipos_tarea.id_tipo_tarea 
    INNER JOIN tareas_perfil 
    ON tareas.id_tarea = tareas_perfil.id_tarea 
    WHERE ( tipos_tarea.tipo_tarea ='${task_type}'
    AND tareas_perfil.id_perfil IN (${allIdProfiles.toString()}) 
    AND tareas.descripcion_tarea ='${descripcion_tarea}'
    )
  `

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
      acumulativa) VALUES (
      '${descripcion_tarea}',
      '${codigo_trazabilidad}',
      '${taskTypeId}',
      '${cuantificable}',
      '${active}',
      '${fecha_alta}',
      '${indicador}',
      '${entrada}',
      '${compartida}',
      '${dificultad}',
      '${acumulativa}'
    )`
  const insertTaskProfilesQuery = `
    INSERT INTO tareas_perfil (
      id_tarea,
      id_perfil 
      ) VALUES 
        <allValues>
    `
  db.query(existDescriptionQuery, (err, resultExistDescription) => {
    if (err) {
      return res.status(400).json({ message: err.sqlMessage })
    }

    if (resultExistDescription.length) {
      return res.status(400).json({ message: `Ya existe una tarea ${task_type} con esa descripción` })
    }

    db.query(insertTaskQuery, (err, resultTask) => {
      if (err) {
        res.status(400).json({ message: err.sqlMessage })
      }

      if (resultTask) {
        let valueString = []

        for (let i = 0; i < allIdProfiles.length; i++) {
          valueString.push(`(${resultTask.insertId},${allIdProfiles[i]})`)
        }

        const replaceTextQuery = insertTaskProfilesQuery.replace('<allValues>', valueString.toString())

        db.query(replaceTextQuery, (err, result) => {
          if (err) {
            res.status(400).json({ message: err.sqlMessage })
          }

          if (result)
            res.status(201).json({
              message: `Tarea ${task_type} creada.`,
            })
        })
      }
    })
  })
})

module.exports = registeOrdExtOtherTask
