import React from "react";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

const TabNavigation = () => {
  return (
    <>
      <Paper>
        <Tabs indicatorColor="primary" textColor="primary" centered>
          <Tab label="My Articles" />
          <Tab label="Upvoted Articles" />
        </Tabs>
      </Paper>
    </>
  );
};

export default TabNavigation;
