import { prisma } from "../../config/database";
import { UpdateAccountData } from "./account.model";

export const AccountRepository = {
  async getManyAccountByUserId(userId: number) {
    const res = prisma.account.findMany({
      where: { userId, isActive: true },
    });
    return res;
  },

  async getExistAccount(userId: number, accountId: number) {
    const exist = prisma.account.findFirst({
      where: {
        id: accountId,
        userId,
      },
    });
    return exist;
  },

  async createAccount(data: {
    userId: number;
    accountName: string;
    type: "cash" | "bank";
    balance: number;
  }) {
    const req = prisma.account.create({
      data,
    });
    return req;
  },

  async updateAccount(id: number, data: UpdateAccountData) {
    return prisma.account.update({
      where: { id: id },
      data,
    });
  },
};
