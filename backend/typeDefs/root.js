const { gql } = require('apollo-server');

module.exports = gql`
  type Query {
    companies: [Company!]!
    company(id: ID!): Company
    users: [User!]!
    user(id: ID!): User
    workOrders: [WorkOrder!]!
    workOrder(id: ID!): WorkOrder
  }

  type Mutation {
    createCompany(name: String!, address: String!, companySecret: String!): Company!
    updateCompany(id: ID!, name: String, address: String, companySecret: String, stripeConnectId: String): Company!
    deleteCompany(id: ID!): Company!

    createUser(username: String!, email: String!): User!
    updateUser(id: ID!, username: String, email: String, family_name: String, given_name: String, role: String, companyId: String, companyName: String): User!
    deleteUser(id: ID!): User!

    createWorkOrder(createdById: String!): WorkOrder!
    updateWorkOrder(id: ID!, assignedToId: String, status: String, details: String, type: String): WorkOrder!
    deleteWorkOrder(id: ID!): WorkOrder!
  }
`;
