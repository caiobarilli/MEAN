export interface SignUpResult {
  message: string;
  access_token: string;
  user: {
    fullname: string;
    email: string;
  };
}
