'use strict'

const db = require('../config/mysql/db')
const jornadaUtilidades = require('./jornadaUtilidades')
const { getAllRecords, registerRecord } = require('./queryPromises')

const calcularResponsabilidad = async (id_puesto, id_tarea, mes, anyo) => {
    const queryCompartidas = `
            SELECT compartidas.*
            FROM compartidas 
            INNER JOIN puestos_trabajo ON compartidas.id_puesto = puestos_trabajo.id_puesto 
            WHERE compartidas.id_tarea = ${id_tarea} AND puestos_trabajo.activo = "SI"`
    const compartida = await getAllRecords(queryCompartidas)

    if(compartida) {
        //Clasificamos los resultados en aquellos que tienen porcentaje y aquellos que no.
        var compartida_sin_porcentaje = [];
        var compartida_con_porcentaje = [];
        for (let i = 0; i < compartida.length; i++) {
            if (compartida[i].porcentaje_responsabilidad) {
                compartida_con_porcentaje.push(compartida[i]);
            }
            else {
                compartida_sin_porcentaje.push(compartida[i]);
            }    
        }

        if(compartida_sin_porcentaje) {
            //Si hay sin porcentaje.
            var porcentaje_sin_usar = 100.0;
            for(let i = 0; i < compartida_con_porcentaje.length; i++) {
                porcentaje_sin_usar = porcentaje_sin_usar - compartida_con_porcentaje[i].porcentaje_responsabilidad;
            }

            var porcentaje_individual = porcentaje_sin_usar / compartida_sin_porcentaje.length;
            for (let i = 0; i < compartida_sin_porcentaje.length; i++) {
                compartida_sin_porcentaje[i].porcentaje_responsabilidad = porcentaje_individual;

                const updateCompartidas = `
                        UPDATE compartidas
                        SET porcentaje_responsabilidad = ${porcentaje_individual} 
                        WHERE id_compartida = ${compartida_sin_porcentaje[i].id_compartida}`
                await registerRecord(updateCompartidas) 
            }
        }

        //Aqui ya tenemos en el array de compartidas, toda la informacion de porcentajes.     
        var porcentajes_total_ajustado = 0.0;
        for(let i = 0; i < compartida_con_porcentaje.length; i++) {
            let jornada_laboral = await jornadaUtilidades.jornadaLaboralMensual(compartida_con_porcentaje[i].id_puesto, mes, anyo);
            compartida_con_porcentaje[i]['porcentaje_ajustado'] = (compartida_con_porcentaje[i].porcentaje_responsabilidad * jornada_laboral.jornada_laboral_mes_neta) / jornada_laboral.jornada_laboral_mes_neta;
            porcentajes_total_ajustado = porcentajes_total_ajustado + compartida_con_porcentaje[i]['porcentaje_ajustado'];
        }

        for(let i = 0; i < compartida_sin_porcentaje.length; i++) {
            let jornada_laboral = await jornadaUtilidades.jornadaLaboralMensual(compartida_sin_porcentaje[i].id_puesto, mes, anyo);
            compartida_sin_porcentaje[i]['porcentaje_ajustado'] = (compartida_sin_porcentaje[i].porcentaje_responsabilidad * jornada_laboral.jornada_laboral_mes_neta) / jornada_laboral.jornada_laboral_mes_neta;
            porcentajes_total_ajustado = porcentajes_total_ajustado + compartida_sin_porcentaje[i]['porcentaje_ajustado'];
        }

        // 23-03-2022 se manda el % sin ajustes como se indica en el documenro de requisitos
        for(let i = 0; i < compartida_con_porcentaje.length; i++) {
            if(compartida_con_porcentaje[i].id_puesto == id_puesto) {
                //return {resultado: (compartida_con_porcentaje[i].porcentaje_ajustado * 100) / porcentajes_total_ajustado}
                return {resultado: compartida_con_porcentaje[i].porcentaje_responsabilidad/100}
            }
        }
        for(let i = 0; i < compartida_sin_porcentaje.length; i++) {
            if(compartida_sin_porcentaje[i].id_puesto == id_puesto) {
                //return {resultado: (compartida_sin_porcentaje[i].porcentaje_ajustado * 100) / porcentajes_total_ajustado}
                return {resultado: compartida_sin_porcentaje[i].porcentaje_responsabilidad/100}
            }
        }
    }
}

module.exports = {calcularResponsabilidad}