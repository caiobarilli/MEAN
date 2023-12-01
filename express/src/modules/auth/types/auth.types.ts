export interface SingUpUserCredentials {
  username: string;
  fullname: string;
  email: string;
  password: string;
  confirmPassword: string;
  role?: string;
}

export interface SignUpResult {
  message: string;
  access_token: string;
}

export interface UserCredentials {
  email: string;
  password: string;
}

export interface SignInResult {
  message: string;
  access_token: string;
}
