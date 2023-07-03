// 'use strict'

// const asyncHandler = require('express-async-handler')
// const User = require('../../mongoose/models/userModel')

// // @desc    Delete users
// // @route   DELETE /api/users/:id
// // @access  Private/Super
// const deleteUser = asyncHandler(async (req, res) => {
//   const user = await User.findById(req.params.id)
//   if (user) {
//     await user.remove()
//     res.status(201).json({ message: 'Usuario Eliminado' })
//   } else {
//     res.status(404)
//     throw new Error('No se Encontró Usuario')
//   }
// })

// module.exports = deleteUser
