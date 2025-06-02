import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { Book } from "../models/book.model.js";

const createBook = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const { title, discription, rating } = req.body

    if (!title || !discription || !rating) {
        throw new ApiError(404, "all feilds are required")
    }

    const coverLocalPath = req.file.path
    if (!coverLocalPath) {
        throw new ApiError(401, "book Cover is required")
    }

    const bookCover = await uploadOnCloudinary(coverLocalPath)

    if (!bookCover) {
        throw new ApiError(401, "something went wrong while uploading image");
    }

    const book = await Book.create({
        title,
        discription,
        rating,
        bookCover: bookCover.url || "",
        author: userId
    })

    return res.status(201)
        .json(new ApiResponse(200, book, "book is created successfully"))
})

const getAllBooks = asyncHandler(async (req, res) => {
    const limit = 10
    const books = await Book.find().populate('author').limit(limit).sort({ createdAt: -1 })
    if (!books) {
        throw new ApiError(401, "books not fetched")
    }
    return res.status(201)
        .json(new ApiResponse(200, books, "books fetched successfully"))

})

const deleteBook = asyncHandler(async (req, res) => {
    const bookId = req.params
    await Book.findByIdAndDelete(bookId)
    return res.status(201)
    .json(new ApiResponse(200, {}, 'book delet successfully'))
})



export { createBook, getAllBooks, deleteBook}