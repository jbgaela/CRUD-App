import express from "express";
import cors from "cors";
import todoRoutes from "./routes/todoRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/v1/todos", todoRoutes);

app.use(errorHandler);

export default app;
