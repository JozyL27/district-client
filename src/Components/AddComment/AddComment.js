import React, { useState, useContext } from "react";
import UserContext from "../../Context/UserContext";
import CommentService from "../../services/comments-service";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import "../../Styles/AddComment.css";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputAdornment from "@material-ui/core/InputAdornment";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    color: "crimson",
    margin: "0 auto",
  },
  InputAdornment: {
    position: "relative",
    right: "0",
    top: "35px",
    padding: "5px",
    color: "grey",
  },
});

const AddComment = (props) => {
  const classes = useStyles();

  const [Text, setText] = useState("");
  let [Chars, setChars] = useState(0);
  const [Error, setError] = useState(null);
  let [Open, setOpen] = useState(false);
  const userContext = useContext(UserContext);

  const handleAddCommentButton = () => {
    setError(null);
    setOpen(!Open);
    setChars(0);
    setText("");
  };

  const handleTextArea = (event) => {
    setText(event.target.value);
    setChars(event.target.value.length);
  };

  const handleSendButton = () => {
    setError(null);
    const newComment = {
      text: Text,
      article_id: props.articleId,
      user_id: userContext.user.id,
    };
    CommentService.addComment(newComment).then((res) => {
      if (res.id) {
        props.onAddCommentClick();
        setOpen(!Open);
        setText("");
      } else if (res.error) {
        setOpen(true);
        setError(res.error);
      }
    });
  };

  return (
    <section className="addCommentSection">
      <div className="addCommentButton">
        <Fab onClick={handleAddCommentButton}>
          <AddIcon />
        </Fab>
      </div>
      <Dialog
        open={Open}
        onClose={handleAddCommentButton}
        maxWidth="sm"
        fullWidth={true}
      >
        {Error && <DialogTitle className={classes.root}>{Error}</DialogTitle>}
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="content"
            label="Add Comment"
            type="text"
            fullWidth
            multiline
            rows={5}
            variant="outlined"
            value={Text}
            onChange={handleTextArea}
            InputProps={{
              endAdornment: (
                <InputAdornment
                  position="end"
                  className={classes.InputAdornment}
                >
                  {Chars} / 250
                </InputAdornment>
              ),
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleAddCommentButton}
            color="secondary"
            variant="contained"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSendButton}
            color="primary"
            variant="contained"
          >
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </section>
  );
};

export default AddComment;
