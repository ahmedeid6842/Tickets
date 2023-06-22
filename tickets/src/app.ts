import "express-async-errors";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookiePrser from "cookie-parser";

import { currentUser } from "./middleware/current-user";
import { createTicketRouter } from "./routes/newTicket";
import { showTicketRouter } from "./routes/showTicket";
import { updateTicketRouter } from "./routes/updateTicket";

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

app.use(createTicketRouter);
app.use(showTicketRouter);
app.use(updateTicketRouter);

export { app };
