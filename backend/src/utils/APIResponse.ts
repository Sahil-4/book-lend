// Custom API Response - will be used to send responses to client side
class APIResponse<T = any> {
  statusCode: number;
  data: T | null;
  message: string;
  success: boolean;

  constructor(statusCode: number, data: T | null, message: string) {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400;
  }
}

export { APIResponse };
