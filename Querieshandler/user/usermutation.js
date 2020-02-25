const User = require("../../model/user");
const bcrypt = require("bcrypt");
const Friend = require("../../model/Friends");
const { createToken } = require("../../TokenCreate/createToken");
module.exports = {
  signinUser: async (root, { username, email, password }) => {
    console.log("yo we ", username);
    const user = await User.findOne({ username });
    console.log(user);
    if (!user) {
      throw new Error("user Does not Exsist");
    }
    const IsValidPassword = await bcrypt.compare(password, user.password);
    if (!IsValidPassword) {
      throw new Error("Invalid password");
    }
    return { token: createToken(user, process.env.SECRET, "365d") };
  },
  signupUser: async (root, { username, email, password, Gender, Location }) => {
    const user = await User.findOne({ username });
    if (user) {
      console.log("userExsist");
      return { userExsist: "user Exsists" };
      // throw new Error("User Already Exsist");
    }

    const newUser = await new User({
      username,
      email,
      password,
      Gender,
      Location
    }).save();
    console.log(process.env.SECRET);
    return { token: createToken(newUser, process.env.SECRET, "365d") };
  },
  friendRequestaccept: async (root, { username, _id }, context) => {
    console.log("token data: ", _id);
    const user = await Friend.findOne({
      $and: [{ reciever: context.username }, { sender: username }]
    });
    if (user) {
      const userAcceptRequest = await Friend.findOneAndUpdate(
        {
          $and: [{ reciever: context.username }, { sender: username }]
        },
        { accept: true }
      );
      console.log("Userpresent ", userAcceptRequest);
      const user1 = await User.findOneAndUpdate(
        { username: context.username },
        {
          $addToSet: {
            friends: _id
          },
          $pull: {
            recieverequest: _id
          }
        }
      );
      const user2 = await User.findOneAndUpdate(
        { username: username },
        {
          $addToSet: {
            friends: context._id
          },
          $pull: {
            sentrequest: context._id
          }
        }
      );
      return [userAcceptRequest];
    } else {
      const usersentRequest = await Friend.insertMany({
        sender: context.username,
        request: true,
        reciever: username,
        accept: false
      });

      const user1 = await User.findOneAndUpdate(
        { _id: context._id },
        {
          $addToSet: {
            sentrequest: _id
          }
        }
      );
      const user2 = await User.findOneAndUpdate(
        { _id: _id },
        {
          $addToSet: {
            recieverequest: context._id
          }
        }
      );

      console.log("friends : ", usersentRequest);
      return usersentRequest;
    }
  },
  unfriend: async (root, { _id }, context) => {
    const user = await Friend.findOne({
      $and: [
        { reciever: context.username },
        { sender: username },
        { sender: true },
        { reciever: true }
      ]
    });
    const user2 = await User.findOneAndUpdate(
      { _id: _id },
      {
        $pull: {
          friends: context._id
        }
      }
    );
    const user3 = await User.findOneAndUpdate(
      { _id: context._id },
      {
        $pull: {
          friends: _id
        }
      }
    );
    return user;
  }
};
