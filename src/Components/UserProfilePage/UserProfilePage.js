import React, { Component } from "react";
import { Link } from "react-router-dom";
import UserService from "../../services/user-service";
import ArticlesService from "../../services/article-service";
import ArticleCard from "../ArticleCard/ArticleCard";
import NavArrows from "../NavArrows/NavArrows";
import UserContext from "../../Context/UserContext";
import "../../Styles/ProfilePage.css";
import TabNavigation from "../Utils/TabNavigation";
import { Redirect } from "react-router-dom";
import ProfileAvatar from "../Utils/ProfileAvatar";
import FollowerCount from "../FollowerCount/FollowerCount";
import FollowButton from "../FollowButton/FollowButton";
import ChatIcon from "@material-ui/icons/Chat";

// hide message button if logged out
export default class ProfilePage extends Component {
  static contextType = UserContext;

  state = {
    articles: [],
    userInfo: {},
    error: null,
    page: 1,
    tabValue: 0,
    redirect: false,
  };

  componentDidMount() {
    const { userId } = this.props.match.params;
    const { id } = this.context.user;
    const { page } = this.state;

    if (Number(userId) === id) {
      this.setState({ redirect: true });
    } else {
      this.setState({ error: null, tabValue: 0, page: 1 });
      UserService.getAuthorInfo(userId).then((res) => {
        res.error
          ? this.setState({ error: res.error })
          : this.setState({
              userInfo: res,
              bio: res.bio,
              username: res.username,
            });

        ArticlesService.getMyArticles(userId, page).then((res) =>
          res.error
            ? this.setState({ error: res.error })
            : this.setState({ articles: res })
        );
      });
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleNextArrow = () => {
    let { page, tabValue } = this.state;
    const { match } = this.props;
    const newPageValue = (page += 1);
    this.setState({ page: newPageValue });

    if (tabValue === 0) {
      ArticlesService.getMyArticles(match.params.userId, page).then((res) =>
        res.error
          ? this.setState({ error: res.error, articles: [] })
          : this.setState({ articles: res })
      );
    } else {
      ArticlesService.getUpvotedArticles(
        match.params.userId,
        page
      ).then((res) =>
        res.error
          ? this.setState({ error: res.error })
          : this.setState({ articles: res })
      );
    }
  };

  handleBackArrow = () => {
    let { page, tabValue } = this.state;
    const { match } = this.props;
    const newPageValue = (page -= 1);
    this.setState({ page: newPageValue, error: null });

    if (tabValue === 0) {
      ArticlesService.getMyArticles(match.params.userId, page).then((res) =>
        res.error
          ? this.setState({ error: res.error })
          : this.setState({ articles: res })
      );
    } else {
      ArticlesService.getUpvotedArticles(
        match.params.userId,
        page
      ).then((res) =>
        res.error
          ? this.setState({ error: res.error })
          : this.setState({ articles: res })
      );
    }
  };

  handleChange = (event, newValue) => {
    this.setState({ tabValue: newValue, page: 1, error: null });
  };

  componentDidUpdate(prevProps, prevState) {
    const { tabValue, page } = this.state;
    const { userId } = this.props.match.params;

    if (prevState.tabValue !== tabValue) {
      if (tabValue === 0) {
        ArticlesService.getMyArticles(userId, page).then((res) =>
          res.error
            ? this.setState({ error: res.error, articles: [] })
            : this.setState({ articles: res })
        );
      } else {
        ArticlesService.getUpvotedArticles(userId, page).then((res) =>
          res.error
            ? this.setState({ error: res.error, articles: [] })
            : this.setState({ articles: res })
        );
      }
    }
  }

  componentWillUnmount() {
    this.setState({
      articles: [],
      userInfo: {},
      error: null,
      page: 1,
      redirect: false,
    });
  }

  render() {
    const { userInfo, articles, page, error, tabValue, redirect } = this.state;
    const { userId } = this.props.match.params;

    if (redirect) {
      return <Redirect to="/myProfile" />;
    }

    return (
      <section className="profilePageContainer">
        <div className="userInfoContainer">
          <div className="avatarMessageContainer">
            <ProfileAvatar avatar={userInfo.avatar} />
            <Link className="chatLink" to={`/conversation/${userId}`}>
              <ChatIcon />
            </Link>
          </div>
          <div className="bioContainer">
            <span className="profileUsername">{userInfo.username}</span>
            {userInfo.bio && <p className="profileBio">{userInfo.bio}</p>}
            <FollowerCount user_id={userId} />
            <FollowButton user_profile_id={userId} />
          </div>
        </div>
        <TabNavigation value={tabValue} handleChange={this.handleChange} />
        {error && <p>{error}</p>}
        <ul className="profileArticles">
          {articles.length > 0 &&
            articles.map((article) => {
              return (
                <ArticleCard
                  id={article.id}
                  key={article.id}
                  username={
                    tabValue === 1 ? article.username : userInfo.username
                  }
                  title={article.title}
                  upvotes={article.upvotes}
                  date_published={article.date_published}
                  author={article.author}
                  onDeleteClick={this.handleDeleteArticleButton}
                  avatar={userInfo.avatar}
                />
              );
            })}
        </ul>
        <NavArrows
          styleName="profileNavArrows"
          page={page}
          onNextArrowClick={this.handleNextArrow}
          onBackArrowClick={this.handleBackArrow}
          articleArrayLength={articles.length}
          error={error}
        />
      </section>
    );
  }
}
