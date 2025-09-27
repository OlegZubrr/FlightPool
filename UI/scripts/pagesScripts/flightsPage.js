import ApiClient from "../services/ApiClient.js";
import Flight from "../modules/Flight.js";

const initFlights = async () => {
  const flightsContainer = document.querySelector(".flightsData");
  const filters = JSON.parse(sessionStorage.getItem("filters"));

  const api = new ApiClient();

  const flightsData = await api.post("/flights/search", filters);
  const flights = [];

  flightsData.forEach((flightData) => {
    const flight = new Flight({ ...flightData });
    flights.push(flight);
  });

  const flightCards = [];

  flights.forEach((flight) => {
    const flightCard = flight.render();
    flightCards.push(flightCard);
    flightsContainer.appendChild(flightCard);
  });
};

export default initFlights;
