import { cardTitle, dangerColor, whiteColor, grayColor, blackColor, hexToRgb } from 'assets/jss/material-ui-react'
import customCheckboxRadioSwitch from 'assets/jss/material-ui-react/customCheckboxRadioSwitch.js'
import buttonStyle from 'assets/jss/material-ui-react/components/buttonStyle.js'

const validationFormsStyle = {
  ...customCheckboxRadioSwitch,
  ...buttonStyle,
  selectForm: {
    display: 'flex',
    flexDirection: 'row',
    height: '100%',
    alignItems: 'center',
  },
  select: {
    width: '100%',
    height: '44.5px',
  },
  selectInput: {
    marginLeft: '25px',
  },
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
  registerButton: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'center',
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
}

export default validationFormsStyle
