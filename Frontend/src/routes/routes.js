import role from 'config/roles/roles'
import {
  AccountBox,
  Assignment,
  FormatListBulleted,
  BusinessCenter,
  Class,
  CollectionsBookmark,
  FactCheck,
  LibraryAddCheck,
  HowToReg,
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
} from '@mui/icons-material'
import ValidacionScreen from 'screens/control-panel/ValidacionScreen/ValidacionScreen/ValidacionScreen'
import SupervisionScreen from 'screens/control-panel/ValidacionScreen/SupervisionScreen/SupervisionScreen'
import InformeIndividualScreen from 'screens/control-panel/InformesScreen/InformeIndividualScreen/InformeIndividualScreen'
import InformeAgregadoScreen from 'screens/control-panel/InformesScreen/InformeAgregadoScreen/InformeAgregadoScreen'
import ActivitiesListScreen from 'screens/control-panel/ActivitiesListScreen/ActivitiesListScreen'
import ActivitiesEquipoListScreen from 'screens/control-panel/ActivitiesEquipoListScreen/ActivitiesEquipoListScreen'
import ActivitiesRegisterScreen from 'screens/control-panel/ActivitiesListScreen/ActivitiesRegisterScreen/ActivitiesRegisterScreen'
import AltaProfileScreen from 'screens/control-panel/Catalog/Profile/AltaProfileScreen/AltaProfileScreen'
import AsignResponsibleScreen from 'screens/control-panel/AsignResponsibleScreen/AsignResponsibleScreen'
import AsignValidatorScreen from 'screens/control-panel/AsignValidatorScreen/AsignValidatorScreen'
import DepartamentListScreen from 'screens/control-panel/Catalog/Departament/DepartamentListScreen/DepartamentListScreen'
import PermissionListScreen from 'screens/control-panel/PermissionScreen/PermissionListScreen/PermissionListScreen'
import ProfileListScreen from 'screens/control-panel/Catalog/Profile/ProfileListScreen/ProfileListScreen'
import ProfileToManagerScreen from 'screens/control-panel/Catalog/Profile/ProfileToManagerScreen/ProfileToManagerScreen'
import RegisterDepartamentScreen from 'screens/control-panel/Catalog/Departament/RegisterDepartamentScreen/RegisterDepartamentScreen'
import RegisterRoleScreen from 'screens/control-panel/Catalog/Role/RegisterRoleScreen/RegisterRoleScreen'
import RegisterServiceScreen from 'screens/control-panel/Catalog/Service/RegisterServiceScreen/RegisterServiceScreen'
import RegisterSubdirectionScreen from 'screens/control-panel/Catalog/Subdirection/RegisterSubdirectionScreen/RegisterSubdirectionScreen'
import RegisterTaskAbsenceScreen from 'screens/control-panel/Catalog/TaskAbsence/RegisterTaskAbsenceScreen/RegisterTaskAbsenceScreen'
import RegisterTaskGeneralScreen from 'screens/control-panel/Catalog/TaskGeneral/RegisterTaskGeneralScreen/RegisterTaskGeneralScreen'
import RegisterTaskOtherScreen from 'screens/control-panel/Catalog/TaskOther/RegisterTaskOtherScreen/RegisterTaskOtherScreen'
import RegisterTaskSpecificScreen from 'screens/control-panel/Catalog/TaskSpecific/RegisterTaskSpecificScreen/RegisterTaskSpecificScreen'
import RegisterUnitScreen from 'screens/control-panel/Catalog/Unit/RegisterUnitScreen/RegisterUnitScreen'
import RoleListScreen from 'screens/control-panel/Catalog/Role/RoleListScreen/RoleListScreen'
import ServiceListScreen from 'screens/control-panel/Catalog/Service/ServiceListScreen/ServiceListScreen'
import SubdirectionListScreen from 'screens/control-panel/Catalog/Subdirection/SubdirectionListScreen/SubdirectionListScreen'
import TaskAbsenceListScreen from 'screens/control-panel/Catalog/TaskAbsence/TaskAbsenceListScreen/TaskAbsenceListScreen'
import TaskGeneralListScreen from 'screens/control-panel/Catalog/TaskGeneral/TaskGeneralListScreen/TaskGeneralListScreen'
import TaskListScreen from 'screens/control-panel/Catalog/Task/TaskListScreen/TaskListScreen'
import TaskOtherListScreen from 'screens/control-panel/Catalog/TaskOther/TaskOtherListScreen/TaskOtherListScreen'
import TaskRegisterScreen from 'screens/control-panel/Catalog/Task/TaskRegisterScreen/TaskRegisterScreen'
import TaskSpecificListScreen from 'screens/control-panel/Catalog/TaskSpecific/TaskSpecificListScreen/TaskSpecificListScreen'
import TeamWorkList from 'screens/control-panel/TeamWork/List/TeamWorkList'
import UnitListScreen from 'screens/control-panel/Catalog/Unit/UnitListScreen/UnitListScreen'
import ConfiguracionListScreen from 'screens/control-panel/Catalog/Configuracion/ConfiguracionListScreen/ConfiguracionListScreen'
import RegisterConfiguracionScreen from 'screens/control-panel/Catalog/Configuracion/RegisterConfiguracionScreen/RegisterConfiguracionScreen'
import FestivosListScreen from 'screens/control-panel/Catalog/Festivos/FestivosListScreen/FestivosListScreen'
import RegisterFestivosScreen from 'screens/control-panel/Catalog/Festivos/RegisterFestivosScreen/RegisterFestivosScreen'
import UserProfileScreen from 'screens/control-panel/UserProfileScreen/UserProfileScreen'
import AsignFavoriteTasksModal from 'components/AsignFavoriteTasksModal/AsignFavoriteTasksModal'
import ViewObjectivesScreen from 'screens/control-panel/ViewObjectivesScreen/ViewObjectivesScreen'
import ViewLevelWorkScreen from 'screens/control-panel/ViewLevelWorkScreen/ViewLevelWorkScreen'
// import ObjetiveAbsenceRegister from 'screens/control-panel/Catalog/ObjetivesAbsence/ObjetiveAbsenceRegisterScreen/ObjetiveAbsenceRegisterScreen'
import { PostAdd } from '@material-ui/icons'
import RegisterUserScreen from 'screens/control-panel/RegisterUserScreen/RegisterUserScreen'
import AssignPermissionScreen from 'screens/control-panel/PermissionScreen/AssignPermissionScreen/AssignPermissionScreen'
import AssignPermissionListScreen from 'screens/control-panel/PermissionScreen/AssignPermissionListScreen/AssignPermissionListScreen'
import EntryManagerListScreen from 'screens/control-panel/Catalog/EntryManager/EntryManagerListScreen/EntryManagerListScreen'
import RegisterEntryManagerScreen from 'screens/control-panel/Catalog/EntryManager/RegisterEntryManager/RegisterEntryManagerScreen'
import DifficultyManagerListScreen from 'screens/control-panel/Catalog/DifficultyManager/DifficultyManager/DifficultyManagerListScreen'
import RegisterDifficultyManagerScreen from 'screens/control-panel/Catalog/DifficultyManager/RegisterDifficultyManagerScreen/RegisterDifficultyManagerScreen'
import ObjetiveGeneralRegisterScreen from 'screens/control-panel/Catalog/ObjetivesGeneral/ObjetiveGeneralRegisterScreen/ObjetiveGeneralRegisterScreen'
import ObjetiveSpecificRegisterScreen from 'screens/control-panel/Catalog/ObjetivesSpecifics/ObjetiveSpecificRegisterScreen/ObjetiveSpecificRegisterScreen'
import ObjetiveOrdExtOtherRegisterScreen from 'screens/control-panel/Catalog/ObjetivesOrdExtOther/ObjetiveOrdExtOtherRegister/ObjetiveOrdExtOtherRegister'
import ObjetiveAbsenceRegisterScreen from 'screens/control-panel/Catalog/ObjetivesAbsence/ObjetiveAbsenceRegisterScreen/ObjetiveAbsenceRegisterScreen'
import ObjetiveAbsenceListScreen from 'screens/control-panel/Catalog/ObjetivesAbsence/ObjetivesAbsenceListScreen/ObjetivesAbsenceListScreen'
import ObjetiveGeneralListScreen from 'screens/control-panel/Catalog/ObjetivesGeneral/ObjetivesGeneralListScreen/ObjetivesGeneralListScreen'
import ObjetiveSpecificListScreen from 'screens/control-panel/Catalog/ObjetivesSpecifics/ObjectiveSpecificListScreen/ObjetivesSpecificListScreen'
import ObjetiveOrdExtOtherListScreen from 'screens/control-panel/Catalog/ObjetivesOrdExtOther/ObjectivesOrdExtOtherListScreen/ObjetivesOrdExtOtherListScreen'
import AsignEntriesList from 'screens/control-panel/AsignEntriesScreen/AsignEntriesList/AsignEntriesList'
import AsignEntryRegister from 'screens/control-panel/AsignEntriesScreen/AsignEntryRegister/AsignEntryRegister'
import AsignDificultiesList from 'screens/control-panel/AsignDificultiesScreen/AsignDificultiesList/AsignDificultiesList'
import AsignDificultyRegister from 'screens/control-panel/AsignDificultiesScreen/AsignDificultiesRegister/AsignDificultyRegister'
import TaskSharedListScreen from 'screens/control-panel/Catalog/TaskShared/TaskSharedListScreen/TaskSharedListScreen'
import TasksSharedRegister from 'screens/control-panel/Catalog/TaskShared/TaskSharedRegisterScreen/TaskSharedRegisterScreen'
import AcumulativesTasksListScreen from 'screens/control-panel/AcumulativesTasks/AcumulativesTasksListScreen/AcumulativesTasksListScreen'
import AcumulativesTasksRegister from 'screens/control-panel/AcumulativesTasks/AcumulativesTasksRegisterScreen/AcumulativesTasksRegisterScreen'
import DashboardScreen from 'screens/control-panel/DashboardScreen/DashboardScreen'

var dashRoutes = [
  {
    path: '/dashboard',
    name: 'CUADRO DE MANDOS',
    icon: AccountBox,
    component: DashboardScreen,
    layout: '/admin',
    role: [role.RESPONSABLE_ROLE, role.VALIDADOR_ROLE],
  },
  {
    path: '/user-page',
    name: 'MI PERFIL',
    icon: AccountBox,
    component: UserProfileScreen,
    layout: '/admin',
    role: role.ALL_USER_ROLES,
  },
  {
    path: '/assignFavorites',
    name: 'Asignar Tareas Favoritas',
    icon: PostAdd,
    component: AsignFavoriteTasksModal,
    layout: '/admin',
    role: role.ALL_USER_ROLES,
  },
  {
    path: '/viewObjectives',
    name: 'Ver objetivos de desempeño',
    icon: PostAdd,
    component: ViewObjectivesScreen,
    layout: '/admin',
    role: role.ALL_USER_ROLES,
  },
  {
    path: '/viewLevelWork',
    name: 'Ver desempeño',
    icon: PostAdd,
    component: ViewLevelWorkScreen,
    layout: '/admin',
    role: role.ALL_USER_ROLES,
  },
  {
    collapse: true,
    name: 'ACTIVIDADES',
    icon: Assignment,
    state: 'activities',
    role: role.ALL_USER_ROLES,
    views: [
      {
        path: '/activity-list',
        name: 'Mis Actividades',
        icon: FormatListBulleted,
        component: ActivitiesListScreen,
        layout: '/admin',
        role: role.ALL_USER_ROLES,
      },
      {
        path: '/activity-equipo-list',
        name: 'Actividades Equipo',
        icon: FormatListBulleted,
        component: ActivitiesEquipoListScreen,
        layout: '/admin',
        role: [role.RESPONSABLE_ROLE, role.VALIDADOR_ROLE, role.SUPER_ROLE, role.GESTOR_DE_PERFILES_ROLE, role.ADMIN_ROLE],
      },
      {
        path: '/alta-list',
        name: 'Alta Actividad',
        icon: PostAdd,
        component: ActivitiesRegisterScreen,
        layout: '/admin',
        role: role.ALL_USER_ROLES,
      },
    ],
  },
  {
    collapse: true,
    name: 'EQUIPO DE TRABAJO',
    icon: Groups,
    state: 'teamWorkCollapse',
    role: [role.RESPONSABLE_ROLE, role.VALIDADOR_ROLE, role.SUPER_ROLE, role.GESTOR_DE_PERFILES_ROLE, role.ADMIN_ROLE],
    views: [
      {
        path: '/teamwork-list',
        name: 'Listado Equipo de trabajo',
        icon: FormatListBulleted,
        component: TeamWorkList,
        layout: '/admin',
        role: [
          role.RESPONSABLE_ROLE,
          role.VALIDADOR_ROLE,
          role.GESTOR_DE_PERFILES_ROLE,
          role.SUPER_ROLE,
          role.ADMIN_ROLE,
        ],
      },
      {
        path: '/teamwork-asign-responsable',
        name: 'Asignar Responsable',
        icon: PostAdd,
        component: AsignResponsibleScreen,
        layout: '/admin',
        role: [role.SUPER_ROLE, role.GESTOR_DE_PERFILES_ROLE],
      },
      {
        path: '/teamwork-asign-validador',
        name: 'Asignar Validador',
        icon: PostAdd,
        component: AsignValidatorScreen,
        layout: '/admin',
        role: [role.SUPER_ROLE, role.GESTOR_DE_PERFILES_ROLE],
      },
      {
        path: '/users-register',
        name: 'Alta Puesto de Trabajo',
        icon: PostAdd,
        component: RegisterUserScreen,
        layout: '/admin',
        role: [role.SUPER_ROLE, role.GESTOR_DE_PERFILES_ROLE, role.ADMIN_ROLE],
      },
    ],
  },
  {
    collapse: true,
    name: 'VALIDACIÓN',
    icon: FactCheck,
    state: 'validacionCollapse',
    role: [role.RESPONSABLE_ROLE, role.VALIDADOR_ROLE],
    views: [
      {
        path: '/validacion-supervision',
        name: 'Supervisión',
        icon: HowToReg,
        component: SupervisionScreen,
        layout: '/admin',
        role: [role.RESPONSABLE_ROLE],
      },
      {
        path: '/validacion-validador',
        name: 'Validación',
        icon: LibraryAddCheck,
        component: ValidacionScreen,
        layout: '/admin',
        role: [role.VALIDADOR_ROLE],
      },
    ],
  },
  {
    collapse: true,
    name: 'INFORMES',
    icon: BusinessCenter,
    state: 'informeCollapse',
    role: [role.RESPONSABLE_ROLE, role.VALIDADOR_ROLE],
    views: [
      {
        path: '/informe-individual',
        name: 'Informe Individual',
        icon: Class,
        component: InformeIndividualScreen,
        layout: '/admin',
        role: [role.RESPONSABLE_ROLE, role.VALIDADOR_ROLE],
      },
      {
        path: '/informe-agregado',
        name: 'Informe Agregado',
        icon: CollectionsBookmark,
        component: InformeAgregadoScreen,
        layout: '/admin',
        role: [role.RESPONSABLE_ROLE, role.VALIDADOR_ROLE],
      },
    ],
  },
  {
    collapse: true,
    name: 'TAREAS',
    icon: Task,
    state: 'TasksCollapse',
    role: [role.ADMIN_ROLE, role.GESTOR_DE_PERFILES_ROLE, role.SUPER_ROLE],
    views: [      
      {
        collapse: true,
        name: 'TAREAS AUSENCIAS',
        icon: Task,
        state: 'TasksAbsenceCollapse',
        layout: '/admin',
        role: [role.ADMIN_ROLE, role.SUPER_ROLE],
        views: [
          {
            path: '/tasks-absence-list',
            name: 'Listado Ausencias',
            icon: FormatListBulleted,
            component: TaskAbsenceListScreen,
            layout: '/admin',
            role: [role.ADMIN_ROLE, role.SUPER_ROLE],
          },
          {
            path: '/tasks-absence-register',
            name: 'Alta Tareas',
            icon: PostAdd,
            component: RegisterTaskAbsenceScreen,
            layout: '/admin',
            role: [role.ADMIN_ROLE, role.SUPER_ROLE],
          },
        ],
      },
      {
        collapse: true,
        name: 'TAREAS GENERALES',
        icon: Task,
        state: 'TasksGeneralCollapse',
        layout: '/admin',
        role: [role.ADMIN_ROLE, role.SUPER_ROLE],
        views: [
          {
            path: '/tasks-general-list',
            name: 'Listado Generales',
            icon: FormatListBulleted,
            component: TaskGeneralListScreen,
            layout: '/admin',
            role: [role.ADMIN_ROLE, role.SUPER_ROLE],
          },
          {
            path: '/tasks-general-register',
            name: 'Alta Tareas',
            icon: PostAdd,
            component: RegisterTaskGeneralScreen,
            layout: '/admin',
            role: [role.ADMIN_ROLE, role.SUPER_ROLE],
          },
        ],
      },
      {
        collapse: true,
        name: 'TAREAS ESPECIFICAS',
        icon: Task,
        state: 'TasksSpecificCollapse',
        layout: '/admin',
        role: [role.GESTOR_DE_PERFILES_ROLE, role.SUPER_ROLE],
        views: [
          {
            path: '/tasks-specific-list',
            name: 'Listado Especificas',
            icon: FormatListBulleted,
            component: TaskSpecificListScreen,
            layout: '/admin',
            role: [role.GESTOR_DE_PERFILES_ROLE, role.SUPER_ROLE],
          },
          {
            path: '/tasks-specific-register',
            name: 'Alta Tareas',
            icon: PostAdd,
            component: RegisterTaskSpecificScreen,
            layout: '/admin',
            role: [role.GESTOR_DE_PERFILES_ROLE, role.SUPER_ROLE],
          },
        ],
      },
      {
        collapse: true,
        name: 'TAREAS ORD/EXT',
        icon: Task,
        state: 'TasksOtherCollapse',
        layout: '/admin',
        role: [role.GESTOR_DE_PERFILES_ROLE, role.SUPER_ROLE],
        views: [
          {
            path: '/tasks-ord-ext-list',
            name: 'Listado',
            icon: FormatListBulleted,
            component: TaskOtherListScreen,
            layout: '/admin',
            role: [role.GESTOR_DE_PERFILES_ROLE, role.SUPER_ROLE],
          },
          {
            path: '/tasks-ord-ext-register',
            name: 'Alta Tareas',
            icon: PostAdd,
            component: RegisterTaskOtherScreen,
            layout: '/admin',
            role: [role.GESTOR_DE_PERFILES_ROLE, role.SUPER_ROLE],
          },
        ],
      },
    ],
  },
  {
    collapse: true,
    name: 'REGISTRAR ENTRADAS',
    icon: Assignment,
    state: 'entries',
    role: role.GESTOR_DE_DATOS_ROLE,
    views: [
      {
        path: '/entries-list',
        name: 'Listado de Entradas',
        icon: FormatListBulleted,
        component: AsignEntriesList,
        layout: '/admin',
        role: role.GESTOR_DE_DATOS_ROLE,
      },
      {
        path: '/entries-register',
        name: 'Alta de Entradas',
        icon: FormatListBulleted,
        component: AsignEntryRegister,
        layout: '/admin',
        role: role.GESTOR_DE_DATOS_ROLE,
      },
    ],
  },
  {
    collapse: true,
    name: 'REGISTRAR DIFICULTADES',
    icon: Assignment,
    state: 'dificulties',
    role: role.GESTOR_DE_DATOS_ROLE,
    views: [
      {
        path: '/dificulties-list',
        name: 'Listado de Dificultades',
        icon: FormatListBulleted,
        component: AsignDificultiesList,
        layout: '/admin',
        role: role.GESTOR_DE_DATOS_ROLE,
      },
      {
        path: '/dificulties-register',
        name: 'Alta de Dificultades',
        icon: FormatListBulleted,
        component: AsignDificultyRegister,
        layout: '/admin',
        role: role.GESTOR_DE_DATOS_ROLE,
      },
    ],
  },
  {
    collapse: true,
    name: 'TAREAS COMPARTIDAS',
    icon: Task,
    state: 'TasksShareCollapse',
    layout: '/admin',
    role: [role.ADMIN_ROLE, role.GESTOR_DE_PERFILES_ROLE, role.SUPER_ROLE],
    views: [
      {
        path: '/tasks-shared-list',
        name: 'Listado Compartidas',
        icon: FormatListBulleted,
        component: TaskSharedListScreen,
        layout: '/admin',
        role: [role.ADMIN_ROLE, role.GESTOR_DE_PERFILES_ROLE, role.SUPER_ROLE],
      },
      {
        path: '/tasks-shared-register',
        name: 'Editar % de responsabilidad',
        icon: PostAdd,
        component: TasksSharedRegister,
        layout: '/admin',
        role: [role.ADMIN_ROLE, role.GESTOR_DE_PERFILES_ROLE, role.SUPER_ROLE],
      },
    ],
  },
  {
    collapse: true,
    name: 'TAREAS ACUMULATIVAS',
    icon: Task,
    state: 'TasksAcumulativaCollapse',
    layout: '/admin',
    role: [role.ADMIN_ROLE, role.GESTOR_DE_PERFILES_ROLE, role.SUPER_ROLE],
    views: [
      {
        path: '/tasks-acumulative-list',
        name: 'Listado Acumulativas',
        icon: FormatListBulleted,
        component: AcumulativesTasksListScreen,
        layout: '/admin',
        role: [role.ADMIN_ROLE, role.GESTOR_DE_PERFILES_ROLE, role.SUPER_ROLE],
      },
      {
        path: '/tasks-acumulative-register',
        name: 'Alta tareas acumulativas',
        icon: PostAdd,
        component: AcumulativesTasksRegister,
        layout: '/admin',
        role: [role.ADMIN_ROLE, role.GESTOR_DE_PERFILES_ROLE, role.SUPER_ROLE],
      },
    ],
  },
  {
    collapse: true,
    name: 'OBJETIVOS',
    icon: MilitaryTech,
    state: 'objectivesCollapse',
    role: [role.ADMIN_ROLE, role.GESTOR_DE_PERFILES_ROLE, role.SUPER_ROLE],
    views: [
      {
        collapse: true,
        name: 'Objetivos Tareas de Ausencia',
        icon: MilitaryTech,
        state: 'objectivesAbsenceCollapse',
        role: [role.ADMIN_ROLE, role.SUPER_ROLE],
        views: [
          {
            path: '/objectives-list-absence',
            name: 'Listado de Objetivos',
            icon: FormatListBulleted,
            role: [role.ADMIN_ROLE, role.SUPER_ROLE],
            component: ObjetiveAbsenceListScreen,
            layout: '/admin',
          },
          {
            path: '/objectives-register-absence',
            name: 'Alta Objetivos de Ausencias',
            icon: PostAdd,
            component: ObjetiveAbsenceRegisterScreen,
            layout: '/admin',
            role: [role.ADMIN_ROLE, role.SUPER_ROLE],
          },
        ],
      },
      {
        collapse: true,
        name: 'Objetivos Tareas Generales',
        icon: MilitaryTech,
        state: 'objectivesGeneralCollapse',
        role: [role.ADMIN_ROLE, role.SUPER_ROLE],
        views: [
          {
            path: '/objectives-general-list',
            name: 'Listado de Objetivos',
            icon: FormatListBulleted,
            role: [role.ADMIN_ROLE, role.SUPER_ROLE],
            component: ObjetiveGeneralListScreen,
            layout: '/admin',
          },
          {
            path: '/objectives-general-register',
            name: 'Alta de Objetivos',
            icon: PostAdd,
            component: ObjetiveGeneralRegisterScreen,
            layout: '/admin',
            role: [role.ADMIN_ROLE, role.SUPER_ROLE],
          },
        ],
      },
      {
        collapse: true,
        name: 'Objetivos Tareas ord/ext',
        icon: MilitaryTech,
        state: 'objectivesOrdExtCollapse',
        role: [role.GESTOR_DE_PERFILES_ROLE, role.SUPER_ROLE],
        views: [
          {
            path: '/objectives-ord-ext-list',
            name: 'Listado de Objetivos',
            icon: FormatListBulleted,
            role: [role.GESTOR_DE_PERFILES_ROLE, role.SUPER_ROLE],
            component: ObjetiveOrdExtOtherListScreen,
            layout: '/admin',
          },
          {
            path: '/objectives-ord-ext-register',
            name: 'Alta de Objetivos',
            icon: PostAdd,
            component: ObjetiveOrdExtOtherRegisterScreen,
            layout: '/admin',
            role: [role.GESTOR_DE_PERFILES_ROLE, role.SUPER_ROLE],
          },
        ],
      },
      {
        collapse: true,
        name: 'Objetivos Tareas Especificas',
        icon: MilitaryTech,
        state: 'objectivesSpecificCollapse',
        role: [role.GESTOR_DE_PERFILES_ROLE, role.SUPER_ROLE],
        views: [
          {
            path: '/objectives-list-specific',
            name: 'Listado de Objetivos',
            icon: FormatListBulleted,
            role: [role.GESTOR_DE_PERFILES_ROLE, role.SUPER_ROLE],
            component: ObjetiveSpecificListScreen,
            layout: '/admin',
          },
          {
            path: '/objectives-register-specific',
            name: 'Alta de Objetivos',
            icon: PostAdd,
            component: ObjetiveSpecificRegisterScreen,
            layout: '/admin',
            role: [role.GESTOR_DE_PERFILES_ROLE, role.SUPER_ROLE],
          },
        ],
      },
    ],
  },
  {
    collapse: true,
    name: 'CATÁLOGOS',
    icon: LocalLibrary,
    state: 'catalogsCollapse',
    role: [role.ADMIN_ROLE, role.GESTOR_DE_PERFILES_ROLE, role.GESTOR_DE_DATOS_ROLE, role.SUPER_ROLE],
    views: [
      {
        collapse: true,
        name: 'PERFILES',
        icon: PersonSearch,
        state: 'profileCollapse',
        role: [role.ADMIN_ROLE, role.GESTOR_DE_PERFILES_ROLE, role.SUPER_ROLE],
        views: [
          {
            path: '/profile-list',
            name: 'Listado Perfiles',
            icon: FormatListBulleted,
            component: ProfileListScreen,
            role: [role.ADMIN_ROLE, role.GESTOR_DE_PERFILES_ROLE, role.SUPER_ROLE],
            layout: '/admin',
          },
          {
            path: '/profile-register',
            name: 'Alta Perfiles',
            icon: PostAdd,
            component: AltaProfileScreen,
            layout: '/admin',
            role: [role.GESTOR_DE_PERFILES_ROLE, , role.SUPER_ROLE],
          },
          {
            path: '/asign-profile',
            name: 'Asignar Perfil',
            icon: PostAdd,
            component: ProfileToManagerScreen,
            layout: '/admin',
            role: [role.ADMIN_ROLE, role.SUPER_ROLE],
          },
        ],
      },
      {
        collapse: true,
        name: 'GESTOR ENTRADAS',
        icon: PersonSearch,
        state: 'entradasCollapse',
        role: [role.ADMIN_ROLE, role.SUPER_ROLE],
        views: [
          {
            path: '/entrada-list',
            name: 'Listado Entradas',
            icon: FormatListBulleted,
            role: [role.ADMIN_ROLE, role.SUPER_ROLE],
            component: EntryManagerListScreen,
            layout: '/admin',
          },
          {
            path: '/entrada-manager-register',
            name: 'Alta Entradas',
            icon: PostAdd,
            component: RegisterEntryManagerScreen,
            layout: '/admin',
            role: [role.ADMIN_ROLE, role.SUPER_ROLE],
          },
        ],
      },
      {
        collapse: true,
        name: 'GESTOR DIFICULTAD',
        icon: PersonSearch,
        state: 'dificultadsCollapse',
        role: [role.ADMIN_ROLE, role.SUPER_ROLE],
        views: [
          {
            path: '/dificultas-list',
            name: 'Listado Dificultad',
            icon: FormatListBulleted,
            role: [role.ADMIN_ROLE, role.SUPER_ROLE],
            component: DifficultyManagerListScreen,
            layout: '/admin',
          },
          {
            path: '/dificultad-register',
            name: 'Alta Gestor Dificultad',
            icon: PostAdd,
            component: RegisterDifficultyManagerScreen,
            layout: '/admin',
            role: [role.ADMIN_ROLE, role.SUPER_ROLE],
          },
        ],
      },
      {
        collapse: true,
        name: 'GESTION PERMISOS',
        icon: Assignment,
        FormatListBulleted,
        state: 'permissions',
        role: [role.ADMIN_ROLE, role.SUPER_ROLE],
        views: [
          {
            path: '/assign-permission-list',
            name: 'Listado',
            icon: FormatListBulleted,
            component: AssignPermissionListScreen,
            layout: '/admin',
            role: [role.ADMIN_ROLE, role.SUPER_ROLE],
          },
          {
            path: '/assign-permission',
            name: 'Asignar Permiso',
            icon: PostAdd,
            component: AssignPermissionScreen,
            layout: '/admin',
            role: [role.ADMIN_ROLE, role.SUPER_ROLE],
          },
        ],
      },
      {
        collapse: true,
        name: 'SUBDIRECCION',
        icon: AccountBox,
        state: 'subDirectionCollapse',
        role: [role.ADMIN_ROLE, role.SUPER_ROLE],
        views: [
          {
            path: '/subdirection-list',
            name: 'Listado Subdireccion',
            icon: FormatListBulleted,
            role: [role.ADMIN_ROLE, role.SUPER_ROLE],
            component: SubdirectionListScreen,
            layout: '/admin',
          },
          {
            path: '/subdirection-register',
            name: 'Alta Subdirección',
            icon: PostAdd,
            component: RegisterSubdirectionScreen,
            layout: '/admin',
            role: [role.ADMIN_ROLE, role.SUPER_ROLE],
          },
        ],
      },
      {
        collapse: true,
        name: 'SERVICIO',
        icon: MiscellaneousServices,
        state: 'serviceCollapse',
        role: [role.ADMIN_ROLE, role.SUPER_ROLE],
        views: [
          {
            path: '/service-list',
            name: 'Listado Servicio',
            icon: FormatListBulleted,
            role: [role.ADMIN_ROLE, role.SUPER_ROLE],
            component: ServiceListScreen,
            layout: '/admin',
          },
          {
            path: '/service-register',
            name: 'Alta Servicio',
            icon: PostAdd,
            component: RegisterServiceScreen,
            layout: '/admin',
            role: [role.ADMIN_ROLE, role.SUPER_ROLE],
          },
        ],
      },
      {
        collapse: true,
        name: 'DEPARTAMENTO',
        icon: Apps,
        state: 'departamentCollapse',
        role: [role.ADMIN_ROLE, role.SUPER_ROLE],
        views: [
          {
            path: '/departament-list',
            name: 'Lista Departamentos',
            icon: FormatListBulleted,
            role: [role.ADMIN_ROLE, role.SUPER_ROLE],
            component: DepartamentListScreen,
            layout: '/admin',
          },
          {
            path: '/departament-register',
            name: 'Alta Departamento',
            icon: PostAdd,
            component: RegisterDepartamentScreen,
            layout: '/admin',
            role: [role.ADMIN_ROLE, role.SUPER_ROLE],
          },
        ],
      },
      {
        collapse: true,
        name: 'UNIDAD',
        icon: Article,
        state: 'unitCollapse',
        role: [role.ADMIN_ROLE, role.SUPER_ROLE],
        views: [
          {
            path: '/unit-list',
            name: 'Listado Unidad',
            icon: FormatListBulleted,
            role: [role.ADMIN_ROLE, role.SUPER_ROLE],
            component: UnitListScreen,
            layout: '/admin',
          },
          {
            path: '/unit-register',
            name: 'Alta Unidad',
            icon: PostAdd,
            component: RegisterUnitScreen,
            layout: '/admin',
            role: [role.ADMIN_ROLE, role.SUPER_ROLE],
          },
        ],
      },
      {
        collapse: true,
        name: 'CONFIGURACIÓN',
        icon: Article,
        state: 'unitCollapse',
        role: [role.ADMIN_ROLE, role.SUPER_ROLE],
        views: [
          {
            path: '/configuracion-list',
            name: 'Listado Parámetros Configuración',
            icon: FormatListBulleted,
            role: [role.ADMIN_ROLE, role.SUPER_ROLE],
            component: ConfiguracionListScreen,
            layout: '/admin',
          },
          {
            path: '/configuracion-register',
            name: 'Alta Parámetro Configuración',
            icon: PostAdd,
            component: RegisterConfiguracionScreen,
            layout: '/admin',
            role: [role.ADMIN_ROLE, role.SUPER_ROLE],
          },
        ],
      },
      {
        collapse: true,
        name: 'CALENDARIO FESTIVOS',
        icon: Article,
        state: 'unitCollapse',
        role: [role.ADMIN_ROLE, role.SUPER_ROLE],
        views: [
          {
            path: '/festivos-list',
            name: 'Listado Festivos',
            icon: FormatListBulleted,
            role: [role.ADMIN_ROLE, role.SUPER_ROLE],
            component: FestivosListScreen,
            layout: '/admin',
          },
          {
            path: '/festivos-register',
            name: 'Alta Festivo',
            icon: PostAdd,
            component: RegisterFestivosScreen,
            layout: '/admin',
            role: [role.ADMIN_ROLE, role.SUPER_ROLE],
          },
        ],
      },
      {
        collapse: true,
        name: 'ROL',
        icon: Lock,
        state: 'roleCollapse',
        role: [role.ADMIN_ROLE, role.SUPER_ROLE],
        views: [
          {
            path: '/role-list',
            name: 'Listado Rol',
            icon: FormatListBulleted,
            role: [role.ADMIN_ROLE, role.SUPER_ROLE],
            component: RoleListScreen,
            layout: '/admin',
          },
          {
            path: '/role-register',
            name: 'Alta Rol',
            icon: PostAdd,
            component: RegisterRoleScreen,
            layout: '/admin',
            role: [role.ADMIN_ROLE, role.SUPER_ROLE],
          },
        ],
      },
    ],
  },
]

export default dashRoutes
