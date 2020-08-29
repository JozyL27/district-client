import React, { useContext, useEffect, useState } from "react";
import FollowerService from "../../services/follower-service";
import UserContext from "../../Context/UserContext";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "10px",
  },
}));

const FollowButton = (props) => {
  const userContext = useContext(UserContext);
  const [isFollowing, setIsFollowing] = useState(false);
  const { user_profile_id } = props;
  const { user } = userContext;
  const classes = useStyles();

  const handleUnfollowClick = () => {
    const userToUnfollow = {
      follower_id: user_profile_id,
    };
    FollowerService.unfollow(user.id, userToUnfollow).then(() => {
      FollowerService.alreadyFollowing(user.id, user_profile_id).then((res) =>
        setIsFollowing(res.message)
      );
    });
  };

  const handleFollowClick = () => {
    const newFollowerFields = {
      user_id: user.id,
      follower_id: user_profile_id,
    };
    FollowerService.followUser(newFollowerFields).then(() => {
      FollowerService.alreadyFollowing(user.id, user_profile_id).then((res) =>
        setIsFollowing(res.message)
      );
    });
  };

  useEffect(() => {
    FollowerService.alreadyFollowing(user.id, user_profile_id).then((res) =>
      setIsFollowing(res.message)
    );
  }, []);

  return (
    <>
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
