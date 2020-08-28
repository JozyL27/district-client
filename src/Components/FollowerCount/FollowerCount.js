import React, { useEffect, useState } from "react";
import FollowerService from "../../services/follower-service";
import { Link } from "react-router-dom";
import "../../Styles/FollowerCount.css";

const FollowerCount = (props) => {
  const { user_id } = props;
  const [followers, setFollowers] = useState([]);
  useEffect(() => {
    setFollowers([]);
    FollowerService.getFollowerCount(user_id).then((res) => setFollowers(res));
  }, []);

  return (
    <div className="followersContainer">
      {followers.length > 1 && (
        <>
          <span className="followerSpan">
            <Link className="followerLink">
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
