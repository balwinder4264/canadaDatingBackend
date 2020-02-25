const { ApolloServer, gql } = require("apollo-server");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const { typeDefs } = require("./schema");
const { resolvers } = require("./resolver");
require("dotenv").config({ path: "variables.env" });

mongoose
  .connect("mongodb://localhost/admin", { useNewUrlParser: true })
  .then(() => {
    server.listen(8000);
  })
  .catch(err => {
    console.log(err);
  });

//   mongoose.connect('mongodb://localhost/test',function(err){
//     if(err){
//         console.log(err);
//     }else{
//         console.log('Connected to mongodb');
//     }
// })

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const token = req.headers["authorization"];
    console.log("not token 23", token);
    if (token !== "null") {
      try {
        const currentuser = await jwt.verify(token, process.env.SECRET);
        return currentuser;
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("not token 2");
      return;
    }
  }
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
