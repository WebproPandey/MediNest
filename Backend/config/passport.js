const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const Admin = require("../models/adminModel");
const User = require("../models/userModel");

// Admin Google Strategy
passport.use(
  "admin-google",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/admin/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const existingAdmin = await Admin.findOne({ email: profile.emails[0].value });
        if (existingAdmin) return done(null, existingAdmin);

        const adminCount = await Admin.countDocuments();
        if (adminCount > 0) return done(null, false, { message: "Only one admin allowed" });

        const newAdmin = await Admin.create({
          name: profile.displayName,
          email: profile.emails[0].value,
          password: "google-oauth",
        });
        return done(null, newAdmin);
      } catch (err) {
        return done(err, false);
      }
    }
  )
);

// User Google Strategy
passport.use(
  "user-google",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL_USER
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ email: profile.emails[0].value });
        if (!user) {
          user = await User.create({
            name: profile.displayName,
            email: profile.emails[0].value,
            password: "google-oauth", // dummy
          });
        }
        return done(null, user);
      } catch (err) {
        return done(err, false);
      }
    }
  )
);

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  let user = await User.findById(id);
  if (user) return done(null, user);
  let admin = await Admin.findById(id);
  return done(null, admin);
});
