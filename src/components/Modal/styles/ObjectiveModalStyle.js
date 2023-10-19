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
  titleContainer: {
    marginTop: '10px',
  },
  sectionContainer: {
    margin: '14px',
  },
  resourcesContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  resourcesItem: {
    textAlign: 'center',
  },
  resourcesTitle: {
    textTransform: 'Uppercase',
    fontSize: '14px',
    color: 'black',
  },
  selector: {
    margin: '24px 2.5px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  select: {
    width: '100%',
  },
  icon: {
    color: '#333333',
    margin: '10px auto 0',
    width: '20px',
    height: '20px',
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

  titleContainerAddress: {
    marginTop: '10px',
    textAlign: 'center',
    '& p': {
      fontWeight: '900',
    },
  },
  ...modalStyle(theme),
})

export default styles
