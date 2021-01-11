const axios = require("axios");

const api_url = "https://api.github.com";
const authorize_url = "https://github.com/login/oauth/authorize";
const token_url = "https://github.com/login/oauth/access_token";

class GitHub {
  constructor({ client_id = "", client_secret = "", access_token = "" }) {
    this.client_id = client_id;
    this.client_secret = client_secret;
    this.access_token = access_token;
  }

  authorization_url(scope = "") {
    return `${authorize_url}?client_id=${this.client_id}&client_secret=${this.client_secret}&scope=${scope}`;
  }

  async get_token(code) {
    /* Fetch GitHub Access Token for GitHub OAuth */
    const config = { headers: { Accept: "application/json" } };
    const params = {
      code,
      client_id: this.client_id,
      client_secret: this.client_secret,
    };

    try {
      const { data } = await axios.post(token_url, params, config);
      return data.access_token;
    } catch (error) {
      console.error(error);
    }
  }

  async get(route_url, params = {}) {
    const url = api_url + route_url;
    params["access_token"] = this.access_token;

    const headers = {
      Authorization: `token ${this.access_token}`,
    };

    const config = { headers: headers };
    console.log("call 2");
    try {
      const response = await axios.get(url, config, params);
      return response.data;
    } catch (error) {
      console.error(error.response);
    }
  }

  static async get_user_from_token(access_token) {
    /* Fetch user data using the access token. */
    const url = api_url + "/user";
    const headers = {
      Authorization: `token ${access_token}`,
    };
    const config = { headers: headers };

    try {
      const response = await axios.get(url, config);
      return response.data;
    } catch (error) {
      console.error(error.response);
    }
  }
}

module.exports = GitHub;
