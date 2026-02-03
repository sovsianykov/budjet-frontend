export type Role = "ADMIN" | "USER";

export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  role: Role;
  isEmailConfirmed?: boolean;
}

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export interface LoginRequest {
    email: string;
    password: string;
  }
  
  export interface LoginResponse {
    user: User;
    tokens: Tokens;
  }
  export interface RefreshResponse {
    accessToken: string;
    refreshToken: string;
  }

export interface RegisterPayload {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
}


