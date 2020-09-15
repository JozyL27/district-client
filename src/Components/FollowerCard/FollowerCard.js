import React from "react";
import Avatar from "@material-ui/core/Avatar";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "../../Styles/FollowerCard.css";

const FollowerCard = (props) => {
  const { avatar, username, id } = props;
  return (
    <li key={id} className="followerLi">
      <Link to={`/profile/${id}`}>
        <Avatar src={avatar} />
      </Link>
      <span className="followerSpan">{username}</span>
    </li>
  );
};

export default FollowerCard;

FollowerCard.propTypes = {
  avatar: PropTypes.string,
  username: PropTypes.string,
  id: PropTypes.number,
};
