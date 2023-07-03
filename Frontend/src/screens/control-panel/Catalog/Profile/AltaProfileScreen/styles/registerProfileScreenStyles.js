import { grayColor } from 'assets/jss/material-ui-react'

const styles = {
  select: {
    width: '100%',
    fontSize: '.75rem',
    fontWeight: '400',
    lineHeight: '1.42857',
    textDecoration: 'none',
    color: grayColor[1],
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
      borderBottom: '1px solid #d2d2d2',
    },
  },
  selectLabel: {
    marginTop: '20px',
    fontSize: '14px',
    color: '#AAAAAA',
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
}

export default styles
