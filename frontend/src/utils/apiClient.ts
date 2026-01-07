import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

const apiBase = process.env.REACT_APP_BACKEND_URL || "/";

class ApiClient {
  private axios: AxiosInstance;
  private token: string | null = null;

  constructor() {
    this.axios = axios.create({
      baseURL: apiBase,
      withCredentials: false,
      headers: {
        "Content-Type": "application/json"
      }
    });
    this.axios.interceptors.request.use((config) => {
      if (this.token) {
        config.headers = config.headers || {};
        config.headers["Authorization"] = `Bearer ${this.token}`;
      }
      return config;
    });
  }

  setToken(token: string | null) {
    this.token = token;
  }

  async get(path: string, config?: AxiosRequestConfig) {
    const res = await this.axios.get(path, config);
    return res.data;
  }

  async post(path: string, data?: any, config?: AxiosRequestConfig) {
    const res = await this.axios.post(path, data, config);
    return res.data;
  }

  async put(path: string, data?: any, config?: AxiosRequestConfig) {
    const res = await this.axios.put(path, data, config);
    return res.data;
  }
}

const apiClient = new ApiClient();
export default apiClient;
