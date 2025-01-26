import Joi from "joi";

// User Validation Schema
export const userSignupSchema = Joi.object({
  name: Joi.string().min(3).optional(),
  username: Joi.string().min(3).required(),
  phone: Joi.string().min(10).required(),
  password: Joi.string().min(6).required(),
});

export const userLoginSchema = Joi.object({
  username: Joi.string().min(3),
  phone: Joi.string().min(10),
  password: Joi.string().min(6).required(),
}).or("username", "phone");

// Book Validation Schema
export const bookSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  author: Joi.string().required(),
  genre: Joi.string().required(),
  price: Joi.number(),
  status: Joi.string().required(),
});

export const bookSchemaUpdate = Joi.object({
  title: Joi.string().allow(null, ""),
  description: Joi.string().allow(null, ""),
  author: Joi.string().allow(null, ""),
  genre: Joi.string().allow(null, ""),
  price: Joi.number().allow(null, ""),
  status: Joi.string().allow(null, ""),
});

// Message Validation Schema
export const messageSchema = Joi.object({
  type: Joi.string().required(),
  content: Joi.string().required(),
  senderId: Joi.string().required(),
  receiverId: Joi.string().required(),
  chatId: Joi.string().required(),
});

// Transaction Validation Schema
export const transactionSchema = Joi.object({
  remark: Joi.string().optional(),
  amount: Joi.string().required(),
  sellerId: Joi.string().required(),
  buyerId: Joi.string().required(),
  bookId: Joi.string().required(),
});

// Notification Validation Schema
export const notificationSchema = Joi.object({
  type: Joi.string().required(),
  content: Joi.string().required(),
});
