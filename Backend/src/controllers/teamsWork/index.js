const getTeamsWorkByResponsible = require('./get-teams-work-by-responsible-controller')
const getTeamsWorkByValidator = require('./get-teams-work-by-validator-controller')
const registerOrUpdateTeamWorkByResponsable = require('./register-or-update-team-work-by-responsible-controller')
const registerOrUpdateTeamWorkByValidator = require('./register-or-update-team-work-by-validator-controller')
const getTeamsWorkList = require('./get-teams-work-list-controller')

module.exports = {
  getTeamsWorkByResponsible,
  getTeamsWorkList,
  getTeamsWorkByValidator,
  registerOrUpdateTeamWorkByResponsable,
  registerOrUpdateTeamWorkByValidator,
}
