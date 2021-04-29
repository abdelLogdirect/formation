export interface RegisterRequestBody {
  email: string;
  password: string | {
    password1: string;
    password2: string;
  };
}

export interface LoginRequestBody {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  email: string;
}
