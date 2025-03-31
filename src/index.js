import express from "express";
import connectDB from "./config/dbConfig.js";
import apiRouter from "./routers/apiRouter.js";

const PORT = 3000;
const app = express();

// encoders
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded());

app.use("/", (req, res, next) => {
  console.log(req.originalUrl);
  next();
});

app.use("/api", apiRouter);

app.use("/", (req, res, next) => {
  res.status(404).json({ success: false, message: "Path Not Found!" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
