/**
 * @module resolvers/file
 * @description Resolvers for file-related GraphQL operations
 */

const { GraphQLError } = require('graphql');
const { GraphQLUpload } = require('graphql-upload');
const { processUpload } = require('../utils/processUpload');
const { getFileUrl, deleteFile } = require('../utils/fileStorage');
const { PrismaClient } = require('@prisma/client');
const { createWriteStream } = require('fs');
const { promisify } = require('util');
const stream = require('stream');
const path = require('path');

const prisma = new PrismaClient();
const pipeline = promisify(stream.pipeline);

/**
 * File resolvers for handling file uploads and downloads
 * @namespace FileResolvers
 */
const fileResolvers = {
  /**
   * The Upload scalar type from graphql-upload
   * @memberof FileResolvers
   */
  Upload: GraphQLUpload,
  
  Query: {
    /**
     * Resolver for getFileUrl query
     * @memberof FileResolvers.Query
     * @param {Object} _ - Parent resolver result
     * @param {Object} args - Query arguments
     * @param {string} args.key - The storage key of the file
     * @param {Object} context - GraphQL context
     * @param {Object} context.user - The authenticated user
     * @returns {Promise<string>} Signed URL to access the file
     * @throws {GraphQLError} If user is not authenticated
     */
    getFileUrl: async (_, { key }, { user }) => {
      if (!user) {
        throw new GraphQLError('Not authenticated', {
          extensions: { code: 'UNAUTHENTICATED' },
        });
      }
      return getFileUrl(key);
    },
  },
  
  Mutation: {
    /**
     * Resolver for singleUpload mutation
     * @memberof FileResolvers.Mutation
     * @param {Object} _ - Parent resolver result
     * @param {Object} args - Mutation arguments
     * @param {Object} args.file - The file to upload (GraphQL Upload type)
     * @param {string} [args.folder] - Optional folder to organize files
     * @param {Object} context - GraphQL context
     * @param {Object} context.user - The authenticated user
     * @returns {Promise<Object>} The uploaded file metadata
     * @throws {GraphQLError} If user is not authenticated or upload fails
     */
    singleUpload: async (_, { file, folder }, { user }) => {
      if (!user) {
        throw new GraphQLError('Not authenticated', {
          extensions: { code: 'UNAUTHENTICATED' },
        });
      }

      try {
        const { createReadStream, filename, mimetype, encoding } = await file;
        
        // Process the upload and get file details
        const { key, url, size } = await processUpload(createReadStream, mimetype, folder);
        
        // Save file metadata to database
        const savedFile = await prisma.file.create({
          data: {
            filename,
            mimetype,
            encoding,
            url,
            key,
            size,
            createdById: user.id,
          },
        });

        return savedFile;
      } catch (error) {
        console.error('Error uploading file:', error);
        throw new GraphQLError('Failed to upload file', {
          extensions: { code: 'UPLOAD_FAILED' },
        });
      }
    },
    
    /**
     * Resolver for multipleUpload mutation
     * @memberof FileResolvers.Mutation
     * @param {Object} _ - Parent resolver result
     * @param {Object} args - Mutation arguments
     * @param {Array<Object>} args.files - Array of files to upload (GraphQL Upload type)
     * @param {string} [args.folder] - Optional folder to organize files
     * @param {Object} context - GraphQL context
     * @param {Object} context.user - The authenticated user
     * @returns {Promise<Array<Object>>} Array of uploaded file metadata
     * @throws {GraphQLError} If user is not authenticated or upload fails
     */
    multipleUpload: async (_, { files, folder }, { user }) => {
      if (!user) {
        throw new GraphQLError('Not authenticated', {
          extensions: { code: 'UNAUTHENTICATED' },
        });
      }

      try {
        const uploadPromises = files.map(async (file) => {
          const { createReadStream, filename, mimetype, encoding } = await file;
          
          // Process the upload and get file details
          const { key, url, size } = await processUpload(createReadStream, mimetype, folder);
          
          // Save file metadata to database
          return prisma.file.create({
            data: {
              filename,
              mimetype,
              encoding,
              url,
              key,
              size,
              createdById: user.id,
            },
          });
        });

        return await Promise.all(uploadPromises);
      } catch (error) {
        console.error('Error uploading files:', error);
        throw new GraphQLError('Failed to upload files', {
          extensions: { code: 'UPLOAD_FAILED' },
        });
      }
    },
    
    /**
     * Resolver for deleteFile mutation
     * @memberof FileResolvers.Mutation
     * @param {Object} _ - Parent resolver result
     * @param {Object} args - Mutation arguments
     * @param {string} args.key - The storage key of the file to delete
     * @param {Object} context - GraphQL context
     * @param {Object} context.user - The authenticated user
     * @returns {Promise<boolean>} True if deletion was successful
     * @throws {GraphQLError} If user is not authenticated, not authorized, or deletion fails
     */
    deleteFile: async (_, { key }, { user }) => {
      if (!user) {
        throw new GraphQLError('Not authenticated', {
          extensions: { code: 'UNAUTHENTICATED' },
        });
      }

      try {
        // First, get the file to check ownership
        const file = await prisma.file.findUnique({
          where: { key },
        });

        if (!file) {
          throw new GraphQLError('File not found', {
            extensions: { code: 'NOT_FOUND' },
          });
        }

        // Check if user is the owner or an admin
        if (file.createdById !== user.id && user.role !== 'ADMIN') {
          throw new GraphQLError('Not authorized to delete this file', {
            extensions: { code: 'FORBIDDEN' },
          });
        }

        // Delete from storage
        await deleteFile(key);

        // Delete from database
        await prisma.file.delete({
          where: { key },
        });

        return true;
      } catch (error) {
        console.error('Error deleting file:', error);
        throw new GraphQLError('Failed to delete file', {
          extensions: { code: 'DELETE_FAILED' },
        });
      }
    },
  },
};

module.exports = fileResolvers;
