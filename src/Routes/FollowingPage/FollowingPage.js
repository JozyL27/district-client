import React, { useState, useEffect } from "react";
import FollowerService from "../../services/follower-service";
import FollowerCard from "../../Components/FollowerCard/FollowerCard";
import "../../Styles/FollowersPage.css";

const FollowingPage = (props) => {
  const { userId } = props.match.params;
  const [Following, setFollowing] = useState([]);
  const [Error, setError] = useState(null);
  useEffect(() => {
    FollowerService.getFollowing(userId).then((res) =>
      res.error ? setError(res.error) : setFollowing(res)
    );
  }, []);

  return (
    <section className="followerPageSection">
      <h2 className="followerH2">Following</h2>
      {Error && <p>{Error}</p>}
      <ul className="followerPageUl">
        {Following.length > 0 &&
          Following.map((user) => (
            <FollowerCard
              id={user.id}
              key={user.id}
              avatar={user.avatar}
              username={user.username}
            />
          ))}
      </ul>
    </section>
  );
};

export default FollowingPage;
