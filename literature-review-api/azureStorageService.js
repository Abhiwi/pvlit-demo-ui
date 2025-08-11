const { BlobServiceClient } = require('@azure/storage-blob');

const AZURE_STORAGE_ACCOUNT_NAME = process.env.AZURE_STORAGE_ACCOUNT_NAME || 'storageattach1';
const AZURE_STORAGE_ACCOUNT_KEY = process.env.AZURE_STORAGE_ACCOUNT_KEY || 'CzfafEbGF7YzQoqShY7N3dUpw13kC2CRvNcvjasem5H6YNpi4sKI6qZFcIeVpFFDTYiFTiQ1B0jE+AStykwq/w==';
const AZURE_STORAGE_CONTAINER_NAME = process.env.AZURE_STORAGE_CONTAINER_NAME || 'manual-pdfs';
const AZURE_STORAGE_CONNECTION_STRING = `DefaultEndpointsProtocol=https;AccountName=${AZURE_STORAGE_ACCOUNT_NAME};AccountKey=${AZURE_STORAGE_ACCOUNT_KEY};EndpointSuffix=core.windows.net` || 'DefaultEndpointsProtocol=https;AccountName=storageattach1;AccountKey=CzfafEbGF7YzQoqShY7N3dUpw13kC2CRvNcvjasem5H6YNpi4sKI6qZFcIeVpFFDTYiFTiQ1B0jE+AStykwq/w==;EndpointSuffix=core.windows.net';

class AzureStorageService {
  // Initialize Azure Blob Storage client
  async getBlobClient() {
    try {
      const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
      const containerClient = blobServiceClient.getContainerClient(AZURE_STORAGE_CONTAINER_NAME);
      
      // Ensure the container exists
      await containerClient.createIfNotExists();
      return containerClient;
    } catch (error) {
      console.error('Error initializing Azure Blob Storage client:', error);
      throw new Error('Failed to initialize storage client');
    }
  }

  // Upload document to Azure Blob Storage
  async uploadDocument(fileBuffer, articlePMID) {
    try {
      if (!fileBuffer || !articlePMID) {
        throw new Error('File and Article PMID are required');
      }

      const containerClient = await this.getBlobClient();
      
      // Use Article PMID as the file name with .pdf extension
      const blobName = `${articlePMID}.pdf`;
      const blockBlobClient = containerClient.getBlockBlobClient(blobName);

      // Upload the file buffer
      await blockBlobClient.uploadData(fileBuffer, {
        blobHTTPHeaders: { blobContentType: 'application/pdf' }
      });

      // Return the URL of the uploaded file
      const fileUrl = blockBlobClient.url;
      console.log(`File uploaded successfully to Azure Blob Storage: ${fileUrl}`);
      return fileUrl;
    } catch (error) {
      console.error('Error uploading document to Azure Blob Storage:', error);
      throw new Error(`Failed to upload document: ${error.message}`);
    }
  }
}

module.exports = new AzureStorageService();