// 'use strict'

// const asyncHandler = require('express-async-handler')
// const User = require('../../mongoose/models/userModel')

// // @desc    GET all users
// // @route   GET /api/users
// // @access  Private/Super
// const getUsers = asyncHandler(async (req, res) => {
//   const keyword = req.query.keyword
//     ? {
//         name: {
//           $regex: req.query.keyword,
//           $options: 'i',
//         },
//       }
//     : {}

//   let count = Number(req.query.count) || 10
//   let start = Number(req.query.start) || 0

//   const users = await User.find({
//     ...keyword,
//     $or: [{ isAdmin: true }, { isCollaborator: true }, { isSuper: true }],
//   })
//     .select('-password')
//     .limit(count)
//     .skip(count * start)

//   res.json(users)
// })

// module.exports = getUsers
