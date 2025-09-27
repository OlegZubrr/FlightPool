import mongoDB from "./models/MongoDB.js";
import Flight from "./models/Flight.js";

const testFlightsData = [
  {
    from: "Porto",
    to: "Lisbon",
    flight: "TP122_2",
    aircraft: "Embraer E195",
    departure: "2025-09-27 22:30",
    arrival: "2025-09-28 2:15",
    price: 63,
    maxPassangers: 120,
    occupiedPlaces: 65,
  },
];

const seedFlights = async () => {
  try {
    await mongoDB.connect();
    const flightsCollection = mongoDB.collection("flights");

    const flights = testFlightsData.map((data) => new Flight(data));

    await flightsCollection.insertMany(flights);
    console.log("✅ 30 тестовых рейсов добавлены!");
  } catch (err) {
    console.error("❌ Ошибка при добавлении тестовых рейсов:", err);
  } finally {
    await mongoDB.close();
  }
};

seedFlights();
