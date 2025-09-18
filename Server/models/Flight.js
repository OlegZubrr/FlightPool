class Flight {
  constructor({ from, to, flight, aircraft, departure, arrival, cost }) {
    this.from = from;
    this.to = to;
    this.flight = flight;
    this.aircraft = aircraft;
    this.departure = new Date(departure);
    this.arrival = new Date(arrival);
    this.cost = cost;
  }

  toJSON() {
    return {
      from: this.from,
      to: this.to,
      flight: this.flight,
      aircraft: this.aircraft,
      departure: this.departure.toISOString(),
      arrival: this.arrival.toISOString(),
      cost: this.cost,
      duration: this.getDurationMinutes(),
    };
  }
}
