const mongoos = require("mongoose");
const Schema = mongoos.Schema;

const friends = new Schema({
  sender: {
    type: String,
    required: true
  },
  request: {
    type: Boolean,
    required: true
  },
  reciever: {
    type: String,
    required: true
  },
  accept: {
    type: Boolean,
    required: true
  }
});

module.exports = mongoos.model("friends", friends);
