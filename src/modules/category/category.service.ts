import { NotFoundError } from "../../utils/errors/NotFoundError";
import { AddCategory, CategoryType, UpdateCategory } from "./category.model";
import { CategoryRepository } from "./category.repository";

export const CategoryService = {
  async getManyCategory(userId: number, type?: CategoryType) {
    const { categories, total, expenseCount, incomeCount } =
      await CategoryRepository.getManyCategory(userId, type);
    return {
      categories: categories,
      totalCategory: total,
      totalExpense: expenseCount,
      totalIncome: incomeCount,
    };
  },

  async createCategory(userId: number, data: AddCategory) {
    const category = await CategoryRepository.createCategory({
      userId: userId,
      ...data,
    });
    return category;
  },

  async updateCategory(
    userId: number,
    categoryId: number,
    data: UpdateCategory,
  ) {
    const exist = await CategoryRepository.getExistCategory(userId, categoryId);
    if (!exist || exist.userId !== userId)
      throw new NotFoundError("Category not found");
    const category = await CategoryRepository.updateCategory(categoryId, data);
    return category;
  },
};
