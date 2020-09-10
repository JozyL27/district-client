import React, { useContext, useState, useEffect } from "react";
import UserContext from "../../Context/UserContext";
import MessageService from "../../services/messages-service";
import "../../Styles/MessagesPage.css";
import ConversationCard from "../../Components/ConversationCard/ConversationCard";

const MessagesPage = () => {
  const userContext = useContext(UserContext);
  const [conversations, setConversations] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const { user } = userContext;
  useEffect(() => {
    const { user } = userContext;
    MessageService.getUserConversations(user.id, page).then((res) =>
      res.error ? setError(res.error) : setConversations(res)
    );
  }, []);

  return (
    <section className="msgPageContainer">
      <h2>Messages</h2>
      {error && <p className="error">{error}</p>}
      <ul className="msgPageUl">
        {conversations.length > 0 &&
          conversations.map((item) => (
            <ConversationCard
              key={item.id}
              conversation_id={item.id}
              user1id={item.user1id}
              user2id={item.user2id}
              currentUser_id={user.id}
              avatar={item.partnerInfo && item.partnerInfo.avatar}
              username={item.partnerInfo && item.partnerInfo.username}
              lastMessage={item.lastMessage && item.lastMessage}
            />
          ))}
      </ul>
    </section>
  );
};

export default MessagesPage;
