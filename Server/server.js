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

await mongoDB.connect();

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "UI", "pages", "main.html"));
});

app.get("/fromCities", async (req, res) => {
  try {
    const flightsCollection = mongoDB.collection("flights");

    const fromCities = await flightsCollection.distinct("from");

    res.json(fromCities);
  } catch (err) {
    console.error("Error getting fromCities:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/toCities", async (req, res) => {
  const { fromCity } = req.query;

  if (!fromCity) {
    return res.status(400).json({ error: "No city parametr" });
  }

  try {
    const flightsCollection = mongoDB.collection("flights");

    const toCities = await flightsCollection.distinct("to", { from: fromCity });

    res.json(toCities);
  } catch (err) {
    console.error("Error getting toCities:", err.message, err.stack);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});
