export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  jwtToken: string;
  username: string;
  role: string;
  email: string;
  name: string;
  id: number;
};
