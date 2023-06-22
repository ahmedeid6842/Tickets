import "express-async-errors";
import express from "express";
import morgan from "morgan";
import cors from'cors';

const app = express();

app.set("trust proxy", true);
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use(morgan("dev"));

export { app };
