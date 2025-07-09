const { gql } = require('apollo-server-express');

/**
 * WorkOrder type definitions for the ScanSew API
 * @namespace WorkOrder
 */

module.exports = gql`
  """
  A work order representing a job or task in the ScanSew system
  """
  type WorkOrder {
    """The unique identifier for the work order"""
    id: ID!
    
    """
    A unique, sequential number identifying the work order
    @readonly
    """
    woNumber: Int!
    
    """
    The ID of the user who created this work order
    @readonly
    """
    createdById: String!
    
    """
    The ID of the user this work order is assigned to (optional)
    @readonly
    """
    assignedToId: String
    
    """
    The ID of the company this work order belongs to
    @readonly
    """
    companyId: String
    
    """
    The current status of the work order
    @enum {string} Status
    @value DRAFT Initial state when work order is created
    @value ASSIGNED When work order is assigned to a user
    @value IN_PROGRESS Work on the order has started
    @value COMPLETED Work has been finished
    @value CANCELLED Order was cancelled
    """
    status: String
    
    """The date and time when the work order was created"""
    createdAt: String
    
    """The date and time when the work order was last updated"""
    updatedAt: String
    
    """Detailed description of the work to be performed"""
    details: String
    
    """
    The type of work order
    @enum {string} Type
    @value REPAIR Equipment repair
    @value MAINTENANCE Routine maintenance
    @value INSTALLATION New installation
    @value INSPECTION Regular inspection
    @value OTHER Other type of work
    """
    type: String
    
    """The company this work order belongs to (resolved relation)"""
    company: Company
    
    """The user who created this work order (resolved relation)"""
    createdBy: User
    
    """The user this work order is assigned to (resolved relation, optional)"""
    assignedTo: User
  }

  """
  Input type for creating or updating a work order
  """
  input WorkOrderInput {
    """The ID of the user this work order is assigned to (optional)"""
    assignedToId: String
    
    """The ID of the company this work order belongs to (required for creation)"""
    companyId: String
    
    """The current status of the work order"""
    status: WorkOrderStatus
    
    """Detailed description of the work to be performed"""
    details: String
    
    """The type of work order"""
    type: String
  }

  """
  The status of a work order
  """
  enum WorkOrderStatus {
    """Initial state when work order is created"""
    DRAFT
    
    """When work order is assigned to a user"""
    ASSIGNED
    
    """Work on the order has started"""
    IN_PROGRESS
    
    """Work has been finished"""
    COMPLETED
    
    """Order was cancelled"""
    CANCELLED
  }
`;
