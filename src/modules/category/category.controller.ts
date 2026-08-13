import { Request, Response, NextFunction } from "express";
import {
  categoryIdSchema,
  getCategoriesQuerySchema,
} from "../../schema/category.schema";
import { CategoryService } from "./category.service";

export const CategoryController = {
  async getManyCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = 1;
      const { type } = getCategoriesQuerySchema.parse(req.query);
      const categories = await CategoryService.getManyCategory(userId, type);
      res.status(200).json({
        success: true,
        data: categories,
      });
    } catch (error) {
      next();
    }
  },

  async createCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = 1;
      const category = await CategoryService.createCategory(userId, req.body);
      res.status(200).json({
        success: true,
        data: category,
      });
    } catch (error) {
      next();
    }
  },

  async updateCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = 1;
      const { categoryId } = categoryIdSchema.parse(req.params);
      const category = await CategoryService.updateCategory(
        userId,
        categoryId,
        req.body,
      );
      res.status(200).json({
        success: true,
        data: category
      })
    } catch (error) {
      next();
    }
  },
};
