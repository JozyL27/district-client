import config from "../config";
import TokenService from "./token-service";

const UpvoteService = {
  addUpvote(newUpvote) {
    return fetch(`${config.API_ENDPOINT}/upvotes`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify(newUpvote),
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
  async getArticleUpvotes(articleId) {
    try {
      let upvotes = await fetch(`${config.API_ENDPOINT}/upvotes/${articleId}`);

      let data = upvotes.json();
      return data;
    } catch (error) {
      Promise.reject(error);
    }
  },
  async getUpvoters(articleId, page) {
    try {
      let res = await fetch(
        `${config.API_ENDPOINT}/upvotes/users/${articleId}?page=${page}`
      ).catch((error) => Promise.reject(error));

      const data = res.json();
      return data;
    } catch (error) {
      Promise.reject(error);
    }
  },
};

export default UpvoteService;
