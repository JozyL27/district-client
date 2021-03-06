import React, { lazy, Suspense } from "react";
import { Switch } from "react-router-dom";
import { Route } from "react-router-dom";
import Landing from "../Landing/Landing";
import SignupPage from "../../Routes/SignupPage/SignupPage";
import LoginPage from "../../Routes/LoginPage/LoginPage";
import Header from "../Header/Header";
import Explore from "../Explore/Explore";
import PrivateRoute from "../../Routes/PrivateRoute/PrivateRoute";
import PublicRoute from "../../Routes/PublicRoute/PublicRoute";
import Loading from "../Utils/Loading";
import ErrorBoundary from "../Utils/ErrorBoundary";
import "../../Styles/App.css";
const MessagesPage = lazy(() =>
  import("../../Routes/MessagesPage/MessagesPage")
);
const ProfilePage = lazy(() => import("../ProfilePage/ProfilePage"));
const Feed = lazy(() => import("../../Routes/Feed/Feed"));
const NotFoundPage = lazy(() =>
  import("../../Routes/NotFoundPage/NotFoundPage")
);
const FollowersPage = lazy(() =>
  import("../../Routes/FollowersPage/FollowersPage")
);
const FollowingPage = lazy(() =>
  import("../../Routes/FollowingPage/FollowingPage")
);
const Conversation = lazy(() => import("../Conversation/Conversation"));
const ArticlePage = lazy(() => import("../ArticlePage/ArticlePage"));
const UserProfilePage = lazy(() =>
  import("../UserProfilePage/UserProfilePage")
);
const UpvotersPage = lazy(() =>
  import("../../Routes/UpvotersPage/UpvotersPage")
);

function App() {
  return (
    <>
      <Header />
      <div className="App">
        <ErrorBoundary>
          <Suspense fallback={<Loading />}>
            <Switch>
              <Route exact path="/" component={Landing} />
              <PublicRoute exact path="/login" component={LoginPage} />
              <PublicRoute exact path="/signup" component={SignupPage} />
              <PrivateRoute exact path="/feed" component={Feed} />
              <PrivateRoute exact path="/myProfile" component={ProfilePage} />
              <PrivateRoute exact path="/message" component={MessagesPage} />
              <Route exact path="/explore" component={Explore} />
              <PrivateRoute
                path="/conversation/:convoPartner"
                component={Conversation}
              />
              <Route path="/Upvoters/:articleId" component={UpvotersPage} />
              <Route path="/followers/:userId" component={FollowersPage} />
              <Route path="/following/:userId" component={FollowingPage} />
              <Route path="/article/:articleId" component={ArticlePage} />
              <Route path="/profile/:userId" component={UserProfilePage} />
              <Route component={NotFoundPage} />
            </Switch>
          </Suspense>
        </ErrorBoundary>
      </div>
    </>
  );
}

export default App;
