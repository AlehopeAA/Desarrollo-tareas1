import { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useLocation, useHistory } from 'react-router-dom'
import axios from 'axios'
import cx from 'classnames'
import {
  BusinessCenter,
  Dashboard,
  Class,
  CollectionsBookmark,
  FactCheck,
  HowToReg,
  LibraryAddCheck,
  AccountBox,
  Assignment,
  FormatListBulleted,
  ViewList,
  Construction,
  InsertInvitation,
  Group,
  Groups,
  LocalLibrary,
  Task,
  MilitaryTech,
  PersonSearch,
  MiscellaneousServices,
  Apps,
  Lock,
  Article,
  PostAdd,
} from '@mui/icons-material'
import { Drawer, List, ListItem, ListItemText, Hidden, Collapse, Icon, Tooltip, makeStyles } from '@material-ui/core'
import { ExitToApp } from '@material-ui/icons'
import GridContainer from 'components/Grid/GridContainer'
import GridItem from 'components/Grid/GridItem'
import CustomModal from 'components/Modal/CustomModal'
import SidebarWrapper from './components/SidebarWrapper'
import { useWindowsSize } from 'shared/customHooks/useWindowsSize'
import logoMin from 'assets/img/apple-icon.png'
import { getCollapseStates, getCollapseInitialState, ActiveRoute } from '../../shared/mappers/routesMappers'
import roles from 'config/roles/roles'
import { logout } from 'redux/actions/userActions'
import sidebarStyle from './styles/sidebarStyle'

const useStyles = makeStyles(sidebarStyle)

const Sidebar = ({ color, logo, routes, bgColor, open, handleDrawerToggle, miniActive }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation()
  const classes = useStyles()
  const windowsSize = useWindowsSize()
  const mainPanel = useRef()

  const [openAvatar, setOpenAvatar] = useState(false)
  const [state, setState] = useState({})
  const [openLogoutAlert, setOpenLogoutAlert] = useState(false)


  const [validationCollapse, setValidationCollapse] = useState(false)
  const [reportCollapse, setReportCollapse] = useState(false)
  const [activityCollapse, setActivityCollapse] = useState(false)
  const [teamWorsCollapse, setTeamWorsCollapse] = useState(false)
  const [tasksCollapse, setTaskCollapse] = useState(false)
  const [sharedTasksCollapse, setSharedTasksCollapse] = useState(false)
  const [acumulativeTasksCollapse, setAcumulativeTasksCollapse] = useState(false)
  const [absencesTasksCollapse, setAbsencesTasksCollapse] = useState(false)
  const [generalTasksCollapse, setGeneralTasksCollapse] = useState(false)
  const [specificTasksCollapse, setSpecificTasksCollapse] = useState(false)
  const [ordExtTasksCollapse, setOrdExtTasksCollapse] = useState(false)
  const [entriesCollapse, setEntriesCollapse] = useState(false)
  const [dificultiesCollapse, setDificultiesCollapse] = useState(false)
  const [objetivesCollapse, setObjetivesCollapse] = useState(false)
  const [absencesObjetivesCollapse, setAbsencesObjetivesCollapse] = useState(false)
  const [generalObjetivesCollapse, setGeneralObjetivesCollapse] = useState(false)
  const [specificObjetivesCollapse, setSpecificObjetivesCollapse] = useState(false)
  const [ordExtObjetivesCollapse, setOrdExtObjetivesCollapse] = useState(false)
  const [catalogCollapse, setCatalogCollapse] = useState(false)
  const [profileCollapse, setProfileCollapse] = useState(false)
  const [permissionManagerCollapse, setPermissionManagerCollapse] = useState(false)
  const [ticketManagerCollapse, setTicketManagerCollapse] = useState(false)
  const [dificultyManagerCollapse, setDificultyManagerCollapse] = useState(false)
  const [departamentCollapse, setDepartamentCollapse] = useState(false)
  const [roleCollapse, setRoleCollapse] = useState(false)
  const [subdirectorateCollapse, setSubdirectorateCollapse] = useState(false)
  const [serviceCollapse, setServiceCollapse] = useState(false)  
  const [unitCollapse, setUnitCollapse] = useState(false)
  const [confCollapse, setConfCollapse] = useState(false)
  const [festivosCollapse, setFestivosCollapse] = useState(false)

  const { userInfo } = useSelector((state) => state.userLogin)

  const adminPermission = userInfo?.permiso.includes(roles.ADMIN_ROLE) ? true : false
  const profileManagerPermission = userInfo?.permiso.includes(roles.GESTOR_DE_PERFILES_ROLE) ? true : false
  const validatorPermission = userInfo?.permiso.includes(roles.VALIDADOR_ROLE) ? true : false
  const responsiblePermission = userInfo?.permiso.includes(roles.RESPONSABLE_ROLE) ? true : false
  const dataManagerPermission = userInfo?.permiso.includes(roles.GESTOR_DE_DATOS_ROLE) ? true : false
  const userPermission = userInfo?.permiso.includes(roles.USUARIO_ROLE)

  const isAdminOrProfileManager = adminPermission || profileManagerPermission
  const isValidatorOrResponsible = validatorPermission || responsiblePermission
  const teamWorkPermissions = isAdminOrProfileManager || isValidatorOrResponsible
  const catalogPermissions = profileManagerPermission || adminPermission

  useEffect(() => {
    if (!userInfo) {
      history.push('/')
    }
  }, [userInfo])
  useEffect(() => {
    // An object with all collapse state e.g. { tasksCollapse: false, activities: true }
    setState(getCollapseStates(routes))
  }, [])
  useEffect(() => {
    if (windowsSize.width < 960 && open) {
      handleDrawerToggle(false)
    }
  }, [location.pathname])

  // this function creates the links and collapses that appear in the sidebar (left menu)
  const createLinks = (routes) => {
    return routes.map((prop, key) => {
      if (prop.redirect) {
        return null
      }
      if (prop.collapse) {
        var st = {}
        st[prop['state']] = !state[prop.state]
        const navLinkClasses =
          classes.itemLink + ' ' + cx({ [' ' + classes.collapseActive]: getCollapseInitialState(prop.views) })
        const itemText = classes.itemText + ' ' + cx({ [classes.itemTextMini]: miniActive })
        const collapseItemText = classes.collapseItemText + ' ' + cx({ [classes.collapseItemTextMini]: miniActive })

        return (
          <ListItem
            key={key}
            className={cx(
              { [classes.item]: prop.icon !== undefined },
              { [classes.collapseItem]: prop.icon === undefined }
            )}
          >
            <Tooltip title={prop.name} disableHoverListener={!miniActive}>
              <NavLink
                to={'#'}
                className={navLinkClasses}
                onClick={(e) => {
                  e.preventDefault()
                  setState({ ...state, ...st })
                }}
              >
                {prop.icon !== undefined ? (
                  typeof prop.icon === 'string' ? (
                    <Icon className={classes.itemIcon}>{prop.icon}</Icon>
                  ) : (
                    <prop.icon className={classes.itemIcon} />
                  )
                ) : (
                  <span className={classes.collapseItemMini}>{prop.mini}</span>
                )}
                <ListItemText
                  primary={prop.name}
                  secondary={<b className={classes.caret + ' ' + (state[prop.state] ? classes.caretActive : '')} />}
                  disableTypography={true}
                  className={cx(
                    { [itemText]: prop.icon !== undefined },
                    { [collapseItemText]: prop.icon === undefined }
                  )}
                />
              </NavLink>
            </Tooltip>
            <Collapse in={state[prop.state]} unmountOnExit>
              <List className={classes.list + ' ' + classes.collapseList}>{createLinks(prop.views)}</List>
            </Collapse>
          </ListItem>
        )
      }
      const innerNavLinkClasses =
        classes.collapseItemLink + ' ' + cx({ [' ' + classes[color]]: ActiveRoute(prop.layout + prop.path) })
      const navLinkClasses =
        classes.itemLink + ' ' + cx({ [' ' + classes[color]]: ActiveRoute(prop.layout + prop.path) })
      const itemText = classes.itemText + ' ' + cx({ [classes.itemTextMini]: miniActive })
      const collapseItemText = classes.collapseItemText + ' ' + cx({ [classes.collapseItemTextMini]: miniActive })

      return (
        <ListItem
          key={key}
          className={cx(
            { [classes.item]: prop.icon !== undefined },
            { [classes.collapseItem]: prop.icon === undefined }
          )}
        >
          <Tooltip title={prop.name} disableHoverListener={!miniActive}>
            <NavLink
              to={prop.layout + prop.path}
              className={cx(
                { [navLinkClasses]: prop.icon !== undefined },
                { [innerNavLinkClasses]: prop.icon === undefined }
              )}
            >
              {prop.icon !== undefined ? (
                typeof prop.icon === 'string' ? (
                  <Icon className={classes.itemIcon}>{prop.icon}</Icon>
                ) : (
                  <prop.icon className={classes.itemIcon} />
                )
              ) : (
                <span className={classes.collapseItemMini}>{prop.mini}</span>
              )}
              <ListItemText
                primary={prop.name}
                disableTypography={true}
                className={cx({ [itemText]: prop.icon !== undefined }, { [collapseItemText]: prop.icon === undefined })}
              />
            </NavLink>
          </Tooltip>
        </ListItem>
      )
    })
  }

  const itemText = classes.itemText + ' ' + cx({ [classes.itemTextMini]: miniActive })
  const collapseItemText = classes.collapseItemText + ' ' + cx({ [classes.collapseItemTextMini]: miniActive })
  const userWrapperClass = classes.user + ' ' + cx({ [classes.whiteAfter]: bgColor === 'white' })
  const photo = classes.photo + ' ' + classes.roundPhoto

  let user = (
    <div className={userWrapperClass}>
      <div className={photo}>
        <img
          src={`${axios.defaults.baseURL}/public/assets/img/avatars/avatar.jpg`}
          className={classes.avatarImg}
          alt={userInfo?.nombre}
        />
      </div>
      <List className={classes.list}>
        <ListItem className={classes.item + ' ' + classes.userItem}>
          <NavLink to={'/admin/user-page'} className={classes.itemLink + ' ' + classes.userCollapseButton}>
            <ListItemText
              primary={`${userInfo?.nombre} ${userInfo?.apellido1} ${userInfo?.apellido2}`}
              disableTypography={true}
              className={itemText + ' ' + classes.userItemText}
            />
          </NavLink>
        </ListItem>
      </List>
    </div>
  )

  let links = (
    <List className={classes.list}>
      {(validatorPermission || responsiblePermission) && (
        <ListItem className={cx({ [classes.item]: true }, { [classes.collapseItem]: false })}>
          <Tooltip title='CUADRO DE MANDOS' disableHoverListener={!miniActive}>
            <NavLink to={'/admin/dashboard'} className={`${classes.itemLink}` + ' ' + classes.collapseItemLink}>
              <span className={classes.collapseItemMini}>
                <Dashboard />
              </span>
              <ListItemText
                primary='CUADRO DE MANDOS'
                disableTypography={true}
                className={cx({ [itemText]: true }, { [collapseItemText]: false })}
              />
            </NavLink>
          </Tooltip>
        </ListItem>
      )}

      <ListItem className={cx({ [classes.item]: true }, { [classes.collapseItem]: false })}>
        <Tooltip title='MI PERFIL' disableHoverListener={!miniActive}>
          <NavLink to={'/admin/user-page'} className={`${classes.itemLink}` + ' ' + classes.collapseItemLink}>
            <span className={classes.collapseItemMini}>
              <AccountBox />
            </span>
            <ListItemText
              primary='MI PERFIL'
              disableTypography={true}
              className={cx({ [itemText]: true }, { [collapseItemText]: false })}
            />
          </NavLink>
        </Tooltip>
      </ListItem>

      <ListItem className={cx({ [classes.item]: false }, { [classes.collapseItem]: true })}>
        <Tooltip title='ACTIVIDADES' disableHoverListener={!miniActive}>
          <NavLink
            to='#!'
            onClick={() => setActivityCollapse(!activityCollapse)}
            className={`${classes.itemLink}` + ' ' + classes.collapseItemLink}
          >
            <span className={classes.collapseItemMini}>
              <Assignment />
            </span>
            <ListItemText
              primary='ACTIVIDADES'
              secondary={<b className={classes.caret + ' ' + (activityCollapse ? classes.caretActive : '')} />}
              disableTypography={true}
              className={cx({ [itemText]: false }, { [collapseItemText]: true })}
            />
          </NavLink>
        </Tooltip>
        <Collapse in={activityCollapse} unmountOnExit>
          <List className={classes.list + ' ' + classes.collapseList}>
            <ListItem className={cx({ [classes.item]: false }, { [classes.collapseItem]: true })}>
              <Tooltip title='MIS ACTIVIDADES' disableHoverListener={!miniActive}>
                <NavLink to={'/admin/activity-list'} className={`${classes.itemLink}` + ' ' + classes.collapseItemLink}>
                  <span className={classes.collapseItemMini}>
                    <FormatListBulleted />
                  </span>
                  <ListItemText
                    primary='MIS ACTIVIDADES'
                    disableTypography={true}
                    className={cx({ [itemText]: false }, { [collapseItemText]: true })}
                  />
                </NavLink>
              </Tooltip>
            </ListItem>
            
            {(validatorPermission || responsiblePermission || profileManagerPermission) && (
              <ListItem className={cx({ [classes.item]: false }, { [classes.collapseItem]: true })}>
                <Tooltip title='ACTIVIDADES EQUIPO' disableHoverListener={!miniActive}>
                  <NavLink to={'/admin/activity-equipo-list'} className={`${classes.itemLink}` + ' ' + classes.collapseItemLink}>
                    <span className={classes.collapseItemMini}>
                      <ViewList />
                    </span>
                    <ListItemText
                      primary='ACTIVIDADES EQUIPO'
                      disableTypography={true}
                      className={cx({ [itemText]: false }, { [collapseItemText]: true })}
                    />
                  </NavLink>
                </Tooltip>
              </ListItem>
            )}
            <ListItem className={cx({ [classes.item]: false }, { [classes.collapseItem]: true })}>
              <Tooltip title='ALTA DE ACTIVIDADES' disableHoverListener={!miniActive}>
                <NavLink to={'/admin/alta-list'} className={`${classes.itemLink}` + ' ' + classes.collapseItemLink}>
                  <span className={classes.collapseItemMini}>
                    <PostAdd />
                  </span>
                  <ListItemText
                    primary='ALTA DE ACTIVIDADES'
                    disableTypography={true}
                    className={cx({ [itemText]: false }, { [collapseItemText]: true })}
                  />
                </NavLink>
              </Tooltip>
            </ListItem>
          </List>
        </Collapse>
      </ListItem>
      {teamWorkPermissions && (
        <ListItem className={cx({ [classes.item]: false }, { [classes.collapseItem]: true })}>
          <Tooltip title='EQUIPOS DE TRABAJO' disableHoverListener={!miniActive}>
            <NavLink
              to='#!'
              onClick={() => setTeamWorsCollapse(!teamWorsCollapse)}
              className={`${classes.itemLink}` + ' ' + classes.collapseItemLink}
            >
              <span className={classes.collapseItemMini}>
                <Groups />
              </span>
              <ListItemText
                primary='EQUIPOS DE TRABAJO'
                secondary={<b className={classes.caret + ' ' + (teamWorsCollapse ? classes.caretActive : '')} />}
                disableTypography={true}
                className={cx({ [itemText]: false }, { [collapseItemText]: true })}
              />
            </NavLink>
          </Tooltip>
          <Collapse in={teamWorsCollapse} unmountOnExit>
            <List className={classes.list + ' ' + classes.collapseList}>
              <ListItem className={cx({ [classes.item]: false }, { [classes.collapseItem]: true })}>
                <Tooltip title='LISTADO EQUIPO DE TRABAJO' disableHoverListener={!miniActive}>
                  <NavLink
                    to={'/admin/teamwork-list'}
                    className={`${classes.itemLink}` + ' ' + classes.collapseItemLink}
                  >
                    <span className={classes.collapseItemMini}>
                      <FormatListBulleted />
                    </span>
                    <ListItemText
                      primary='LISTADO EQUIPO DE TRABAJO'
                      disableTypography={true}
                      className={cx({ [itemText]: false }, { [collapseItemText]: true })}
                    />
                  </NavLink>
                </Tooltip>
              </ListItem>
              {profileManagerPermission && (
                <ListItem className={cx({ [classes.item]: false }, { [classes.collapseItem]: true })}>
                  <Tooltip title='ASIGNAR RESPONSABLE' disableHoverListener={!miniActive}>
                    <NavLink
                      to={'/admin/teamwork-asign-responsable'}
                      className={`${classes.itemLink}` + ' ' + classes.collapseItemLink}
                    >
                      <span className={classes.collapseItemMini}>
                        <PostAdd />
                      </span>
                      <ListItemText
                        primary='ASIGNAR RESPONSABLE'
                        disableTypography={true}
                        className={cx({ [itemText]: false }, { [collapseItemText]: true })}
                      />
                    </NavLink>
                  </Tooltip>
                </ListItem>
              )}
              {profileManagerPermission && (
                <ListItem className={cx({ [classes.item]: false }, { [classes.collapseItem]: true })}>
                  <Tooltip title='ASIGNAR VALIDADOR' disableHoverListener={!miniActive}>
                    <NavLink
                      to={'/admin/teamwork-asign-validador'}
                      className={`${classes.itemLink}` + ' ' + classes.collapseItemLink}
                    >
                      <span className={classes.collapseItemMini}>
                        <PostAdd />
                      </span>
                      <ListItemText
                        primary='ASIGNAR VALIDADOR'
                        disableTypography={true}
                        className={cx({ [itemText]: false }, { [collapseItemText]: true })}
                      />
                    </NavLink>
                  </Tooltip>
                </ListItem>
              )}
              {isAdminOrProfileManager && (
                <ListItem className={cx({ [classes.item]: false }, { [classes.collapseItem]: true })}>
                  <Tooltip title='ALTA DE PUESTO DE TRABAJO' disableHoverListener={!miniActive}>
                    <NavLink
                      to={'/admin/users-register'}
                      className={`${classes.itemLink}` + ' ' + classes.collapseItemLink}
                    >
                      <span className={classes.collapseItemMini}>
                        <PostAdd />
                      </span>
                      <ListItemText
                        primary='ALTA DE PUESTO DE TRABAJO'
                        disableTypography={true}
                        className={cx({ [itemText]: false }, { [collapseItemText]: true })}
                      />
                    </NavLink>
                  </Tooltip>
                </ListItem>
              )}
            </List>
          </Collapse>
        </ListItem>
      )}

      {isValidatorOrResponsible && (
        <ListItem className={cx({ [classes.item]: false }, { [classes.collapseItem]: true })}>
          <Tooltip title='VALIDACIÓN' disableHoverListener={!miniActive}>
            <NavLink
              to='#!'
              onClick={() => setValidationCollapse(!validationCollapse)}
              className={`${classes.itemLink}` + ' ' + classes.collapseItemLink}
            >
              <span className={classes.collapseItemMini}>
                <FactCheck />
              </span>
              <ListItemText
                primary='VALIDACIÓN'
                secondary={<b className={classes.caret + ' ' + (validationCollapse ? classes.caretActive : '')} />}
                disableTypography={true}
                className={cx({ [itemText]: false }, { [collapseItemText]: true })}
              />
            </NavLink>
          </Tooltip>
          <Collapse in={validationCollapse} unmountOnExit>
            <List className={classes.list + ' ' + classes.collapseList}>
              {responsiblePermission && ( 
                <ListItem className={cx({ [classes.item]: false }, { [classes.collapseItem]: true })}>
                  <Tooltip title='SUPERVISIÓN' disableHoverListener={!miniActive}>
                    <NavLink
                      to={'/admin/validacion-supervision'}
                      className={`${classes.itemLink}` + ' ' + classes.collapseItemLink}
                    >
                      <span className={classes.collapseItemMini}>
                        <HowToReg />
                      </span>
                      <ListItemText
                        primary='SUPERVISIÓN'
                        disableTypography={true}
                        className={cx({ [itemText]: false }, { [collapseItemText]: true })}
                      />
                    </NavLink>
                  </Tooltip>
                </ListItem>
              )}
              {validatorPermission && ( 
                <ListItem className={cx({ [classes.item]: false }, { [classes.collapseItem]: true })}>
                  <Tooltip title='VALIDACIÓN' disableHoverListener={!miniActive}>
                    <NavLink
                      to={'/admin/validacion-validador'}
                      className={`${classes.itemLink}` + ' ' + classes.collapseItemLink}
                    >
                      <span className={classes.collapseItemMini}>
                        <LibraryAddCheck />
                      </span>
                      <ListItemText
                        primary='VALIDACIÓN'
                        disableTypography={true}
                        className={cx({ [itemText]: false }, { [collapseItemText]: true })}
                      />
                    </NavLink>
                  </Tooltip>
                </ListItem>
              )}
            </List>
          </Collapse>
        </ListItem>
      )}

      {isValidatorOrResponsible && (
        <ListItem className={cx({ [classes.item]: false }, { [classes.collapseItem]: true })}>
          <Tooltip title='INFORMES' disableHoverListener={!miniActive}>
            <NavLink
              to='#!'
              onClick={() => setReportCollapse(!reportCollapse)}
              className={`${classes.itemLink}` + ' ' + classes.collapseItemLink}
            >
              <span className={classes.collapseItemMini}>
                <BusinessCenter />
              </span>
              <ListItemText
                primary='INFORMES'
                secondary={<b className={classes.caret + ' ' + (reportCollapse ? classes.caretActive : '')} />}
                disableTypography={true}
                className={cx({ [itemText]: false }, { [collapseItemText]: true })}
              />
            </NavLink>
          </Tooltip>
          <Collapse in={reportCollapse} unmountOnExit>
            <List className={classes.list + ' ' + classes.collapseList}>
              {isValidatorOrResponsible && ( 
                <ListItem className={cx({ [classes.item]: false }, { [classes.collapseItem]: true })}>
                  <Tooltip title='INFORME INDIVIDUAL' disableHoverListener={!miniActive}>
                    <NavLink
                      to={'/admin/informe-individual'}
                      className={`${classes.itemLink}` + ' ' + classes.collapseItemLink}
                    >
                      <span className={classes.collapseItemMini}>
                        <Class />
                      </span>
                      <ListItemText
                        primary='INFORME INDIVIDUAL'
                        disableTypography={true}
                        className={cx({ [itemText]: false }, { [collapseItemText]: true })}
                      />
                    </NavLink>
                  </Tooltip>
                </ListItem>
              )}
              {isValidatorOrResponsible && ( 
                <ListItem className={cx({ [classes.item]: false }, { [classes.collapseItem]: true })}>
                  <Tooltip title='INFORME AGREGADO' disableHoverListener={!miniActive}>
                    <NavLink
                      to={'/admin/informe-agregado'}
                      className={`${classes.itemLink}` + ' ' + classes.collapseItemLink}
                    >
                      <span className={classes.collapseItemMini}>
                        <CollectionsBookmark />
                      </span>
                      <ListItemText
                        primary='INFORME AGREGADO'
                        disableTypography={true}
                        className={cx({ [itemText]: false }, { [collapseItemText]: true })}
                      />
                    </NavLink>
                  </Tooltip>
                </ListItem>
              )}
            </List>
          </Collapse>
        </ListItem>
      )}

      {isAdminOrProfileManager && (
        <ListItem className={cx({ [classes.item]: false }, { [classes.collapseItem]: true })}>
          <Tooltip title='TAREAS' disableHoverListener={!miniActive}>
            <NavLink
              to='#!'
              onClick={() => setTaskCollapse(!tasksCollapse)}
              className={`${classes.itemLink}` + ' ' + classes.collapseItemLink}
            >
              <span className={classes.collapseItemMini}>
                <Task />
              </span>
              <ListItemText
                primary='TAREAS'
                secondary={<b className={classes.caret + ' ' + (tasksCollapse ? classes.caretActive : '')} />}
                disableTypography={true}
                className={cx({ [itemText]: false }, { [collapseItemText]: true })}
              />
            </NavLink>
          </Tooltip>
          <Collapse in={tasksCollapse} unmountOnExit>            
            {profileManagerPermission && (
              <List className={classes.list + ' ' + classes.collapseList}>
                <ListItem className={cx({ [classes.item]: false }, { [classes.collapseItem]: true })}>
                  <Tooltip title='TAREAS DE PERFIL' disableHoverListener={!miniActive}>
                    <NavLink
                      to='#!'
                      onClick={() => setOrdExtTasksCollapse(!ordExtTasksCollapse)}
                      className={`${classes.itemLink}` + ' ' + classes.collapseItemLink}
                    >
                      <span className={classes.collapseItemMini}>
                        <Task />
                      </span>
                      <ListItemText
                        primary='TAREAS DE PERFIL'
                        secondary={
                          <b className={classes.caret + ' ' + (ordExtTasksCollapse ? classes.caretActive : '')} />
                        }
                        disableTypography={true}
                        className={cx({ [itemText]: false }, { [collapseItemText]: true })}
                      />
                    </NavLink>
                  </Tooltip>
                  <Collapse in={ordExtTasksCollapse} unmountOnExit>
                    <List className={classes.list + ' ' + classes.collapseList}>
                      <ListItem className={cx({ [classes.item]: true }, { [classes.collapseItem]: true })}>
                        <Tooltip title='LISTADO TAREAS DE PERFIL' disableHoverListener={!miniActive}>
                          <NavLink
                            to={'/admin/tasks-ord-ext-list'}
                            className={`${classes.itemLink}` + ' ' + classes.collapseItemLink}
                          >
                            <span className={classes.collapseItemMini}>
                              <FormatListBulleted />
                            </span>
                            <ListItemText
                              primary='LISTADO TAREAS DE PERFIL'
                              disableTypography={true}
                              className={cx({ [itemText]: true }, { [collapseItemText]: false })}
                            />
                          </NavLink>
                        </Tooltip>
                      </ListItem>
                      <ListItem className={cx({ [classes.item]: true }, { [classes.collapseItem]: true })}>
                        <Tooltip title='ALTA TAREAS DE PERFIL' disableHoverListener={!miniActive}>
                          <NavLink
                            to={'/admin/tasks-ord-ext-register'}
                            className={`${classes.itemLink}` + ' ' + classes.collapseItemLink}
                          >
                            <span className={classes.collapseItemMini}>
                              <PostAdd />
                            </span>
                            <ListItemText
                              primary='ALTA TAREAS DE PERFIL'
                              disableTypography={true}
                              className={cx({ [itemText]: true }, { [collapseItemText]: false })}
                            />
                          </NavLink>
                        </Tooltip>
                      </ListItem>
                    </List>
                  </Collapse>
                </ListItem>
              </List>
            )}
            {profileManagerPermission && (
              <List className={classes.list + ' ' + classes.collapseList}>
                <ListItem className={cx({ [classes.item]: false }, { [classes.collapseItem]: true })}>
                  <Tooltip title='TAREAS ESPECIFICAS' disableHoverListener={!miniActive}>
                    <NavLink
                      to='#!'
                      onClick={() => setSpecificTasksCollapse(!specificTasksCollapse)}
                      className={`${classes.itemLink}` + ' ' + classes.collapseItemLink}
                    >
                      <span className={classes.collapseItemMini}>
                        <Task />
                      </span>
                      <ListItemText
                        primary='TAREAS ESPECIFICAS'
                        secondary={
                          <b className={classes.caret + ' ' + (specificTasksCollapse ? classes.caretActive : '')} />
                        }
                        disableTypography={true}
                        className={cx({ [itemText]: false }, { [collapseItemText]: true })}
                      />
                    </NavLink>
                  </Tooltip>
                  <Collapse in={specificTasksCollapse} unmountOnExit>
                    <List className={classes.list + ' ' + classes.collapseList}>
                      <ListItem className={cx({ [classes.item]: true }, { [classes.collapseItem]: true })}>
                        <Tooltip title='LISTADO ESPECIFICAS' disableHoverListener={!miniActive}>
                          <NavLink
                            to={'/admin/tasks-specific-list'}
                            className={`${classes.itemLink}` + ' ' + classes.collapseItemLink}
                          >
                            <span className={classes.collapseItemMini}>
                              <FormatListBulleted />
                            </span>
                            <ListItemText
                              primary='LISTADO ESPECIFICAS'
                              disableTypography={true}
                              className={cx({ [itemText]: true }, { [collapseItemText]: false })}
                            />
                          </NavLink>
                        </Tooltip>
                      </ListItem>
                      <ListItem className={cx({ [classes.item]: true }, { [classes.collapseItem]: true })}>
                        <Tooltip title='ALTA TAREAS ESPECIFICAS' disableHoverListener={!miniActive}>
                          <NavLink
                            to={'/admin/tasks-specific-register'}
                            className={`${classes.itemLink}` + ' ' + classes.collapseItemLink}
                          >
                            <span className={classes.collapseItemMini}>
                              <PostAdd />
                            </span>
                            <ListItemText
                              primary='ALTA TAREAS ESPECIFICAS'
                              disableTypography={true}
                              className={cx({ [itemText]: true }, { [collapseItemText]: false })}
                            />
                          </NavLink>
                        </Tooltip>
                      </ListItem>
                    </List>
                  </Collapse>
                </ListItem>
              </List>
            )}
            {adminPermission && (
              <List className={classes.list + ' ' + classes.collapseList}>
                <ListItem className={cx({ [classes.item]: false }, { [classes.collapseItem]: true })}>
                  <Tooltip title='TAREAS GENERALES' disableHoverListener={!miniActive}>
                    <NavLink
                      to='#!'
                      onClick={() => setGeneralTasksCollapse(!generalTasksCollapse)}
                      className={`${classes.itemLink}` + ' ' + classes.collapseItemLink}
                    >
                      <span className={classes.collapseItemMini}>
                        <Task />
                      </span>
                      <ListItemText
                        primary='TAREAS GENERALES'
                        secondary={
                          <b className={classes.caret + ' ' + (generalTasksCollapse ? classes.caretActive : '')} />
                        }
                        disableTypography={true}
                        className={cx({ [itemText]: false }, { [collapseItemText]: true })}
                      />
                    </NavLink>
                  </Tooltip>
                  <Collapse in={generalTasksCollapse} unmountOnExit>
                    <List className={classes.list + ' ' + classes.collapseList}>
                      <ListItem className={cx({ [classes.item]: true }, { [classes.collapseItem]: true })}>
                        <Tooltip title='LISTADO GENERALES' disableHoverListener={!miniActive}>
                          <NavLink
                            to={'/admin/tasks-general-list'}
                            className={`${classes.itemLink}` + ' ' + classes.collapseItemLink}
                          >
                            <span className={classes.collapseItemMini}>
                              <FormatListBulleted />
                            </span>
                            <ListItemText
                              primary='LISTADO GENERALES'
                              disableTypography={true}
                              className={cx({ [itemText]: true }, { [collapseItemText]: false })}
                            />
                          </NavLink>
                        </Tooltip>
                      </ListItem>
                      <ListItem className={cx({ [classes.item]: true }, { [classes.collapseItem]: true })}>
                        <Tooltip title='ALTA TAREAS GENERALES' disableHoverListener={!miniActive}>
                          <NavLink
                            to={'/admin/tasks-general-register'}
                            className={`${classes.itemLink}` + ' ' + classes.collapseItemLink}
                          >
                            <span className={classes.collapseItemMini}>
                              <PostAdd />
                            </span>
                            <ListItemText
                              primary='ALTA TAREAS GENERALES'
                              disableTypography={true}
                              className={cx({ [itemText]: true }, { [collapseItemText]: false })}
                            />
                          </NavLink>
                        </Tooltip>
                      </ListItem>
                    </List>
                  </Collapse>
                </ListItem>
              </List>
            )}
            {adminPermission && (
              <List className={classes.list + ' ' + classes.collapseList}>
                <ListItem className={cx({ [classes.item]: false }, { [classes.collapseItem]: true })}>
                  <Tooltip title='TAREAS AUSENCIAS' disableHoverListener={!miniActive}>
                    <NavLink
                      to='#!'
                      onClick={() => setAbsencesTasksCollapse(!absencesTasksCollapse)}
                      className={`${classes.itemLink}` + ' ' + classes.collapseItemLink}
                    >
                      <span className={classes.collapseItemMini}>
                        <Task />
                      </span>
                      <ListItemText
                        primary='TAREAS AUSENCIAS'
                        secondary={
                          <b className={classes.caret + ' ' + (absencesTasksCollapse ? classes.caretActive : '')} />
                        }
                        disableTypography={true}
                        className={cx({ [itemText]: false }, { [collapseItemText]: true })}
                      />
                    </NavLink>
                  </Tooltip>
                  <Collapse in={absencesTasksCollapse} unmountOnExit>
                    <List className={classes.list + ' ' + classes.collapseList}>
                      <ListItem className={cx({ [classes.item]: true }, { [classes.collapseItem]: true })}>
                        <Tooltip title='LISTADO AUSENCIAS' disableHoverListener={!miniActive}>
                          <NavLink
                            to={'/admin/tasks-absence-list'}
                            className={`${classes.itemLink}` + ' ' + classes.collapseItemLink}
                          >
                            <span className={classes.collapseItemMini}>
                              <FormatListBulleted />
                            </span>
                            <ListItemText
                              primary='LISTADO AUSENCIAS'
                              disableTypography={true}
                              className={cx({ [itemText]: true }, { [collapseItemText]: false })}
                            />
                          </NavLink>
                        </Tooltip>
                      </ListItem>
                      <ListItem className={cx({ [classes.item]: true }, { [classes.collapseItem]: true })}>
                        <Tooltip title='ALTA TAREAS AUSENCIAS' disableHoverListener={!miniActive}>
                          <NavLink
                            to={'/admin/tasks-absence-register'}
                            className={`${classes.itemLink}` + ' ' + classes.collapseItemLink}
                          >
                            <span className={classes.collapseItemMini}>
                              <PostAdd />
                            </span>
                            <ListItemText
                              primary='ALTA TAREAS AUSENCIAS'
                              disableTypography={true}
                              className={cx({ [itemText]: true }, { [collapseItemText]: false })}
                            />
                          </NavLink>
                        </Tooltip>
                      </ListItem>
                    </List>
                  </Collapse>
                </ListItem>
              </List>
            )}                                    
          </Collapse>
        </ListItem>
      )}
      {dataManagerPermission && (
        <ListItem className={cx({ [classes.item]: false }, { [classes.collapseItem]: true })}>
          <Tooltip title='REGISTRAR ENTRADA' disableHoverListener={!miniActive}>
            <NavLink
              to='#!'
              onClick={() => setEntriesCollapse(!entriesCollapse)}
              className={`${classes.itemLink}` + ' ' + classes.collapseItemLink}
            >
              <span className={classes.collapseItemMini}>
                <Assignment />
              </span>
              <ListItemText
                primary='REGISTRAR ENTRADA'
                secondary={<b className={classes.caret + ' ' + (entriesCollapse ? classes.caretActive : '')} />}
                disableTypography={true}
                className={cx({ [itemText]: false }, { [collapseItemText]: true })}
              />
            </NavLink>
          </Tooltip>
          <Collapse in={entriesCollapse} unmountOnExit>
            <List className={classes.list + ' ' + classes.collapseList}>
                <ListItem className={cx({ [classes.item]: false }, { [classes.collapseItem]: true })}>
                  <Tooltip title='LISTADO ENTRADAS' disableHoverListener={!miniActive}>
                    <NavLink
                      to={'/admin/entries-list'}
                      className={`${classes.itemLink}` + ' ' + classes.collapseItemLink}
                    >
                      <span className={classes.collapseItemMini}>
                        <FormatListBulleted />
                      </span>
                      <ListItemText
                        primary='LISTADO ENTRADAS'
                        disableTypography={true}
                        className={cx({ [itemText]: false }, { [collapseItemText]: true })}
                      />
                    </NavLink>
                  </Tooltip>
                </ListItem>
                <ListItem className={cx({ [classes.item]: false }, { [classes.collapseItem]: true })}>
                  <Tooltip title='REGISTRAR ENTRADAS' disableHoverListener={!miniActive}>
                    <NavLink
                      to={'/admin/entries-register'}
                      className={`${classes.itemLink}` + ' ' + classes.collapseItemLink}
                    >
                      <span className={classes.collapseItemMini}>
                        <PostAdd />
                      </span>
                      <ListItemText
                        primary='REGISTRAR ENTRADAS'
                        disableTypography={true}
                        className={cx({ [itemText]: false }, { [collapseItemText]: true })}
                      />
                    </NavLink>
                  </Tooltip>
                </ListItem>
            </List>
          </Collapse>
        </ListItem>
      )}
      {dataManagerPermission && (
        <ListItem className={cx({ [classes.item]: false }, { [classes.collapseItem]: true })}>
          <Tooltip title='REGISTRAR DIFICULTAD' disableHoverListener={!miniActive}>
            <NavLink
              to='#!'
              onClick={() => setDificultiesCollapse(!dificultiesCollapse)}
              className={`${classes.itemLink}` + ' ' + classes.collapseItemLink}
            >
              <span className={classes.collapseItemMini}>
                <Assignment />
              </span>
              <ListItemText
                primary='REGISTRAR DIFICULTAD'
                secondary={<b className={classes.caret + ' ' + (dificultiesCollapse ? classes.caretActive : '')} />}
                disableTypography={true}
                className={cx({ [itemText]: false }, { [collapseItemText]: true })}
              />
            </NavLink>
          </Tooltip>
          <Collapse in={dificultiesCollapse} unmountOnExit>
            <List className={classes.list + ' ' + classes.collapseList}>
                <ListItem className={cx({ [classes.item]: false }, { [classes.collapseItem]: true })}>
                  <Tooltip title='LISTADO DIFICULTADES' disableHoverListener={!miniActive}>
                    <NavLink
                      to={'/admin/dificulties-list'}
                      className={`${classes.itemLink}` + ' ' + classes.collapseItemLink}
                    >
                      <span className={classes.collapseItemMini}>
                        <FormatListBulleted />
                      </span>
                      <ListItemText
                        primary='LISTADO DIFICULTADES'
                        disableTypography={true}
                        className={cx({ [itemText]: false }, { [collapseItemText]: true })}
                      />
                    </NavLink>
                  </Tooltip>
                </ListItem>
                <ListItem className={cx({ [classes.item]: false }, { [classes.collapseItem]: true })}>
                  <Tooltip title='REGISTRAR DIFICULTADES' disableHoverListener={!miniActive}>
                    <NavLink
                      to={'/admin/dificulties-register'}
                      className={`${classes.itemLink}` + ' ' + classes.collapseItemLink}
                    >
                      <span className={classes.collapseItemMini}>
                        <PostAdd />
                      </span>
                      <ListItemText
                        primary='REGISTRAR DIFICULTADES'
                        disableTypography={true}
                        className={cx({ [itemText]: false }, { [collapseItemText]: true })}
                      />
                    </NavLink>
                  </Tooltip>
                </ListItem>
            </List>
          </Collapse>
        </ListItem>
      )}
      {isAdminOrProfileManager && (
        <ListItem className={cx({ [classes.item]: false }, { [classes.collapseItem]: true })}>
          <Tooltip title='TAREAS COMPARTIDAS' disableHoverListener={!miniActive}>
            <NavLink
              to='#!'
              onClick={() => setSharedTasksCollapse(!sharedTasksCollapse)}
              className={`${classes.itemLink}` + ' ' + classes.collapseItemLink}
            >
              <span className={classes.collapseItemMini}>
                <Task />
              </span>
              <ListItemText
                primary='TAREAS COMPARTIDAS'
                secondary={
                  <b className={classes.caret + ' ' + (sharedTasksCollapse ? classes.caretActive : '')} />
                }
                disableTypography={true}
                className={cx({ [itemText]: false }, { [collapseItemText]: true })}
              />
            </NavLink>
          </Tooltip>
          <Collapse in={sharedTasksCollapse} unmountOnExit>
            <List className={classes.list + ' ' + classes.collapseList}>
              <ListItem className={cx({ [classes.item]: true }, { [classes.collapseItem]: true })}>
                <Tooltip title='LISTADO COMPARTIDAS' disableHoverListener={!miniActive}>
                  <NavLink
                    to={'/admin/tasks-shared-list'}
                    className={`${classes.itemLink}` + ' ' + classes.collapseItemLink}
                  >
                    <span className={classes.collapseItemMini}>
                      <FormatListBulleted />
                    </span>
                    <ListItemText
                      primary='LISTADO COMPARTIDAS'
                      disableTypography={true}
                      className={cx({ [itemText]: true }, { [collapseItemText]: false })}
                    />
                  </NavLink>
                </Tooltip>
              </ListItem>
              <ListItem className={cx({ [classes.item]: true }, { [classes.collapseItem]: true })}>
                <Tooltip title='EDITAR % DE RESPONSABILIDAD' disableHoverListener={!miniActive}>
                  <NavLink
                    to={'/admin/tasks-shared-register'}
                    className={`${classes.itemLink}` + ' ' + classes.collapseItemLink}
                  >
                    <span className={classes.collapseItemMini}>
                      <PostAdd />
                    </span>
                    <ListItemText
                      primary='EDITAR % DE RESPONSABILIDAD'
                      disableTypography={true}
                      className={cx({ [itemText]: false }, { [collapseItemText]: true })}
                   />
                   </NavLink>
                </Tooltip>
              </ListItem>
            </List>
          </Collapse>
        </ListItem>
      )}
      {isAdminOrProfileManager && (
        <ListItem className={cx({ [classes.item]: false }, { [classes.collapseItem]: true })}>
          <Tooltip title='TAREAS ACUMULATIVAS' disableHoverListener={!miniActive}>
            <NavLink
              to='#!'
              onClick={() => setAcumulativeTasksCollapse(!acumulativeTasksCollapse)}
              className={`${classes.itemLink}` + ' ' + classes.collapseItemLink}
            >
              <span className={classes.collapseItemMini}>
                 <Task />
              </span>
              <ListItemText
                primary='TAREAS ACUMULATIVAS'
                secondary={
                  <b className={classes.caret + ' ' + (acumulativeTasksCollapse ? classes.caretActive : '')} />
                }
                disableTypography={true}
                className={cx({ [itemText]: false }, { [collapseItemText]: true })}
              />
            </NavLink>
          </Tooltip>
          <Collapse in={acumulativeTasksCollapse} unmountOnExit>
            <List className={classes.list + ' ' + classes.collapseList}>
              <ListItem className={cx({ [classes.item]: true }, { [classes.collapseItem]: true })}>
                <Tooltip title='LISTADO ACUMULATIVAS' disableHoverListener={!miniActive}>
                  <NavLink
                    to={'/admin/tasks-acumulative-list'}
                    className={`${classes.itemLink}` + ' ' + classes.collapseItemLink}
                  >
                    <span className={classes.collapseItemMini}>
                      <FormatListBulleted />
                    </span>
                    <ListItemText
                      primary='LISTADO ACUMULATIVAS'
                      disableTypography={true}
                      className={cx({ [itemText]: true }, { [collapseItemText]: false })}
                    />
                  </NavLink>
                </Tooltip>
              </ListItem>
              <ListItem className={cx({ [classes.item]: true }, { [classes.collapseItem]: true })}>
                <Tooltip title='ALTA TAREAS ACUMULATIVAS' disableHoverListener={!miniActive}>
                  <NavLink
                    to={'/admin/tasks-acumulative-register'}
                    className={`${classes.itemLink}` + ' ' + classes.collapseItemLink}
                  >
                    <span className={classes.collapseItemMini}>
                      <PostAdd />
                    </span>
                    <ListItemText
                      primary='ALTA TAREAS ACUMULATIVAS'
                      disableTypography={true}
                      className={cx({ [itemText]: true }, { [collapseItemText]: false })}
                    />
                   </NavLink>
                 </Tooltip>
               </ListItem>
            </List>
          </Collapse>
        </ListItem>
      )}
      {isAdminOrProfileManager && (
        <ListItem className={cx({ [classes.item]: false }, { [classes.collapseItem]: true })}>
          <Tooltip title='OBJETIVOS' disableHoverListener={!miniActive}>
            <NavLink
              to='#!'
              onClick={() => setObjetivesCollapse(!objetivesCollapse)}
              className={`${classes.itemLink}` + ' ' + classes.collapseItemLink}
            >
              <span className={classes.collapseItemMini}>
                <MilitaryTech />
              </span>
              <ListItemText
                primary='OBJETIVOS'
                secondary={<b className={classes.caret + ' ' + (objetivesCollapse ? classes.caretActive : '')} />}
                disableTypography={true}
                className={cx({ [itemText]: false }, { [collapseItemText]: true })}
              />
            </NavLink>
          </Tooltip>
          <Collapse in={objetivesCollapse} unmountOnExit>
          {profileManagerPermission && (
              <List className={classes.list + ' ' + classes.collapseList}>
                <ListItem className={cx({ [classes.item]: false }, { [classes.collapseItem]: true })}>
                  <Tooltip title='OBJETIVOS ORD/EXT' disableHoverListener={!miniActive}>
                    <NavLink
                      to='#!'
                      onClick={() => setOrdExtObjetivesCollapse(!ordExtObjetivesCollapse)}
                      className={`${classes.itemLink}` + ' ' + classes.collapseItemLink}
                    >
                      <span className={classes.collapseItemMini}>
                        <MilitaryTech />
                      </span>
                      <ListItemText
                        primary='O.TAREAS DE PERFIL'
                        secondary={
                          <b className={classes.caret + ' ' + (ordExtObjetivesCollapse ? classes.caretActive : '')} />
                        }
                        disableTypography={true}
                        className={cx({ [itemText]: false }, { [collapseItemText]: true })}
                      />
                    </NavLink>
                  </Tooltip>
                  <Collapse in={ordExtObjetivesCollapse} unmountOnExit>
                    <List className={classes.list + ' ' + classes.collapseList}>
                      <ListItem className={cx({ [classes.item]: true }, { [classes.collapseItem]: true })}>
                        <Tooltip title='LISTADO TAREAS DE PERFIL' disableHoverListener={!miniActive}>
                          <NavLink
                            to={'/admin/objectives-ord-ext-list'}
                            className={`${classes.itemLink}` + ' ' + classes.collapseItemLink}
                          >
                            <span className={classes.collapseItemMini}>
                              <FormatListBulleted />
                            </span>
                            <ListItemText
                              primary='LISTADO DE TAREAS DE PERFIL'
                              disableTypography={true}
                              className={cx({ [itemText]: true }, { [collapseItemText]: false })}
                            />
                          </NavLink>
                        </Tooltip>
                      </ListItem>
                      <ListItem className={cx({ [classes.item]: true }, { [classes.collapseItem]: true })}>
                        <Tooltip title='ALTA OBJETIVOS DE PERFIL' disableHoverListener={!miniActive}>
                          <NavLink
                            to={'/admin/objectives-ord-ext-register'}
                            className={`${classes.itemLink}` + ' ' + classes.collapseItemLink}
                          >
                            <span className={classes.collapseItemMini}>
                              <PostAdd />
                            </span>
                            <ListItemText
                              primary='ALTA OBJETIVOS DE PERFIL'
                              disableTypography={true}
                              className={cx({ [itemText]: true }, { [collapseItemText]: false })}
                            />
                          </NavLink>
                        </Tooltip>
                      </ListItem>
                    </List>
                  </Collapse>
                </ListItem>
              </List>
            )}                        
            {profileManagerPermission && (
              <List className={classes.list + ' ' + classes.collapseList}>
                <ListItem className={cx({ [classes.item]: false }, { [classes.collapseItem]: true })}>
                  <Tooltip title='OBJETIVOS ESPECIFICAS' disableHoverListener={!miniActive}>
                    <NavLink
                      to='#!'
                      onClick={() => setSpecificObjetivesCollapse(!specificObjetivesCollapse)}
                      className={`${classes.itemLink}` + ' ' + classes.collapseItemLink}
                    >
                      <span className={classes.collapseItemMini}>
                        <MilitaryTech />
                      </span>
                      <ListItemText
                        primary='O.TAREAS ESPECIFICAS'
                        secondary={
                          <b className={classes.caret + ' ' + (specificObjetivesCollapse ? classes.caretActive : '')} />
                        }
                        disableTypography={true}
                        className={cx({ [itemText]: false }, { [collapseItemText]: true })}
                      />
                    </NavLink>
                  </Tooltip>
                  <Collapse in={specificObjetivesCollapse} unmountOnExit>
                    <List className={classes.list + ' ' + classes.collapseList}>
                      <ListItem className={cx({ [classes.item]: true }, { [classes.collapseItem]: true })}>
                        <Tooltip title='LISTADO ESPECIFICAS' disableHoverListener={!miniActive}>
                          <NavLink
                            to={'/admin/objectives-list-specific'}
                            className={`${classes.itemLink}` + ' ' + classes.collapseItemLink}
                          >
                            <span className={classes.collapseItemMini}>
                              <FormatListBulleted />
                            </span>
                            <ListItemText
                              primary='LISTADO ESPECIFICAS'
                              disableTypography={true}
                              className={cx({ [itemText]: true }, { [collapseItemText]: false })}
                            />
                          </NavLink>
                        </Tooltip>
                      </ListItem>
                      <ListItem className={cx({ [classes.item]: true }, { [classes.collapseItem]: true })}>
                        <Tooltip title='ALTA OBJETIVOS ESPECIFICAS' disableHoverListener={!miniActive}>
                          <NavLink
                            to={'/admin/objectives-register-specific'}
                            className={`${classes.itemLink}` + ' ' + classes.collapseItemLink}
                          >
                            <span className={classes.collapseItemMini}>
                              <PostAdd />
                            </span>
                            <ListItemText
                              primary='ALTA OBJETIVOS ESPECIFICAS'
                              disableTypography={true}
                              className={cx({ [itemText]: true }, { [collapseItemText]: false })}
                            />
                          </NavLink>
                        </Tooltip>
                      </ListItem>
                    </List>
                  </Collapse>
                </ListItem>
              </List>
            )}
            {adminPermission && (
              <List className={classes.list + ' ' + classes.collapseList}>
                <ListItem className={cx({ [classes.item]: false }, { [classes.collapseItem]: true })}>
                  <Tooltip title='OBJETIVOS GENERALES' disableHoverListener={!miniActive}>
                    <NavLink
                      to='#!'
                      onClick={() => setGeneralObjetivesCollapse(!generalObjetivesCollapse)}
                      className={`${classes.itemLink}` + ' ' + classes.collapseItemLink}
                    >
                      <span className={classes.collapseItemMini}>
                        <MilitaryTech />
                      </span>
                      <ListItemText
                        primary='O.TAREAS GENERALES'
                        secondary={
                          <b className={classes.caret + ' ' + (generalObjetivesCollapse ? classes.caretActive : '')} />
                        }
                        disableTypography={true}
                        className={cx({ [itemText]: false }, { [collapseItemText]: true })}
                      />
                    </NavLink>
                  </Tooltip>
                  <Collapse in={generalObjetivesCollapse} unmountOnExit>
                    <List className={classes.list + ' ' + classes.collapseList}>
                      <ListItem className={cx({ [classes.item]: true }, { [classes.collapseItem]: true })}>
                        <Tooltip title='LISTADO GENERALES' disableHoverListener={!miniActive}>
                          <NavLink
                            to={'/admin/objectives-general-list'}
                            className={`${classes.itemLink}` + ' ' + classes.collapseItemLink}
                          >
                            <span className={classes.collapseItemMini}>
                              <FormatListBulleted />
                            </span>
                            <ListItemText
                              primary='LISTADO GENERALES'
                              disableTypography={true}
                              className={cx({ [itemText]: true }, { [collapseItemText]: false })}
                            />
                          </NavLink>
                        </Tooltip>
                      </ListItem>
                      <ListItem className={cx({ [classes.item]: true }, { [classes.collapseItem]: true })}>
                        <Tooltip title='ALTA OBJETIVOS GENERALES' disableHoverListener={!miniActive}>
                          <NavLink
                            to={'/admin/objectives-general-register'}
                            className={`${classes.itemLink}` + ' ' + classes.collapseItemLink}
                          >
                            <span className={classes.collapseItemMini}>
                              <PostAdd />
                            </span>
                            <ListItemText
                              primary='ALTA OBJETIVOS GENERALES'
                              disableTypography={true}
                              className={cx({ [itemText]: true }, { [collapseItemText]: false })}
                            />
                          </NavLink>
                        </Tooltip>
                      </ListItem>
                    </List>
                  </Collapse>
                </ListItem>
              </List>
            )}            
            {adminPermission && (
              <List className={classes.list + ' ' + classes.collapseList}>
                <ListItem className={cx({ [classes.item]: false }, { [classes.collapseItem]: true })}>
                  <Tooltip title='OBJETIVOS AUSENCIAS' disableHoverListener={!miniActive}>
                    <NavLink
                      to='#!'
                      onClick={() => setAbsencesObjetivesCollapse(!absencesObjetivesCollapse)}
                      className={`${classes.itemLink}` + ' ' + classes.collapseItemLink}
                    >
                      <span className={classes.collapseItemMini}>
                        <MilitaryTech />
                      </span>
                      <ListItemText
                        primary='O.TAREAS AUSENCIAS'
                        secondary={
                          <b className={classes.caret + ' ' + (absencesObjetivesCollapse ? classes.caretActive : '')} />
                        }
                        disableTypography={true}
                        className={cx({ [itemText]: false }, { [collapseItemText]: true })}
                      />
                    </NavLink>
                  </Tooltip>
                  <Collapse in={absencesObjetivesCollapse} unmountOnExit>
                    <List className={classes.list + ' ' + classes.collapseList}>
                      <ListItem className={cx({ [classes.item]: true }, { [classes.collapseItem]: true })}>
                        <Tooltip title='LISTADO AUSENCIAS' disableHoverListener={!miniActive}>
                          <NavLink
                            to={'/admin/objectives-list-absence'}
                            className={`${classes.itemLink}` + ' ' + classes.collapseItemLink}
                          >
                            <span className={classes.collapseItemMini}>
                              <FormatListBulleted />
                            </span>
                            <ListItemText
                              primary='LISTADO AUSENCIAS'
                              disableTypography={true}
                              className={cx({ [itemText]: true }, { [collapseItemText]: false })}
                            />
                          </NavLink>
                        </Tooltip>
                      </ListItem>
                      <ListItem className={cx({ [classes.item]: true }, { [classes.collapseItem]: true })}>
                        <Tooltip title='ALTA OBJETIVOS AUSENCIAS' disableHoverListener={!miniActive}>
                          <NavLink
                            to={'/admin/objectives-register-absence'}
                            className={`${classes.itemLink}` + ' ' + classes.collapseItemLink}
                          >
                            <span className={classes.collapseItemMini}>
                              <PostAdd />
                            </span>
                            <ListItemText
                              primary='ALTA OBJETIVOS AUSENCIAS'
                              disableTypography={true}
                              className={cx({ [itemText]: true }, { [collapseItemText]: false })}
                            />
                          </NavLink>
                        </Tooltip>
                      </ListItem>
                    </List>
                  </Collapse>
                </ListItem>
              </List>
            )}
          </Collapse>
        </ListItem>
      )}
      {catalogPermissions && (
        <ListItem className={cx({ [classes.item]: false }, { [classes.collapseItem]: true })}>
          <Tooltip title='CATALOGOS' disableHoverListener={!miniActive}>
            <NavLink
              to='#!'
              onClick={() => setCatalogCollapse(!catalogCollapse)}
              className={`${classes.itemLink}` + ' ' + classes.collapseItemLink}
            >
              <span className={classes.collapseItemMini}>
                <LocalLibrary />
              </span>
              <ListItemText
                primary='CATALOGOS'
                secondary={<b className={classes.caret + ' ' + (catalogCollapse ? classes.caretActive : '')} />}
                disableTypography={true}
                className={cx({ [itemText]: false }, { [collapseItemText]: true })}
              />
            </NavLink>
          </Tooltip>
          <Collapse in={catalogCollapse} unmountOnExit>
            {isAdminOrProfileManager && (
              <List className={classes.list + ' ' + classes.collapseList}>
                <ListItem className={cx({ [classes.item]: false }, { [classes.collapseItem]: true })}>
                  <Tooltip title='PERFILES' disableHoverListener={!miniActive}>
                    <NavLink
                      to='#!'
                      onClick={() => setProfileCollapse(!profileCollapse)}
                      className={`${classes.itemLink}` + ' ' + classes.collapseItemLink}
                    >
                      <span className={classes.collapseItemMini}>
                        <PersonSearch />
                      </span>
                      <ListItemText
                        primary='PERFILES'
                        secondary={<b className={classes.caret + ' ' + (profileCollapse ? classes.caretActive : '')} />}
                        disableTypography={true}
                        className={cx({ [itemText]: false }, { [collapseItemText]: true })}
                      />
                    </NavLink>
                  </Tooltip>
                  <Collapse in={profileCollapse} unmountOnExit>
                    <List className={classes.list + ' ' + classes.collapseList}>
                      <ListItem className={cx({ [classes.item]: true }, { [classes.collapseItem]: true })}>
                        <Tooltip title='LISTADO DE PERFILES' disableHoverListener={!miniActive}>
                          <NavLink
                            to={'/admin/profile-list'}
                            className={`${classes.itemLink}` + ' ' + classes.collapseItemLink}
                          >
                            <span className={classes.collapseItemMini}>
                              <FormatListBulleted />
                            </span>
                            <ListItemText
                              primary='LISTADO DE PERFILES'
                              disableTypography={true}
                              className={cx({ [itemText]: true }, { [collapseItemText]: false })}
                            />
                          </NavLink>
                        </Tooltip>
                      </ListItem>
                      {profileManagerPermission && (
                        <ListItem className={cx({ [classes.item]: true }, { [classes.collapseItem]: true })}>
                          <Tooltip title='ALTA DE PERFILES' disableHoverListener={!miniActive}>
                            <NavLink
                              to={'/admin/profile-register'}
                              className={`${classes.itemLink}` + ' ' + classes.collapseItemLink}
                            >
                              <span className={classes.collapseItemMini}>
                                <PostAdd />
                              </span>
                              <ListItemText
                                primary='ALTA DE PERFILES'
                                disableTypography={true}
                                className={cx({ [itemText]: true }, { [collapseItemText]: false })}
                              />
                            </NavLink>
                          </Tooltip>
                        </ListItem>
                      )}
                      {adminPermission && (
                        <ListItem className={cx({ [classes.item]: true }, { [classes.collapseItem]: true })}>
                          <Tooltip title='ASIGNAR PERFILES' disableHoverListener={!miniActive}>
                            <NavLink
                              to={'/admin/asign-profile'}
                              className={`${classes.itemLink}` + ' ' + classes.collapseItemLink}
                            >
                              <span className={classes.collapseItemMini}>
                                <PostAdd />
                              </span>
                              <ListItemText
                                primary='ASIGNAR PERFILES'
                                disableTypography={true}
                                className={cx({ [itemText]: true }, { [collapseItemText]: false })}
                              />
                            </NavLink>
                          </Tooltip>
                        </ListItem>
                      )}
                    </List>
                  </Collapse>
                </ListItem>
              </List>
            )}
            {adminPermission && (
              <List className={classes.list + ' ' + classes.collapseList}>
                <ListItem className={cx({ [classes.item]: false }, { [classes.collapseItem]: true })}>
                  <Tooltip title='GESTION DE DE ENTRADAS' disableHoverListener={!miniActive}>
                    <NavLink
                      to='#!'
                      onClick={() => setTicketManagerCollapse(!ticketManagerCollapse)}
                      className={`${classes.itemLink}` + ' ' + classes.collapseItemLink}
                    >
                      <span className={classes.collapseItemMini}>
                        <PersonSearch />
                      </span>
                      <ListItemText
                        primary='GESTION DE ENTRADAS'
                        secondary={
                          <b className={classes.caret + ' ' + (ticketManagerCollapse ? classes.caretActive : '')} />
                        }
                        disableTypography={true}
                        className={cx({ [itemText]: false }, { [collapseItemText]: true })}
                      />
                    </NavLink>
                  </Tooltip>
                  <Collapse in={ticketManagerCollapse} unmountOnExit>
                    <List className={classes.list + ' ' + classes.collapseList}>
                      <ListItem className={cx({ [classes.item]: true }, { [classes.collapseItem]: true })}>
                        <Tooltip title='LISTA GESTORES ENTRADAS' disableHoverListener={!miniActive}>
                          <NavLink
                            to={'/admin/entrada-list'}
                            className={`${classes.itemLink}` + ' ' + classes.collapseItemLink}
                          >
                            <span className={classes.collapseItemMini}>
                              <FormatListBulleted />
                            </span>
                            <ListItemText
                              primary='LISTA GESTORES ENTRADAS'
                              disableTypography={true}
                              className={cx({ [itemText]: true }, { [collapseItemText]: false })}
                            />
                          </NavLink>
                        </Tooltip>
                      </ListItem>
                      <ListItem className={cx({ [classes.item]: true }, { [classes.collapseItem]: true })}>
                        <Tooltip title='ALTA GESTOR DE ENTRADAS' disableHoverListener={!miniActive}>
                          <NavLink
                            to={'/admin/entrada-manager-register'}
                            className={`${classes.itemLink}` + ' ' + classes.collapseItemLink}
                          >
                            <span className={classes.collapseItemMini}>
                              <PostAdd />
                            </span>
                            <ListItemText
                              primary='ALTA GESTOR DE ENTRADAS'
                              disableTypography={true}
                              className={cx({ [itemText]: true }, { [collapseItemText]: false })}
                            />
                          </NavLink>
                        </Tooltip>
                      </ListItem>
                    </List>
                  </Collapse>
                </ListItem>
              </List>
            )}
            {adminPermission && (
              <List className={classes.list + ' ' + classes.collapseList}>
                <ListItem className={cx({ [classes.item]: false }, { [classes.collapseItem]: true })}>
                  <Tooltip title='GESTION DE DIFICULTAD' disableHoverListener={!miniActive}>
                    <NavLink
                      to='#!'
                      onClick={() => setDificultyManagerCollapse(!dificultyManagerCollapse)}
                      className={`${classes.itemLink}` + ' ' + classes.collapseItemLink}
                    >
                      <span className={classes.collapseItemMini}>
                        <PersonSearch />
                      </span>
                      <ListItemText
                        primary='GESTION DE DIFICULTAD'
                        secondary={
                          <b className={classes.caret + ' ' + (dificultyManagerCollapse ? classes.caretActive : '')} />
                        }
                        disableTypography={true}
                        className={cx({ [itemText]: false }, { [collapseItemText]: true })}
                      />
                    </NavLink>
                  </Tooltip>
                  <Collapse in={dificultyManagerCollapse} unmountOnExit>
                    <List className={classes.list + ' ' + classes.collapseList}>
                      <ListItem className={cx({ [classes.item]: true }, { [classes.collapseItem]: true })}>
                        <Tooltip title='LISTA GESTORES DIFICULTAD' disableHoverListener={!miniActive}>
                          <NavLink
                            to={'/admin/dificultas-list'}
                            className={`${classes.itemLink}` + ' ' + classes.collapseItemLink}
                          >
                            <span className={classes.collapseItemMini}>
                              <FormatListBulleted />
                            </span>
                            <ListItemText
                              primary='LISTA GESTORES DIFICULTAD'
                              disableTypography={true}
                              className={cx({ [itemText]: true }, { [collapseItemText]: false })}
                            />
                          </NavLink>
                        </Tooltip>
                      </ListItem>
                      <ListItem className={cx({ [classes.item]: true }, { [classes.collapseItem]: true })}>
                        <Tooltip title='ALTA GESTOR DIFICULTAD' disableHoverListener={!miniActive}>
                          <NavLink
                            to={'/admin/dificultad-register'}
                            className={`${classes.itemLink}` + ' ' + classes.collapseItemLink}
                          >
                            <span className={classes.collapseItemMini}>
                              <PostAdd />
                            </span>
                            <ListItemText
                              primary='ALTA GESTOR DIFICULTAD'
                              disableTypography={true}
                              className={cx({ [itemText]: true }, { [collapseItemText]: false })}
                            />
                          </NavLink>
                        </Tooltip>
                      </ListItem>
                    </List>
                  </Collapse>
                </ListItem>
              </List>
            )}
            {adminPermission && (
              <List className={classes.list + ' ' + classes.collapseList}>
                <ListItem className={cx({ [classes.item]: false }, { [classes.collapseItem]: true })}>
                  <Tooltip title='GESTION DE PERMISOS' disableHoverListener={!miniActive}>
                    <NavLink
                      to='#!'
                      onClick={() => setPermissionManagerCollapse(!permissionManagerCollapse)}
                      className={`${classes.itemLink}` + ' ' + classes.collapseItemLink}
                    >
                      <span className={classes.collapseItemMini}>
                        <Assignment />
                      </span>
                      <ListItemText
                        primary='GESTION DE PERMISOS'
                        secondary={
                          <b className={classes.caret + ' ' + (permissionManagerCollapse ? classes.caretActive : '')} />
                        }
                        disableTypography={true}
                        className={cx({ [itemText]: false }, { [collapseItemText]: true })}
                      />
                    </NavLink>
                  </Tooltip>
                  <Collapse in={permissionManagerCollapse} unmountOnExit>
                    <List className={classes.list + ' ' + classes.collapseList}>
                      <ListItem className={cx({ [classes.item]: true }, { [classes.collapseItem]: true })}>
                        <Tooltip title='LISTADO PERMISOS' disableHoverListener={!miniActive}>
                          <NavLink
                            to={'/admin/assign-permission-list'}
                            className={`${classes.itemLink}` + ' ' + classes.collapseItemLink}
                          >
                            <span className={classes.collapseItemMini}>
                              <FormatListBulleted />
                            </span>
                            <ListItemText
                              primary='LISTADO PERMISOS'
                              disableTypography={true}
                              className={cx({ [itemText]: true }, { [collapseItemText]: false })}
                            />
                          </NavLink>
                        </Tooltip>
                      </ListItem>
                      <ListItem className={cx({ [classes.item]: true }, { [classes.collapseItem]: true })}>
                        <Tooltip title='ASIGNAR PERMISOS' disableHoverListener={!miniActive}>
                          <NavLink
                            to={'/admin/assign-permission'}
                            className={`${classes.itemLink}` + ' ' + classes.collapseItemLink}
                          >
                            <span className={classes.collapseItemMini}>
                              <PostAdd />
                            </span>
                            <ListItemText
                              primary='ASIGNAR PERMISOS'
                              disableTypography={true}
                              className={cx({ [itemText]: true }, { [collapseItemText]: false })}
                            />
                          </NavLink>
                        </Tooltip>
                      </ListItem>
                    </List>
                  </Collapse>
                </ListItem>
              </List>
            )}
            {adminPermission && (
              <List className={classes.list + ' ' + classes.collapseList}>
                <ListItem className={cx({ [classes.item]: false }, { [classes.collapseItem]: true })}>
                  <Tooltip title='SUBDIRECCIÓN' disableHoverListener={!miniActive}>
                    <NavLink
                      to='#!'
                      onClick={() => setSubdirectorateCollapse(!subdirectorateCollapse)}
                      className={`${classes.itemLink}` + ' ' + classes.collapseItemLink}
                    >
                      <span className={classes.collapseItemMini}>
                        <AccountBox />
                      </span>
                      <ListItemText
                        primary='SUBDIRECCIÓN'
                        secondary={
                          <b className={classes.caret + ' ' + (subdirectorateCollapse ? classes.caretActive : '')} />
                        }
                        disableTypography={true}
                        className={cx({ [itemText]: false }, { [collapseItemText]: true })}
                      />
                    </NavLink>
                  </Tooltip>
                  <Collapse in={subdirectorateCollapse} unmountOnExit>
                    <List className={classes.list + ' ' + classes.collapseList}>
                      <ListItem className={cx({ [classes.item]: true }, { [classes.collapseItem]: true })}>
                        <Tooltip title='LISTADO SUBDIRECCIÓN' disableHoverListener={!miniActive}>
                          <NavLink
                            to={'/admin/subdirection-list'}
                            className={`${classes.itemLink}` + ' ' + classes.collapseItemLink}
                          >
                            <span className={classes.collapseItemMini}>
                              <FormatListBulleted />
                            </span>
                            <ListItemText
                              primary='LISTADO SUBDIRECCIÓN'
                              disableTypography={true}
                              className={cx({ [itemText]: true }, { [collapseItemText]: false })}
                            />
                          </NavLink>
                        </Tooltip>
                      </ListItem>
                      <ListItem className={cx({ [classes.item]: true }, { [classes.collapseItem]: true })}>
                        <Tooltip title='ALTA DE SUBDIRECCIÓN' disableHoverListener={!miniActive}>
                          <NavLink
                            to={'/admin/subdirection-register'}
                            className={`${classes.itemLink}` + ' ' + classes.collapseItemLink}
                          >
                            <span className={classes.collapseItemMini}>
                              <PostAdd />
                            </span>
                            <ListItemText
                              primary='ALTA DE SUBDIRECCIÓN'
                              disableTypography={true}
                              className={cx({ [itemText]: true }, { [collapseItemText]: false })}
                            />
                          </NavLink>
                        </Tooltip>
                      </ListItem>
                    </List>
                  </Collapse>
                </ListItem>
              </List>
            )}
            {adminPermission && (
              <List className={classes.list + ' ' + classes.collapseList}>
                <ListItem className={cx({ [classes.item]: false }, { [classes.collapseItem]: true })}>
                  <Tooltip title='SERVICIO' disableHoverListener={!miniActive}>
                    <NavLink
                      to='#!'
                      onClick={() => setServiceCollapse(!serviceCollapse)}
                      className={`${classes.itemLink}` + ' ' + classes.collapseItemLink}
                    >
                      <span className={classes.collapseItemMini}>
                        <MiscellaneousServices />
                      </span>
                      <ListItemText
                        primary='SERVICIO'
                        secondary={<b className={classes.caret + ' ' + (serviceCollapse ? classes.caretActive : '')} />}
                        disableTypography={true}
                        className={cx({ [itemText]: false }, { [collapseItemText]: true })}
                      />
                    </NavLink>
                  </Tooltip>
                  <Collapse in={serviceCollapse} unmountOnExit>
                    <List className={classes.list + ' ' + classes.collapseList}>
                      <ListItem className={cx({ [classes.item]: true }, { [classes.collapseItem]: true })}>
                        <Tooltip title='LISTADO SERVICIO' disableHoverListener={!miniActive}>
                          <NavLink
                            to={'/admin/service-list'}
                            className={`${classes.itemLink}` + ' ' + classes.collapseItemLink}
                          >
                            <span className={classes.collapseItemMini}>
                              <FormatListBulleted />
                            </span>
                            <ListItemText
                              primary='LISTADO SERVICIO'
                              disableTypography={true}
                              className={cx({ [itemText]: true }, { [collapseItemText]: false })}
                            />
                          </NavLink>
                        </Tooltip>
                      </ListItem>
                      <ListItem className={cx({ [classes.item]: true }, { [classes.collapseItem]: true })}>
                        <Tooltip title='ALTA DE SERVICIO' disableHoverListener={!miniActive}>
                          <NavLink
                            to={'/admin/service-register'}
                            className={`${classes.itemLink}` + ' ' + classes.collapseItemLink}
                          >
                            <span className={classes.collapseItemMini}>
                              <PostAdd />
                            </span>
                            <ListItemText
                              primary='ALTA DE SERVICIO'
                              disableTypography={true}
                              className={cx({ [itemText]: true }, { [collapseItemText]: false })}
                            />
                          </NavLink>
                        </Tooltip>
                      </ListItem>
                    </List>
                  </Collapse>
                </ListItem>
              </List>
            )}
            {adminPermission && (
              <List className={classes.list + ' ' + classes.collapseList}>
                <ListItem className={cx({ [classes.item]: false }, { [classes.collapseItem]: true })}>
                  <Tooltip title='DEPARTAMENTO' disableHoverListener={!miniActive}>
                    <NavLink
                      to='#!'
                      onClick={() => setDepartamentCollapse(!departamentCollapse)}
                      className={`${classes.itemLink}` + ' ' + classes.collapseItemLink}
                    >
                      <span className={classes.collapseItemMini}>
                        <Apps />
                      </span>
                      <ListItemText
                        primary='DEPARTAMENTO'
                        secondary={
                          <b className={classes.caret + ' ' + (departamentCollapse ? classes.caretActive : '')} />
                        }
                        disableTypography={true}
                        className={cx({ [itemText]: false }, { [collapseItemText]: true })}
                      />
                    </NavLink>
                  </Tooltip>
                  <Collapse in={departamentCollapse} unmountOnExit>
                    <List className={classes.list + ' ' + classes.collapseList}>
                      <ListItem className={cx({ [classes.item]: true }, { [classes.collapseItem]: true })}>
                        <Tooltip title='LISTADO DEPARTAMENTOS' disableHoverListener={!miniActive}>
                          <NavLink
                            to={'/admin/departament-list'}
                            className={`${classes.itemLink}` + ' ' + classes.collapseItemLink}
                          >
                            <span className={classes.collapseItemMini}>
                              <FormatListBulleted />
                            </span>
                            <ListItemText
                              primary='LISTADO DEPARTAMENTOS'
                              disableTypography={true}
                              className={cx({ [itemText]: true }, { [collapseItemText]: false })}
                            />
                          </NavLink>
                        </Tooltip>
                      </ListItem>
                      <ListItem className={cx({ [classes.item]: true }, { [classes.collapseItem]: true })}>
                        <Tooltip title='ALTA DE DEPARTAMENTO' disableHoverListener={!miniActive}>
                          <NavLink
                            to={'/admin/departament-register'}
                            className={`${classes.itemLink}` + ' ' + classes.collapseItemLink}
                          >
                            <span className={classes.collapseItemMini}>
                              <PostAdd />
                            </span>
                            <ListItemText
                              primary='ALTA DE DEPARTAMENTO'
                              disableTypography={true}
                              className={cx({ [itemText]: true }, { [collapseItemText]: false })}
                            />
                          </NavLink>
                        </Tooltip>
                      </ListItem>
                    </List>
                  </Collapse>
                </ListItem>
              </List>
            )}
            {adminPermission && (
              <List className={classes.list + ' ' + classes.collapseList}>
                <ListItem className={cx({ [classes.item]: false }, { [classes.collapseItem]: true })}>
                  <Tooltip title='UNIDAD' disableHoverListener={!miniActive}>
                    <NavLink
                      to='#!'
                      onClick={() => setUnitCollapse(!unitCollapse)}
                      className={`${classes.itemLink}` + ' ' + classes.collapseItemLink}
                    >
                      <span className={classes.collapseItemMini}>
                        <Article />
                      </span>
                      <ListItemText
                        primary='UNIDAD'
                        secondary={<b className={classes.caret + ' ' + (unitCollapse ? classes.caretActive : '')} />}
                        disableTypography={true}
                        className={cx({ [itemText]: false }, { [collapseItemText]: true })}
                      />
                    </NavLink>
                  </Tooltip>
                  <Collapse in={unitCollapse} unmountOnExit>
                    <List className={classes.list + ' ' + classes.collapseList}>
                      <ListItem className={cx({ [classes.item]: true }, { [classes.collapseItem]: true })}>
                        <Tooltip title='LISTADO UNIDAD' disableHoverListener={!miniActive}>
                          <NavLink
                            to={'/admin/unit-list'}
                            className={`${classes.itemLink}` + ' ' + classes.collapseItemLink}
                          >
                            <span className={classes.collapseItemMini}>
                              <FormatListBulleted />
                            </span>
                            <ListItemText
                              primary='LISTADO UNIDAD'
                              disableTypography={true}
                              className={cx({ [itemText]: true }, { [collapseItemText]: false })}
                            />
                          </NavLink>
                        </Tooltip>
                      </ListItem>
                      <ListItem className={cx({ [classes.item]: true }, { [classes.collapseItem]: true })}>
                        <Tooltip title='ALTA DE UNIDAD' disableHoverListener={!miniActive}>
                          <NavLink
                            to={'/admin/unit-register'}
                            className={`${classes.itemLink}` + ' ' + classes.collapseItemLink}
                          >
                            <span className={classes.collapseItemMini}>
                              <PostAdd />
                            </span>
                            <ListItemText
                              primary='ALTA DE UNIDAD'
                              disableTypography={true}
                              className={cx({ [itemText]: true }, { [collapseItemText]: false })}
                            />
                          </NavLink>
                        </Tooltip>
                      </ListItem>
                    </List>
                  </Collapse>
                </ListItem>
              </List>
            )}
            {adminPermission && (
              <List className={classes.list + ' ' + classes.collapseList}>
                <ListItem className={cx({ [classes.item]: false }, { [classes.collapseItem]: true })}>
                  <Tooltip title='ROL' disableHoverListener={!miniActive}>
                    <NavLink
                      to='#!'
                      onClick={() => setRoleCollapse(!roleCollapse)}
                      className={`${classes.itemLink}` + ' ' + classes.collapseItemLink}
                    >
                      <span className={classes.collapseItemMini}>
                        <Lock />
                      </span>
                      <ListItemText
                        primary='ROL'
                        secondary={<b className={classes.caret + ' ' + (roleCollapse ? classes.caretActive : '')} />}
                        disableTypography={true}
                        className={cx({ [itemText]: false }, { [collapseItemText]: true })}
                      />
                    </NavLink>
                  </Tooltip>
                  <Collapse in={roleCollapse} unmountOnExit>
                    <List className={classes.list + ' ' + classes.collapseList}>
                      <ListItem className={cx({ [classes.item]: true }, { [classes.collapseItem]: true })}>
                        <Tooltip title='LISTADO ROL' disableHoverListener={!miniActive}>
                          <NavLink
                            to={'/admin/role-list'}
                            className={`${classes.itemLink}` + ' ' + classes.collapseItemLink}
                          >
                            <span className={classes.collapseItemMini}>
                              <FormatListBulleted />
                            </span>
                            <ListItemText
                              primary='LISTADO ROL'
                              disableTypography={true}
                              className={cx({ [itemText]: true }, { [collapseItemText]: false })}
                            />
                          </NavLink>
                        </Tooltip>
                      </ListItem>
                      <ListItem className={cx({ [classes.item]: true }, { [classes.collapseItem]: true })}>
                        <Tooltip title='ALTA DE ROL' disableHoverListener={!miniActive}>
                          <NavLink
                            to={'/admin/role-register'}
                            className={`${classes.itemLink}` + ' ' + classes.collapseItemLink}
                          >
                            <span className={classes.collapseItemMini}>
                              <PostAdd />
                            </span>
                            <ListItemText
                              primary='ALTA DE ROL'
                              disableTypography={true}
                              className={cx({ [itemText]: true }, { [collapseItemText]: false })}
                            />
                          </NavLink>
                        </Tooltip>
                      </ListItem>
                    </List>
                  </Collapse>
                </ListItem>
              </List>
            )}                                    
            {adminPermission && (
              <List className={classes.list + ' ' + classes.collapseList}>
                <ListItem className={cx({ [classes.item]: false }, { [classes.collapseItem]: true })}>
                  <Tooltip title='CONFIGURACIÓN' disableHoverListener={!miniActive}>
                    <NavLink
                      to='#!'
                      onClick={() => setConfCollapse(!confCollapse)}
                      className={`${classes.itemLink}` + ' ' + classes.collapseItemLink}
                    >
                      <span className={classes.collapseItemMini}>
                        <Construction />
                      </span>
                      <ListItemText
                        primary='CONFIGURACIÓN'
                        secondary={<b className={classes.caret + ' ' + (confCollapse ? classes.caretActive : '')} />}
                        disableTypography={true}
                        className={cx({ [itemText]: false }, { [collapseItemText]: true })}
                      />
                    </NavLink>
                  </Tooltip>
                  <Collapse in={confCollapse} unmountOnExit>
                    <List className={classes.list + ' ' + classes.collapseList}>
                      <ListItem className={cx({ [classes.item]: true }, { [classes.collapseItem]: true })}>
                        <Tooltip title='LISTADO CONFIGURACIÓN' disableHoverListener={!miniActive}>
                          <NavLink
                            to={'/admin/configuracion-list'}
                            className={`${classes.itemLink}` + ' ' + classes.collapseItemLink}
                          >
                            <span className={classes.collapseItemMini}>
                              <FormatListBulleted />
                            </span>
                            <ListItemText
                              primary='LISTADO CONFIGURACIÓN'
                              disableTypography={true}
                              className={cx({ [itemText]: true }, { [collapseItemText]: false })}
                            />
                          </NavLink>
                        </Tooltip>
                      </ListItem>
                      <ListItem className={cx({ [classes.item]: true }, { [classes.collapseItem]: true })}>
                        <Tooltip title='ALTA DE CONFIGURACIÓN' disableHoverListener={!miniActive}>
                          <NavLink
                            to={'/admin/configuracion-register'}
                            className={`${classes.itemLink}` + ' ' + classes.collapseItemLink}
                          >
                            <span className={classes.collapseItemMini}>
                              <PostAdd />
                            </span>
                            <ListItemText
                              primary='ALTA DE CONFIGURACIÓN'
                              disableTypography={true}
                              className={cx({ [itemText]: true }, { [collapseItemText]: false })}
                            />
                          </NavLink>
                        </Tooltip>
                      </ListItem>
                    </List>
                  </Collapse>
                </ListItem>
              </List>
            )}  
            {adminPermission && (
              <List className={classes.list + ' ' + classes.collapseList}>
                <ListItem className={cx({ [classes.item]: false }, { [classes.collapseItem]: true })}>
                  <Tooltip title='CALENDARIO FESTIVOS' disableHoverListener={!miniActive}>
                    <NavLink
                      to='#!'
                      onClick={() => setFestivosCollapse(!festivosCollapse)}
                      className={`${classes.itemLink}` + ' ' + classes.collapseItemLink}
                    >
                      <span className={classes.collapseItemMini}>
                        <InsertInvitation />
                      </span>
                      <ListItemText
                        primary='CALENDARIO FESTIVOS'
                        secondary={<b className={classes.caret + ' ' + (festivosCollapse ? classes.caretActive : '')} />}
                        disableTypography={true}
                        className={cx({ [itemText]: false }, { [collapseItemText]: true })}
                      />
                    </NavLink>
                  </Tooltip>
                  <Collapse in={festivosCollapse} unmountOnExit>
                    <List className={classes.list + ' ' + classes.collapseList}>
                      <ListItem className={cx({ [classes.item]: true }, { [classes.collapseItem]: true })}>
                        <Tooltip title='LISTADO FESTIVOS' disableHoverListener={!miniActive}>
                          <NavLink
                            to={'/admin/festivos-list'}
                            className={`${classes.itemLink}` + ' ' + classes.collapseItemLink}
                          >
                            <span className={classes.collapseItemMini}>
                              <FormatListBulleted />
                            </span>
                            <ListItemText
                              primary='LISTADO FESTIVOS'
                              disableTypography={true}
                              className={cx({ [itemText]: true }, { [collapseItemText]: false })}
                            />
                          </NavLink>
                        </Tooltip>
                      </ListItem>
                      <ListItem className={cx({ [classes.item]: true }, { [classes.collapseItem]: true })}>
                        <Tooltip title='ALTA DE FESTIVOS' disableHoverListener={!miniActive}>
                          <NavLink
                            to={'/admin/festivos-register'}
                            className={`${classes.itemLink}` + ' ' + classes.collapseItemLink}
                          >
                            <span className={classes.collapseItemMini}>
                              <PostAdd />
                            </span>
                            <ListItemText
                              primary='ALTA DE FESTIVOS'
                              disableTypography={true}
                              className={cx({ [itemText]: true }, { [collapseItemText]: false })}
                            />
                          </NavLink>
                        </Tooltip>
                      </ListItem>
                    </List>
                  </Collapse>
                </ListItem>
              </List>
            )}
          </Collapse>
        </ListItem>
      )}

      <ListItem
        className={cx({ [classes.item]: true }, { [classes.collapseItem]: true })}
        onClick={() => setOpenLogoutAlert(true)}
      >
        <Tooltip title='Salir de la aplicación' disableHoverListener={!miniActive}>
          <NavLink to={'#'} className={`${classes.itemLink}` + ' ' + classes.collapseItemLink}>
            <span className={classes.collapseItemMini}>
              <ExitToApp />
            </span>
            <ListItemText
              primary='Salir'
              disableTypography={true}
              className={cx({ [itemText]: true }, { [collapseItemText]: true })}
            />
          </NavLink>
        </Tooltip>
      </ListItem>
    </List>
  )

  const logoNormal = classes.logoNormal + ' ' + cx({ [classes.logoNormalSidebarMini]: miniActive })
  const logoClasses = classes.logo + ' ' + cx({ [classes.whiteAfter]: bgColor === 'white' })

  let brand = (
    <div className={logoClasses}>
      <a href='/admin/user-page' className={classes.logoMini}>
        <img src={logoMin} alt='logo' style={{ width: '34px' }} />
      </a>
      <a href='/admin/user-page' className={logoNormal}>
        <img src={logo} alt='logo' className={classes.img} />
      </a>
    </div>
  )

  const drawerPaper = classes.drawerPaper + ' ' + cx({ [classes.drawerPaperMini]: miniActive })
  const sidebarWrapper =
    classes.sidebarWrapper +
    ' ' +
    cx({
      [classes.drawerPaperMini]: miniActive,
      [classes.sidebarWrapperWithPerfectScrollbar]: navigator.platform.indexOf('Win') > -1,
    })

  const handleLogout = () => {
    setOpenLogoutAlert(false)
    dispatch(logout())
  }

  return (
    <div ref={mainPanel}>
      <Hidden mdUp implementation='css'>
        <Drawer
          variant='temporary'
          anchor='right'
          open={open}
          classes={{
            paper: drawerPaper + ' ' + classes[bgColor + 'Background'],
          }}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {brand}
          <SidebarWrapper className={sidebarWrapper} user={user} links={links} />
        </Drawer>
      </Hidden>
      <Hidden smDown implementation='css'>
        <Drawer
          // onMouseOver={() => setMiniActive(false)}
          // onMouseOut={() => setMiniActive(true)}
          anchor='left'
          variant='permanent'
          open
          classes={{
            paper: drawerPaper + ' ' + classes[bgColor + 'Background'],
          }}
        >
          {brand}
          <SidebarWrapper className={sidebarWrapper} user={user} links={links} />
        </Drawer>
      </Hidden>
      <CustomModal
        title='Cerrar Sesión'
        open={openLogoutAlert}
        setOpen={setOpenLogoutAlert}
        acceptText='Sí'
        acceptHandler={handleLogout}
      >
        <GridContainer>
          <GridItem xs={12}>
            <h4>¿Esta seguro que quiere salir de la aplicación?</h4>
          </GridItem>
        </GridContainer>
      </CustomModal>
    </div>
  )
}

Sidebar.defaultProps = {
  bgColor: 'blue',
}
Sidebar.propTypes = {
  bgColor: PropTypes.oneOf(['white', 'black', 'blue']),
  color: PropTypes.oneOf(['white', 'red', 'orange', 'green', 'blue', 'purple', 'rose']),
  logo: PropTypes.string,
  logoText: PropTypes.string,
  image: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object),
  miniActive: PropTypes.bool,
  open: PropTypes.bool,
  handleDrawerToggle: PropTypes.func,
}

export default Sidebar
