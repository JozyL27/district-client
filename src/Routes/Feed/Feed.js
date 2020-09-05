import React, { Component } from "react";
import UserContext from "../../Context/UserContext";
import ArticlesService from "../../services/article-service";
import ArticleCard from "../../Components/ArticleCard/ArticleCard";

export default class Feed extends Component {
  static contextType = UserContext;

  state = {
    articles: [],
    page: 1,
    error: null,
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
    const { articles } = this.state;
    console.log(articles);
    return (
      <section>
        <ul>
          {articles.length > 0 &&
            articles.map((article) => (
              <ArticleCard
                key={article.article_id}
                avatar={article.userInfo && article.userInfo.avatar}
                id={article.article_id}
                title={article.title}
                username={article.userInfo && article.userInfo.username}
                author={article.author}
                date_published={article.date_published}
              />
            ))}
        </ul>
      </section>
    );
  }
}
