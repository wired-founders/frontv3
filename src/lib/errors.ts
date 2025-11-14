// src\lib\errors.ts
export type ErrorCode =
  | "NETWORK"
  | "AUTH"
  | "VALIDATION"
  | "NOT_FOUND"
  | "CONFLICT"
  | "RATE_LIMIT"
  | "SERVER"
  | "UNKNOWN";

export type ErrorMeta = {
  status?: number;
  details?: unknown;
  retryable?: boolean;
  cause?: unknown;
};

export class BaseError extends Error {
  readonly code: ErrorCode;
  readonly status?: number;
  readonly details?: unknown;
  readonly retryable: boolean;

  constructor(message: string, code: ErrorCode, meta: ErrorMeta = {}) {
    super(message);
    this.name = new.target.name;
    this.code = code;
    this.status = meta.status;
    this.details = meta.details;
    this.retryable = meta.retryable ?? false;
    if (Error.captureStackTrace) Error.captureStackTrace(this, new.target);
  }
}
