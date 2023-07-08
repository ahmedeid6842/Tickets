import "express-async-errors";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookiePrser from "cookie-parser";
import { currentUser } from "./middleware/currentUser";
import { deleteOrderRouter } from "./routes/delete";
import { indexOrderRouter } from "./routes";
import { newOrderRouter } from "./routes/new";
import { showOrderRouter } from "./routes/show";

const app = express();

app.set("trust proxy", true);
app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());
app.use(morgan("dev"));
app.use(cookiePrser());

app.use(currentUser);

app.use(deleteOrderRouter);
app.use(indexOrderRouter);
app.use(newOrderRouter);
app.use(showOrderRouter);

export { app };
