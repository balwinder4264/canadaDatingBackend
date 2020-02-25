exports.typeDefs = `

type friends {
  sender:String!
  request:Boolean
  reciever:String!
  accept:Boolean
}
type User {
  _id:ID
  username: String!
    email: String!
    password: String!
    Gender:String!
    Location:String!
    joinDate:  String  
    friends: [User]
    sentrequest:[User]
    recieverequest:[User]
} 
type Query{
  getCurrentUser:User
  getOppositeGenderUser:[User]
  Friends:[friends]
  getSingleUserData(_id:ID!):User
}
  type Mutation {  
          signupUser(username:String!,email:String!,
            password:String!,Gender:String!,Location:String!):Token
            signinUser(username:String!,password:String!):Token
            friendRequestaccept(username:String!,_id:ID):[friends]
            unfriend(_id:ID!):friends
  }
type Token {
   token :String,
   userExsist:Boolean
}
`;
