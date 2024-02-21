import React, { useEffect, useState, useContext } from "react";
import PostCard from "../components/PostCard";
import { AuthContext } from "../App"; // Assuming you have AuthContext available

const DisplayPost = () => {
  const { auth } = useContext(AuthContext); // Assuming auth data is available in context
  const [posts , setPosts] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/blog/", {
          method: "GET",
          headers: {
            token: localStorage.getItem("token")
          }
        });
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await res.json();
        setPosts(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div className="display-post-container"> 
      {posts.map(post => (
        <PostCard key={post._id} post={post} auth={auth} /> // Pass auth prop
      ))}
    </div>
  );
};

export default DisplayPost;
