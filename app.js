require('dotenv').config();
const express = require('express');
const {  connectDb } = require('./db/mongoDb');
const notFound = require('./middlewares/not_found');
const authRouter = require('./routes/auth');
const orderRouter = require('./routes/order');
const productRouter = require('./routes/product');
const reviewRouter = require('./routes/review');
const userRouter = require('./routes/user');
const cors = require('cors');
const xss = require('xss-clean');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const fieUpload = require('express-fileupload');
const rateLimiter = require('express-rate-limit');
const { authMiddleware } = require('./middlewares/auth');
const mongoSanitize = require('express-mongo-sanitize');


// initliaze express app
const app = express();


// middlewares 

// setting our trust proxy to true to allow heroku to trust our proxy
app.set('trust proxy', 1);

// limiting the number of requests to our api
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 60,
  })
);

// security
app.use(helmet());
app.use(cors());
app.use(xss());
app.use(mongoSanitize());

// serving static files
app.use(express.static('./views'));

// parsing json data
app.use(express.json());


// parsing form data
app.use(express.urlencoded({extended:true}));

// cookie parser
app.use(cookieParser(process.env.JWT_SECRET));

// file upload middleware to upload images
app.use(fieUpload());


// routes
app.get("/",(req,res)=>{
    return res.send("Welcome to Ecommerce Api");
})

// routes 
app.use("/api/v1/auth",authRouter);
app.use("/api/v1/orders",orderRouter);
app.use("/api/v1/products",productRouter);
app.use("/api/v1/reviews",reviewRouter);
app.use("/api/v1/users",authMiddleware,userRouter);


// not found middleware
app.use(notFound);  

const port = process.env.PORT || 5000;


// starting point of the server
let main = async ()=>{  
    try {
        await connectDb(process.env.MONGO_URI);
    app.listen(port, () => {
    console.log('Server is running on http://localhost:' + port);
    }
);
} catch (error) {
    console.log(error);    
}
}

main();


