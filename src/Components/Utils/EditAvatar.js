import React from "react";
import ProfileAvatar from "./ProfileAvatar";
import AddIcon from "@material-ui/icons/Add";

const EditAvatar = (props) => {
  return (
    <div>
      <ProfileAvatar avatar={props.avatar} />
      <div className="button">
        <label htmlFor="singlePicture">
          <AddIcon />
        </label>
        <input type="file" id="singlePicture" />
      </div>
    </div>
  );
};

export default EditAvatar;
