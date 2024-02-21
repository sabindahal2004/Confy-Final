import React, { useEffect, useState } from "react";
import PostCard from "../components/PostCard";

const LovePage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchBlogsByCategory = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/blog/category/love", {
          method: "GET",
          headers: {
            token: localStorage.getItem("token")
          }
        });
        const data = await res.json();
        if (res.ok) {
          setPosts(data);
        } else {
          console.log(data);
        }
      } catch (error) {
        console.error("Error fetching blogs by category:", error);
      }
    };

    fetchBlogsByCategory();
  }, []);

  return (
    <div className="display-post-container"> 
      {posts && posts.map(post => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  );
};

export default LovePage;
