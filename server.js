const express = require("express");
const listEndpoints = require("express-list-endpoints")
const passport = require("passport");
// const reviewsRoutes = require('./reviews')
const userRoutes = require("./users");
const auth = require("./users/oauthGoogle.js");
const authFace = require("./users/oathFacebook.js");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");

const mongoose = require("mongoose");
dotenv.config();

const whitelist = ["http://localhost:3000"];
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

const server = express();
server.use(cookieParser());
server.use(cors(corsOptions));
server.use(passport.initialize());
// server.use()
server.use(express.json());

server.use("/users", userRoutes);
console.log(listEndpoints(server))
const port= process.env.PORT
mongoose
  .connect("mongodb://localhost:27017/spotify", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    server.listen(port, () => {
      console.log("Running on ", port);
    })
  );
