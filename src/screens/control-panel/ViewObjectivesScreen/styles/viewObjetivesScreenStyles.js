import {
  cardTitle,
  primaryColor,
  primaryBoxShadow,
  dangerColor,
  whiteColor,
  blackColor,
  grayColor,
  hexToRgb,
} from 'assets/jss/material-ui-react'
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
  addPhotoRoot: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  danger: {
    color: dangerColor[0] + '!important',
  },
  confirmBtnCssClass: {
    backgroundColor: '#212121',
    color: 'white',
    padding: '10px',
    width: '5rem',
    borderRadius: '3px',
    '&:hover': {
      color: 'white',
    },
  },
  select: {
    '&:before': {
      borderBottom: '1px solid #d2d2d2',
    },
  },
  selectFormControl: {
    margin: '7px 0 17px 0 !important',
    '& > div': {
      '&:before': {
        borderBottomWidth: '1px !important',
        borderBottomColor: grayColor[4] + '!important',
      },
      '&:after': {
        borderBottomColor: primaryColor[0] + '!important',
      },
    },
  },
  selectLabel: {
    fontSize: '14px',
    top: '8px',
  },
  selectMenu: {
    '& > div > ul': {
      border: '0',
      padding: '5px 0',
      margin: '0',
      boxShadow: 'none',
      minWidth: '100%',
      borderRadius: '4px',
      boxSizing: 'border-box',
      display: 'block',
      fontSize: '14px',
      textAlign: 'left',
      listStyle: 'none',
      backgroundColor: whiteColor,
      backgroundClip: 'padding-box',
    },
    '& $selectPaper $selectMenuItemSelectedMultiple': {
      backgroundColor: 'inherit',
    },
    '& > div + div': {
      maxHeight: '266px !important',
    },
    '&:before': {
      borderBottom: '1px solid #d2d2d2',
    },
  },
  selectMenuItem: {
    fontSize: '13px',
    padding: '10px 20px',
    margin: '0 5px',
    borderRadius: '2px',
    transition: 'all 150ms linear',
    display: 'block',
    clear: 'both',
    fontWeight: '400',
    lineHeight: '2',
    whiteSpace: 'nowrap',
    color: grayColor[7],
    paddingRight: '30px',
    '&:hover': {
      backgroundColor: primaryColor[0],
      color: whiteColor,
      ...primaryBoxShadow,
    },
  },
  selectMenuItemSelected: {
    backgroundColor: primaryColor[0] + '!important',
    color: whiteColor,
  },
  selectMenuItemSelectedMultiple: {
    backgroundColor: 'transparent !important',
    '&:hover': {
      backgroundColor: primaryColor[0] + '!important',
      color: whiteColor,
      ...primaryBoxShadow,
      '&:after': {
        color: whiteColor,
      },
    },
    '&:after': {
      top: '16px',
      right: '12px',
      width: '12px',
      height: '5px',
      borderLeft: '2px solid currentColor',
      transform: 'rotate(-45deg)',
      opacity: '1',
      color: grayColor[2],
      position: 'absolute',
      content: "''",
      borderBottom: '2px solid currentColor',
      transition: 'opacity 90ms cubic-bezier(0,0,.2,.1)',
    },
  },
  selectPaper: {
    boxSizing: 'borderBox',
    borderRadius: '4px',
    padding: '0',
    minWidth: '100%',
    display: 'block',
    border: '0',
    boxShadow: '0 2px 5px 0 rgba(' + hexToRgb(blackColor) + ', 0.26)',
    backgroundClip: 'padding-box',
    margin: '2px 0 0',
    fontSize: '14px',
    textAlign: 'left',
    listStyle: 'none',
    backgroundColor: 'transparent',
    maxHeight: '266px',
  },
  selectMenuDiv: {
    border: '1px solid #ded7d7',
    borderRadius: '3px',
    boxShadow: '0 4px 20px 0 rgb(0 0 0 / 14%), 0 7px 10px -5px rgb(235 230 226 / 40%)',
    position: 'absolute',
    right: 15,
    left: 15,
    backgroundColor: '#fff',
    zIndex: 10,
    '& ul': {
      padding: 0,
    },
    '& ul li': {
      listStyle: 'none',
      padding: '5px 10px',
      cursor: 'pointer',
      '&:hover': {
        color: '#fff !important',
        backgroundColor: '#333',
      },
    },
  },
  fileBadge: {
    margin: '20px 0',
    width: '100%',
  },
  fileDiv: {
    textAlign: 'center',
    backgroundColor: '#b9b6b6',
    borderRadius: '5px',
    padding: '5px',
    width: '100%',
  },
  dateInput: {
    width: '100%',
    padding: '5px',
    marginTop: '5px',
    '& .MuiInput-underline:before': {
      borderBottom: '1px solid #d2d2d2',
    },
  },
}

export default validationFormsStyle
