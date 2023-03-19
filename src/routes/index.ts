import * as express from "express";
import indexer from "~/routes/indexer";
const router = express.Router();

router.use("/", indexer);

export default router;
