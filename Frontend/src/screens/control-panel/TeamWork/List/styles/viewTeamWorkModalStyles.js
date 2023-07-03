import { cardTitle } from 'assets/jss/material-ui-react'
import modalStyle from 'assets/jss/material-ui-react/modalStyle'

const styles = (theme) => ({
  cardIconTitle: {
    ...cardTitle,
    marginTop: '15px',
    marginBottom: '0px',
  },
  rootItem: {
    padding: '0 !important',
  },
  boxContainerLittles: {
    width: '100%',
    height: '170px',
    maxHeight: '200px',
    overflowY: 'auto',
    background: '#F9F9F9',
    borderRadius: '10px',
    padding: '5px',
  },
  boxContainerbigs: {
    width: '100%',
    height: '270px',
    maxHeight: '310px',
    overflowY: 'auto',
    background: '#F9F9F9',
    borderRadius: '10px',
    padding: '5px',
  },
  ...modalStyle(theme),
})

export default styles
