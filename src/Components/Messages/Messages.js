import React, { useState, useEffect } from "react";
import UserService from "../../services/user-service";
import Avatar from "@material-ui/core/Avatar";
import "../../Styles/Messages.css";

const Messages = (props) => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const users = [props.user, props.partner];
    const usersInfo = users.map((item) => UserService.getAuthorInfo(item));
    Promise.all(usersInfo).then((res) => setUsers(res));
  }, []);

  const user = users[0] || {};
  const chatPartner = users[1] || {};

  if (props.sender_id === props.user) {
    return (
      <li key={props.id} className="messageContainer">
        <Avatar src={user.avatar} />
        <span>{user.username}</span>
        <p>{props.message}</p>
      </li>
    );
  } else {
    return (
      <li key={props.id} className="messageContainer">
        <Avatar src={chatPartner.avatar} />
        <span>{chatPartner.username}</span>
        <p>{props.message}</p>
      </li>
    );
  }
};

export default Messages;
