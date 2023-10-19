import { cardTitle, dangerColor, whiteColor, grayColor, blackColor, hexToRgb } from 'assets/jss/material-ui-react'
import customCheckboxRadioSwitch from 'assets/jss/material-ui-react/customCheckboxRadioSwitch.js'
import buttonStyle from 'assets/jss/material-ui-react/components/buttonStyle.js'

const validationFormsStyle = {
  ...customCheckboxRadioSwitch,
  ...buttonStyle,
  cardTitle: {
    ...cardTitle,
    color: whiteColor,
  },
  cardIconTitle: {
    ...cardTitle,
    marginTop: '15px',
    marginBottom: '0px',
  },
  formCategory: {
    marginBottom: '0',
    color: grayColor[0],
    fontSize: '14px',
    padding: '10px 0 10px',
  },
  center: {
    textAlign: 'center',
  },
  justifyContentCenter: {
    justifyContent: 'center',
  },
  informeButton: {
    float: 'right',
    marginTop: '20px',
    marginLeft: '10px',
  },
  informeResumenButton: {
    float: 'left',
    marginTop: '20px',
    marginLeft: '10px',
  },
  danger: {
    color: dangerColor[0] + '!important',
  },
  confirmBtnCssClass: {
    backgroundColor: '#3cba55',
    color: 'white',
    padding: '10px',
    width: '5rem',
    borderRadius: '3px',
    '&:hover': {
      color: 'white',
    },
  },
  label: {
    cursor: 'pointer',
    paddingLeft: '0',
    color: 'rgba(' + hexToRgb(blackColor) + ', 0.26)',
    fontSize: '14px',
    lineHeight: '1.428571429',
    fontWeight: '400',
    display: 'inline-flex',
  },
  select: {
    '&:before': {
      borderBottom: '1px solid #d2d2d2',
    },
  },
  informacion_evaluacion : {
    color: '#AAAAAA',
  },
  informacion_evaluacion_valor : {
    color: '#495057',
  },
  evaluacion_satisfactorio : {
    color: '#92D050',
    fontWeight: 'bold',
  },
  evaluacion_insatisfactorio : {
    color: '#FF0000',
    fontWeight: 'bold',
  },
  evaluacion_alto : {
    color: '#00B050',
    fontWeight: 'bold',
  },
  evaluacion_excelente : {
    color: '#00B0F0',
    fontWeight: 'bold',
  },
  evaluacion_na : {
    color: '#000000',
  },
  evaluacion_sindatos : {
    color: '#FF8000',
    fontWeight: 'bold',
  },
  calculo_valor: {
    border: '1px solid grey',
    cursor: 'help',
  },
  calculo_disable: {
    flex: '0 1 auto', 
    display:'inline-block',
    
  },
  calculo_enable: {
    flex: '0 1 auto', 
    display:'inline-block',
    fontWeight: 'bold',
  },
  calculo_condicion_seleccionada_arrow: {
      border: 'solid black',
      borderWidth: '0 3px 3px 0',
      display: 'inline-block',
      padding: '3px',
      transform: 'rotate(-45deg)',
      webkitTransform: 'rotate(-45deg)',
  },
  calculo_condicion_seleccionada: {
    backgroundColor: '#f7f7f7'
  }
}

export default validationFormsStyle
