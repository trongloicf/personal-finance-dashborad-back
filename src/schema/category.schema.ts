import z from "zod";

export const categoryIdSchema = z.object({
  categoryId: z.coerce.number().int().positive(),
});

export const getCategoriesQuerySchema = z.object({
  type: z.enum(["income", "expense"]).optional(),
});

export const createCategorySchema = z.object({
  categoryName: z
    .string()
    .min(1, "Category name is required")
    .max(50, "Category name is too long"),
  type: z.enum(["income", "expense"]),
  icon: z.string().trim().nullable(),
  color: z.string().trim().nullable(),
});

export const updateCategorySchema = z.object({
  categoryName: z.string().min(1).optional(),
  type: z.enum(["income", "expense"]).optional(),
  icon: z.string().trim().optional(),
  color: z.string().trim().optional(),
});
