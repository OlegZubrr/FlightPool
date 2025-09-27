class Flight {
  constructor({ from, to, flight, aircraft, departure, arrival, price }) {
    this.from = from;
    this.to = to;
    this.flight = flight;
    this.aircraft = aircraft;
    this.departureRaw = new Date(departure);
    this.arrivalRaw = new Date(arrival);
    this.price = price;

    const totalMinutes = Math.round(
      (this.arrivalRaw - this.departureRaw) / (1000 * 60)
    );
    this.flightTime = {
      hours: Math.floor(totalMinutes / 60),
      minutes: totalMinutes % 60,
    };
  }

  formatTime = (date) => {
    const day = date.getDate();
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const month = monthNames[date.getMonth()];
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return {
      day: `${day} ${month}`,
      hours,
      minutes,
    };
  };

  render = () => {
    const departure = this.formatTime(this.departureRaw);
    const arrival = this.formatTime(this.arrivalRaw);

    const flightCard = document.createElement("div");
    flightCard.className = "flightCart";
    flightCard.setAttribute("id", this.flight);
    flightCard.innerHTML = `<div class="priceSide">
            <h4 class="flightPrice">${this.price}$</h4>
            <div class="aircraftData">
              <h5 class="aircraft">${this.aircraft}</h5>
              <h5 class="flight">${this.flight}</h5>
            </div>
            <a class="SelectFlightBtn">Select</a>
          </div>
          <div class="flightSide">
            <div class="dataOfFlight">
              <h4 class="timeOfDeparture">${departure.hours}h:${departure.minutes}m</h4>
              <h5 class="cityOfDeparture">${this.from}</h5>
              <h5 class="dateOfDeparture">${departure.day}</h5>
            </div>
            <div class="flightTimeData">
              <img src="../assets/direct-flight.png" class="flightImg" alt="" />
              <h5 class="flightTime">${this.flightTime.hours}h:${this.flightTime.minutes}m</h5>
            </div>
            <div class="dataOfFlight">
              <h4 class="timeOfArrival">${arrival.hours}h:${arrival.minutes}m</h4>
              <h5 class="cityOfArrival">${this.to}</h5>
              <h5 class="dateOfArrival">${arrival.day}</h5>
            </div>
          </div>`;

    const flightTimeItem = flightCard.querySelector(".flightTime");
    flightTimeItem.style.setProperty(
      "--tooltip-text-time",
      `Flight Time: ${this.flightTime.hours}h ${this.flightTime.minutes}m`
    );
    return flightCard;
  };
}

export default Flight;
