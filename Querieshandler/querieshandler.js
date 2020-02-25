const UserQuerryHandler = require("./user/userqueries");
module.exports = {
  Query: {
    ...UserQuerryHandler
  }
};
