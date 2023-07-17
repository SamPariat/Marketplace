export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  data: {
    jwtToken: string;
    email: string;
  };
};
