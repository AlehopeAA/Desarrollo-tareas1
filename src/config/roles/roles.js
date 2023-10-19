/**
 * (no responsable, ni gestor de datos, ni validador, ni gestor de perfiles ni administrador): Sólo verá sus datos (mi perfil) y sus actividades.
 */
const USUARIO_ROLE = 'usuario'

/**
 * Podrá ver sus datos (mi perfil) , sus actividades, su equipo de trabajo, las tareas y los informes de su equipo de trabajo.
 */
const RESPONSABLE_ROLE = 'responsable'

/**
 * Podrá ver sus datos (mi perfil) , sus actividades y la gestión de datos.
 */
const GESTOR_DE_DATOS_ROLE = 'datos'

/**
 * Podrá ver sus datos (mi perfil) , sus actividades, su equipo de trabajo, las tareas y los informes de su equipo de trabajo.
 */
const VALIDADOR_ROLE = 'validador'

/**
 * Podrá ver sus datos (mi perfil) , sus actividades y los catálogos.
 */
const GESTOR_DE_PERFILES_ROLE = 'gestor'

/**
 * Podrá ver sus datos (mi perfil) , sus actividades y los catálogos.
 */
const ADMIN_ROLE = 'administrador'

/**
 * Administrador
 */
const SUPER_ROLE = 'superadministrador'

const ALL_USER_ROLES = [
  USUARIO_ROLE,
  RESPONSABLE_ROLE,
  GESTOR_DE_DATOS_ROLE,
  VALIDADOR_ROLE,
  GESTOR_DE_PERFILES_ROLE,
  ADMIN_ROLE,
  SUPER_ROLE,
]

export default {
  ALL_USER_ROLES,
  USUARIO_ROLE,
  RESPONSABLE_ROLE,
  GESTOR_DE_DATOS_ROLE,
  VALIDADOR_ROLE,
  GESTOR_DE_PERFILES_ROLE,
  ADMIN_ROLE,
  SUPER_ROLE,
}
