import React, { Component } from "react";
import UserContext from "../../Context/UserContext";
import UserService from "../../services/user-service";
import ArticlesService from "../../services/article-service";
import Button from "@material-ui/core/Button";
import ArticleCard from "../ArticleCard/ArticleCard";
import NavArrows from "../NavArrows/NavArrows";
import "../../Styles/ProfilePage.css";
import EditProfileCard from "../EditProfileCard/EditProfileCard";
import AddArticle from "../AddArticle/AddArticle";
import TabNavigation from "../Utils/TabNavigation";
import ProfileAvatar from "../Utils/ProfileAvatar";
import FollowerCount from "../FollowerCount/FollowerCount";

export default class ProfilePage extends Component {
  static contextType = UserContext;
  state = {
    articles: [],
    userInfo: {},
    error: null,
    page: 1,
    isEditing: false,
    bio: "",
    username: "",
    tabValue: 0,
    avatar: "",
    newAvatar: "",
    loading: false,
  };

  componentDidMount() {
    this.setState({ error: null, tabValue: 0, page: 1 });
    const { user } = this.context;
    const { page } = this.state;

    UserService.getAuthorInfo(user.id).then((res) => {
      res.error
        ? this.setState({ error: res.error })
        : this.setState({
            userInfo: res,
            bio: res.bio,
            username: res.username,
            avatar: res.avatar,
          });

      ArticlesService.getMyArticles(user.id, page).then((res) =>
        res.error
          ? this.setState({ error: res.error })
          : this.setState({ articles: res })
      );
    });
  }

  handleEditButton = () => {
    let { isEditing } = this.state;
    this.setState({ isEditing: !isEditing, error: null });
  };

  handleCancelButton = () => {
    let { isEditing, userInfo } = this.state;
    this.setState({
      isEditing: !isEditing,
      bio: userInfo.bio,
      username: userInfo.username,
      avatar: userInfo.avatar,
      newAvatar: "",
      error: null,
    });
  };

  handleBioChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleNextArrow = () => {
    let { page, tabValue } = this.state;
    const { user } = this.context;
    const newPageValue = (page += 1);
    this.setState({ page: newPageValue });

    if (tabValue === 0) {
      ArticlesService.getMyArticles(user.id, page).then((res) =>
        res.error
          ? this.setState({ error: res.error, articles: [] })
          : this.setState({ articles: res })
      );
    } else {
      ArticlesService.getUpvotedArticles(user.id, page).then((res) =>
        res.error
          ? this.setState({ error: res.error })
          : this.setState({ articles: res })
      );
    }
  };

  handleBackArrow = () => {
    let { page, tabValue } = this.state;
    const { user } = this.context;
    const newPageValue = (page -= 1);
    this.setState({ page: newPageValue, error: null });

    if (tabValue === 0) {
      ArticlesService.getMyArticles(user.id, page).then((res) =>
        res.error
          ? this.setState({ error: res.error })
          : this.setState({ articles: res })
      );
    } else {
      ArticlesService.getUpvotedArticles(user.id, page).then((res) =>
        res.error
          ? this.setState({ error: res.error })
          : this.setState({ articles: res })
      );
    }
  };

  handleDeleteArticleButton = (id) => {
    let { page } = this.state;
    const { user } = this.context;

    ArticlesService.deleteArticle(id).then(() => {
      ArticlesService.getMyArticles(user.id, page).then((res) =>
        res.error
          ? this.setState({ error: res.error })
          : this.setState({ articles: res })
      );
    });
  };

  handleSaveButton = () => {
    let { username, bio, isEditing, newAvatar } = this.state;
    const { user } = this.context;
    const newUserInfo = { username, bio };
    if (newAvatar.length > 1) {
      newUserInfo.avatar = newAvatar;
    }

    UserService.updateUserInfo(user.id, newUserInfo).then((res) => {
      if (res.error) {
        this.setState({ error: res.error });
      } else {
        UserService.getAuthorInfo(user.id).then((res) => {
          this.setState({
            isEditing: !isEditing,
            username: res.username,
            bio: res.bio,
            userInfo: res,
            avatar: res.avatar,
            error: null,
          });
        });
      }
    });
  };

  handleAddArticleButton = () => {
    const { user } = this.context;
    const { page } = this.state;

    ArticlesService.getMyArticles(user.id, page).then((res) =>
      res.error
        ? this.setState({ error: res.error })
        : this.setState({ articles: res })
    );
  };

  handleTabChange = (event, newValue) => {
    this.setState({ tabValue: newValue, page: 1, error: null });
  };

  handleAvatarChange = (event) => {
    const files = Array.from(event.target.files);
    this.setState({ loading: true, error: null });

    const formData = new FormData();
    files.forEach((file, i) => {
      formData.append(i, file);
    });
    UserService.addUserAvatar(formData).then((avatar) => {
      if (avatar.error) {
        this.setState({ error: avatar.error, loading: false });
      } else {
        this.setState({
          newAvatar: avatar,
          loading: false,
        });
      }
    });
  };

  componentDidUpdate(prevProps, prevState) {
    const { tabValue, page } = this.state;
    const { user } = this.context;

    if (prevState.tabValue !== tabValue) {
      if (tabValue === 0) {
        ArticlesService.getMyArticles(user.id, page).then((res) =>
          res.error
            ? this.setState({ error: res.error, articles: [] })
            : this.setState({ articles: res })
        );
      } else {
        ArticlesService.getUpvotedArticles(user.id, page).then((res) =>
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
      isEditing: false,
      bio: "",
      username: "",
    });
  }

  render() {
    const {
      userInfo,
      articles,
      page,
      isEditing,
      bio,
      username,
      error,
      tabValue,
      avatar,
      newAvatar,
      loading,
    } = this.state;

    return (
      <section className="profilePageContainer">
        {!isEditing ? (
          <>
            <div className="userInfoContainer">
              <ProfileAvatar avatar={avatar} />
              <div className="bioContainer">
                <span className="profileUsername">{userInfo.username}</span>
                {userInfo.bio && <p className="profileBio">{userInfo.bio}</p>}
              </div>
            </div>
            <FollowerCount user_id={this.context.user.id} />
            <div className="profileButtonContainer">
              <Button
                variant="contained"
                color="primary"
                onClick={this.handleEditButton}
              >
                Edit Profile
              </Button>
            </div>
          </>
        ) : (
          <EditProfileCard
            avatar={avatar}
            newAvatar={newAvatar}
            username={username}
            bio={bio}
            handleBioChange={this.handleBioChange}
            handleCancelButton={this.handleCancelButton}
            handleSaveButton={this.handleSaveButton}
            handleAvatarChange={this.handleAvatarChange}
            loading={loading}
          />
        )}
        {error && <p>{error}</p>}
        <AddArticle
          addArticle={this.handleAddArticleButton}
          userInfo={this.context.user}
        />
        <TabNavigation value={tabValue} handleChange={this.handleTabChange} />
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
                  avatar={tabValue === 1 ? article.avatar : userInfo.avatar}
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
