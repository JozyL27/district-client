import React from "react";
import { Switch } from "react-router-dom";
import { Route } from "react-router-dom";
import Landing from "../Landing/Landing";
import SignupPage from "../../Routes/SignupPage/SignupPage";
import LoginPage from "../../Routes/LoginPage/LoginPage";
import Header from "../Header/Header";
import Feed from "../Feed/Feed";
import NotFoundPage from "../../Routes/NotFoundPage/NotFoundPage";
import Explore from "../Explore/Explore";
import ArticlePage from "../ArticlePage/ArticlePage";
import ProfilePage from "../ProfilePage/ProfilePage";
import UserProfilePage from "../UserProfilePage/UserProfilePage";
import "../../Styles/App.css";

function App() {
  return (
    <>
      <Header />
      <div className="App">
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/signup" component={SignupPage} />
          <Route exact path="/feed" component={Feed} />
          <Route exact path="/explore" component={Explore} />
          <Route path="/article/:articleId" component={ArticlePage} />
          <Route exact path="/myProfile" component={ProfilePage} />
          <Route path="/profile/:userId" component={UserProfilePage} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </>
  );
}

export default App;
