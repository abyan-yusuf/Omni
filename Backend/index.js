import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import categoryRouter from "./routes/Category.js";
import subCategoryRouter from "./routes/SubCategory.js";
import colorRouter from "./routes/Color.js";
import sizeRouter from "./routes/Size.js";
import authRouter from "./routes/Auth.js";
import showroomRouter from "./routes/Showroom.js";
import slideRouter from "./routes/Slides.js";
import productRouter from "./routes/Product.js";
import colors from "colors";
import connectDB from "./config/db.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/sub-categories", subCategoryRouter);
app.use("/api/v1/colors", colorRouter);
app.use("/api/v1/sizes", sizeRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/slides", slideRouter);
app.use("/api/v1/showrooms", showroomRouter);
app.use("/api/v1/products", productRouter);

app.get("/", (req, res) => {
  res.send({ message: "Welcome to omni db!" });
});

app.listen(port, async () => {
  console.log(`Your server is running on port ${port}`.bgGreen.cyan.bold);
  await connectDB();
});