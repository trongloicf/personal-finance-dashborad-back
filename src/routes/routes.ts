import { Application } from "express";
import accountRouter from "../modules/account/account.route";

const API_DEFAULT = `/api/pfd-system`;

export const routes = (app: Application) => {
  app.use(`${API_DEFAULT}/account`, accountRouter);
};
