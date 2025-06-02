import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";


const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.createAccessToken()
        const refreshToken = user.createRefreshToken()
        user.refreshToken = refreshToken
        user.save({ validateBeforeSave: false })
        return { accessToken, refreshToken }
    } catch (error) {
        throw new ApiError(505, "something went wrong while creating access and refresh token")
    }
}


const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body
    if ([username, email, password].some(e => e?.trim() === "")) {
        throw new ApiError(404, "all feilds are required")
    }
    const existedUser = await User.findOne({
        $or: [{ email }, { username }]
    })

    if (existedUser) {
        throw new ApiError(409, "user is already exist")
    }

    const profileLocalPath = req.file?.path
    const profileImage = await uploadOnCloudinary(profileLocalPath)


    const user = await User.create({
        email,
        password,
        username,
        avatar: profileImage?.url || ""
    })

    const createUser = await User.findById(user?._id).select('-password -refreshToken')
    return res.status(201).json(new ApiResponse(200, createUser, "user created successfully"))

})


const loginUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body

    if (!username || !password) {
        throw new ApiError(404, 'all feilds are required')
    }

    const user = await User.findOne({ username })

    if (!user) {
        throw new ApiError(404, "user not found")
    }

    const checkPass = await user.isPasswordCorrect(password)

    if (!checkPass) {
        throw new ApiError(401, "password is not valid")
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id)

    const loggedInUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );

    return res.status(201).json(new ApiResponse(200, {
        accessToken,
        refreshToken,
        loggedInUser
    },
        "user logged in successfully"))
})

const logout = asyncHandler(async (req, res) => {
    const userId = req.user?._id
    await User.findByIdAndUpdate(userId,
        {
            $unset: {
                refreshToken: 1
            }
        },
        {
            new: true
        }
    )

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "User logged Out"))
})


const currentUser = asyncHandler(async (req, res) => {
    const user = req.user;
    return res.status(201)
        .json(new ApiResponse(200, user, "user fetched successfully"))
})

const editUser = asyncHandler(async (req, res) => {
    const userId = req.user._id
    const { email, username } = req.body;

    if (!email && !username) {
        throw new ApiError(404, "atleast one feild is required")
    }

    const updateUser = await User.findByIdAndUpdate(
        userId,
        {
            $set: {
                email,
                username
            }
        },
        {
            new: true
        }
    ).select('-refreshToken -password')

    if(!updateUser){
        throw new ApiError(500, "something went wrong while updating user")
    }

    return res.status(201)
    .json(new ApiResponse(200, updateUser, "user updated successfully"))
})

export { registerUser, loginUser, logout, currentUser, editUser}