import { Router } from "express";
import { deleteAccount, getAccounts, postAccount, } from "../controllers/ahorro.controller.js";

const ahorroRouter = Router();

ahorroRouter.get('/', getAccounts)
ahorroRouter.post('/', postAccount)
ahorroRouter.delete('/', deleteAccount)

export default ahorroRouter;