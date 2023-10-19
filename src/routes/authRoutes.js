import LoginScreen from 'screens/platform-access/LoginScreen/LoginScreen'
import { brandName } from 'variables/general'

var authRoutes = [
  {
    path: '/login',
    name: brandName,
    mini: 'L',
    component: LoginScreen,
    layout: '/auth',
  },
]
export default authRoutes
