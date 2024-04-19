import express, { json } from "express";
import products from "./data/products.js";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import productsRouts from "./routs/productsRouts.js";
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
connectDB();

// app.get("/api/products", (req, res) => {
//   res.json(products);
// });

// app.get("/api/products/:id", (req, res) => {
//   const product = products.find((p) => {
//     return p._id === req.params.id;
//   });
//   res.json(product);
// });

app.use("/api/products", productsRouts);

app.listen(port, () => {
  console.log(`hello i am running on: ${port}`);
});
