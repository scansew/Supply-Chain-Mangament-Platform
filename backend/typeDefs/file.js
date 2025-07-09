const { gql } = require('apollo-server-express');

/**
 * File type definitions for the ScanSew API
 * @namespace File
 */

const fileTypeDefs = gql`
  """
  The Upload scalar type represents a file upload
  @see https://github.com/jaydenseric/graphql-upload
  """
  scalar Upload
  
  """
  A file stored in the ScanSew system
  """
  type File {
    """The unique identifier for the file"""
    id: ID!
    
    """The original name of the uploaded file"""
    filename: String!
    
    """The MIME type of the file"""
    mimetype: String!
    
    """The character encoding of the file (if applicable)"""
    encoding: String!
    
    """The public URL to access the file"""
    url: String!
    
    """
    The unique key used to identify the file in storage
    @private Only visible to users with appropriate permissions
    """
    key: String!
    
    """The size of the file in bytes"""
    size: Int!
    
    """The date and time when the file was uploaded"""
    createdAt: String!
    
    """The date and time when the file was last updated"""
    updatedAt: String!
  }

  extend type Query {
    """
    Get a signed URL for a file
    @param {String!} key - The storage key of the file
    @returns {String} A signed URL to access the file
    @throws {NotFoundError} If file with the given key is not found
    @throws {UnauthorizedError} If user is not authenticated
    @throws {ForbiddenError} If user doesn't have permission to access the file
    """
    getFileUrl(key: String!): String!
  }

  extend type Mutation {
    """
    Upload a single file
    @param {Upload!} file - The file to upload
    @param {String} [folder] - Optional folder to organize files (e.g., 'invoices', 'profile-pics')
    @returns {File} The uploaded file metadata
    @throws {ValidationError} If file validation fails (size, type, etc.)
    @throws {UnauthorizedError} If user is not authenticated
    @throws {StorageError} If there's an error storing the file
    """
    singleUpload(file: Upload!, folder: String): File!
    
    """
    Upload multiple files
    """
    multipleUpload(files: [Upload!]!, folder: String): [File!]!
    
    """
    Delete a file
    """
    deleteFile(key: String!): Boolean!
  }
`;

module.exports = fileTypeDefs;
