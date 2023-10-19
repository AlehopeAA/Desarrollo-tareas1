import { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import PerfectScrollbar from 'perfect-scrollbar'

let ps

// We've created this component so we can have a ref to the wrapper of the links that appears in our sidebar.
// This was necessary so that we could initialize PerfectScrollbar on the links.
// There might be something with the Hidden component from material-ui, and we didn't have access to
// the links, and couldn't initialize the plugin.
const SidebarWrapper = ({ className, user, headerLinks, links }) => {
  const sidebarWrapper = useRef()

  useEffect(() => {
    if (navigator.platform.indexOf('Win') > -1) {
      ps = new PerfectScrollbar(sidebarWrapper.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      })
    }
    return function cleanup() {
      if (navigator.platform.indexOf('Win') > -1) {
        ps.destroy()
      }
    }
  })

  return (
    <div className={className} ref={sidebarWrapper}>
      {user}
      {headerLinks}
      {links}
    </div>
  )
}

SidebarWrapper.propTypes = {
  className: PropTypes.string,
  user: PropTypes.object,
  headerLinks: PropTypes.object,
  links: PropTypes.object,
}

export default SidebarWrapper
