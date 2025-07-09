const { gql } = require('apollo-server-express');

/**
 * User type definitions for the ScanSew API
 * @namespace User
 */

module.exports = gql`
  """
  A user account in the ScanSew system
  """
  type User {
    """The unique identifier for the user"""
    id: ID!
    
    """The username used for login (must be unique)"""
    username: String!
    
    """The user's email address (must be unique)"""
    email: String!
    
    """The user's last name or surname"""
    family_name: String
    
    """The user's first name"""
    given_name: String
    
    """The date and time when the user account was created"""
    createdAt: String
    
    """The date and time when the user account was last updated"""
    updatedAt: String
    
    """
    The user's role in the system
    @enum {string} Role
    @value ADMIN System administrator with full access
    @value USER Regular user with limited permissions
    @value MANAGER Manager with elevated permissions
    """
    role: String
    
    """The ID of the company this user belongs to"""
    companyId: String
    
    """The name of the company this user belongs to (denormalized for convenience)"""
    companyName: String
    
    """The company this user belongs to (resolved relation)"""
    company: Company
  }

  """
  Input type for creating a new user
  """
  input CreateUserInput {
    """The username used for login (must be unique)"""
    username: String!
    
    """The user's email address (must be unique)"""
    email: String!
    
    """The user's password (will be hashed before storage)"""
    password: String!
    
    """The user's first name"""
    given_name: String
    
    """The user's last name or surname"""
    family_name: String
    
    """
    The user's role in the system
    @default "USER"
    """
    role: String
    
    """The ID of the company this user belongs to (required for non-admin users)"""
    companyId: String
  }

  """
  Input type for updating an existing user
  """
  input UpdateUserInput {
    """The username used for login (must be unique)"""
    username: String
    
    """The user's email address (must be unique)"""
    email: String
    
    """The user's first name"""
    given_name: String
    
    """The user's last name or surname"""
    family_name: String
    
    """
    The user's role in the system
    @default "USER"
    """
    role: String
    
    """The ID of the company this user belongs to"""
    companyId: String
  }
`;
