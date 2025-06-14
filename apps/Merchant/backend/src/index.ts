import express from "express";

import { userRouter } from "./routes/user"
import { merchantRouter } from "./routes/merchant"
import { userAuthMiddleware, merchantAuthMiddleware } from "./middlewares"

const PORT = process.env.PORT || 3003;
import cors from "cors"
const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/v1/user", userRouter);
app.use("/api/v1/merchant", merchantRouter);

app.listen(PORT, () => {
    if(process.env.NODE_ENV === "production") {
        console.log(`Server running on port ${PORT}`);
    } else {
        console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV} mode`);
    }
});