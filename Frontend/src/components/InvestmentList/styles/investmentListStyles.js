import modalStyle from 'assets/jss/material-ui-react/modalStyle'

const styles = (theme) => ({
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
  listContainer: {
    zIndex: '2',
    backgroundColor: '#eff2ef',
    margin: '0% auto',
    borderRadius: '10px',
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
