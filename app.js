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

const app = express();

app.set('trust proxy', 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 60,
  })
);
app.use(helmet());
app.use(cors());
app.use(xss());


app.use(express.static('./views'));

app.use(express.json());

app.use(express.urlencoded({extended:true}));

app.use(cookieParser(process.env.JWT_SECRET));
app.use(fieUpload());


app.get("/",(req,res)=>{
    return res.send("Welcome to Ecommerce Api");
})

app.use("/api/v1/auth",authMiddleware,authRouter);
app.use("/api/v1/orders",orderRouter);
app.use("/api/v1/products",productRouter);
app.use("/api/v1/reviews",reviewRouter);
app.use("/api/v1/users",userRouter);

app.use(notFound);  

const port = process.env.PORT || 5000;

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


