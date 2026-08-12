import { Request, Response, NextFunction } from "express";
import { AccountService } from "./account.service";
import { accountIdSchema, updateAccountSchema } from "../../schema/account.schema";

export const AccountController = {
  async getManyAccount(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = 1;
      const accounts = await AccountService.getAccounts(userId);
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
      const userId = 1
      const account = await AccountService.createAccount(userId, req.body)
      res.status(201).json({
        success: true,
        data: account
      })
    }catch(error) {
      next(error)
    }
  },

  async updateAccount(req: Request, res: Response, next: NextFunction) {
    try {
      console.log("1. vào controller");
      const userId = 2
      const {accountId} = accountIdSchema.parse(req.params)
      console.log("2. accountId:", accountId);
      const data = updateAccountSchema.parse(req.body)
      console.log("3. data:", data);

      const account = await AccountService.updateAccount(userId, accountId, data)
      res.status(200).json({
        success: true,
        data: account
      })
    } catch (error) {
      next(error)
    }
  }
};
