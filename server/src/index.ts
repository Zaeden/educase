import express from "express";
import "dotenv/config";
import schoolRouter from "./routes/school.route";

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/schools", schoolRouter);

app.listen(PORT, () => {
  console.log(`Server Running on Port No : ${PORT}`);
});
