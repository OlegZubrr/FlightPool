import express from "express";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";
import mongoDB from "./models/MongoDB";
import FLight from "./models/Flight";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
dotenv.config();

const PORT = process.env.PORT;

app.use(express.static(path.join(__dirname, "..", "UI")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "UI", "pages", "main.html"));
});

app.get("/FlightPlaces", async (req, res) => {
  const flightsCollection = mongoDB.collection("flights");

  const allFlights = await flightsCollection.find();

  res.send(allFlights);
});
app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});
