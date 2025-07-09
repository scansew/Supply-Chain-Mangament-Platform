const { gql } = require('apollo-server-express');
const authTypeDefs = require('./auth');
const fileTypeDefs = require('./file');

/**
 * Root GraphQL type definitions for the ScanSew API
 * @namespace Root
 */

const rootTypeDefs = gql`
  """
  Root Query type for fetching data
  """
  type Query {
    """
    Get a list of all companies
    @returns {Array<Company>} List of companies
    @throws {UnauthorizedError} If user is not authenticated
    @throws {ForbiddenError} If user doesn't have admin privileges
    """
    companies: [Company!]!

    """
    Get a single company by ID
    @param {ID!} id - The ID of the company to retrieve
    @returns {Company} The requested company
    @throws {NotFoundError} If company with the given ID is not found
    @throws {UnauthorizedError} If user is not authenticated
    """
    company(id: ID!): Company

    """
    Get a list of all users
    @returns {Array<User>} List of users
    @throws {UnauthorizedError} If user is not authenticated
    @throws {ForbiddenError} If user doesn't have admin privileges
    """
    users: [User!]!

    """
    Get a single user by ID
    @param {ID!} id - The ID of the user to retrieve
    @returns {User} The requested user
    @throws {NotFoundError} If user with the given ID is not found
    @throws {UnauthorizedError} If user is not authenticated
    """
    user(id: ID!): User

    """
    Get a list of all work orders
    @returns {Array<WorkOrder>} List of work orders
    @throws {UnauthorizedError} If user is not authenticated
    """
    workOrders: [WorkOrder!]!

    """
    Get a single work order by ID
    @param {ID!} id - The ID of the work order to retrieve
    @returns {WorkOrder} The requested work order
    @throws {NotFoundError} If work order with the given ID is not found
    @throws {UnauthorizedError} If user is not authenticated
    """
    workOrder(id: ID!): WorkOrder

    """
    Get the currently authenticated user
    @returns {User} The currently authenticated user
    @throws {UnauthorizedError} If no user is authenticated
    """
    me: User
  }

  """
  Root Mutation type for modifying data
  """
  type Mutation {
    """
    Register a new user account
    @param {SignUpInput!} input - User registration details
    @returns {AuthPayload} Authentication token and user data
    @throws {ValidationError} If input validation fails
    @throws {ConflictError} If email is already registered
    """
    signUp(input: SignUpInput!): AuthPayload!

    """
    Authenticate a user and return an access token
    @param {String!} email - User's email address
    @param {String!} password - User's password
    @returns {AuthPayload} Authentication token and user data
    @throws {AuthenticationError} If credentials are invalid
    @throws {UserNotFoundError} If no user exists with the provided email
    """
    login(email: String!, password: String!): AuthPayload!

    # Company
    """
    Create a new company
    @param {CompanyInput!} input - Company details
    @returns {Company} The created company
    @throws {UnauthorizedError} If user is not authenticated
    @throws {ForbiddenError} If user doesn't have admin privileges
    @throws {ValidationError} If input validation fails
    """
    createCompany(input: CompanyInput!): Company!

    """
    Update an existing company
    @param {ID!} id - The ID of the company to update
    @param {CompanyInput!} input - Updated company details
    @returns {Company} The updated company
    @throws {NotFoundError} If company with the given ID is not found
    @throws {UnauthorizedError} If user is not authenticated
    @throws {ForbiddenError} If user doesn't have admin privileges
    @throws {ValidationError} If input validation fails
    """
    updateCompany(id: ID!, input: CompanyInput!): Company!

    """
    Delete a company
    @param {ID!} id - The ID of the company to delete
    @returns {Boolean} True if deletion was successful
    @throws {NotFoundError} If company with the given ID is not found
    @throws {UnauthorizedError} If user is not authenticated
    @throws {ForbiddenError} If user doesn't have admin privileges
    @throws {ConflictError} If company has associated users or work orders
    """
    deleteCompany(id: ID!): Boolean!

    # User
    """
    Create a new user
    @param {CreateUserInput!} input - User details
    @returns {User} The created user
    @throws {UnauthorizedError} If user is not authenticated
    @throws {ForbiddenError} If user doesn't have admin privileges
    @throws {ValidationError} If input validation fails
    @throws {ConflictError} If email is already registered
    """
    createUser(input: CreateUserInput!): User!

    """
    Update an existing user
    @param {ID!} id - The ID of the user to update
    @param {UpdateUserInput!} input - Updated user details
    @returns {User} The updated user
    @throws {NotFoundError} If user with the given ID is not found
    @throws {UnauthorizedError} If user is not authenticated
    @throws {ForbiddenError} If user doesn't have permission to update this user
    @throws {ValidationError} If input validation fails
    """
    updateUser(id: ID!, input: UpdateUserInput!): User!

    """
    Delete a user
    @param {ID!} id - The ID of the user to delete
    @returns {Boolean} True if deletion was successful
    @throws {NotFoundError} If user with the given ID is not found
    @throws {UnauthorizedError} If user is not authenticated
    @throws {ForbiddenError} If user doesn't have admin privileges
    @throws {ConflictError} If user has associated work orders
    """
    deleteUser(id: ID!): Boolean!

    """
    Change the current user's password
    @param {String!} oldPassword - Current password
    @param {String!} newPassword - New password
    @returns {Boolean} True if password was changed successfully
    @throws {UnauthorizedError} If user is not authenticated
    @throws {AuthenticationError} If old password is incorrect
    @throws {ValidationError} If new password doesn't meet requirements
    """
    changePassword(oldPassword: String!, newPassword: String!): Boolean!

    # Work Order
    """
    Create a new work order
    @param {WorkOrderInput!} input - Work order details
    @returns {WorkOrder} The created work order
    @throws {UnauthorizedError} If user is not authenticated
    @throws {NotFoundError} If referenced company or user doesn't exist
    @throws {ValidationError} If input validation fails
    """
    createWorkOrder(input: WorkOrderInput!): WorkOrder!

    """
    Update an existing work order
    @param {ID!} id - The ID of the work order to update
    @param {WorkOrderInput!} input - Updated work order details
    @returns {WorkOrder} The updated work order
    @throws {NotFoundError} If work order with the given ID is not found
    @throws {UnauthorizedError} If user is not authenticated
    @throws {ForbiddenError} If user doesn't have permission to update this work order
    @throws {ValidationError} If input validation fails
    """
    updateWorkOrder(id: ID!, input: WorkOrderInput!): WorkOrder!

    """
    Delete a work order
    @param {ID!} id - The ID of the work order to delete
    @returns {Boolean} True if deletion was successful
    @throws {NotFoundError} If work order with the given ID is not found
    @throws {UnauthorizedError} If user is not authenticated
    @throws {ForbiddenError} If user doesn't have permission to delete this work order
    """
    deleteWorkOrder(id: ID!): Boolean!

    """
    Update the status of a work order
    @param {ID!} id - The ID of the work order to update
    @param {WorkOrderStatus!} status - New status for the work order
    @returns {WorkOrder} The updated work order
    @throws {NotFoundError} If work order with the given ID is not found
    @throws {UnauthorizedError} If user is not authenticated
    @throws {ForbiddenError} If user doesn't have permission to update this work order
    @throws {ValidationError} If status transition is not allowed
    """
    updateWorkOrderStatus(id: ID!, status: WorkOrderStatus!): WorkOrder!
  }
`;

// Merge all type definitions
const typeDefs = [rootTypeDefs, authTypeDefs, fileTypeDefs];

module.exports = typeDefs;
