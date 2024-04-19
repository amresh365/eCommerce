import mongoose from "mongoose";
import dotenb from "dotenv";
import products from "./data/products.js";
import users from "./data/users.js";
import Order from "./modals/orderModal.js";
import Product from "./modals/productModal.js";
import User from "./modals/userModal.js";
import connectDB from "./config/db.js";

dotenb.config();
connectDB();
const importData = async () => {
  try {
    await Order.deleteMany();
    await User.deleteMany();
    await Product.deleteMany();
    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });
    await Product.insertMany(sampleProducts);
    console.log("sucessful imported");
    process.exit();
  } catch (error) {
    console.log(`error${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await User.deleteMany();
    await Product.deleteMany();
    process.exit();
  } catch (error) {
    console.log("error");
    process.exit();
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
