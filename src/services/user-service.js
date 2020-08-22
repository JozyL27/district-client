import config from "../config";

const UserService = {
  async getAuthorInfo(id) {
    try {
      let res = await fetch(
        `${config.API_ENDPOINT}/user/${id}`
      ).catch((error) => Promise.reject(error));

      const data = res.json();
      return data;
    } catch (error) {
      Promise.reject(error);
    }
  },
  async updateUserInfo(id, newUserInfo) {
    try {
      let res = await fetch(`${config.API_ENDPOINT}/user/${id}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(newUserInfo),
      }).catch((error) => Promise.reject(error));

      return res.ok ? "Profile updated" : res.json();
    } catch (error) {
      Promise.reject(error);
    }
  },
  async addUserAvatar(avatar) {
    try {
      let res = await fetch(`${config.API_ENDPOINT}/user/avatar`, {
        method: "POST",
        body: avatar,
      }).catch((error) => Promise.reject(error));

      const data = res.json();
      return data;
    } catch (error) {
      Promise.reject(error);
    }
  },
};

export default UserService;
