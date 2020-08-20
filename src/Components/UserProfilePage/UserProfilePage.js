import React, { Component } from "react";
import UserService from "../../services/user-service";
import ArticlesService from "../../services/article-service";
import ArticleCard from "../ArticleCard/ArticleCard";
import NavArrows from "../NavArrows/NavArrows";
import UserContext from "../../Context/UserContext";
import "../../Styles/ProfilePage.css";
import avatar from "../../illustrations/01.png";
import TabNavigation from "../Utils/TabNavigation";

export default class ProfilePage extends Component {
  static contextType = UserContext;
  static defaultProps = {
    location: {},
    history: {
      push: () => {},
    },
  };

  state = {
    articles: [],
    userInfo: {},
    error: null,
    page: 1,
    tabValue: 0,
  };

  componentDidMount() {
    this.setState({ error: null, tabValue: 0, page: 1 });
    const { match } = this.props;
    const { page } = this.state;

    UserService.getAuthorInfo(match.params.userId).then((res) => {
      res.error
        ? this.setState({ error: res.error })
        : this.setState({
            userInfo: res,
            bio: res.bio,
            username: res.username,
          });

      ArticlesService.getMyArticles(match.params.userId, page).then((res) =>
        res.error
          ? this.setState({ error: res.error })
          : this.setState({ articles: res })
      );
    });
  }

  handleMyProfileRedirect = () => {
    const { location, history } = this.props;
    const destination = (location.state || {}).from || "/myProfile";
    history.push(destination);
  };

  checkProfileId = () => {
    const { userId } = this.props.match.params;
    const { id } = this.context.user;
    console.log(typeof userId, typeof id);

    return Number(userId) === id;
  };

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

  render() {
    const { userInfo, articles, page, error, tabValue } = this.state;
    if (this.checkProfileId()) {
      this.handleMyProfileRedirect();
      return null;
    } else {
      return (
        <section className="profilePageContainer">
          <div className="userInfoContainer">
            <img src={avatar} alt="avatar" className="profileAvatar" />
            <div className="bioContainer">
              <span className="profileUsername">{userInfo.username}</span>
              {userInfo.bio && <p className="profileBio">{userInfo.bio}</p>}
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
}
