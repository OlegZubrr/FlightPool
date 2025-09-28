class ApiClient {
  constructor(baseURL = "") {
    this.baseURL = baseURL;
  }

  async request(endpoint, options = {}, timeout = 5000) {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        ...options,
        signal: controller.signal,
      });

      clearTimeout(id);

      const data = await response.json().catch(() => null);
      return {
        status: response.status,
        ok: response.ok,
        data,
      };
    } catch (err) {
      clearTimeout(id);
      console.error(`Failed to fetch ${endpoint}:`, err);
      return {
        status: 0,
        ok: false,
        data: { error: err.message },
      };
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

export default ApiClient;
