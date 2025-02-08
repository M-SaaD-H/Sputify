import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({
    extended: true,
    limit: '16kb'
}));

app.use(cookieParser());


// Routes

import userRouter from "./routes/user.routes.js";
import adminRouter from "./routes/admin.routes.js";
import authRotuer from "./routes/auth.routes.js";
import songRouter from "./routes/song.routes.js";
import albumRouter from "./routes/album.routes.js";
import statsRotuer from "./routes/stats.routes.js";

app.use('/api/auth', authRotuer);
app.use('/api/user', userRouter);


// To handle errors
import { errorHandler } from "./middlewares/errorHandler.middleware.js";

app.use(errorHandler)


export { app };