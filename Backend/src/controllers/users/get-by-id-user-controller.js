// 'use strict'

// const asyncHandler = require('express-async-handler')
// const User = require('../../mongoose/models/userModel')

// // @desc    GET users by id
// // @route   GET /api/users/:id
// // @access  Private/Editor
// const getUserById = asyncHandler(async (req, res) => {
//   const user = await User.findById(req.params.id).select('-password')
//   if (user) {
//     res.json(user)
//   } else {
//     res.status(404)
//     throw new Error('No se Encontró Usuario')
//   }
// })

// module.exports = getUserById
