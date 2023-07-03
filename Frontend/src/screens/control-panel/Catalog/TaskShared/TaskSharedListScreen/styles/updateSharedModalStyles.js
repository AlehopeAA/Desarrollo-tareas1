import modalStyle from 'assets/jss/material-ui-react/modalStyle'
import { grayColor } from 'assets/jss/material-ui-react'

const styles = (theme) => ({
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
  infoRoot: {
    border: '1px solid #d4d3d3',
    borderRadius: '6px',
    padding: '15px 10px',
    margin: '0 0 20px',
    width: '100%',
    boxShadow: '0 1px 11px 0 rgb(0 0 0 / 14%)',
  },
  filesDiv: {
    marginBottom: '20px',
  },
  imagesDiv: {
    marginBottom: '10px',
    '& img': {
      borderRadius: '6px',
      marginBottom: '10px',
      boxShadow: '0 1px 4px 0 rgb(0 0 0 / 14%)',
    },
  },
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
  ...modalStyle(theme),
})

export default styles
