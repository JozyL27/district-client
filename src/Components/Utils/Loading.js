import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import "../../Styles/Explore.css";

const Loading = () => {
  return (
    <div className="loadingContainer">
      <CircularProgress />
    </div>
  );
};

export default Loading;
