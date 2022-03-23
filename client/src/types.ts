export enum Sex {
  MALE = "male",
  FEMALE = "female",
}

export type Nullable<T> = null | T;

export type User = {
  id: string;
  registrationDate: Date;
  updatedDate: Date;
  firstName: string;
  lastName: string;
  birthday: Date;
  sex: Sex;
  city: string;
  email: string;
  about: Nullable<string>;
};

export type RegistrationData = {
  firstName: string;
  lastName: string;
  password: string;
  birthday: Date;
  sex: Sex;
  city: string;
  email: string;
  about?: string;
};

export type LoginData = {
  email: string;
  password: string;
};

export enum HttpCode {
  "OK" = 200,
  "Created" = 201,
  "No Content" = 204,
  "See Other" = 303,
  "Temporary Redirect" = 307,
  "Bad Request" = 400,
  "Unauthorized" = 401,
  "Forbidden" = 403,
  "Not Found" = 404,
  "Method Not Allowed" = 405,
  "Unprocessable Entity" = 422,
  "Conflict" = 409,
}
