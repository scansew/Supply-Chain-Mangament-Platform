const { gql } = require('apollo-server-express');

/**
 * Authentication type definitions for the ScanSew API
 * @namespace Auth
 */

const authTypeDefs = gql`
  """
  Authentication payload containing the JWT token and user data
  """
  type AuthPayload {
    """
    JSON Web Token (JWT) for authenticated requests
    @example "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    """
    token: String!
    
    """The authenticated user's data"""
    user: User!
  }

  """
  Input type for user registration
  """
  input SignUpInput {
    """
    User's email address (must be unique)
    @format email
    @example "user@example.com"
    """
    email: String!
    
    """
    User's password (minimum 8 characters)
    @minLength 8
    @pattern ^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$
    @example "Password123!"
    """
    password: String!
    
    """
    Username (must be unique, alphanumeric with optional underscores)
    @pattern ^[a-zA-Z0-9_]{3,30}$
    @example "johndoe"
    """
    username: String!
    
    """User's first name"""
    givenName: String
    
    """User's last name"""
    familyName: String
    
    """
    User's role in the system
    @default "USER"
    @enum {string} Role
    @value ADMIN System administrator
    @value USER Regular user
    """
    role: String
  }

  """
  Input type for user login
  """
  input LoginInput {
    """
    User's registered email address
    @example "user@example.com"
    """
    email: String!
    
    """
    User's password
    @example "Password123!"
    """
    password: String!
  }
`;

module.exports = authTypeDefs;
