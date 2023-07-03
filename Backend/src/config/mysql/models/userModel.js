'use strict'

const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const { ALL_USER_ROLES, EDITOR_ROLE } = require('../../config/users/roles/roles')

const userSchema = mongoose.Schema(
  {
    avatar: {
      type: String,
      required: true,
      default: '/public/assets/img/avatars/avatar.jpg',
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isDefaultPassword: {
      type: Boolean,
      required: true,
      default: true,
    },
    phone: {
      type: String,
    },
    role: {
      type: String,
      enum: ALL_USER_ROLES,
      required: true,
      default: EDITOR_ROLE,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    isSuper: {
      type: Boolean,
      required: true,
      default: false,
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      required: true,
      default: 'active',
    },
  },
  {
    timestamps: true,
  }
)

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model('User', userSchema)

module.exports = User
