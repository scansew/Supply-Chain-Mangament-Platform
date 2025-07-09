const { gql } = require('apollo-server');

module.exports = gql`
  type WorkOrder {
    id: ID!
    woNumber: Int!
    createdById: String!
    assignedToId: String
    companyId: String
    status: String
    createdAt: String
    updatedAt: String
    details: String
    type: String
    company: Company
    createdBy: User
    assignedTo: User
  }
`;
