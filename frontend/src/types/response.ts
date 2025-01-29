type ResponseType = {
  statusCode: number;
  data: unknown;
  message: string;
  success: boolean;
  meta?: Record<string, unknown>;
};

export type { ResponseType };
