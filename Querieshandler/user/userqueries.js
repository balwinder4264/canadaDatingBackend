const User = require("../../model/user");
const Friend = require("../../model/Friends");
module.exports = {
  getCurrentUser: async (root, { username, email, password }, context) => {
    console.log("context", context.username);

    if (!context.username) {
      return null;
    }
    const user = await User.findOne({ username: context.username })
      .populate({
        path: "friends",
        model: "User"
      })
      .populate({
        path: "sentrequest",
        model: "User"
      })
      .populate({
        path: "recieverequest",
        model: "User"
      });
    console.log("user ", user);
    return user;
  },
  getOppositeGenderUser: async (root, {}, context) => {
    if (!context.username) {
      return null;
    }
    const loginUser = await User.findOne({ username: context.username });
    const OppositeGenderUSers = await User.find({
      Gender: { $ne: loginUser.Gender },

      $and: [
        { _id: { $nin: loginUser.friends } },
        { _id: { $nin: loginUser.sentrequest } },
        { _id: { $nin: loginUser.recieverequest } }
      ]
    })
      .populate({
        path: "sentrequest",
        model: "User"
      })
      .populate({
        path: "recieverequest",
        model: "User"
      });
    console.log("OppositeGenderUSers : ", OppositeGenderUSers);
    console.log("login user friend : ", loginUser.friends);
    return OppositeGenderUSers;
  },
  Friends: async (root, {}, context) => {
    if (!context.username) {
      return null;
    }
    const friends = await Friend.find({
      $or: [{ sender: context.username }, { reciever: context.username }],
      $and: [{ request: true }, { accept: true }]
    });

    return friends;
  },
  getSingleUserData: async (root, { _id }, context) => {
    console.log("getSingleUserData : ", _id);
    if (!context) {
      return null;
    }
    const user = await User.findOne({ _id: _id });

    return user;
  }
};
