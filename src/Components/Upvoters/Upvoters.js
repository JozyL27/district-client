import React from "react";
import Avatar from "@material-ui/core/Avatar";
import { Link } from "react-router-dom";

const Upvoters = (props) => {
  const { avatar, user_id, username } = props;
  return (
    <li key={user_id}>
      <Link to={`/profile/${user_id}`}>
        <Avatar src={avatar} />
      </Link>
      <span>{username}</span>
    </li>
  );
};

export default Upvoters;
