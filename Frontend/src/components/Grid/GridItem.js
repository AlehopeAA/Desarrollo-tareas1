import PropTypes from 'prop-types'
import { Grid, makeStyles } from '@material-ui/core'

const styles = {
  grid: {
    padding: '0 15px !important',
  },
}

const useStyles = makeStyles(styles)

const GridItem = ({ children, className, ...rest }) => {
  const classes = useStyles()

  return (
    <Grid item {...rest} className={classes.grid + ' ' + className}>
      {children}
    </Grid>
  )
}

GridItem.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
}

export default GridItem
