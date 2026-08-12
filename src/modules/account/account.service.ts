import { NotFoundError } from "../../utils/errors/NotFoundError";
import { UpdateAccountData } from "./account.model";
import { AccountRepository } from "./account.repository";

export const AccountService = {
  async getAccounts(userId: number) {
    const accounts = await AccountRepository.getManyAccountByUserId(userId);
    const result = accounts.map((a) => ({
      ...a,
      balance: Number(a.balance),
    }));
    return result;
  },

  async createAccount(
    userId: number,
    data: {
      accountName: string;
      type: "cash" | "bank";
      balance: number;
    },
  ) {
    const { accountName, type, balance } = data;
    const account = await AccountRepository.createAccount({
      userId,
      accountName: accountName,
      type: type,
      balance: balance,
    });
    return {
      ...account,
      balance: Number(account.balance),
    };
  },

  async updateAccount(
    userId: number,
    accountId: number,
    data: UpdateAccountData,
  ) {
    const account = await AccountRepository.getExistAccount(userId, accountId)
    if (!account || account.userId !== userId) throw new NotFoundError('Account not found')
    return AccountRepository.updateAccount(accountId, data)
  },
};
