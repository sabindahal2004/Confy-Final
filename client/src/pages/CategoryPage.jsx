// CategoryPage.jsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PostCard from './PostCard';

const CategoryPage = () => {
  const { category } = useParams(); // Get the category from URL params
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch posts of the specified category from your backend
    const fetchPostsByCategory = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/blog?category=${category}`);
        if (!res.ok) {
          throw new Error('Failed to fetch posts');
        }
        const data = await res.json();
        setPosts(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPostsByCategory();
  }, [category]);

  return (
    <div>
      <h2>{category} Posts</h2>
      {posts.map(post => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  );
};

export default CategoryPage;
