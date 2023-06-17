import { Router } from "express";
import { Request, Response } from "express";
import User, { UserDocument } from "../models/user";
import { omit } from "lodash";

const route = Router();

//DONE: route -> signup new user
route.post("/api/users/signup", async (req: Request<{}, {}>, res: Response) => {
  try {
    let user = await User.create(req.body);
    return res.send(omit(user.toObject(), "password"));
  } catch (error: any) {
    console.error(error.message);
    return res.status(500);
  }
});

export { route as signupRouter };
