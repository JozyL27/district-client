import React from "react";
import { Link } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import moment from "moment";

const ConversationCard = (props) => {
  return (
    <>
      <li key={props.conversation_id} className="msgPageLi">
        <div className="msgPageDiv">
          <Link
            to={`/profile/${
              Number(props.user1id) === Number(props.currentUser_id)
                ? props.user2id
                : props.user1id
            }`}
            className="msgPageLink"
          >
            <Avatar src={props.avatar} />
          </Link>
          <span className="msgPageUsername">{props.username}</span>
        </div>
        <div className="msgPageDiv msgContainer">
          <Link
            to={`/conversation/${
              Number(props.user1id) === Number(props.currentUser_id)
                ? props.user2id
                : props.user1id
            }`}
            className="msgPageLink"
          >
            <p className="msgPageP">
              {props.lastMessage
                ? props.lastMessage.message
                : "Start the converation by sending the first message."}
            </p>
            <span className="msgPageDate">
              {props.lastMessage &&
                moment
                  .utc(`${props.lastMessage.date_created}`)
                  .format("MMMM Do YYYY")}
            </span>
          </Link>
        </div>
      </li>
    </>
  );
};

export default ConversationCard;
