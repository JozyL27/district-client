import React from "react";
import TokenService from "../../services/token-service";
import { Link } from "react-router-dom";
import MessageIcon from "@material-ui/icons/Message";
import Fab from "@material-ui/core/Fab";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  msgIcon: {
    margin: "5px auto 5px auto",
  },
}));

const MessageButton = (props) => {
  const classes = useStyles();
  return (
    <>
      {TokenService.hasAuthToken() && (
        <Link className="chatLink" to={`/conversation/${props.userId}`}>
          <Fab className={classes.msgIcon} size="small" color="secondary">
            <MessageIcon />
          </Fab>
        </Link>
      )}
    </>
  );
};

export default MessageButton;
