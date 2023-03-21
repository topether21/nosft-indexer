import express, { Request, Response } from "express";
import asyncHandler from "express-async-handler";
const router = express.Router();

router.get(
  "/indexer",
  asyncHandler(async (req: Request, res: Response) => {
    const { address, offset, limit } = req.query as any; // TODO: fix type
    res.send({ status: "ok" });
  })
);

export default router;
