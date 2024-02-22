// CreatePost.jsx
import React, { useState } from 'react';
import '../stylesheets/CreatePost.css';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
  const navigate = useNavigate();

  const [blog, setBlog] = useState({ title: "", category: "", content: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlog({ ...blog, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8000/api/blog/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token")
        },
        body: JSON.stringify(blog)
      });

      if (!res.ok) {
        throw new Error("Failed to create post");
      }

      alert("Confession Post Created");
      setBlog({ title: "", category: "", content: "" });
      navigate('/');
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <div className="align-center">
      <div className="main-container">
        <div className="top-text">Create Post</div>
        <form onSubmit={handleSubmit}>
          <div className="data-elem">
            <label>Title</label>
            <input type="text" name="title" required onChange={handleChange} value={blog.title} />
          </div>
          <div className="data-elem">
            <label>Category</label>
            <select name="category" onChange={handleChange} value={blog.category}>
              <option value="">Select a category</option>
              <option value="love">Love</option>
              <option value="hate">Hate</option>
              <option value="politics">Politics</option>
              <option value="other">Others</option>
            </select>
          </div>
          <div className="data-elem">
            <label>Content</label>
            <textarea type="text" name="content" cols="4" required onChange={handleChange} value={blog.content} />
          </div>
          <div className="outer-btn">
            <div className="inner-btn"></div>
            <button type="submit">Post</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
