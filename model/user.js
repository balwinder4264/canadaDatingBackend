const mongoos = require("mongoose");
const Schema = mongoos.Schema;
const bcrypt = require("bcrypt");
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  Gender: {
    type: String,
    required: true
  },
  Location: {
    type: String,
    required: true
  },
  joinDate: {
    type: Date,
    default: Date.now()
  },
  friends: {
    type: [Schema.Types.ObjectId],
    ref: "User"
  },
  sentrequest: {
    type: [Schema.Types.ObjectId],
    ref: "User"
  },
  recieverequest: {
    type: [Schema.Types.ObjectId],
    ref: "User"
  }
});

userSchema.pre("save", function(next) {
  if (!this.isModified("password")) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);
    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) return next(err);
      this.password = hash;
      next();
    });
  });
});

module.exports = mongoos.model("User", userSchema);
