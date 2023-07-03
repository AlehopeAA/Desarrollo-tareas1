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
import customCheckboxRadioSwitch from 'assets/jss/material-ui-react/customCheckboxRadioSwitch'
import buttonStyle from 'assets/jss/material-ui-react/components/buttonStyle'

const validationSelectStyle = {
  ...customCheckboxRadioSwitch,
  ...buttonStyle,
  select: {
    padding: '12px 0 2px',
    fontSize: '.75rem',
    fontWeight: '400',
    lineHeight: '1.42857',
    textDecoration: 'none',
    textTransform: 'uppercase',
    color: grayColor[2],
    letterSpacing: '0',
    '&:focus': {
      backgroundColor: 'transparent',
    },
    '&[aria-owns] + input + svg': {
      transform: 'rotate(180deg)',
    },
    '& + input + svg': {
      transition: 'all 300ms linear',
    },
    '&:before': {
      borderBottom: '1px solid #D2D2D2',
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
}

export default validationSelectStyle
