import React, { useContext, useState, useEffect } from "react";
import upArrow from "../../illustrations/up-arrow.svg";
import UserContext from "../../Context/UserContext";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; // optional for styling
import TokenService from "../../services/token-service";
import UpvoteService from "../../services/upvote-service";
import { Link } from "react-router-dom";

export default function Upvote(props) {
  const userContext = useContext(UserContext);
  const [response, setResponse] = useState({});
  const [upvotes, setUpvotes] = useState(props.upvotes);

  const handleUpvoteClick = () => {
    const { user } = userContext;
    const newUpvote = {
      user_id: user.id,
      article_id: props.articleId,
    };
    UpvoteService.addUpvote(newUpvote)
      .then(() => {
        UpvoteService.getArticleUpvotes(props.articleId).then((votes) =>
          setUpvotes(votes.upvotes)
        );
      })
      .catch((error) => setResponse(error));
  };

  useEffect(() => {
    UpvoteService.getArticleUpvotes(props.articleId)
      .then((votes) => setUpvotes(votes.upvotes))
      .catch((error) => setResponse(error));
  });

  return (
    <>
      <div className={"upvoteContainer " + (props.styleName || "")}>
        {TokenService.hasAuthToken() ? (
          <Tippy
            content={response.error ? response.error : "Upvote"}
            delay={100}
            interactive={true}
            interactiveBorder={20}
            appendTo={() => document.body}
          >
            <img
              src={upArrow}
              alt="arrow"
              className="upArrow"
              onClick={handleUpvoteClick}
            />
          </Tippy>
        ) : (
          <Tippy
            content="Must be signed in to upvote"
            delay={100}
            interactive={true}
            interactiveBorder={20}
            appendTo={() => document.body}
          >
            <img src={upArrow} alt="arrow" className="upArrow" />
          </Tippy>
        )}
        <Link
          to={`/Upvoters/${props.articleId}`}
          style={{ textDecoration: "none", color: "black" }}
        >
          <span>{upvotes}</span>
        </Link>
      </div>
    </>
  );
}
