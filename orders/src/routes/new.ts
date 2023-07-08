import express, { Request, Response } from "express";
import { requireAuth } from "../middleware/requireAuth";

const router = express.Router();

router.post("/api/orders", requireAuth, async (req: Request, res: Response) => {
  res.send({});
});

export { router as newOrderRouter };
