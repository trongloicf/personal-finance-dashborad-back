import { prisma } from "../../config/database";
import {
  AddCategory,
  CategoryType,
  CreateCategoryData,
  UpdateCategory,
} from "./category.model";

export const CategoryRepository = {
  async getManyCategory(userId: number, type?: CategoryType) {
    const where = { userId, isActive: true, ...(type && { type }) };
    const baseWhere = {
      userId,
      isActive: true,
    };
    const [categories, total, expenseCount, incomeCount] = await Promise.all([
      prisma.category.findMany({
        where,
        orderBy: {
          createdAt: "desc",
        },
      }),
      prisma.category.count({
        where: baseWhere,
      }),
      prisma.category.count({
        where: {
          ...baseWhere,
          type: "expense",
        },
      }),
      prisma.category.count({
        where: {
          ...baseWhere,
          type: "income",
        },
      }),
    ]);
    return {
      categories,
      total,
      expenseCount,
      incomeCount,
    };
  },

  async getExistCategory(userId: number, categoryId: number) {
    const exist = prisma.category.findFirst({
      where: {
        id: categoryId,
        userId,
      },
    });
    return exist;
  },

  async createCategory(data: CreateCategoryData) {
    const res = await prisma.category.create({
      data,
    });
    return res;
  },

  async updateCategory(categoryId: number, data: UpdateCategory) {
    const res = await prisma.category.update({
      where: { id: categoryId },
      data,
    });
    return res
  },
};
