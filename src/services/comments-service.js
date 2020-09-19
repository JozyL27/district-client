import config from "../config";
import TokenService from "./token-service";

const CommentsService = {
  async getArticleComments(articleId, page) {
    try {
      let res = await fetch(
        `${config.API_ENDPOINT}/comments/article/${articleId}?page=${page}`
      );

      let data = res.json();
      return data;
    } catch (error) {
      Promise.reject(error);
    }
  },
  async editComment(commentId, text) {
    try {
      let res = await fetch(`${config.API_ENDPOINT}/comments/${commentId}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
          authorization: `bearer ${TokenService.getAuthToken()}`,
        },
        body: JSON.stringify({ text }),
      });

      return res.ok ? "Comment updated" : res.json();
    } catch (error) {
      Promise.reject(error);
    }
  },
  async deleteComment(commentId) {
    try {
      await fetch(`${config.API_ENDPOINT}/comments/${commentId}`, {
        method: "DELETE",
        headers: {
          authorization: `bearer ${TokenService.getAuthToken()}`,
        },
      });
    } catch (error) {
      Promise.reject(error);
    }
  },
  async getCommentById(commentId) {
    try {
      let res = await fetch(`${config.API_ENDPOINT}/comments/${commentId}`);

      const data = res.json();
      return data;
    } catch (error) {
      Promise.reject(error);
    }
  },
  async addComment(newComment) {
    try {
      let res = await fetch(`${config.API_ENDPOINT}/comments`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `bearer ${TokenService.getAuthToken()}`,
        },
        body: JSON.stringify(newComment),
      }).catch((error) => Promise.reject(error));

      const data = res.json();
      return data;
    } catch (error) {
      throw error;
    }
  },
};

export default CommentsService;
