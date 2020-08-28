import React from "react";
import Avatar from "@material-ui/core/Avatar";
import { Link } from "react-router-dom";

const FollowerCard = (props) => {
  const { avatar, username, id } = props;
  return (
    <li key={id} className="followerLi">
      <Link to={`/profile/${id}`}>
        <Avatar src={avatar} />
      </Link>
      <span>{username}</span>
    </li>
  );
};

export default FollowerCard;
