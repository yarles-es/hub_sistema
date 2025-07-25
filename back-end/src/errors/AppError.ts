export class AppError extends Error {
  public statusCode: number;
  public isOperational: boolean;
  public customError: boolean;
  public type: string;

  constructor(message: string, statusCode: number, type: string) {
    super(message);
    this.statusCode = statusCode;
    this.type = type;
    this.isOperational = true;
    this.customError = true;
    Error.captureStackTrace(this, this.constructor);
  }
}
