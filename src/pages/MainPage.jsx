import React, { useEffect, useRef, useState } from 'react';
import Card from '../components/Card';

export default function MainPage() {
  const [feedData, setFeedData] = useState([]);
  const [loadingFinished, setLoadingFinished] = useState(false);
  const imageLoadingStatus = useRef({});

  useEffect(() => {
    fetch('data/feed.json')
      .then((res) => res.json())
      .then((data) => setFeedData(data));
  }, []);

  function checkLoadingFinished() {
    for (const key in imageLoadingStatus.current) {
      if (!key) return;
    }
    setLoadingFinished(true);
  }
  function saveComment(comment, articleID) {
    if (comment)
      setFeedData(
        feedData.map((e) =>
          e.articleID === articleID
            ? {
                ...e,
                comments: e.comments.concat({
                  userID: localStorage.getItem('loggedInUser'),
                  content: comment,
                }),
              }
            : e
        )
      );
  }
  return (
    <main className="MainPage">
      {loadingFinished ? (
        ''
      ) : (
        <div className="loading_veil">
          <div> Loading... </div>
        </div>
      )}

      <div className="MainFeed">
        {feedData.map((e) => {
          imageLoadingStatus.current[e.articleID] = false;
          return (
            <Card
              key={e.articleID}
              properties={e}
              imageLoadingStatus={imageLoadingStatus.current[e.articleID]}
              checkLoadingFinished={checkLoadingFinished}
              saveComment={(comment) => {
                saveComment(comment, e.articleID);
              }}
            />
          );
        })}
      </div>
    </main>
  );
}
