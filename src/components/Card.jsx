import React, { useEffect, useRef, useState } from 'react';
import { Emoticon } from '../icons/Icons';

export default function Card({
  properties,
  imageLoadingStatus,
  checkLoadingFinished,
  saveComment,
}) {
  const [commentInput, setCommentInput] = useState('');
  const saveCommentButton = useRef();

  function commentInputHandle(e) {
    setCommentInput(e.target.value);
  }

  return (
    <div className="Card">
      <section className="top">
        <div className="profile_thumbnail">
          <div className="circle">
            {properties.profileThumbnail ? (
              <img src={properties.profileThumbnail} />
            ) : null}
          </div>
        </div>
        <div className="post_username">
          <span>{properties.userID}</span>
        </div>
        <div className="actions_ellipsis"></div>
      </section>
      <section className="body">
        <img
          src={properties.imageURL}
          alt=""
          onLoad={() => {
            imageLoadingStatus = true;
            checkLoadingFinished();
          }}
        />
      </section>
      <section className="bottom">
        <div className="functions">
          <div className="heart icon"></div>
          <div className="speech_bubble icon"></div>
          <div className="message icon"></div>
          <div className="bookmark icon"></div>
        </div>
        <div className="likes">좋아요 {properties.likes}개</div>
        <div className="comments">
          {properties.comments.map((e, i) => (
            <div className="comment" key={i}>
              <span className="username">{e.userID}</span>
              <span className="content">{e.content}</span>
            </div>
          ))}
        </div>
        <div className="comment_input_box">
          <div className="emoticon">
            <Emoticon />
          </div>
          <input
            type="text"
            value={commentInput}
            onChange={commentInputHandle}
            placeholder="댓글 달기..."
            onKeyDown={(e) => {
              if (e.nativeEvent.isComposing === false && e.key === 'Enter') {
                saveCommentButton.current.click();
              }
            }}
          />
          <button
            ref={saveCommentButton}
            className={`post_comment_button ${commentInput ? '' : 'disabled'}`}
            onClick={(e) => {
              saveComment(commentInput);
              setCommentInput('');
            }}
          >
            게시
          </button>
        </div>
      </section>
    </div>
  );
}
