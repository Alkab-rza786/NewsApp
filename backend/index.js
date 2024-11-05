const port = 4000;
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const { type } = require('os');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
// Load environment variables from .env file

const app = express();

app.use(express.json());
app.use(cors());

const JWT_SECRET = "Alkab_news";


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
    editor: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    createdAt: { type: Date, default: Date.now }

});

app.post('/addproduct', asyncHandler(async (req, res) => {
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
        editor: req.body.editor,
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



//    FROM HERE THE API'S ARE THE EDITOR 

// login
const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true }, // Add unique constraint
    password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

// Schema for creating product
// const editorProduct = mongoose.model("editorproduct", {
//     id: {
//         type: Number,
//         required: true
//     },
//     headline: {
//         type: String,
//         required: true
//     },
//     image: {
//         type: String,
//         required: true
//     },
//     category: {
//         type: String,
//         required: true
//     },
//     summary: {
//         type: String,
//         required: true
//     },
//     editor: {
//         type: String,
//         required: true
//     },
//     type: {
//         type: String,
//         required: true
//     },
//     status: {
//         type: Boolean,
//         required: true,
//     },
//     createdAt: { type: Date, default: Date.now }

// });

const editorProductSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    headline: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    summary: { type: String, required: true },
    editor: { type: String, required: true },
    type: { type: String, required: true },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'], // Use strings to represent the status
        default: 'pending', // Default status
    },
    createdAt: { type: Date, default: Date.now },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // reference to the user who posted it
});

const editorProduct = mongoose.model('EditorProduct', editorProductSchema);

// Helper functions
const generateToken = (id) => {
    return jwt.sign({ id }, JWT_SECRET, { expiresIn: '30d' });
};

// Middlewares
const protect = asyncHandler(async (req, res, next) => {
    let token = req.headers.authorization && req.headers.authorization.split(' ')[1];

    if (!token) {
        res.status(401);
        throw new Error('Not authorized, no token');
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password');
        next();
    } catch (error) {
        res.status(401);
        throw new Error('Not authorized, token failed');
    }
});
app.post('/signup', asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    // Check if a user already exists with the given email
    const userExistsByEmail = await User.findOne({ email });
    if (userExistsByEmail) {
        return res.status(400).json({
            msg: "User already exists with this email.",
            success: false
        });
    }

    // Allow duplicate usernames, no check needed

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const user = await User.create({ username, email, password: hashedPassword });

    // Respond with user details
    res.status(201).json({
        _id: user._id,
        username: user.username,
        token: generateToken(user._id),
        success: true
    });
}));




app.post('/login', asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user._id,
            username: user.username,
            token: generateToken(user._id),
            success: true
        });
    } else {
        res.status(401);
        // throw new Error('Invalid username or password');
        res.json({
            msg: "invalid credentials"
        })
    }
}));

//Schema for editor add product
app.post('/editorAddproduct', protect, asyncHandler(async (req, res) => {
    const editorproducts = await editorProduct.find({});
    let id = editorproducts.length ? editorproducts.slice(-1)[0].id + 1 : 1;

    const newProduct = new editorProduct({
        id,
        headline: req.body.headline,
        image: req.body.image, // This should be the Cloudinary URL
        editor: req.user.username,
        category: req.body.category,
        summary: req.body.summary,
        type: req.body.type,
        status: req.body.status,
        userId: req.user._id,
    });

    await newProduct.save();
    res.json({ success: true, headline: req.body.headline });
}));

app.get('/myProducts', protect, asyncHandler(async (req, res) => {
    const products = await editorProduct.find({ userId: req.user._id });
    res.json(products);
}));

app.get('/editorAllposts', async (req, res) => {
    try {
        const posts = await editorProduct.find().populate('userId', 'username');

        res.status(200).json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error while fetching posts' });
    }
});



app.put('/updatePostStatus/:id', async (req, res) => {
    const postId = req.params.id;
    const { status } = req.body; // Expecting status to be true (accepted), false (pending), or 'rejected'

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(postId)) {
        return res.status(400).json({ message: 'Invalid Post ID' });
    }

    try {
        const updatedPost = await editorProduct.findByIdAndUpdate(
            postId,
            { status: status }, // Update the status field
            { new: true } // Return the updated document
        );

        if (!updatedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }

        res.json({ message: 'Post status updated successfully', post: updatedPost, success: true });
    } catch (error) {
        console.error("Error updating post status:", error); // Log the error for debugging
        res.status(500).json({ message: 'Error updating post status', error });
    }
});

app.post('/editorRemoveproduct', asyncHandler(async (req, res) => {
    await editorProduct.findOneAndDelete({ id: req.body.id });
    res.json({
        success: true,
        name: req.body.name
    });
}));



app.put('/acceptPostAndMove/:id', asyncHandler(async (req, res) => {
    const postId = req.params.id;

    try {
        // Find the post in the editor's collection
        const editorPost = await editorProduct.findById(postId);

        if (!editorPost) {
            return res.status(404).json({ message: 'Post not found in editor\'s collection' });
        }

        // Update the status of the post to 'accepted'
        editorPost.status = 'accepted';
        await editorPost.save();

        // Create a new entry in the main Product (admin) collection with the post data
        const newProduct = new Product({
            id: editorPost.id,
            headline: editorPost.headline,
            image: editorPost.image,
            editor: editorPost.editor,
            category: editorPost.category,
            summary: editorPost.summary,
            type: editorPost.type,
           
            userId: editorPost.userId
        });

        // Save the post to the main Product (admin) collection
        await newProduct.save();

        res.json({ success: true, message: 'Post accepted, status updated, and moved to main database' });
    } catch (error) {
        res.status(500).json({ message: 'Error processing post', error });
    }
}));



app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
})



// app.post('/editorRemoveproduct', asyncHandler(async (req, res) => {
//     await editorProduct.findOneAndDelete({ id: req.body.id });
//     res.json({
//         success: true,
//         name: req.body.name
//     });
// }));

















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




