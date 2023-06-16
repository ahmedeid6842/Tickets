import { Router } from "express";
import { Request, Response } from "express";


const route = Router();

//DONE: route -> lgout user
route.post("/api/users/signout", async (req: Request<{}, {}>, res: Response) => {
  res.clearCookie("jwt");
  res.send({});
});

export { route as signoutRouter };
