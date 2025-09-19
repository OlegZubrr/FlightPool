class ApiClient {
  constructor(baseURL = "") {
    this.baseURL = baseURL;
  }

  async request(endpoint, options = {}, timeout = 5000) {
    try {
      const controller = new AbortController();
      const id = setTimeout(() => controller.abort(), timeout);

      const response = await fetch(`${this.baseURL}${endpoint}`, {
        ...options,
        signal: controller.signal,
      });

      clearTimeout(id);

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      return await response.json();
    } catch (err) {
      console.error(`Failed to fetch ${endpoint}:`, err);
      return null;
    }
  }

  async get(endpoint, timeout = 5000) {
    return this.request(endpoint, { method: "GET" }, timeout);
  }

  async post(endpoint, body, timeout = 5000) {
    return this.request(
      endpoint,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      },
      timeout
    );
  }
}
