import React, { useContext, useEffect } from 'react';
import '../stylesheets/PostCard.css';
import Actions from './Actions';
import moment from 'moment';
import { AuthContext } from '../App';
import { Link } from 'react-router-dom';

const PostCard = (props) => {
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    if (props.post && props.post.user && props.post._id) {
    }
  }, [props.post]);

  if (!props.post || !props.post.user || !props.post._id) {
    return null;
  }

  const { user, _id, title, content, category, createdTime } = props.post;

  const isUserPost = auth && auth._id === user._id; // Add null check for auth

  return (
    <div className="post-card" id={_id}>
      <div className="post-card-header">
        <div className="user-info">
          <div className="user-avatar">{user && user.name.slice(0, 1)}</div> {/* Add null check for user */}
          <div className="title">{title}</div>
        </div>
        <div className='action-dot-align'>
          <div className='actionDot'>
            {isUserPost && <Actions id={_id} />}
          </div>
        </div>
      </div>
      <div className="post-content">
        <div className="timestamp">
        {moment(createdTime).fromNow()}
          {category && ( 
            <span className="category"> 
              | Category: <Link to={`/category/${category}`}>{category}</Link>
            </span>
          )}
        </div>
        <p className="post-text">
          {content}
        </p>
      </div>
    </div>
  );
};

export default PostCard;
