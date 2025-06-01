const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
require("./config/passport");
const connectdb = require("./config/db");

const app = express();

// Connect to database
connectdb();

// Middleware setup
app.use(
  session({
    secret: process.env.SESSION_SECRET || "your-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    },
  })
);

const adminOrigin = process.env.ADMIN_ORIGIN;
const userOrigin = process.env.USER_ORIGIN;
const allowedOrigins = [adminOrigin, userOrigin];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

// Optional: expose io in req if needed

// Routes
const adminRoute = require("./routes/adminRoute/adminRoute");
const paymentRoute = require("./routes/adminRoute/paymentRoute");
const consultationsRoute = require("./routes/consultantRoute/consultationsRoute");
const categoryRoutes = require("./routes/adminRoute/categoryRoutes");
const subcategoryRoutes = require("./routes/adminRoute/subcategoryRoutes");
const productRoutes = require("./routes/adminRoute/productRoutes");
const orderRoute = require("./routes/adminRoute/orderRoute");

const userRoute = require("./routes/userRoute/usersRoute");
const useCategory = require("./routes/userRoute/categoriesRoute");
const addressRoute = require("./routes/userRoute/addressRoute");
const buyNowRoute = require("./routes/userRoute/orderRotue");



app.use("/api/admin", adminRoute);
app.use("/api", paymentRoute);
app.use("/api/consultations", consultationsRoute);
app.use("/api/categories", categoryRoutes);
app.use("/api/subcategories", subcategoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/admin", orderRoute);

app.use("/api/user", userRoute);
app.use("/api", useCategory);
app.use("/api/address", addressRoute);
app.use("/api/buy-now", buyNowRoute);

module.exports = app;
