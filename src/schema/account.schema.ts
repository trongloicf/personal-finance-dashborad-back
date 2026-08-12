import { z } from "zod";

export const createAccountSchema = z.object({
  accountName: z
    .string()
    .min(1, "Account name is required")
    .max(50, "Account name is too long"),
  type: z.enum(["cash", "bank"]),
  balance: z.number().min(0, "Balance cannot be negative"),
});

export const updateAccountSchema = z.object({
  accountName: z.string().min(1).optional(),
  type: z.enum(["cash", "bank"]).optional(),
});

export const accountIdSchema = z.object({
  accountId: z.coerce.number().int().positive(),
});

export const getAccountsQuerySchema = z.object({
  type: z.enum(["cash", "bank"]).optional(),
});