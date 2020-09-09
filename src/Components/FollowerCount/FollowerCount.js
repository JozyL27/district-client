import React, { useEffect, useState, useContext } from "react";
import UserContext from "../../Context/UserContext";
import FollowerService from "../../services/follower-service";
import FollowButton from "../FollowButton/FollowButton";
import { Link } from "react-router-dom";
import "../../Styles/FollowerCount.css";

const FollowerCount = (props) => {
  const { user_id } = props;
  const userContext = useContext(UserContext);
  const { user } = userContext;
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

  const onFollowClick = () => {
    FollowerService.getFollowerCount(user_id).then((res) => {
      setFollowers(res);
    });
  };

  return (
    <div className="followersContainer">
      {followers.length > 1 && (
        <div className="followerCountContainer">
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
        </div>
      )}
      {Number(user.id) !== user_id && (
        <FollowButton user_profile_id={user_id} onFollowClick={onFollowClick} />
      )}
    </div>
  );
};

export default FollowerCount;
