import "dotenv/config";
import noteRoutes from "./routes/notes";
import userRoutes from "./routes/users";
import morgan from "morgan";
import express, { NextFunction, Request, Response } from "express";
import createHttpError, { isHttpError } from "http-errors";
import session from "express-session";
import env from "./utils/validate-env";
import MongoStore from "connect-mongo";
import { requireAuth } from "./middleware";
import path from "path";

const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.use(
  session({
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 3 * 24 * 60 * 60 * 1000,
    },
    rolling: true,
    store: MongoStore.create({
      mongoUrl: env.MONGO_CONNECTION_STRING,
    }),
  })
);

app.use(express.static(path.join(__dirname, "../../frontend/dist")));

app.use("/api/users", userRoutes);
app.use("/api/notes", requireAuth, noteRoutes);

app.use((req, res, next) => {
  next(createHttpError(404, "Endpoint not found"));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontend/dist", "index.html"));
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  let errorMessage = "An unknown error occured";
  let statusCode = 500;
  if (isHttpError(error)) {
    statusCode = error.statusCode;
    errorMessage = error.message;
  }

  console.log("Error status code:", statusCode);
  console.log("Error message:", errorMessage);
  res.status(statusCode).json({ error: errorMessage });
});

export default app;
