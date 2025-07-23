import { AppError } from "./AppError";

export class UnauthorizedError extends AppError {
  constructor(message = "Not authorized") {
    super(message, 401, "UnauthorizedError");
  }
}
