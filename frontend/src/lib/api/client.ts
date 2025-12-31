import axios, { AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";
import { ApiResponse } from "./response";
import { otelLog, injectTraceContext } from "../otel/instrumentation";

class ApiClient {
  private instance: AxiosInstance;
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.instance = axios.create({
      baseURL,
      withCredentials: true
    });

    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const traceHeaders = injectTraceContext();
        Object.entries(traceHeaders).forEach(([key, value]) => {
          config.headers.set(key, value);
        });
        return config;
      },
      (error) => Promise.reject(error)
    );
  }

  private handleError<T>(error: Error): ApiResponse<T> {
    if (axios.isAxiosError(error)) {
      const responseData = error.response?.data;
      let errorMessage = "An unknown error occured";

      if (typeof responseData === "string") {
        errorMessage = responseData;
      } else if (responseData?.message) {
        errorMessage = responseData.message;
      } else if (responseData?.error) {
        errorMessage = responseData.error;
      } else if (error.message) {
        errorMessage = error.message;
      }

      otelLog.error("Request failed: {}", {
        url: `${this.baseURL}${error.config?.url || ''}`,
        method: error.config?.method?.toUpperCase(),
        statusCode: error.response?.status || 500,
        error: errorMessage,
      });

      return {
        statusCode: error.response?.status || 500,
        payload: {} as T,
        error: errorMessage,
      };
    }

    otelLog.error("Request failed with unexpected error: {}", {
      baseURL: this.baseURL,
      error: error.message,
    });

    return {
      statusCode: 500,
      payload: {} as T,
      error: error.message || "An unknown error occured",
    };
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      otelLog.debug("Sending GET request to: {}", {
        url: `${this.baseURL}${url}`,
      });
      const response = await this.instance.get<T>(url, config);
      otelLog.info("GET request successful: {}", {
        url: `${this.baseURL}${url}`,
        statusCode: response.status,
      });
      return {
        statusCode: response.status,
        payload: response.data
      };
    } catch (error) {
      return this.handleError<T>(error as Error);
    }
  }

  async post<T, U = any>(
    url: string,
    data?: U,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    try {
      otelLog.debug("Sending POST request to: {}", {
        url: `${this.baseURL}${url}`,
      });
      const response = await this.instance.post<T>(url, data, config);
      otelLog.info("POST request successful: {}", {
        url: `${this.baseURL}${url}`,
        statusCode: response.status,
      });
      return {
        statusCode: response.status,
        payload: response.data,
      };
    } catch (error) {
      return this.handleError<T>(error as Error);
    }
  }

  async put<T, U = any>(
    url: string,
    data?: U,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    try {
      otelLog.debug("Sending PUT request to: {}", {
        url: `${this.baseURL}${url}`,
      });
      const response = await this.instance.put<T>(url, data, config);
      otelLog.info("PUT request successful: {}", {
        url: `${this.baseURL}${url}`,
        statusCode: response.status,
      });
      return {
        statusCode: response.status,
        payload: response.data,
      };
    } catch (error) {
      return this.handleError<T>(error as Error);
    }
  }

  async patch<T, U = any>(
    url: string,
    data?: U,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    try {
      otelLog.debug("Sending PATCH request to: {}", {
        url: `${this.baseURL}${url}`,
      });
      const response = await this.instance.patch<T>(url, data, config);
      otelLog.info("PATCH request successful: {}", {
        url: `${this.baseURL}${url}`,
        statusCode: response.status,
      });
      return {
        statusCode: response.status,
        payload: response.data,
      };
    } catch (error) {
      return this.handleError<T>(error as Error);
    }
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      otelLog.debug("Sending DELETE request to: {}", {
        url: `${this.baseURL}${url}`,
      });
      const response = await this.instance.delete<T>(url, config);
      otelLog.info("DELETE request successful: {}", {
        url: `${this.baseURL}${url}`,
        statusCode: response.status,
      });
      return {
        statusCode: response.status,
        payload: response.data,
      };
    } catch (error) {
      return this.handleError<T>(error as Error);
    }
  }
}

export default ApiClient;
