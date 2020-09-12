import React from "react";
import Avatar from "@material-ui/core/Avatar";

const Upvoters = (props) => {
  const { avatar, user_id, username } = props;
  return (
    <li key={user_id}>
      <Avatar src={avatar} />
      <span>{username}</span>
    </li>
  );
};

export default Upvoters;
