'use strict'

const db = require('../config/mysql/db')
const calendarioUtilidades = require('./calendarioUtilidades')
const { getOneRecord, getAllRecords } = require('./queryPromises')



const jornadaLaboralMensual = async(id_puesto, mes, anyo) => {
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

    const query_ausencias = `
                SELECT SUM(horas) as horas_neta 
                FROM actividades 
                INNER JOIN tareas ON actividades.id_tarea = tareas.id_tarea 
                INNER JOIN tipos_tarea ON tareas.id_tipo_tarea = tipos_tarea.id_tipo_tarea 
                WHERE 
                actividades.id_puesto = ${id_puesto}  AND 
                MONTH(actividades.fecha_actividad) = ${mes} AND 
                YEAR(actividades.fecha_actividad) = ${anyo} AND 
                tipos_tarea.tipo_tarea = "AUSENCIA"`;
    const horas_ausencia = await getAllRecords(query_ausencias)

    if(!puesto) {
        return { message: 'Error en la obtención del puesto.' }
    }
    if(!indicador_descanso) {
        return { message: 'Error en la obtención del indicador de descanso.' }
    }
    if(!horas_ausencia) {
        return { message: 'Error en la obtención de las horas de actividad.' }
    }

    var numero_dias = await calendarioUtilidades.diasLaborablesMes(mes, anyo);
    if(numero_dias == -1) {
        return { message: 'Error en la obtención de los dias laborables del mes.' }
    }

    var jornada_laboral_mes_inicial = (numero_dias * (puesto[0].jornada_laboral / 5.0));
    var jornada_mes_tipo = jornada_laboral_mes_inicial - (((jornada_laboral_mes_inicial - horas_ausencia[0].horas_neta) / (puesto[0].jornada_laboral / 5.0)) * indicador_descanso[0].valor)
    var jornada_laboral_mes = (numero_dias * (puesto[0].jornada_laboral / 5.0)) - (numero_dias * indicador_descanso[0].valor);
    var jornada_laboral_mes_neta = jornada_laboral_mes_inicial - horas_ausencia[0].horas_neta;
    var jornada_laboral_mes_neta_entrada = jornada_mes_tipo - horas_ausencia[0].horas_neta;

    return {jornada_mes_tipo: jornada_mes_tipo, jornada_laboral_mes_inicial: jornada_laboral_mes_inicial, jornada_laboral_mes: jornada_laboral_mes, jornada_laboral_mes_neta: jornada_laboral_mes_neta, jornada_laboral_mes_neta_entrada: jornada_laboral_mes_neta_entrada};   
}

const diasLaborablesMes = async(id_puesto, mes, anyo) =>  {
    const queryPuesto = `
            SELECT *
            FROM puestos_trabajo 
            WHERE id_puesto =  ${id_puesto}`
    const puesto = await getOneRecord(queryPuesto)

    const respuesta = await jornadaLaboralMensual(id_puesto, mes, anyo);
    return respuesta.jornada_laboral_mes_neta / (puesto[0].jornada_laboral / 5.0);
}

const diasMes = async(id_puesto, mes, anyo) =>  {

    const respuesta = await jornadaLaboralMensual(id_puesto, mes, anyo);
    return respuesta.jornada_laboral_mes_neta / respuesta.jornada_laboral_mes_inicial;
}

const diasMesEntrada = async(id_puesto, mes, anyo) =>  {

    const respuesta = await jornadaLaboralMensual(id_puesto, mes, anyo);
    return respuesta.jornada_laboral_mes_neta_entrada / respuesta.jornada_laboral_mes_inicial;
}

module.exports = {jornadaLaboralMensual, diasLaborablesMes, diasMes, diasMesEntrada}