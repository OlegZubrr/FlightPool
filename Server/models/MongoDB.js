import { MongoClient } from "mongodb";

class MongoDB {
  #client;
  #db;

  constructor(uri = "mongodb://localhost:27017", dbName = "db") {
    this.uri = uri;
    this.dbName = dbName;
    this.#client = new MongoClient(this.uri);
    this.#db = null;
  }

  async connect() {
    try {
      if (!this.#client.isConnected?.()) {
        await this.#client.connect();
      }
      this.#db = this.#client.db(this.dbName);
      console.log(`Connected to MongoDB: ${this.dbName}`);
    } catch (err) {
      console.error("MongoDB connection error:", err);
      throw err;
    }
  }

  collection(name) {
    if (!this.#db)
      throw new Error("Database not connected. Call connect() first.");
    return this.#db.collection(name);
  }

  async close() {
    if (this.#client) {
      await this.#client.close();
      this.#db = null;
      console.log("MongoDB connection closed");
    }
  }
}

const mongoDB = new MongoDB();
export default mongoDB;
