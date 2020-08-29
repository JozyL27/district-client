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
import MessagesPage from "../../Routes/MessagesPage/MessagesPage";
import FollowersPage from "../../Routes/FollowersPage/FollowersPage";
import FollowingPage from "../../Routes/FollowingPage/FollowingPage";
import PrivateRoute from "../../Routes/PrivateRoute/PrivateRoute";
import PublicRoute from "../../Routes/PublicRoute/PublicRoute";
import "../../Styles/App.css";

function App() {
  return (
    <>
      <Header />
      <div className="App">
        <Switch>
          <Route exact path="/" component={Landing} />
          <PublicRoute exact path="/login" component={LoginPage} />
          <PublicRoute exact path="/signup" component={SignupPage} />
          <PrivateRoute exact path="/feed" component={Feed} />
          <Route exact path="/explore" component={Explore} />
          <PrivateRoute exact path="/myProfile" component={ProfilePage} />
          <PrivateRoute exact path="/message" component={MessagesPage} />
          <Route path="/followers/:userId" component={FollowersPage} />
          <Route path="/following/:userId" component={FollowingPage} />
          <Route path="/article/:articleId" component={ArticlePage} />
          <Route path="/profile/:userId" component={UserProfilePage} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </>
  );
}

export default App;
