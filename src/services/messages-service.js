import "../config";
import config from "../config";
import TokenService from "./token-service";

const MessageService = {
  async getUserConversations(user_id, page) {
    try {
      let res = await fetch(
        `${config.API_ENDPOINT}/messages/conversations/${user_id}?page=${page}`,
        {
          headers: {
            authorization: `bearer ${TokenService.getAuthToken()}`,
          },
        }
      ).catch((error) => Promise.reject(error));

      const data = res.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  },
};

export default MessageService;
