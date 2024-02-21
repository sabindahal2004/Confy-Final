import React from 'react';
import '../stylesheets/PostCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import Actions from './Actions';
import moment from 'moment';

const PostCard = ({ post }) => {
  const { user, _id, title, content, category, createdTime } = post;
  const isUserPost = auth._id === user._id;

  return (
    <div className="post-card" id={_id}>
      <div className="post-card-header">
        <div className="user-info">
          <div className="user-avatar">{user.name.slice(0, 1)}</div>
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
        </div>
        <div className="category">
          Category: {category}
        </div>
        <p className="post-text">
          {content}
        </p>
        <button className="heart-button">
          <span role="img" aria-label="Heart"><FontAwesomeIcon icon={faHeart} /></span>
        </button>
      </div>
    </div>
  );
};

export default PostCard;
