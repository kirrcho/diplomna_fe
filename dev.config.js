const baseConfig = require("./webpack.config.js");
const Dotenv = require("dotenv-webpack");

module.exports = () => {
  baseConfig.plugins.push(new Dotenv({ path: "./.env.dev" }));

  return baseConfig;
};
