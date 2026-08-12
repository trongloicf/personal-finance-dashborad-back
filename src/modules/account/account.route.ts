import { Router } from "express";
import { AccountController } from "./account.controller";

const accountRouter = Router()

accountRouter.get('/', AccountController.getManyAccount)
accountRouter.post('/', AccountController.createAccount)
accountRouter.patch('/:accountId', AccountController.updateAccount)

export default accountRouter