import React, { useState, useEffect } from "react";
import UserService from "../../services/user-service";
import Avatar from "@material-ui/core/Avatar";
import { Link } from "react-router-dom";
import "../../Styles/Messages.css";

const Messages = (props) => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const users = [props.user, props.partner];
    const usersInfo = users.map((item) => UserService.getAuthorInfo(item));
    Promise.all(usersInfo).then((res) => setUsers(res));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const user = users[0] || {};
  const chatPartner = users[1] || {};

  if (props.sender_id === props.user) {
    return (
      <li key={props.id} className="messageContainer">
        <Link to="/myProfile">
          <Avatar src={user.avatar} />
        </Link>
        <p className="message">{props.message}</p>
      </li>
    );
  } else {
    return (
      <li key={props.id} className="partnerMessageContainer">
        <Link to={`/profile/${props.partner}`}>
          <Avatar src={chatPartner.avatar} />
        </Link>
        <p className="message">{props.message}</p>
      </li>
    );
  }
};

export default Messages;
