import React from "react";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  large: {
    minHeight: "150px",
    maxHeight: "200px",
    minWidth: "150px",
    maxWidth: "200px",
  },
}));

const ProfileAvatar = (props) => {
  const classes = useStyles();
  return (
    <>
      <Avatar src={props.avatar} alt="avatar" className={classes.large} />
    </>
  );
};

export default ProfileAvatar;
