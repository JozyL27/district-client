import config from "../config";

const ArticlesService = {
  async getArticleCategories() {
    try {
      let res = await fetch(`${config.API_ENDPOINT}/articles/categories`);

      let data = await res.json();
      return data;
    } catch (error) {
      Promise.reject(error);
    }
  },
  async getPopularArticles(pageNumber) {
    try {
      let res = await fetch(
        `${config.API_ENDPOINT}/articles/popular?page=${pageNumber}`
      );

      let data = await res.json();
      return data;
    } catch (error) {
      Promise.reject(error);
    }
  },
  async getArticlesByCategory(category, pageNumber) {
    try {
      let res = await fetch(
        `${config.API_ENDPOINT}/articles/category/${category}?page=${pageNumber}`
      );

      let data = await res.json();
      return data;
    } catch (error) {
      Promise.reject(error);
    }
  },
  async GetArticleById(id) {
    try {
      let res = await fetch(`${config.API_ENDPOINT}/articles/${id}`);

      let data = res.json();
      return data;
    } catch (error) {
      Promise.reject(error);
    }
  },
  async getMyArticles(userId, pageNumber) {
    try {
      let res = await fetch(
        `${config.API_ENDPOINT}/articles/userarticles/${userId}?page=${pageNumber}`
      ).catch((error) => Promise.reject(error));

      const data = res.json();
      return data;
    } catch (error) {
      Promise.reject(error);
    }
  },
  async deleteArticle(ArticleId) {
    try {
      await fetch(`${config.API_ENDPOINT}/articles/${ArticleId}`, {
        method: "DELETE",
      });
    } catch (error) {
      Promise.reject(error);
    }
  },
  async AddNewArticle(newArticle) {
    try {
      let res = await fetch(`${config.API_ENDPOINT}/articles`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(newArticle),
      }).catch((error) => Promise.reject(error));

      const data = res.json();
      return data;
    } catch (error) {
      Promise.reject(error);
    }
  },
  async getUpvotedArticles(userId, pageNumber) {
    try {
      let res = await fetch(
        `${config.API_ENDPOINT}/articles/upvoted/${userId}?page=${pageNumber}`
      ).catch((error) => Promise.reject(error));

      const data = res.json();
      return data;
    } catch (error) {
      Promise.reject(error);
    }
  },
  async getUserFeedArticles(user_id, pageNumber) {
    try {
      let res = await fetch(
        `${config.API_ENDPOINT}/articles/feed/${user_id}?page=${pageNumber}`
      ).catch((error) => Promise.reject(error));

      const data = res.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  },
  async addImageToArticle(image) {
    try {
      let res = await fetch(`${config.API_ENDPOINT}/articles/images`, {
        method: "POST",
        body: image,
      }).catch((error) => Promise.reject(error));

      const data = res.json();
      return data;
    } catch (error) {
      Promise.reject(error);
    }
  },
};

export default ArticlesService;
