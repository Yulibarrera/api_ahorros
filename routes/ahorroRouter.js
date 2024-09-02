import { Router } from "express";
import { deleteAccount, getAccounts, postAccount, deposit, withdraw} from "../controllers/ahorro.controller.js";

const ahorroRouter = Router();

ahorroRouter.get('/', getAccounts)
ahorroRouter.post('/', postAccount)
ahorroRouter.delete('/account/:id', deleteAccount)
ahorroRouter.post('/deposit/:id', deposit)
ahorroRouter.post('/withdraw/:id', withdraw)

export default ahorroRouter;