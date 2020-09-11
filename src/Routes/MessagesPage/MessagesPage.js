import React, { useContext, useState, useEffect } from "react";
import UserContext from "../../Context/UserContext";
import MessageService from "../../services/messages-service";
import "../../Styles/MessagesPage.css";
import ConversationCard from "../../Components/ConversationCard/ConversationCard";
import Button from "@material-ui/core/Button";

const MessagesPage = () => {
  const userContext = useContext(UserContext);
  const [conversations, setConversations] = useState([]);
  const [error, setError] = useState(null);
  let [page, setPage] = useState(1);
  const { user } = userContext;
  const arrOfChecks = [
    conversations.length > 0,
    conversations.length % 12 === 0,
    !error,
  ].every((element) => element === true);

  const onViewMoreClick = () => {
    setPage((page += 1));
    MessageService.getUserConversations(user.id, page).then((res) =>
      res.error
        ? setError(res.error)
        : setConversations([...conversations, ...res])
    );
  };

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
      {arrOfChecks ? (
        <div className="msgPageViewBtn">
          <Button color="primary" variant="contained" onClick={onViewMoreClick}>
            View More
          </Button>
        </div>
      ) : null}
    </section>
  );
};

export default MessagesPage;
