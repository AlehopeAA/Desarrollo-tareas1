'use strict'

const asyncHandler = require('express-async-handler')
const { getOneRecord, getAllRecords } = require('../../utils/queryPromises')
const {
  USUARIO_ROLE,
  VALIDADOR_ROLE,
  RESPONSABLE_ROLE,
  GESTOR_DE_DATOS_ROLE,
} = require('../../config/users/roles/roles')


const generarAvisosUsuario = async(id_puesto, ver_objetivos) => {
  const avisos_usuario = []

  const queryPuesto = `
            SELECT *
            FROM puestos_trabajo 
            WHERE id_puesto =  ${id_puesto}`
  const puesto = await getOneRecord(queryPuesto)

  const queryDescanso = `
            SELECT *
            FROM configuraciones 
            WHERE parametro = "descanso_autorizado"`
  const indicador_descanso = await getOneRecord(queryDescanso)

  const jornada_laboral_diaria_neta = puesto[0].jornada_laboral / 5.0 - indicador_descanso[0].valor

  let fecha_inicio = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  const fecha_fin = new Date();

  const queryConfiguracion = `
      SELECT *
      FROM configuraciones 
      WHERE parametro = 'registro_actividad'`
  var configuracion = await getAllRecords(queryConfiguracion)

  if (fecha_fin.getDate() <= configuracion[0].valor) {
    //Es el del mes anterior
    fecha_inicio = new Date(new Date().getFullYear(), new Date().getMonth()-1, 1);
  }

  for (var fecha = new Date(fecha_inicio.getTime()); fecha <= fecha_fin; fecha.setDate(fecha.getDate() + 1)) {
    const queryHorasRegistradas = `
                SELECT IFNULL(SUM(horas), 0) as horas_registradas
                FROM actividades 
                WHERE 
                actividades.id_puesto = ${id_puesto} 
                AND DAY(actividades.fecha_actividad) = ${fecha.getDate()}
                AND MONTH(actividades.fecha_actividad) = ${fecha.getMonth() + 1}
                AND YEAR(actividades.fecha_actividad) = ${fecha.getFullYear()}`;
    const horas_registradas = await getAllRecords(queryHorasRegistradas)

    if(jornada_laboral_diaria_neta > horas_registradas[0].horas_registradas) {
      let porcentaje = (horas_registradas[0].horas_registradas * 100.0) / jornada_laboral_diaria_neta
      porcentaje = Number(porcentaje.toFixed(2));
      
      if (fecha.getDate() === fecha_fin.getDate() && 
          fecha.getMonth() === fecha_fin.getMonth() && 
          fecha.getFullYear() === fecha_fin.getFullYear()) {
        avisos_usuario.push(`En el día de hoy, las tareas registradas corresponden al ${porcentaje} % de tu jornada laboral`)
      }
      else {
        avisos_usuario.push(`En el día ${fecha.getDate()} del mes ${fecha.getMonth() + 1}, las tareas registradas corresponden al ${porcentaje} % de tu jornada laboral`)
      }
    }
  }


  if (ver_objetivos == 'SI') {
    const queryObjetivos = `
      SELECT tareas.descripcion_tarea
      FROM objetivos
      INNER JOIN tareas ON objetivos.id_tarea = tareas.id_tarea 
      INNER JOIN tipos_tarea ON tareas.id_tipo_tarea = tipos_tarea.id_tipo_tarea 
      LEFT JOIN tareas_perfil ON tareas.id_tarea = tareas_perfil.id_tarea
      LEFT JOIN perfiles ON perfiles.id_perfil = tareas_perfil.id_perfil
      WHERE
      tareas.activo = "SI"
      AND objetivos.fecha_ultima_modificacion > SYSDATE() - 7
      AND (tipos_tarea.tipo_tarea IN ("AUSENCIA","GENERAL")
            OR (tipos_tarea.tipo_tarea = "ESPECIFICA" AND tareas.id_puesto = ${id_puesto})
            OR (tipos_tarea.tipo_tarea IN ("ORDINARIA","EXTRAORDINARIA") 
                AND tareas.id_tarea IN (
                  SELECT tareas_perfil.id_tarea 
                  FROM tareas_perfil 
                  WHERE tareas_perfil.id_perfil 
                  IN (
                    SELECT perfiles_puesto.id_perfil 
                    FROM perfiles_puesto 
                    WHERE perfiles_puesto.id_puesto = ${id_puesto}
                  )
                )
            ) 
      )
      ORDER BY tareas.descripcion_tarea
    `
    const objetivos = await getAllRecords(queryObjetivos)
    objetivos.map((objetivo) => {
      avisos_usuario.push(`Los objetivos vinculados a la tarea '${objetivo.descripcion_tarea}' han sido modificados`)
    })
  }
  
  //Tareas generales, ausencias, ordinarias y extraordinarias. 
  const queryTareas = `
      SELECT tareas.descripcion_tarea
      FROM tareas
      INNER JOIN tipos_tarea ON tareas.id_tipo_tarea = tipos_tarea.id_tipo_tarea 
      LEFT JOIN tareas_perfil ON tareas.id_tarea = tareas_perfil.id_tarea
      LEFT JOIN perfiles ON perfiles.id_perfil = tareas_perfil.id_perfil
      WHERE
      tareas.activo = "SI"
      AND tareas.fecha_alta > SYSDATE() - 7
      AND (tipos_tarea.tipo_tarea IN ("AUSENCIA","GENERAL")
            OR (tipos_tarea.tipo_tarea IN ("ORDINARIA","EXTRAORDINARIA") 
                AND tareas.id_tarea IN (
                  SELECT tareas_perfil.id_tarea 
                  FROM tareas_perfil 
                  WHERE tareas_perfil.id_perfil 
                  IN (
                    SELECT perfiles_puesto.id_perfil 
                    FROM perfiles_puesto 
                    WHERE perfiles_puesto.id_puesto = ${id_puesto}
                  )
                )
            ) 
      )
      ORDER BY tareas.descripcion_tarea
  `
  const tareas = await getAllRecords(queryTareas)
  tareas.map((tarea) => {
    avisos_usuario.push(`Se ha creado la nueva tarea '${tarea.descripcion_tarea}' que puede realizar`)
  })

  //Tareas especificas. 
  const queryTareasEspecificas = `
      SELECT tareas.descripcion_tarea
      FROM tareas
      INNER JOIN tipos_tarea ON tareas.id_tipo_tarea = tipos_tarea.id_tipo_tarea 
      WHERE
      tareas.activo = "SI"
      AND tareas.fecha_alta > SYSDATE() - 7
      AND (tipos_tarea.tipo_tarea = "ESPECIFICA" AND tareas.id_puesto = ${id_puesto})
      ORDER BY tareas.descripcion_tarea
  `
  const tareasEspecificas = await getAllRecords(queryTareasEspecificas)
  tareasEspecificas.map((tarea) => {
    avisos_usuario.push(`Se le ha asignado la nueva tarea '${tarea.descripcion_tarea}' que puede realizar`)
  })

  return avisos_usuario
}

const generarAvisosValidador = async(id_puesto) => {
  const avisos_validador = []

  const queryInicioValidacion = `
      SELECT *
      FROM configuraciones 
      WHERE parametro = 'aviso_inicio_validacion'`
  var inicio_validacion = await getAllRecords(queryInicioValidacion)

  const queryFinValidacion = `
      SELECT *
      FROM configuraciones 
      WHERE parametro = 'aviso_fin_validacion'`
  var fin_validacion = await getAllRecords(queryFinValidacion)

  if (new Date().getDate() >= inicio_validacion[0].valor && 
      new Date().getDate() < fin_validacion[0].valor) {
    avisos_validador.push('El tiempo de supervisión ha terminado. Puede proceder a validar a sus trabajadores')
  }

  if(new Date().getDate() >= fin_validacion[0].valor) {
    //Evaluamos los puestos.
    const fecha = new Date(new Date().getFullYear(), new Date().getMonth()-1, 1);
    const queryPuestosValidadorSinEvaluar = `
                SELECT IFNULL(COUNT(*), 0) as numero
                FROM validadores 
                INNER JOIN puestos_trabajo ON puestos_trabajo.id_puesto = validadores.id_puesto 
                WHERE 
                puestos_trabajo.activo = "SI" 
                AND validadores.id_puesto_validador = ${id_puesto}
                AND NOT EXISTS(SELECT evaluaciones.id_evaluacion FROM evaluaciones WHERE
                              evaluaciones.id_puesto_trabajo = validadores.id_puesto
                              AND evaluaciones.mes = ${fecha.getMonth() + 1}
                              AND evaluaciones.anio = ${fecha.getFullYear()})
                `;
    const puestos_validador_sin_evaluar = await getAllRecords(queryPuestosValidadorSinEvaluar)
    
    if(puestos_validador_sin_evaluar[0].numero > 0) {
      avisos_validador.push(`El mes de ${fecha.getMonth() + 1}/${fecha.getFullYear()} aún tienes ${puestos_validador_sin_evaluar[0].numero} trabajadores por validar. Tienes de plazo hasta fin de mes`)
    }
  }

  return avisos_validador;
}

const generarAvisosResponsable = async(id_puesto) => {
  const avisos_responsable = []

  const queryInicioSupervision = `
      SELECT *
      FROM configuraciones 
      WHERE parametro = 'aviso_supervision'`
  var inicio_supervision = await getAllRecords(queryInicioSupervision)

  const queryFinSupervision = `
      SELECT *
      FROM configuraciones 
      WHERE parametro = 'aviso_inicio_validacion'`
  var fin_supervision = await getAllRecords(queryFinSupervision)

  if (new Date().getDate() >= inicio_supervision[0].valor && 
      new Date().getDate() < fin_supervision[0].valor) {
    //Evaluamos los puestos.
    const fecha = new Date(new Date().getFullYear(), new Date().getMonth()-1, 1);
    const queryPuestosResponsableSinEvaluar = `
                SELECT IFNULL(COUNT(*), 0) as numero
                FROM responsables 
                INNER JOIN puestos_trabajo ON puestos_trabajo.id_puesto = responsables.id_puesto 
                WHERE 
                puestos_trabajo.activo = "SI" 
                AND responsables.id_puesto_responsable = ${id_puesto}
                AND NOT EXISTS(SELECT evaluaciones.id_evaluacion FROM evaluaciones 
                              WHERE
                              evaluaciones.id_puesto_trabajo = responsables.id_puesto
                              AND evaluaciones.mes = ${fecha.getMonth() + 1}
                              AND evaluaciones.anio = ${fecha.getFullYear()})
                `;
    const puestos_responsable_sin_evaluar = await getAllRecords(queryPuestosResponsableSinEvaluar)
    
    if(puestos_responsable_sin_evaluar[0].numero > 0) {
      avisos_responsable.push(`El mes de ${fecha.getMonth() + 1}/${fecha.getFullYear()} aún tienes ${puestos_responsable_sin_evaluar[0].numero} trabajadores por supervisar. Puedes hacerlo hasta el día ${fin_supervision[0].valor}`);
    }
  }

  return avisos_responsable;
}

const generarAvisosGestor = async(id_puesto) => {
  const avisos_gestor = []

  const queryInicioGestion = `
      SELECT *
      FROM configuraciones 
      WHERE parametro = 'registro_actividad'`
  var inicio_gestion = await getAllRecords(queryInicioGestion)

  const queryFinGestion = `
      SELECT *
      FROM configuraciones 
      WHERE parametro = 'registro_entrada'`
  var fin_gestion = await getAllRecords(queryFinGestion)

  if (new Date().getDate() >= inicio_gestion[0].valor && 
      new Date().getDate() < fin_gestion[0].valor) {
    //Evaluamos las tareas.
    const fecha = new Date(new Date().getFullYear(), new Date().getMonth()-1, 1);
    const queryTareasGestorSinEntrada = `
                SELECT IFNULL(COUNT(*), 0) as numero
                
                FROM tareas 
                WHERE tareas.activo ="SI" 
                AND tareas.entrada ="SI" 
                AND tareas.id_tarea IN (
                    SELECT gestor_entradas.id_tarea 
                    FROM gestor_entradas 
                    WHERE gestor_entradas.id_puesto = '${id_puesto}'
                )
                AND NOT EXISTS(SELECT entradas.id_entrada FROM entradas WHERE
                              entradas.id_tarea = tareas.id_tarea
                              AND entradas.mes = ${fecha.getMonth() + 1}
                              AND entradas.anio = ${fecha.getFullYear()})
                AND NOT EXISTS(SELECT entradas_no_compartidas.id_entrada FROM entradas_no_compartidas WHERE
                              entradas_no_compartidas.id_tarea = tareas.id_tarea
                              AND entradas_no_compartidas.mes = ${fecha.getMonth() + 1}
                              AND entradas_no_compartidas.anio = ${fecha.getFullYear()})              
                `;
    const tareas_gestor_sin_entrada = await getAllRecords(queryTareasGestorSinEntrada)
    
    if(tareas_gestor_sin_entrada[0].numero > 0) {
      avisos_gestor.push(`El mes de ${fecha.getMonth() + 1}/${fecha.getFullYear()} aún tienes ${tareas_gestor_sin_entrada[0].numero} tareas pendientes de introducir su entrada. Tienes de plazo hasta el día ${fin_gestion[0].valor}`);
    }
  }

  return avisos_gestor;
}

// @desc    Get all warnings assigned to user
// @route   POST /api/users/avisos
// @access  user
const getAvisos = asyncHandler(async (req, res) => {
  const { id_puesto, permiso, ver_objetivos } = req.user

  let mostrar_usuario = false
  let avisos_usuario = []
  let mostrar_validador = false
  let avisos_validador = []
  let mostrar_responsable = false
  let avisos_responsable = []
  let mostrar_gestor = false
  let avisos_gestor = []

  //if(permiso.includes(USUARIO_ROLE)) {
    const queryAvisosUsuario = `
      SELECT *
      FROM configuraciones 
      WHERE parametro = 'mostrar_avisos_usuarios'`
    var calcularAvisosUsuario = await getAllRecords(queryAvisosUsuario)
    if (calcularAvisosUsuario[0].valor == 1) {
      //Se tiene que mostrar
      mostrar_usuario = true
      avisos_usuario = await generarAvisosUsuario(id_puesto, ver_objetivos)
    }
  //}
  
  if(permiso.includes(VALIDADOR_ROLE)) {
    const queryAvisosValidador = `
        SELECT *
        FROM configuraciones 
        WHERE parametro = 'mostrar_avisos_validadores'`
    var calcularAvisosValidador = await getAllRecords(queryAvisosValidador)
    if (calcularAvisosValidador[0].valor == 1) {
      //Se tiene que mostrar
      mostrar_validador = true
      avisos_validador = await generarAvisosValidador(id_puesto)
    }
  }
  
  if(permiso.includes(RESPONSABLE_ROLE)) {
    const queryAvisosResponsable = `
        SELECT *
        FROM configuraciones 
        WHERE parametro = 'mostrar_avisos_responsables'`
    var calcularAvisosResponsable = await getAllRecords(queryAvisosResponsable)
    if (calcularAvisosResponsable[0].valor == 1) {
      //Se tiene que mostrar
      mostrar_responsable = true
      avisos_responsable = await generarAvisosResponsable(id_puesto)
    }
  }

  if(permiso.includes(GESTOR_DE_DATOS_ROLE)) {
    const queryAvisosGestor = `
        SELECT *
        FROM configuraciones 
        WHERE parametro = 'mostrar_avisos_datos'`
    var calcularAvisosGestor = await getAllRecords(queryAvisosGestor)
    if (calcularAvisosGestor[0].valor == 1) {
      //Se tiene que mostrar
      mostrar_gestor = true
      avisos_gestor = await generarAvisosGestor(id_puesto)
    }
  }


  res.status(200).json({mostrar: mostrar_usuario || mostrar_validador || mostrar_responsable || mostrar_gestor, 
                        avisos: { 
                            usuario: avisos_usuario, 
                            validador: avisos_validador, 
                            responsable: avisos_responsable,
                            gestor: avisos_gestor
                        }
  })
})

module.exports = getAvisos
