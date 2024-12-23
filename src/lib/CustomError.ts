import { HttpStatusCode } from "axios";

export type ErrorResponse = {
  error: string;
  message: string;
  status: HttpStatusCode;
  path?: string;
  exception?: string;
  timestamp?: number;
};

export class CustomError extends Error {
  status: number;
  data: Record<string, unknown> | undefined;

  constructor(message: string, status: number, data?: Record<string, unknown>) {
    super(message);
    this.status = status;
    this.data = data;
  }
}
