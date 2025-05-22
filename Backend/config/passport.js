const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const Admin = require("../models/adminModel");
const User = require("../models/userModel");
const generateToken = require("../utils/generateToken");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/admin/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const existingAdmin = await Admin.findOne({ email: profile.emails[0].value });

        if (existingAdmin) {
          return done(null, existingAdmin);
        }

        const adminCount = await Admin.countDocuments();
        if (adminCount > 0) {
          return done(null, false, { message: "Only one admin allowed" });
        }

        const newAdmin = await Admin.create({
          name: profile.displayName,
          email: profile.emails[0].value,
          password: "google-oauth", // dummy
        });

        done(null, newAdmin);
        
        let user = await User.findOne({ email: profile.emails[0].value });
        if (!user) {
          user = await User.create({
            name: profile.displayName,
            email: profile.emails[0].value,
            password: "google-oauth" // dummy
          });
        }
        done(null, user);



      } catch (err) {
        done(err, false);
      }
    }
  )
);

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  const admin = await Admin.findById(id);
   const user = await User.findById(id);
  done(null, user);
  done(null, admin);
});
