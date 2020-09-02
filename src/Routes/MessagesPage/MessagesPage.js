import React, { useContext, useState, useEffect } from "react";
import UserContext from "../../Context/UserContext";
import MessageService from "../../services/messages-service";
import Avatar from "@material-ui/core/Avatar";
import { Link } from "react-router-dom";
import moment from "moment";
import "../../Styles/MessagesPage.css";

const MessagesPage = () => {
  const userContext = useContext(UserContext);
  const [conversations, setConversations] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  useEffect(() => {
    const { user } = userContext;
    MessageService.getUserConversations(user.id, page).then((res) =>
      res.error ? setError(res.error) : setConversations(res)
    );
  }, []);

  return (
    <section className="msgPageContainer">
      <h2>Messages</h2>
      {error && <p>{error}</p>}
      <ul className="msgPageUl">
        {conversations.length > 0 &&
          conversations.map((item) => (
            <li key={item.id} className="msgPageLi">
              <div className="msgPageDiv">
                <Link to={`/profile/${item.user2id}`} className="msgPageLink">
                  <Avatar src={item.avatar} />
                </Link>
                <span className="msgPageUsername">{item.username}</span>
              </div>
              <div className="msgPageDiv msgContainer">
                <Link
                  to={`/conversation/${item.user2id}`}
                  className="msgPageLink"
                >
                  <p className="msgPageP">
                    {item.lastMessage
                      ? item.lastMessage.message
                      : "Start the converation by sending the first message."}
                  </p>
                  <span className="msgPageDate">
                    {item.lastMessage &&
                      moment
                        .utc(`${item.lastMessage.date_created}`)
                        .format("MMMM Do YYYY")}
                  </span>
                </Link>
              </div>
            </li>
          ))}
      </ul>
    </section>
  );
};

export default MessagesPage;
