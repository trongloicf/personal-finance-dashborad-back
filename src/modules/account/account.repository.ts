import { prisma } from "../../config/database";
import { UpdateAccountData } from "./account.model";

export const AccountRepository = {
  async getManyAccountByUserId(userId: number, type?: "cash" | "bank") {
    const where = { userId, isActive: true, ...(type && { type }) }
    const [accounts, result] = await Promise.all([
      prisma.account.findMany({
            where,
          }),
          prisma.account.aggregate({
            where,
            _sum: {
              balance: true
            }
          })
    ]) 
    return {
      accounts,
      totalBalance: result._sum.balance ?? 0
    };
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
