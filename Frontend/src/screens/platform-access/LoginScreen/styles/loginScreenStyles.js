import { container, cardTitle, whiteColor, primaryCG, grayColor } from 'assets/jss/material-ui-react'

const styles = (theme) => ({
  container: {
    ...container,
    zIndex: '4',
    [theme.breakpoints.down('sm')]: {
      paddingBottom: '100px',
    },
  },
  cardRoot: {
    borderRadius: '2px',
    boxShadow: '0 4px 20px 0 rgb(0 0 0 / 14%), 0 7px 10px -5px rgb(51 102 153 / 40%)',
  },
  cardTitle: {
    ...cardTitle,
    color: primaryCG,
  },
  justifyContentCenter: {
    justifyContent: 'center !important',
  },
  customButtonClass: {
    '&,&:focus,&:hover': {
      color: whiteColor,
    },
    marginLeft: '5px',
    marginRight: '5px',
  },
  inputAdornment: {
    marginRight: '18px',
  },
  inputAdornmentIcon: {
    color: '#336699 !important',
  },
  cardHidden: {
    opacity: '0',
    transform: 'translate3d(0, -60px, 0)',
  },
  cardHeader: {
    marginBottom: '20px',
    padding: '23px !important',
    textAlign: 'center',
    borderRadius: '2px',
  },
  socialLine: {
    padding: '0.9375rem 0',
  },
  messageError: {
    textAlign: 'center',
    color: 'red',
    margin: '20px 0',
  },
})

export default styles
