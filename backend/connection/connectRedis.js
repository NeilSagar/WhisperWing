// redisConnection.js
import { createClient } from 'redis';

// Create a Redis client
const client = createClient({
  url: 'redis://localhost:6379'  // Use the correct Redis URL
});

client.on('connect', () => {
  console.log('Connected to Redis');
});

client.on('error', (err) => {
  console.error('Error connecting to Redis:', err);
});

// Explicitly connect to Redis
const connectRedis = async () => {
  try {
    await client.connect();
  } catch (error) {
    console.error('Error during Redis connection:', error);
  }
};

const disconnectRedis = async () => {
  try {
    await client.quit();
  } catch (error) {
    console.error('Error during Redis disconnection:', error);
  }
};


const startRedisServer = async () => {
    try{
        await connectRedis();
    }catch (error) {
        console.log("Error connecting to Redis Server.");
    }    
};
  

// Exporting the client and connection functions
export { startRedisServer,client, disconnectRedis };
