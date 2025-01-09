const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const categoryRouter = require("./routes/Category");
const subCategoryRouter = require("./routes/SubCategory");
const colorRouter = require("./routes/Color");
const sizeRouter = require("./routes/Size");
const authRouter = require("./routes/Auth");
const showroomRouter = require("./routes/Showroom");
const slideRouter = require("./routes/Slides");
const productRouter = require("./routes/Product");
const colors = require("colors");
const connectDB = require("./config/db");

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
