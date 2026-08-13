import { Router } from "express";
import { CategoryController } from "./category.controller";
import { validate } from "../../middlewares/validate.middleware";
import {
  createCategorySchema,
  updateCategorySchema,
} from "../../schema/category.schema";

const categoryRouter = Router();

categoryRouter.get("/", CategoryController.getManyCategory);
categoryRouter.post(
  "/",
  validate(createCategorySchema),
  CategoryController.createCategory,
);
categoryRouter.patch(
  "/:categoryId",
  validate(updateCategorySchema),
  CategoryController.updateCategory,
);

export default categoryRouter;
