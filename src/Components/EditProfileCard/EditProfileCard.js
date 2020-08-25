import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import ProfileAvatar from "../Utils/ProfileAvatar";
import CircularProgress from "@material-ui/core/CircularProgress";
import "../../Styles/EditProfileCard.css";

const EditProfileCard = (props) => {
  return (
    <>
      <div className="userInfoContainer">
        <div className="avatarContainer">
          {props.loading === true ? (
            <CircularProgress />
          ) : (
            <ProfileAvatar
              avatar={
                props.newAvatar.length > 1 ? props.newAvatar : props.avatar
              }
            />
          )}
          <input
            accept="image/*"
            id="icon-button-file"
            type="file"
            className="editProfileInput"
            onChange={props.handleAvatarChange}
          />
          <label htmlFor="icon-button-file">
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
            >
              <PhotoCamera />
            </IconButton>
          </label>
        </div>
        <div className="bioContainer">
          <div className="editUsername">
            <TextField
              id="username"
              label="Username"
              variant="outlined"
              value={props.username}
              required
              name="username"
              onChange={props.handleBioChange}
            />
          </div>
          <div className="editBio">
            <TextField
              id="bio"
              label="Bio"
              multiline
              rows={5}
              variant="outlined"
              value={props.bio}
              onChange={props.handleBioChange}
              name="bio"
            />
          </div>
        </div>
      </div>
      <div className="profileButtonsContainer">
        <div>
          <Button
            variant="contained"
            color="secondary"
            onClick={props.handleCancelButton}
          >
            Cancel
          </Button>
        </div>
        <div>
          <Button
            variant="contained"
            color="primary"
            onClick={props.handleSaveButton}
          >
            Save
          </Button>
        </div>
      </div>
    </>
  );
};

export default EditProfileCard;
