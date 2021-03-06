import React, { Component } from "react";
import UserContext from "../../Context/UserContext";
import ArticlesService from "../../services/article-service";
import ArticleCard from "../../Components/ArticleCard/ArticleCard";
import AddArticle from "../../Components/AddArticle/AddArticle";
import Button from "@material-ui/core/Button";
import "../../Styles/Feed.css";

export default class Feed extends Component {
  static contextType = UserContext;

  state = {
    articles: [],
    page: 1,
    error: null,
  };

  handleAddArticleButton = () => {
    const { user } = this.context;
    const { page } = this.state;

    ArticlesService.getUserFeedArticles(user.id, page).then((res) =>
      res.error
        ? this.setState({ error: res.error })
        : this.setState({ articles: res, error: null })
    );
  };

  handleDeleteArticleButton = (id) => {
    let { page } = this.state;
    const { user } = this.context;

    ArticlesService.deleteArticle(id).then(() => {
      ArticlesService.getUserFeedArticles(user.id, page).then((res) =>
        res.error
          ? this.setState({ error: res.error })
          : this.setState({ articles: res })
      );
    });
  };

  onViewMoreClick = () => {
    const { user } = this.context;
    let { page, articles } = this.state;
    this.setState({ page: (page += 1) });

    ArticlesService.getUserFeedArticles(user.id, page).then((res) =>
      res.error
        ? this.setState({ error: res.error })
        : this.setState({ articles: [...articles, ...res] })
    );
  };

  componentDidMount() {
    const { user } = this.context;
    const { page } = this.state;
    ArticlesService.getUserFeedArticles(user.id, page).then((res) =>
      res.error
        ? this.setState({ error: res.error })
        : this.setState({ articles: res })
    );
  }

  render() {
    const { articles, error } = this.state;
    const { user, userInfo } = this.context;
    const arrOfChecks = [
      articles.length > 0,
      articles.length % 9 === 0,
      !error,
    ].every((element) => element === true);

    return (
      <section className="feedContainer">
        {userInfo && <h3>{userInfo.username}'s Feed</h3>}
        <AddArticle addArticle={this.handleAddArticleButton} userInfo={user} />
        {error && <p>{error}</p>}
        <ul className="articleFeedContainer">
          {articles.length > 0 && !error
            ? articles.map((article) => (
                <ArticleCard
                  key={article.article_id || article.id}
                  avatar={article.userInfo && article.userInfo.avatar}
                  id={article.article_id || article.id}
                  title={article.title}
                  username={article.userInfo && article.userInfo.username}
                  author={article.author}
                  date_published={article.date_published}
                  onDeleteClick={this.handleDeleteArticleButton}
                />
              ))
            : null}
        </ul>
        {arrOfChecks ? (
          <div className="viewMoreArticles">
            <Button
              color="primary"
              variant="contained"
              onClick={this.onViewMoreClick}
            >
              View More
            </Button>
          </div>
        ) : null}
      </section>
    );
  }
}
