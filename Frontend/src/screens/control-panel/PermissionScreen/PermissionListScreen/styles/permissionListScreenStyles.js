import { cardTitle } from 'assets/jss/material-ui-react'
import modalStyle from 'assets/jss/material-ui-react/modalStyle'

const styles = (theme) => ({
  cardIconTitle: {
    ...cardTitle,
    marginTop: '15px',
    marginBottom: '0px',
    color: '#000 !important',
  },
  rootItem: {
    padding: '0 !important',
  },
  ...modalStyle(theme),
})

export default styles
