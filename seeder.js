import mongoose from "mongoose";
import products from "./data/products.js";
import Product from "./models/products.js";
import "dotenv/config.js";

// Database Connection With MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB."))
  .catch(error => console.log(error.message));
// password should not contain '@' special character

const importData = async () => {
  try {
    await Product.deleteMany();

    const sampleProducts = products.map(product => {
      return { ...product };
    });

    await Product.insertMany(sampleProducts);

    console.log("Data Imported!");
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Product.deleteMany();

    console.log("Data Destroyed!");
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
