import express from "express";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";
import mongoDB from "./models/MongoDB.js";
import FLight from "./models/Flight.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
dotenv.config();

const PORT = process.env.PORT;

app.use(express.static(path.join(__dirname, "..", "UI")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "UI", "pages", "main.html"));
});

app.get("/fromCities", async (req, res) => {
  try {
    await mongoDB.connect();
    const flightsCollection = mongoDB.collection("flights");

    const fromCities = await flightsCollection.distinct("from");

    res.json(fromCities);
  } catch (err) {
    console.error("Error getting fromCities:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/whereCities", async (req, res) => {});
app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});
