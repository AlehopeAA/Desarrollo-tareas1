import React from 'react'
import PropTypes from 'prop-types'
import { Grid, makeStyles } from '@material-ui/core'

const styles = {
  grid: {
    margin: '0 -15px',
    width: 'calc(100% + 30px)',
  },
}

const useStyles = makeStyles(styles)

const GridContainer = (props) => {
  const classes = useStyles()
  const { children, className, ...rest } = props
  return (
    <Grid container {...rest} className={classes.grid + ' ' + className}>
      {children}
    </Grid>
  )
}

GridContainer.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
}

export default GridContainer
