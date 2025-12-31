import { AuthenticatedUser } from "../auth";

export interface ValidateTokenRequest {
  accessToken: string;
}

export interface ValidateTokenResponse {
  valid: boolean;
  user?: AuthenticatedUser;
}
