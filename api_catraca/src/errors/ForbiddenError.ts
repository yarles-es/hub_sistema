import { AppError } from "./AppError";

export class ForbiddenError extends AppError {
  constructor(message = "Not allowed") {
    super(message, 403, "ForbiddenError");
  }
}
