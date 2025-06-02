import mongoose, { Schema } from "mongoose";

const bookSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    bookCover: {
        type: String,
        required: true
    },
    rating : {
        type : Number,
        min : 1,
        max : 5,
        default : 3
    },
    author : {
        type : Schema.Types.ObjectId,
        ref : "User",
        required : true
    }
}, { timeseries: true })

export const Book = mongoose.model("Book", bookSchema)