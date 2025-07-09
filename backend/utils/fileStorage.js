/**
 * @module utils/fileStorage
 * @description Provides file storage operations using MinIO/S3 compatible storage.
 * @requires @aws-sdk/client-s3
 * @requires @aws-sdk/s3-request-presigner
 * @requires uuid
 */

const { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

/**
 * S3 client configuration for MinIO
 * @type {Object}
 * @property {Function} send - Method to send S3 commands
 */
const s3Client = new S3Client({
  endpoint: `http://${process.env.MINIO_ENDPOINT}:${process.env.MINIO_PORT}`,
  region: 'us-east-1', // MinIO requires a region, but it can be any value
  forcePathStyle: true, // Required for MinIO
  credentials: {
    accessKeyId: process.env.MINIO_ACCESS_KEY,
    secretAccessKey: process.env.MINIO_SECRET_KEY,
  },
});

/**
 * Name of the S3 bucket used for file storage
 * @type {string}
 */
const BUCKET_NAME = process.env.MINIO_BUCKET_NAME;

/**
 * Uploads a file to the storage service
 * @async
 * @function uploadFile
 * @memberof module:utils/fileStorage
 * @param {Buffer} fileBuffer - The file content as a Buffer
 * @param {string} mimetype - The MIME type of the file (e.g., 'image/png', 'application/pdf')
 * @param {string} [folder=''] - Optional folder path to organize files (e.g., 'user-uploads/profile-pictures')
 * @returns {Promise<{key: string, url: string}>} Object containing the file key and a pre-signed URL
 * @throws {Error} If the file upload fails
 * @example
 * const { uploadFile } = require('./utils/fileStorage');
 * const fs = require('fs');
 * 
 * const fileBuffer = fs.readFileSync('example.jpg');
 * const { key, url } = await uploadFile(fileBuffer, 'image/jpeg', 'user-uploads');
 * console.log(`File uploaded with key: ${key}, accessible at: ${url}`);
 */
async function uploadFile(fileBuffer, mimetype, folder = '') {
  const key = folder ? `${folder}/${uuidv4()}` : uuidv4();
  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
    Body: fileBuffer,
    ContentType: mimetype,
  });

  try {
    await s3Client.send(command);
    const url = await getSignedUrl(s3Client, new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
    }), { expiresIn: 60 * 60 * 24 * 7 }); // 7 days expiry

    return { key, url };
  } catch (error) {
    console.error('Error uploading file:', error);
    throw new Error('Failed to upload file');
  }
}

/**
 * Generates a pre-signed URL for accessing a file
 * @async
 * @function getFileUrl
 * @memberof module:utils/fileStorage
 * @param {string} key - The unique file identifier (returned from uploadFile)
 * @param {number} [expiresIn=3600] - URL expiration time in seconds (default: 1 hour)
 * @returns {Promise<string>} A pre-signed URL that can be used to access the file
 * @throws {Error} If URL generation fails
 * @example
 * const { getFileUrl } = require('./utils/fileStorage');
 * const url = await getFileUrl('user-uploads/12345-abcde.jpg', 3600);
 * console.log(`File accessible at: ${url}`);
 */
async function getFileUrl(key, expiresIn = 3600) {
  try {
    const command = new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
    });
    return await getSignedUrl(s3Client, command, { expiresIn });
  } catch (error) {
    console.error('Error generating file URL:', error);
    throw new Error('Failed to generate file URL');
  }
}

/**
 * Permanently deletes a file from the storage service
 * @async
 * @function deleteFile
 * @memberof module:utils/fileStorage
 * @param {string} key - The unique file identifier to delete
 * @returns {Promise<boolean>} True if deletion was successful
 * @throws {Error} If the file deletion fails
 * @example
 * const { deleteFile } = require('./utils/fileStorage');
 * const success = await deleteFile('user-uploads/12345-abcde.jpg');
 * if (success) console.log('File deleted successfully');
 */
async function deleteFile(key) {
  try {
    const command = new DeleteObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
    });
    await s3Client.send(command);
    return true;
  } catch (error) {
    console.error('Error deleting file:', error);
    throw new Error('Failed to delete file');
  }
}

module.exports = {
  uploadFile,
  getFileUrl,
  deleteFile,
};
