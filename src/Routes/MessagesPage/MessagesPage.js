import React, { useContext, useState, useEffect } from "react";
import UserContext from "../../Context/UserContext";

const MessagesPage = () => {
  const userContext = useContext(UserContext);

  return (
    <section>
      <div className="messagesHeader">
        <h2>Messages</h2>
        <ul>{/* convo container goes here */}</ul>
      </div>
    </section>
  );
};

export default MessagesPage;
