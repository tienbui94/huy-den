import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'


// @des Auth user & get token
// @route POST /api/users/login
// @access Public
const authUser = asyncHandler(async(req, res) => {
    const {email, password}  = req.body

    const user = await User.findOne({email})

    if(user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    } else {
        res.status(401)
        throw new Error('Invalid email or password')
    }
    res.send({email, password})
})

// @des register new user
// @route GET /api/users
// @access Public
const registerUser = asyncHandler(async(req, res) => {
    const {name, email, password}  = req.body

    const userExists = await User.findOne({email})

    if(userExists) {
        res.status(400)
        throw new Error('User already existed')
    }

    const user = await User.create({
        name,
        email,
        password
    })

    if(user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid User Data')
    }
})

// @des get user profile
// @route GET /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async(req, res) => {
    const user = await User.findById(req.user._id)

    if(user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

// @des update user profile
// @route PUT /api/users/profile
// @access Private
const updateUserProfile = asyncHandler(async(req, res) => {
    const user = await User.findById(req.user._id)

    if(user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email

        if(req.body.password) {
            user.password = req.body.password
        }

        const updatedUser = await user.save()

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id)
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

// @des get all user profile
// @route GET /api/users
// @access Private/admin
const getUsers = asyncHandler(async(req, res) => {
    const users = await User.find({})
    res.json(users)

})

// @des delete user by id
// @route DELETE /api/users
// @access Private/admin
const deleteUserById = asyncHandler(async(req, res) => {
    const user = await User.findById(req.params.id)

    if(user) {
        await user.remove();
        res.json({message: 'User Deleted'})
    } else {
        res.status(404)
        throw new Error('User Not Found To Delete')
    }
})

// @des get  user by id
// @route GET /api/users
// @access Private/admin
const getUserById = asyncHandler(async(req, res) => {
    const user = await User.findById(req.params.id).select('-password')
    if(user) {
        res.json(user)
    } else {
        res.status(404)
        throw new Error('User Not Found')
    }
})

// @des update user by id
// @route PUT /api/users
// @access Private/admin
const updateUser = asyncHandler(async(req, res) => {
    const user = await User.findById(req.params.id)

    if(user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.isAdmin = req.body.isAdmin

        const updatedUser = await user.save()

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})
export {authUser, getUserProfile, registerUser, updateUserProfile, getUsers, deleteUserById, getUserById, updateUser}