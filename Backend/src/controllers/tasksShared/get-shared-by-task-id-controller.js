'use strict'

const asyncHandler = require('express-async-handler')
const { queryPromise } = require('../../utils/queryPromises')

// @desc    get all shared by task id
// @route   GET /compartidas/lista-tarea/:id
// @access  Admin/data manager

const getSharedByTaskId = asyncHandler(async (req, res) => {
  const { id } = req.params

  try {
  
    const deleteSharedByTaskIdQuery = `
    delete from compartidas
    where compartidas.id_tarea = ${id}
    and compartidas.id_puesto not in 
             (SELECT compartidas.id_puesto FROM compartidas
              INNER JOIN tareas_perfil ON compartidas.id_tarea = tareas_perfil.id_tarea
              INNER JOIN perfiles_puesto ON tareas_perfil.id_perfil = perfiles_puesto.id_perfil
              WHERE compartidas.id_tarea = ${id} 
              AND perfiles_puesto.id_puesto = compartidas.id_puesto)
    `

    await queryPromise(deleteSharedByTaskIdQuery)
    
    const sharedByTaskIdQuery = `
    select compartidas.id_tarea, puestos_trabajo.id_puesto, puestos_trabajo.nombre, puestos_trabajo.apellido1, puestos_trabajo.apellido2, compartidas.porcentaje_responsabilidad
    from compartidas
    inner join puestos_trabajo on compartidas.id_puesto = puestos_trabajo.id_puesto
    where compartidas.id_tarea = ${id}
    order by puestos_trabajo.nombre, puestos_trabajo.apellido1, puestos_trabajo.apellido2
    `
  
    const compartidas = await queryPromise(sharedByTaskIdQuery)

    return res.status(200).json(compartidas)
  } catch (error) {
    res.status(400).json({ message: 'Error al obtener las tareas compartidas' })
  }
})

module.exports = getSharedByTaskId
