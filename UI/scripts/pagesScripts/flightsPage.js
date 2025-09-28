import ApiClient from "../services/ApiClient.js";
import Flight from "../modules/Flight.js";

const initFlights = async () => {
  const flightsContainer = document.querySelector(".flightsData");
  const filters = JSON.parse(sessionStorage.getItem("filters"));
  const speedSortCB = document.getElementById("speedSortCB");
  const priceSortCB = document.getElementById("priceSortCB");

  const api = new ApiClient();

  const flightsData = (await api.post("/flights/search", filters)).data;
  const flights = [];

  flightsData.forEach((flightData) => {
    const flight = new Flight({ ...flightData });
    flights.push(flight);
  });

  Flight.showFlightCards(flights, flightsContainer);

  speedSortCB.addEventListener("change", () => {
    if (speedSortCB.checked) {
      const flightCards = flightsContainer.getElementsByClassName("flightCart");
      Array.from(flightCards).forEach((flightCard) => {
        flightCard.remove();
      });

      Flight.sortByFlightTime(flights);

      Flight.showFlightCards(flights, flightsContainer);
    }
  });
  priceSortCB.addEventListener("change", () => {
    if (priceSortCB.checked) {
      const flightCards = flightsContainer.getElementsByClassName("flightCart");
      Array.from(flightCards).forEach((flightCard) => {
        flightCard.remove();
      });

      Flight.sortByPrice(flights);

      Flight.showFlightCards(flights, flightsContainer);
    }
  });
};

export default initFlights;
