import "express-async-errors";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookiePrser from "cookie-parser";
import { currentUser } from "./middleware/currentUser";

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


export { app };
