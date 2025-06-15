import express from "express";
import { sessionRoutes } from "./routes/session.routes";
import { userRoutes } from "./routes/user.routes";

const app = express();

app.use(express.json());

app.use("/users", userRoutes);
app.use("/sessions", sessionRoutes);

export { app };
