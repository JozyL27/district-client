import React, { useEffect, useState } from "react";
import FollowerService from "../../services/follower-service";
import { Link } from "react-router-dom";
import "../../Styles/FollowerCount.css";

const FollowerCount = (props) => {
  const { user_id } = props;
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    let isCancelled = false;
    FollowerService.getFollowerCount(user_id).then((res) => {
      if (!isCancelled) {
        setFollowers(res);
      }
    });

    return () => {
      isCancelled = true;
      setFollowers([]);
    };
  }, []);

  return (
    <div className="followersContainer">
      {followers.length > 1 && (
        <>
          <span className="followerSpan">
            <Link className="followerLink" to={`/following/${user_id}`}>
              Following: {followers[0].following_count}
            </Link>
          </span>
          <span className="followerSpan">
            <Link className="followerLink" to={`/followers/${user_id}`}>
              Followers: {followers[1].followers_count}
            </Link>
          </span>
        </>
      )}
    </div>
  );
};

export default FollowerCount;
