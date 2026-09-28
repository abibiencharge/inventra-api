const express = require ("express");
const dotenv = require ("dotenv");
const connectDB = require("./Config/databaseConfig.js"); // Import the database connection function

dotenv.config(); // Load environment variables from .env file

const app = express();


const productRoutes = require("./Routers/ProductRoute");

connectDB(); // Connect to the database

app.use(express.json()); // Middleware to parse JSON requests bodies



app.use(`/products`, productRoutes); // Use product routes for all requests starting with /products

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});















