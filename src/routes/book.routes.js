import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createBook, deleteBook, getAllBooks } from "../controllers/book.controller.js";
const router = Router()

router.route('/create').post(verifyJWT, createBook)
router.route('/all-books').get(verifyJWT, getAllBooks)
router.route('/:bookId/delete').delete(verifyJWT, deleteBook)

export default router