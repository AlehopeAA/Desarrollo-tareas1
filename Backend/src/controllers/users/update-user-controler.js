// 'use strict'

// const asyncHandler = require('express-async-handler')
// const User = require('../../mongoose/models/userModel')
// const generateToken = require('../../utils/generateToken')
// const determineRole = require('../../utils/determineRole')

// // @desc    Update user
// // @route   PUT /api/users/:id && /api/users/my/:id
// // @access  Private
// const updateUser = asyncHandler(async (req, res) => {
//   const { avatar, name, email, password, phone, role, isAdmin, isSuper, status } = req.body

//   const emailDuplicated = await User.findOne({
//     $and: [{ _id: { $ne: req.params.id } }, { email }],
//   })

//   if (emailDuplicated) {
//     res.status(400)
//     throw new Error('Ya existe un usuario con este correo electrónico.')
//   }

//   const user = await User.findById(req.params.id)

//   if (user) {
//     user.avatar = avatar || user.avatar
//     if (name !== user.name && user.isDefaultName) {
//       user.isDefaultName = false
//     }
//     user.name = name || user.name
//     user.email = email || user.email

//     if (password) {
//       user.password = password
//       user.isDefaultPassword = false
//     }

//     const isActive = status === 'Activo' || status === 'active'

//     if (status) {
//       if (isActive) {
//         user.status = 'active'
//       } else {
//         user.status = 'inactive'
//       }
//     }

//     if (role) {
//       user.role = determineRole(isSuper, isAdmin)
//       user.isAdmin = isAdmin == undefined ? user.isAdmin : isAdmin
//       user.isSuper = isSuper == undefined ? user.isSuper : isSuper
//     }

//     user.phone = phone || user.phone

//     const updatedUser = await user.save()

//     const admin = updatedUser.isAdmin
//       ? {
//           isAdmin: updatedUser.isAdmin,
//         }
//       : null

//     const superadmin = updatedUser.isSuper
//       ? {
//           isSuper: updatedUser.isSuper,
//         }
//       : null

//     const userInfo = {
//       _id: updatedUser._id,
//       avatar: updatedUser.avatar,
//       name: updatedUser.name,
//       email: updatedUser.email,
//       phone: updatedUser.phone,
//       role: updatedUser.role,
//       createdAt: user.createdAt,
//       ...admin,
//       ...superadmin,
//     }

//     res.json({
//       token: generateToken(userInfo),
//     })
//   } else {
//     res.status(404)
//     throw new Error('No se Encontró Usuario.')
//   }
// })

// module.exports = updateUser
