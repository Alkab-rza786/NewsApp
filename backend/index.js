const port = 4000;
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');
const cloudinary = require('cloudinary').v2;
const fs = require('fs')
// Load environment variables from .env file

const app = express();

app.use(express.json());
app.use(cors());

// Cloudinary configuration
cloudinary.config({
    cloud_name: "dtncqayep",
    api_key: "251714244398173",
    api_secret: "qdVCNZZoaAaIYb30xBnbNDzS_50",
});

// Database connection with MongoDB
// mongoose.connect("mongodb+srv://alkabrza61:alkab123@newsappcluster.jpw1f.mongodb.net/?retryWrites=true&w=majority&appName=NewsAppCluster").then(() => {
//     console.log("database is connected")
// })


mongoose.connect("mongodb://localhost:27017/NewsApp").then(() => {
    console.log("database is connected")
})

function asyncHandler(fn) {
    return function (req, res, next) {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
}


// API creation
app.get('/', (req, res) => {
    res.send("Express App is Running");
});

// Use multer for file upload without specifying the storage
const upload = multer({ dest: 'upload/images' }); // Temporary directory for multer

// Creating Upload end point for image
app.post('/upload', upload.single('product'), asyncHandler(async (req, res) => {
    try {
        const localPath = req.file.path;
        const result = await cloudinary.uploader.upload(localPath);
        fs.unlinkSync(localPath)
        res.json({
            success: true,
            image_url: result.secure_url // Get the secure URL from Cloudinary
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Image upload failed",
            error: error.message
        });
    }
}));

// Schema for creating product
const Product = mongoose.model("product", {
    id: {
        type: Number,
        required: true
    },
    headline: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    editor:{
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    createdAt: { type: Date, default: Date.now }

});

app.post('/addproduct',asyncHandler( async (req, res) => {
    let products = await Product.find({});
    let id;

    if (products.length > 0) {
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id + 1;
    } else {
        id = 1;
    }

    const product = new Product({
        id: id,
        headline: req.body.headline,
        image: req.body.image, // This will now store the Cloudinary URL
        editor:req.body.editor,
        category: req.body.category,
        summary: req.body.summary,
        type: req.body.type
    });

    await product.save();
    res.json({
        success: true,
        headline: req.body.headline,
    });
}));

// Creating API for deleting products
app.post('/removeproduct', asyncHandler(async (req, res) => {
    await Product.findOneAndDelete({ id: req.body.id });
    res.json({
        success: true,
        name: req.body.name
    });
}));

app.get('/allproducts', asyncHandler(async (req, res) => {
    let products = await Product.find({})
        .sort({ createdAt: -1 })

    res.send(products);
}));

// Creating API for getting all products
app.get('/allnews', asyncHandler(async (req, res) => {
    let products = await Product.find({})
        .sort({ createdAt: -1 })
        .limit(9);
    res.send(products);
}));
app.get('/allnewsofcategory', asyncHandler(async (req, res) => {
    let products = await Product.find({})
        .sort({ createdAt: -1 });
    res.send(products);
}));

// Route to fetch the latest 4 news articles
app.get('/home-four-news', asyncHandler(async (req, res) => {
    try {
        const fournews = await Product.find({ type: "home-trending" })
            .sort({ createdAt: -1 }) // Sort by createdAt in descending order
            .limit(4); // Limit to 4 documents
        res.json(fournews);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching latest news', error });
    }
}));


app.get('/category-two-news/:category', asyncHandler(async (req, res) => {
    try {
        const { category } = req.params; // Get the category from the request params
        const products = await Product.find({
            category: category,
            type: "category-trending", // Use the fixed type in the query
        }).limit(2); // Limit to 2 products
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}));
app.get('/newsCard/:category', asyncHandler(async (req, res) => {
    try {
        const { category } = req.params;
        const products = await Product.find({
            category: category,
            type: "latest", // Use the fixed type in the query
        }) // Limit to 2 products
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}));

app.get('/latest', asyncHandler(async (req, res) => {
    try {
        // Find news with type "latest", sorted by creation date in descending order, limited to 5
        const latestNews = await Product.find({ type: "latest" })
            .sort({ createdAt: -1 })  // Sort by newest first
            .limit(5);

        res.status(200).json(latestNews);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching latest news', error });
    }
}));
app.get('/top', asyncHandler(async (req, res) => {
    try {
        // Find news with type "latest", sorted by creation date in descending order, limited to 5
        const topNews = await Product.find({ type: "top" })
            .sort({ createdAt: -1 })  // Sort by newest first
            .limit(5);

        res.status(200).json(topNews);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching latest news', error });
    }
}));



app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

// Starting the server
app.listen(port, (err) => {
    if (!err) {
        console.log("Server running on Port " + port);
    } else {
        console.log("Error  " + err);
    }
});




