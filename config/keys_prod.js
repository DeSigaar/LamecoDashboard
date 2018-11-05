// Keys used when running remotely
module.exports = {
  mongoURI: process.env.MONGO_URI,
  secretOrKey: process.env.SECRET_OR_KEY,
  mailHost: process.env.MAIL_HOST,
  mailAccountUsername: process.env.MAIL_USERNAME,
  mailAccountPassword: process.env.MAIL_PASSWORD
};
