import React, { Component } from "react";
import CategoryFilter from "../CategoryFilter/CategoryFilter";
import "../../Styles/Explore.css";
import ArticlesService from "../../services/article-service";
import ArticleCard from "../ArticleCard/ArticleCard";
import art from "../../illustrations/01.png";
import NavArrows from "../NavArrows/NavArrows";
import CircularProgress from "@material-ui/core/CircularProgress";

export default class Explore extends Component {
  state = { category: "", articles: [], page: 1, error: null, loading: false };

  setCategory = (value) => {
    this.setState({ category: value, page: 1 });
  };

  handleResetClick = () => {
    this.setState({ category: "", articles: [], page: 1, error: null });

    ArticlesService.getPopularArticles().then((data) =>
      this.setState({ articles: data })
    );
  };

  handleNextArrow = () => {
    let { page, category } = this.state;
    const newPageValue = (page += 1);
    this.setState({ page: newPageValue, error: null });

    if (category.length < 1) {
      ArticlesService.getPopularArticles(page).then((articles) =>
        articles.error
          ? this.setState({ error: articles.error, articles: [] })
          : this.setState({ articles })
      );
    } else {
      ArticlesService.getArticlesByCategory(category, page).then((articles) =>
        articles.error
          ? this.setState({ error: articles.error, articles: [] })
          : this.setState({ articles })
      );
    }
  };

  handleBackArrow = () => {
    let { page, category } = this.state;
    const newPageValue = (page -= 1);
    this.setState({ page: newPageValue, error: null });

    if (category.length < 1) {
      ArticlesService.getPopularArticles(page).then((articles) =>
        articles.error
          ? this.setState({ error: articles.error })
          : this.setState({ articles })
      );
    } else {
      ArticlesService.getArticlesByCategory(category, page).then((articles) =>
        articles.error
          ? this.setState({ error: articles.error, articles: [] })
          : this.setState({ articles })
      );
    }
  };

  handleDeleteArticleButton = (id) => {
    let { page, category } = this.state;

    ArticlesService.deleteArticle(id).then(() => {
      if (category.length < 1) {
        ArticlesService.getPopularArticles(page).then((articles) =>
          articles.error
            ? this.setState({ error: articles.error, articles: [] })
            : this.setState({ articles })
        );
      } else {
        ArticlesService.getArticlesByCategory(category, page).then((articles) =>
          articles.error
            ? this.setState({ error: articles.error, articles: [] })
            : this.setState({ articles })
        );
      }
    });
  };

  componentDidMount() {
    this.setState({ loading: true });
    ArticlesService.getPopularArticles().then((data) =>
      data.error
        ? this.setState({ error: data.error, loading: false })
        : this.setState({ articles: data, loading: false, error: null })
    );
  }

  componentDidUpdate(prevProps, prevState) {
    let { category, page } = this.state;

    if (prevState.category !== category && category.length > 0) {
      this.setState({ error: null });
      ArticlesService.getArticlesByCategory(category, page).then((articles) =>
        articles.error
          ? this.setState({ error: articles.error, articles: [] })
          : this.setState({ articles })
      );
    }
  }

  componentWillUnmount() {
    this.setState({ category: "", articles: [], page: 1, error: null });
  }

  render() {
    const { articles, category, page, error, loading } = this.state;

    return (
      <section className="exploreContainer">
        <div className="exploreImgContainer">
          <img src={art} alt="art" className="exploreArt" />
        </div>
        <h2 className="exploreH2">
          {category.length > 1
            ? `Explore The Most Popular ${category}`
            : "Explore The Most Popular"}{" "}
          Articles
        </h2>
        <div className="filterContainer">
          <CategoryFilter
            handleCategoryChange={this.setCategory}
            category={this.state.category}
          />
          <button className="resetButton" onClick={this.handleResetClick}>
            Reset
          </button>
        </div>
        {error && <p>{error}</p>}
        <ul className="articlesContainer">
          {articles.length > 0 && !error ? (
            articles.map((article) => (
              <ArticleCard
                id={article.id}
                key={article.id}
                title={article.title}
                content={article.content}
                style={article.style}
                upvotes={article.upvotes}
                username={article.username}
                date_published={article.date_published}
                author={article.author}
                onDeleteClick={this.handleDeleteArticleButton}
                avatar={article.avatar}
              />
            ))
          ) : loading && !error ? (
            <CircularProgress color="secondary" />
          ) : null}
        </ul>
        <NavArrows
          styleName="exploreNavArrows"
          page={page}
          onNextArrowClick={this.handleNextArrow}
          onBackArrowClick={this.handleBackArrow}
          error={error}
          articleArrayLength={articles.length}
        />
      </section>
    );
  }
}
