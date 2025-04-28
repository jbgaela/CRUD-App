import express from "express";
import todoRoutes from "./routes/todoRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

app.use(express.json());

app.use("/api/v1/todos", todoRoutes);

app.use(errorHandler);

export default app;
