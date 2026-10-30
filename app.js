const express = require ("express");
const app = express();

const dotenv = require ("dotenv");

const productRoutes = require("./Routers/ProductRoute"); // Import the product routes
const userRoutes = require("./Routers/userRoute"); // Import the user routes


dotenv.config(); // Load environment variables from .env file

app.use(express.json()); // Middleware to parse JSON requests bodies



app.use(`/products`, productRoutes); // Use product routes for all requests starting with /products
app.use(`/users`, userRoutes); // Use user routes for all requests starting with /users



const connectDB = require("./Config/databaseConfig.js"); // Import the database connection function


connectDB(); // Connect to the databasse



app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});















