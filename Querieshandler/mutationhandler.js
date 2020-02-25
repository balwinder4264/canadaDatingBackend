const UserMutation = require("./user/usermutation");

module.exports = {
  Mutation: {
    ...UserMutation
  }
};
