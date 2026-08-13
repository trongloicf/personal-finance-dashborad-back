import { Request, Response, NextFunction } from "express";
import { AccountService } from "./account.service";
import {
  accountIdSchema,
  getAccountsQuerySchema,
} from "../../schema/account.schema";

export const AccountController = {
  async getManyAccount(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = 1;
      const { type } = getAccountsQuerySchema.parse(req.query);
      const accounts = await AccountService.getAccounts(userId, type);
      res.status(200).json({
        success: true,
        data: accounts,
      });
    } catch (error) {
      next(error);
    }
  },

  async createAccount(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = 1;
      const account = await AccountService.createAccount(userId, req.body);
      res.status(201).json({
        success: true,
        data: account,
      });
    } catch (error) {
      next(error);
    }
  },

  async updateAccount(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = 1;
      const { accountId } = accountIdSchema.parse(req.params);

      const account = await AccountService.updateAccount(
        userId,
        accountId,
        req.body,
      );
      res.status(200).json({
        success: true,
        data: account,
      });
    } catch (error) {
      next(error);
    }
  },
};
