import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ["love", "hate", "politics", "other"],
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    createdTime: {
        type: Date,
        default: () => new Date()
    }
});

const Blog = mongoose.model('Blog', blogSchema);
export default Blog;
