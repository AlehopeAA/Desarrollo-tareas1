import PropTypes from 'prop-types'
import cx from 'classnames'
import { List, makeStyles } from '@material-ui/core'
import { brandName } from 'variables/general'
import styles from './styles/footerStyle'

const useStyles = makeStyles(styles)

const Footer = ({ fluid, white }) => {
  const classes = useStyles()

  var container = cx({
    [classes.container]: !fluid,
    [classes.containerFluid]: fluid,
    [classes.whiteColor]: white,
  })
  var anchor =
    classes.a +
    cx({
      [' ' + classes.whiteColor]: white,
    })
  var block = cx({
    [classes.block]: true,
    [classes.whiteColor]: white,
  })
  return (
    <footer className={classes.footer}>
      <div className={container}>
        <div className={classes.left}>
          <List className={classes.list}>
            {/* <ListItem className={classes.inlineBlock}>
              <a href='/' className={block}>
                Home
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a href='/' className={block}>
                Company
              </a>
            </ListItem> */}
            {/* <ListItem className={classes.inlineBlock}>
              <a href='#portfolio' className={block}>
                Portfolio
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a href='#blog' className={block}>
                Blog
              </a>
            </ListItem> */}
          </List>
        </div>
        <p className={classes.right}>
          &copy; {1900 + new Date().getYear()}{' '}
          <a href='https://www.google.com' className={anchor} target='_blank'>
            {brandName}
          </a>
        </p>
      </div>
    </footer>
  )
}

Footer.propTypes = {
  fluid: PropTypes.bool,
  white: PropTypes.bool,
}

export default Footer
