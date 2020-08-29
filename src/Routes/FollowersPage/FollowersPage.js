import React, { useState, useEffect } from "react";
import FollowerService from "../../services/follower-service";
import FollowerCard from "../../Components/FollowerCard/FollowerCard";
import "../../Styles/FollowersPage.css";

const FollowersPage = (props) => {
  const { userId } = props.match.params;
  const [Followers, setFollowers] = useState([]);
  const [Error, setError] = useState(null);
  useEffect(() => {
    FollowerService.getFollowers(userId).then((res) =>
      res.error ? setError(res.error) : setFollowers(res)
    );
  }, []);

  return (
    <section className="followerPageSection">
      <h2 className="followerH2">Followers</h2>
      {Error && <p>{Error}</p>}
      <ul className="followerPageUl">
        {Followers.length > 0 &&
          Followers.map((follower) => (
            <FollowerCard
              id={follower.id}
              key={follower.id}
              avatar={follower.avatar}
              username={follower.username}
            />
          ))}
      </ul>
    </section>
  );
};

export default FollowersPage;
