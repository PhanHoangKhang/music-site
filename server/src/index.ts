import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import songRouter from "./routes/songRouter";
import connect from "./config/db";
import albumRouter from "./routes/albumRouter";

dotenv.config();
connect();

const app = express();
const port = process.env.PORT || 4000;

//  __dirname có sẵn khi dùng CommonJS
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_req: Request, res: Response) => {
  res.send("Hello world");
});

app.use("/song", songRouter);
app.use('/album', albumRouter)

//  Error middleware có type
app.use(
  (err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({
      success: false,
      message: err.message || "Server error",
    });
  }
);

app.listen(port, () => {
  console.log(`Running on http://localhost:${port}`);
});
