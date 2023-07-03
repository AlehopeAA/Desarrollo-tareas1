'use strict'

const responsabilidadUtilidades = require('./responsabilidadUtilidades')
const { getOneRecord } = require('./queryPromises')

const calcularPorcentajeEntrada = async (id_puesto, id_tarea, mes, anyo, entrada_puesto) => {
    const queryTarea = `
            SELECT *
            FROM tareas 
            WHERE id_tarea = ${id_tarea}`
    const tareas = await getOneRecord(queryTarea)

    const queryEntrada = `
                SELECT *
                FROM entradas 
                WHERE id_tarea = ${id_tarea} AND 
                mes = ${mes} AND 
                anio = ${anyo}`
    const entradas = await getOneRecord(queryEntrada)


    if (tareas[0].compartida == 'NO') {
        //Es el caso uno.
        const resultado = (entrada_puesto * 100.0) / entradas[0].entrada;
        return Number(resultado.toFixed(2));
    }
    else {
        //Es el caso dos.
        const responsabilidad = await responsabilidadUtilidades.calcularResponsabilidad(id_puesto, id_tarea, mes, anyo)
        const resultado = (entrada_puesto * 100.0) / (responsabilidad.resultado * entradas[0].entrada);
        return Number(resultado.toFixed(2));
    }
}

module.exports = {calcularPorcentajeEntrada}