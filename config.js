const dotenv = require("dotenv");
dotenv.config();
module.exports = {
  //   endpoint: process.env.API_URL,
  API_KEY: process.env.API_KEY,
  PORT: process.env.PORT,
};
