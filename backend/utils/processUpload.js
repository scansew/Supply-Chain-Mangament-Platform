const { uploadFile } = require('./fileStorage');
const stream = require('stream');
const { promisify } = require('util');

const pipeline = promisify(stream.pipeline);

/**
 * Process file upload and return file details
 * @param {Function} createReadStream - Function that returns a readable stream
 * @param {string} mimetype - The MIME type of the file
 * @param {string} [folder] - Optional folder to organize files
 * @returns {Promise<{key: string, url: string, size: number}>} File details
 */
async function processUpload(createReadStream, mimetype, folder) {
  try {
    // Create a transform stream to track the file size
    let fileSize = 0;
    const sizeTracker = new stream.Transform({
      transform(chunk, encoding, callback) {
        fileSize += chunk.length;
        this.push(chunk);
        callback();
      }
    });

    // Create a buffer to store the file data
    const chunks = [];
    const bufferCollector = new stream.Writable({
      write(chunk, encoding, callback) {
        chunks.push(chunk);
        callback();
      }
    });

    // Create the read stream
    const readStream = createReadStream();
    
    // Pipe the stream through our trackers
    await pipeline(
      readStream,
      sizeTracker,
      bufferCollector
    );
    
    // Combine all chunks into a single buffer
    const buffer = Buffer.concat(chunks);
    
    // Upload the file to MinIO
    const { key, url } = await uploadFile(buffer, mimetype, folder);
    
    return { 
      key, 
      url,
      size: fileSize
    };
  } catch (error) {
    console.error('Error processing upload:', error);
    throw new Error(`Failed to process file upload: ${error.message}`);
  }
}

module.exports = { processUpload };
