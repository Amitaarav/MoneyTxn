import express from "express";

import { userRouter } from "./routes/user"
import { merchantRouter } from "./routes/merchant"
import { userAuthMiddleware, merchantAuthMiddleware } from "./middlewares"
import cors from "cors"
const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/v1/user", userRouter);
app.use("/api/v1/merchant", merchantRouter);

app.listen(3002, () => console.log("Server running on port 3002"));