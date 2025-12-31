import config from "@/lib/api/config";
import ApiClient from "@/lib/api/client";
import { ApiResponse } from "@/lib/api/response";
import { RegisterRequest, RegisterResponse } from "../types/dtos/register";
import { LoginRequest, LoginResponse } from "../types/dtos/login";
import { ValidateTokenRequest, ValidateTokenResponse } from "../types/dtos/validate-token";
import { RefreshTokenRequest, RefreshTokenResponse } from "../types/dtos/refresh-token";
import { otelLog } from "@/lib/otel/instrumentation";

const authClient = new ApiClient(config.AUTH_SERVICE_URL!);

const register = async (payload: RegisterRequest): Promise<ApiResponse<RegisterResponse>> => {
  otelLog.info("Attempting registration for email: {}", { email: payload.email, username: payload.username });
  const result = await authClient.post<RegisterResponse, RegisterRequest>("/auth/register", payload);
  if (result.error) {
    otelLog.warn("Registration failed - {}", { email: payload.email, error: result.error });
  } else {
    otelLog.info("Registration successful for user: {}", { username: payload.username });
  }
  return result;
}

const login = async (payload: LoginRequest): Promise<ApiResponse<LoginResponse>> => {
  otelLog.info("Attempting login for email: {}", { email: payload.email });
  const result = await authClient.post<LoginResponse, LoginRequest>("/auth/login", payload);
  if (result.error) {
    otelLog.warn("Login failed - {}", { email: payload.email, error: result.error });
  } else {
    otelLog.info("Login successful for user");
  }
  return result;
}

const validateToken = async (payload: ValidateTokenRequest): Promise<ApiResponse<ValidateTokenResponse>> => {
  otelLog.debug("Validating token");
  const result = await authClient.post<ValidateTokenResponse, ValidateTokenRequest>("/auth/validate", payload);
  if (result.error) {
    otelLog.warn("Token validation failed: {}", { error: result.error });
  } else {
    otelLog.debug("Token validation successful");
  }
  return result;
}

const refreshToken = async (payload: RefreshTokenRequest): Promise<ApiResponse<RefreshTokenResponse>> => {
  otelLog.info("Attempting to refresh token");
  const result = await authClient.post<RefreshTokenResponse, RefreshTokenRequest>("/auth/refresh", payload);
  if (result.error) {
    otelLog.warn("Token refresh failed: {}", { error: result.error });
  } else {
    otelLog.info("Token refresh successful");
  }
  return result;
}

export const authService = {
  register,
  login,
  validateToken,
  refreshToken,
};
