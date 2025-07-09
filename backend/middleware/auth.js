const { AuthenticationError } = require('apollo-server-express');

// Middleware to check if user is authenticated
const isAuthenticated = (resolve, parent, args, context = {}, info) => {
  if (!context || !context.user) {
    throw new AuthenticationError('You must be logged in to perform this action');
  }
  return resolve(parent, args, context, info);
};

// Middleware to check if user has required role
const hasRole = (roles) => (resolve, parent, args, context = {}, info) => {
  if (!context || !context.user) {
    throw new AuthenticationError('Authentication required');
  }
  
  if (!roles.includes(context.user.role)) {
    throw new Error(`Unauthorized: Requires one of these roles: ${roles.join(', ')}`);
  }
  
  return resolve(parent, args, context, info);
};

module.exports = {
  isAuthenticated,
  hasRole,
};
