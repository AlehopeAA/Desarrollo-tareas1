import 'react-app-polyfill/ie9'
import 'react-app-polyfill/ie11'
import 'react-app-polyfill/stable'
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import axios from 'axios'
import { Provider } from 'react-redux'
import store from 'redux/store'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import es from 'date-fns/locale/es'
import AuthLayout from 'layouts/Auth/Auth'
import AdminLayout from 'layouts/Admin/Admin'
import 'assets/scss/material-ui-react.scss?v=1.0.0'

axios.defaults.baseURL = process.env.REACT_APP_API

ReactDOM.render(
  <Provider store={store}>
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={es}>
      <BrowserRouter>
        <Switch>
          <Route path='/auth' component={AuthLayout} />
          <Route path='/admin' component={AdminLayout} />
          <Redirect from='/' to='/auth/login' />
        </Switch>
      </BrowserRouter>
    </MuiPickersUtilsProvider>
  </Provider>,
  document.getElementById('root')
)
