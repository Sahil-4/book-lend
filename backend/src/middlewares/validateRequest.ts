import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";
import { APIResponse } from "../utils/APIResponse.js";

// validate request body
export const validateRequest = (schema: ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send(new APIResponse(400, null, error.details[0].message));

    next();
  };
};
