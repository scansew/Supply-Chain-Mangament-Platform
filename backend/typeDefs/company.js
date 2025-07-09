const { gql } = require('apollo-server');

module.exports = gql`
  type Company {
    id: ID!
    name: String!
    address: String!
    companySecret: String!
    stripeConnectId: String
    createdAt: String
    updatedAt: String
    users: [User!]
    workOrders: [WorkOrder!]
  }
`;
