const dotenv = require('dotenv');
const express = require("express");
const cors = require('cors');
const connectdb =   require("./config/db")

const  userRoute  = require("./routes/usersRoute")
const  adminRoute  = require("./routes/adminRoute")
const  consultationsRoute  = require("./routes/consultationsRoute")

const categoryRoutes = require('./routes/categoryRoutes');
const subcategoryRoutes = require('./routes/subcategoryRoutes');
const productRoutes = require('./routes/productRoutes');


dotenv.config();
const app = express();


connectdb()

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 


app.use("/api/user" , userRoute)
app.use("/api/admin" , adminRoute)
app.use("/api/consultations" , consultationsRoute)


app.use('/api/categories', categoryRoutes);
app.use('/api/subcategories', subcategoryRoutes);
app.use('/api/products', productRoutes);


module.exports = app; 
