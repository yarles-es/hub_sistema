export type UserPayload<T> = T;

export type PayloadUserJWT<T> = {
  data: UserPayload<T>;
  iat: number;
  exp: number;
};
