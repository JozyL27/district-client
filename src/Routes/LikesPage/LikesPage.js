import React, { useEffect, useState } from "react";
import UpvoteService from "../../services/upvote-service";
import Upvoters from "../../Components/Upvoters/Upvoters";
import Button from "@material-ui/core/Button";
import "../../Styles/LikesPage.css";

const LikesPage = (props) => {
  const { articleId } = props.match.params;
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  let [page, setPage] = useState(1);
  const arrOfChecks = [users.length > 0, users.length % 12 === 0, !error].every(
    (element) => element === true
  );

  const onViewMoreClick = () => {
    setPage((page += 1));
    UpvoteService.getUpvoters(articleId, page).then((res) =>
      res.error ? setError(res.error) : setUsers([...users, ...res])
    );
  };

  useEffect(() => {
    UpvoteService.getUpvoters(articleId, page).then((res) =>
      res.error ? setError(res.error) : setUsers(res)
    );
  }, []);

  return (
    <section className="likesPageContainer">
      <h2>Upvoted By</h2>
      {error && <p className="error">{error}</p>}
      <ul className="likesPageUl">
        {users.length > 0 && !error
          ? users.map((user) => (
              <Upvoters
                key={user.user_id}
                avatar={user.avatar}
                user_id={user.user_id}
                username={user.username}
              />
            ))
          : null}
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

export default LikesPage;
