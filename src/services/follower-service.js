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
  async alreadyFollowing(user_id, follower_id) {
    try {
      let res = await fetch(
        `${config.API_ENDPOINT}/followers/${user_id}?follower_id=${follower_id}`
      );

      const data = res.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  },
  async unfollow(user_id, followerInfo) {
    try {
      await fetch(`${config.API_ENDPOINT}/followers/${user_id}`, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(followerInfo),
      });
    } catch (error) {
      console.error(error);
    }
  },
  async followUser(newFollowerFields) {
    try {
      let res = await fetch(`${config.API_ENDPOINT}/followers`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(newFollowerFields),
      });

      const data = res.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  },
};

export default FollowerService;
