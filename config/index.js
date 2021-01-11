const dotenv = require("dotenv");

const result = dotenv.config({ path: ".env" });

if (result.error) {
  throw result.error;
}

console.log(result.parsed);

module.exports = {
  port: process.env.PORT || 5000,
  env: process.env.NODE_ENV || "development",
  secretKey: process.env.SECRET_KEY || "octocat",
  githubClientId: process.env.GITHUB_CLIENT_ID || "",
  githubClientSecret: process.env.GITHUB_CLIENT_SECRET || "",
};
