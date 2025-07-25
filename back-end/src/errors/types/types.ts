export interface IApiResponseError {
  type: string;
  message: string;
  statusCode: number;
}

export type TypesErrors =
  | "BadRequestError"
  | "ConflictError"
  | "ForbiddenError"
  | "InternalServerError"
  | "NotFoundError"
  | "UnauthorizedError";
