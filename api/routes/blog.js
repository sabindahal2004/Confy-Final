import express from 'express';
import Blog from '../models/BlogSchema.js';
import getAuth from '../middleware/auth.js';

const BlogRouter = express.Router();
BlogRouter.use(express.json());

// GET all blogs
BlogRouter.get('/', getAuth, async (req, res) => {
    try {
        const blogs = await Blog.find().populate("user", "-password").sort("-createdTime");
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

// Create a new blog
BlogRouter.post('/create', getAuth, async (req, res) => {
    try {
        const { title, content, category } = req.body;
        
        if (!title || !content || !category) {
            return res.status(400).json({ error: "Title, content, and category are required." });
        }

        const blog = new Blog({
            title,
            content,
            category,
            user: req.userId
        });

        await blog.save();
        res.status(201).json({ message: "Blog created successfully", blog });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

// Delete a blog
BlogRouter.delete('/delete/:id', getAuth, async (req, res) => {
    try {
        const blog = await Blog.findOneAndDelete({ user: req.userId, _id: req.params.id });

        if (!blog) {
            return res.status(404).json({ error: "Blog not found" });
        }

        res.status(200).json({ message: "Blog deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

// Update a blog
BlogRouter.put('/update/:id', getAuth, async (req, res) => {
    try {
        const { title, content, category } = req.body;
        const updatedBlog = await Blog.findOneAndUpdate(
            { user: req.userId, _id: req.params.id },
            { title, content, category },
            { new: true }
        );

        if (!updatedBlog) {
            return res.status(404).json({ error: "Blog not found" });
        }

        res.status(200).json({ message: "Blog updated successfully", updatedBlog });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

// GET blogs by category
BlogRouter.get('/category/:category', getAuth, async (req, res) => {
    try {
        const { category } = req.params;
        const blogs = await Blog.find({ category }).populate("user", "-password").sort("-createdTime");
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

// GET a single blog by ID
BlogRouter.get('/:id', getAuth, async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id).populate("user", "-password");
        if (!blog) {
            return res.status(404).json({ error: "Blog not found" });
        }
        res.status(200).json(blog);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

export default BlogRouter;
