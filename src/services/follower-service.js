import config from "../config";

const FollowerService = {
  async getFollowerCount(user_id) {
    try {
      let res = await fetch(
        `${config.API_ENDPOINT}/followers/count/${user_id}`
      ).catch((error) => Promise.reject(error));

      const data = res.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  },
  async getFollowers(user_id, page) {
    try {
      let res = await fetch(
        `${config.API_ENDPOINT}/followers/userfollowers/${user_id}?page=${page}`
      ).catch((error) => Promise.reject(error));

      const data = res.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  },
  async getFollowing(user_id, page) {
    try {
      let res = await fetch(
        `${config.API_ENDPOINT}/followers/userfollowing/${user_id}?page=${page}`
      ).catch((error) => Promise.reject(error));

      const data = res.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  },
};

export default FollowerService;
