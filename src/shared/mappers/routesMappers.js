'use strict'

import { useLocation } from 'react-router-dom'

// this verifies if any of the collapses should be default opened on a rerender of this component
export const getCollapseInitialState = (routes) => {
  for (let i = 0; i < routes.length; i++) {
    if (routes[i].collapse && getCollapseInitialState(routes[i].views)) {
      return true
    } else if (location.pathname === routes[i].layout + routes[i].path) {
      return true
    }
  }
  return false
}

// this creates the intial state of this component based on the collapse routes
// that it gets through routes
export const getCollapseStates = (routes) => {
  let initialState = {}
  routes.map((prop) => {
    if (prop.collapse) {
      initialState = {
        [prop.state]: getCollapseInitialState(prop.views),
        ...getCollapseStates(prop.views),
        ...initialState,
      }
    }
    return null
  })
  return initialState
}

// verifies if routeName is the one active (in browser input)
export const activeRoute = (routeName) => {
  return useLocation().pathname === routeName ? 'active' : ''
}
