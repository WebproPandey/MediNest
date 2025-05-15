const dotenv = require('dotenv');
const express = require("express");
const cors = require('cors');
const connectdb =   require("./config/db")

const  userRoute  = require("./routes/usersRoute")
const  adminRoute  = require("./routes/adminRoute")
const  consultationsRoute  = require("./routes/consultationsRoute")


dotenv.config();
const app = express();


connectdb()

app.use(cors());
app.use(express.json()); 


app.use("/api/user" , userRoute)
app.use("/api/admin" , adminRoute)
app.use("/api/consultations" , consultationsRoute)


module.exports = app; 
