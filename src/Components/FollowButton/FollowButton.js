import React, { useContext, useEffect, useState } from "react";
import FollowerService from "../../services/follower-service";
import UserContext from "../../Context/UserContext";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import TokenService from "../../services/token-service";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "10px",
  },
}));

const FollowButton = (props) => {
  const userContext = useContext(UserContext);
  const [isFollowing, setIsFollowing] = useState(false);
  const [error, setError] = useState(null);
  const { user_profile_id } = props;
  const { user } = userContext;
  const classes = useStyles();

  const handleUnfollowClick = () => {
    const userToUnfollow = {
      follower_id: user_profile_id,
      user_id: user.id,
    };
    FollowerService.unfollow(userToUnfollow).then(() => {
      FollowerService.alreadyFollowing(user.id, user_profile_id).then((res) =>
        setIsFollowing(res.message)
      );
      props.onFollowClick();
    });
  };

  const handleFollowClick = () => {
    const newFollowerFields = {
      user_id: user.id,
      follower_id: user_profile_id,
    };
    FollowerService.followUser(newFollowerFields).then((res) => {
      if (res.error) {
        setError(res.error);
      } else {
        FollowerService.alreadyFollowing(user.id, user_profile_id).then((res) =>
          res.error ? setError(res.error) : setIsFollowing(res.message)
        );
        props.onFollowClick();
      }
    });
  };

  useEffect(() => {
    if (TokenService.hasAuthToken()) {
      FollowerService.alreadyFollowing(user.id, user_profile_id).then((res) =>
        setIsFollowing(res.message)
      );
    }
  }, []);

  return (
    <>
      {error && <p>{error}</p>}
      {isFollowing ? (
        <Button
          color="secondary"
          variant="contained"
          size="small"
          className={classes.root}
          onClick={handleUnfollowClick}
        >
          Unfollow
        </Button>
      ) : (
        <Button
          color="primary"
          variant="contained"
          size="small"
          className={classes.root}
          onClick={handleFollowClick}
        >
          Follow
        </Button>
      )}
    </>
  );
};

export default FollowButton;
