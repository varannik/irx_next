import { MongoClient, MongoClientOptions } from "mongodb";

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

const uri = process.env.MONGO_URI as string; // MongoDB Atlas connection URI
const options: MongoClientOptions = {
  maxPoolSize: 10,         // Adjust based on your application's expected load
  minPoolSize: 5,          // Maintain a minimum number of connections
  connectTimeoutMS: 10000, // Timeout if unable to connect within 10 seconds
  socketTimeoutMS: 45000,  // Timeout inactive sockets after 45 seconds
  retryWrites: true,        // Enable retryable writes
  // useUnifiedTopology is no longer needed in v4.x
};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

// Function to create a new MongoClient with event logging
const createClient = (): MongoClient => {
  const newClient = new MongoClient(uri, options);

  newClient.on("open", () => console.log("🟢 MongoDB connected."));
  newClient.on("close", () => console.log("🔴 MongoDB disconnected."));
  newClient.on("error", (err) => console.error("MongoDB connection error:", err));

  return newClient;
};

// Function to handle connection attempts with retry logic
const connectWithRetry = (retries = 3, delay = 1000): Promise<MongoClient> => {
  return new Promise((resolve, reject) => {
    const attemptConnection = (retriesLeft: number) => {
      client.connect()
        .then(() => resolve(client))
        .catch((err) => {
          console.error(`MongoDB connection failed. Retries left: ${retriesLeft}. Error:`, err);
          if (retriesLeft === 0) {
            reject(err);
          } else {
            setTimeout(() => attemptConnection(retriesLeft - 1), delay);
          }
        });
    };
    attemptConnection(retries);
  });
};

// Ensure a singleton instance of the MongoClient with connection retries
if (process.env.NODE_ENV === "production") {
  client = createClient();
  clientPromise = connectWithRetry();
} else {
  if (!global._mongoClientPromise) {
    client = createClient();
    global._mongoClientPromise = connectWithRetry();
  }
  clientPromise = global._mongoClientPromise;
}

export default clientPromise;
