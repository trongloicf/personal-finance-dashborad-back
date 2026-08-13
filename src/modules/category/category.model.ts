export type CategoryType = "income" | "expense";

export type UpdateCategory = {
  categoryName?: string;
  type?: CategoryType;
  icon?: string;
  color?: string;
};

export type AddCategory = {
  categoryName: string;
  type: CategoryType;
  icon: string;
  color: string;
};

export type CreateCategoryData = AddCategory & {
  userId: number;
};