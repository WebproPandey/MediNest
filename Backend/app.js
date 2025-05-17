const dotenv = require('dotenv');
const express = require("express");
const cors = require('cors');
const connectdb =   require("./config/db")

const  userRoute  = require("./routes/userRoute/usersRoute")
const  adminRoute  = require("./routes/adminRoute/adminRoute")
const  consultationsRoute  = require("./routes/consultantRoute/consultationsRoute")

const categoryRoutes = require('./routes/adminRoute/categoryRoutes');
const subcategoryRoutes = require('./routes/adminRoute/subcategoryRoutes');
const productRoutes = require('./routes/adminRoute/productRoutes');

dotenv.config();
const app = express();


connectdb()

const adminOrigin = process.env.ADMIN_ORIGIN;
const userOrigin = process.env.USER_ORIGIN;

const allowedOrigins = [adminOrigin, userOrigin];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, 
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 


app.use("/api/user" , userRoute)
app.use("/api/admin" , adminRoute)
app.use("/api/consultations" , consultationsRoute)


app.use('/api/categories', categoryRoutes);
app.use('/api/subcategories', subcategoryRoutes);
app.use('/api/products', productRoutes);


module.exports = app; 
