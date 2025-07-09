const { gql } = require('apollo-server-express');

/**
 * Company type definitions for the ScanSew API
 * @namespace Company
 */

module.exports = gql`
  """
  A company entity in the ScanSew system that can have multiple users and work orders
  """
  type Company {
    """The unique identifier for the company"""
    id: ID!
    
    """The legal name of the company"""
    name: String!
    
    """The physical address of the company"""
    address: String!
    
    """
    A secret key used for company-specific operations
    @private Only visible to company admins and system admins
    """
    companySecret: String!
    
    """
    The Stripe Connect account ID for payment processing
    @private Only visible to company admins and system admins
    """
    stripeConnectId: String
    
    """The date and time when the company was created"""
    createdAt: String
    
    """The date and time when the company was last updated"""
    updatedAt: String
    
    """List of users associated with this company"""
    users: [User!]
    
    """List of work orders associated with this company"""
    workOrders: [WorkOrder!]
  }

  """
  Input type for creating or updating a company
  """
  input CompanyInput {
    """The legal name of the company"""
    name: String!
    
    """The physical address of the company"""
    address: String!
    
    """
    The Stripe Connect account ID for payment processing
    @private Only visible to company admins and system admins
    """
    stripeConnectId: String
  }
`;
