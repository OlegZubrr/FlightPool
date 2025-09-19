const getAllFlights = async () => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      controller.abort;
    }, 5000);

    const response = await fetch("allFlights", { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch flights:", error);
    return [];
  }
};
const getFlightsByParams = (data) => {};
