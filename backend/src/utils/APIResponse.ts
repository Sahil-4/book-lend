// Custom API Response - will be used to send responses to client side
class APIResponse<T = any> {
  statusCode: number;
  data: T | null;
  message: string;
  success: boolean;
  meta?: Record<string, any>;

  constructor(statusCode: number, data: T | null, message: string, meta?: Record<string, any>) {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400;
    this.meta = meta;
  }

  static success<T>(data: T, message: string = "request successful", meta?: Record<string, any>) {
    return new APIResponse(200, data, message, meta);
  }

  static error(message: string = "an error occurred", statusCode: number = 500) {
    return new APIResponse(statusCode, null, message, undefined);
  }
}

export { APIResponse };
