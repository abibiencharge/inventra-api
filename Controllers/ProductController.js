const Product = require('../Models/Products'); // for business logic and database operations

// Create a new product



//get all products
exports.createProduct = async (req, res) => {
    try {
        const { name, size, price, quantity, category, description, imageUrl } = req.body;

        const newProduct = new Product({
            name,
            size,
            price,
            quantity,
            category,
            description,
            imageUrl
        });

        const savedProduct = await newProduct.save();

        res.status(201).json({ message: 'Product created successfully', product: savedProduct });
    } catch (error) {
        res.status(400).json({ message: 'Error creating product', error: error.message });
    }
}

// update a product
exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, size, price, quantity, category, description, imageUrl } = req.body;

        const product = await Product.findByIdAndUpdate(
            id,
            { name, size, price, quantity, category, description, imageUrl },
            { new: true }
        );

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ message: 'Product updated successfully', product });
    } catch (error) {
        res.status(400).json({ message: 'Error updating product', error: error.message });
    }
};

// read a product
exports.getProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ product });
    } catch (error) {
        res.status(400).json({ message: 'Error fetching product', error: error.message });
    }
};

// delete a product
exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Error deleting product', error: error.message });
    }
}

//get by id
exports.getProductById = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ product });
    } catch (error) {
        res.status(400).json({ message: 'Error fetching product', error: error.message });
    }
};

//get all products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();

        res.status(200).json({ products });
    } catch (error) {
        res.status(400).json({ message: 'Error fetching products', error: error.message });
    }
};