const registerJobProfile = require('./register-job-profile-controller')
const updateJobProfile = require('./update-job-profile-controller')
const getJobProfiles = require('./get-job-profiles-controller')
const getJobProfileById = require('./get-job-profile-by-id-controller')
const deleteJobProfile = require('./delete-job-profile-controller')

module.exports = {
  registerJobProfile,
  updateJobProfile,
  getJobProfiles,
  getJobProfileById,
  deleteJobProfile,
}
