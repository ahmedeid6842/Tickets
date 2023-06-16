import { Router } from "express";
import { Request, Response } from "express";
import User from "../models/user";
import jwt from "jsonwebtoken";

const route = Router();

//DONE: route -> login user
route.post("/api/users/signin", async (req: Request, res: Response) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).send(`no user found`);
    }

    let valid = await user.comparePassword(req.body.password);
    if (!valid) {
      return res.status(404).send(`no user found`);
    }

    if (!process.env.JWT_KEY) {
      throw new Error("No json web token key found");
    }

    let accessToken = jwt.sign(
      { _id: user._id, userName: user.userName },
      process.env.JWT_KEY,
      { expiresIn: "30m" }
    );

    res.cookie("jwt", accessToken, {
      httpOnly: true,
      sameSite: "strict",
    });

    return res.send(`welcome ${user.email}`);
  } catch (error: any) {
    console.error(error.message);
    return res.status(500);
  }
});

export { route as signinRouter };
