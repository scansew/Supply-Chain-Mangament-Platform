const { gql } = require('apollo-server');

module.exports = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    family_name: String
    given_name: String
    createdAt: String
    updatedAt: String
    role: String
    companyId: String
    companyName: String
    company: Company
  }
`;
