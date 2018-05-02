export default `
    type Name {
        first: String!
        last: String!
    }
    
    type User {
        _id: String!
        email: String!
        name: Name!
        photo: String
        authorization: String!
    }
    
    extend type Mutation {
        signIn(email:String!, password: String!): String!
    }
    
    extend type Query {
        currentUser: User
    }
`