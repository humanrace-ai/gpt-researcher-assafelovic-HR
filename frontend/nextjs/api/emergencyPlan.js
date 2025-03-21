import axios from "axios";
import { setupCache } from "axios-cache-adapter";
import CircuitBreaker from "opossum";
import winston from "winston";

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "combined.log" })
  ]
});

const cache = setupCache({
  maxAge: 15 * 60 * 1000
});

const api = axios.create({
  adapter: cache.adapter
});

const breaker = new CircuitBreaker(async function apiCall(endpoint, options) {
  try {
    const response = await api.request({
      url: endpoint,
      ...options
    });
    return response.data;
  } catch (error) {
    logger.error("API call failed:", error);
    throw error;
  }
}, {
  timeout: 3000,
  errorThresholdPercentage: 50,
  resetTimeout: 30000
});

breaker.fallback(() => {
  logger.warn("Circuit breaker fallback triggered");
  return { error: "Service temporarily unavailable" };
});

export default {
  async get(endpoint, options = {}) {
    return breaker.fire(endpoint, { method: "GET", ...options });
  },
  
  async post(endpoint, data, options = {}) {
    return breaker.fire(endpoint, { 
      method: "POST",
      data,
      ...options
    });
  }
};
