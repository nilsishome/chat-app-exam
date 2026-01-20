export type credentialsSignUp = {
  email: string;
  username: string;
  password: string;
};

export type credentialsSignIn = {
  email: string;
  password: string;
};

export type credentialsFromDB = {
  id: number;
  email: string;
  name: string;
  password: string;
};
