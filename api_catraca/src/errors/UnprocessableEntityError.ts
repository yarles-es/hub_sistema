import { AppError } from "./AppError";

export class UnprocessableEntityError extends AppError {
  constructor(message = "Non-processable entity") {
    super(message, 422, "UnprocessableEntityError");
  }
}
