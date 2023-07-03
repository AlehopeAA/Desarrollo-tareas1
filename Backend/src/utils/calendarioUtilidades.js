'use strict'

const db = require('../config/mysql/db')
const { getAllRecords } = require('./queryPromises')


const numeroDiasMes = (mes, anyo) => {
    return new Date(anyo, mes, 0).getDate();
}

const diasFinSemanaMes = (mes, anyo) => {
    var saturdays = [];
    var sundays = [];

    if (mes == 1) {
        mes=12
        anyo=anyo-1
    } else {
        mes=mes-1
    }

    for (var i = 1; i <= numeroDiasMes(mes, anyo); i++) 
    {    
        var date = new Date(anyo, mes, i);

        if (date.getDay() == 6)
        {
            saturdays.push(date);
        } 
        else if (date.getDay() == 0)
        {
            sundays.push(date);    
        }
    }

    return {'sabados': saturdays, 'domingos': sundays};
}

const diasLaborablesMes = async(mes, anyo) => {
    const query_festivos = `
                SELECT * 
                FROM calendario_festivos
                WHERE 
                mes = ${mes} AND 
                anio = ${anyo}`;
    const festivos = await getAllRecords(query_festivos)
    
    const dias_weekend = diasFinSemanaMes(mes, anyo);
    return numeroDiasMes(mes, anyo) - (dias_weekend['sabados'].length + dias_weekend['domingos'].length) - festivos.length;
}

module.exports = {diasLaborablesMes, numeroDiasMes, diasFinSemanaMes}