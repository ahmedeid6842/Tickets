import "express-async-errors";
import express from "express";
import morgan from "morgan";

const app = express();

app.set("trust proxy", true);
app.use(express.json());
app.use(morgan("dev"));

export { app };
