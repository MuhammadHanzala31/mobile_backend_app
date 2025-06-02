import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { currentUser, editUser, loginUser, logout, registerUser } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router()

router.route('/register').post(upload.single('avatar'), registerUser)
router.route('/login').post(loginUser)
router.route('/logout').post(verifyJWT, logout)
router.route('/get-user').get(verifyJWT, currentUser)
router.route('/update').put(verifyJWT, editUser)

export default router