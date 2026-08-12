import { AppError } from "./AppError";

export class UnauthorizedError extends AppError {
  constructor(message = "UnauthorizedError") {
    super(message, 401);
  }
}
