import { Router } from "express";
import { AccountController } from "./account.controller";
import { validate } from "../../middlewares/validate.middleware";
import { createAccountSchema, updateAccountSchema } from "../../schema/account.schema";

const accountRouter = Router()

accountRouter.get('/', AccountController.getManyAccount)
accountRouter.post('/', validate(createAccountSchema), AccountController.createAccount)
accountRouter.patch('/:accountId', validate(updateAccountSchema),AccountController.updateAccount)

export default accountRouter