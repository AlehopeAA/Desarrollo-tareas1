import modalStyle from 'assets/jss/material-ui-react/modalStyle'
import { grayColor } from 'assets/jss/material-ui-react'

const styles = (theme) => ({
  infoRoot: {
    border: '1px solid #d4d3d3',
    borderRadius: '6px',
    padding: '15px 10px',
    margin: '0 0 20px',
    width: '100%',
    boxShadow: '0 1px 11px 0 rgb(0 0 0 / 14%)',
  },
  modalText: {
    textAlign: 'center',
  },
  stats: {
    color: grayColor[0],
    fontSize: '12px',
    lineHeight: '22px',
    display: 'inline-flex',
    '& svg': {
      position: 'relative',
      top: '4px',
      width: '16px',
      height: '16px',
      marginRight: '3px',
    },
    '& .fab,& .fas,& .far,& .fal,& .material-icons': {
      position: 'relative',
      top: '4px',
      fontSize: '16px',
      marginRight: '3px',
    },
  },
  icon: {
    color: '#333333',
    margin: '10px auto 0',
    width: '130px',
    height: '130px',
    border: '1px solid #E5E5E5',
    borderRadius: '50%',
    lineHeight: '174px',
    '& svg': {
      width: '55px',
      height: '55px',
    },
    '& .fab,& .fas,& .far,& .fal,& .material-icons': {
      width: '55px',
      fontSize: '55px',
    },
  },
  maxInvertibleNum: {
    fontWeight: '900',
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
  ...modalStyle(theme),
})

export default styles
