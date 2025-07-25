import { AppError } from "./AppError";

export class BadRequestError extends AppError {
  constructor(message = "Invalid request") {
    super(message, 400, "BadRequestError");
  }
}
