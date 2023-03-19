import express, { Request, Response } from "express";
import asyncHandler from "express-async-handler";
const router = express.Router();

router.get(
  "/indexer",
  asyncHandler(async (req: Request, res: Response, next) => {
    res.send({ status: "ok" });
  })
);

export default router;
