if(process.env.NODE_ENV != "production"){
    require('dotenv').config();
}

// importing modules
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStatergy = require('passport-local');
const User = require('./models/user.js');


// for csv to json handling
const multer = require('multer');
const csvParser = require('csv-parser');
const fs = require('fs');

// code for storing csv file to uploads folder
const upload = multer({ dest: 'uploads/' });

// importing routes
const homeRoutes = require('./routes/homeRoutes');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');

// const PORT = process.env.PORT || 8080;
const PORT = process.env.PORT;

// connecting to mongodb database
// const MONGO_URL = "mongodb://127.0.0.1:27017/kvpDB";
const dbUrl = process.env.ATLASDB_URL;

main()
    .then(() => {
        console.log("connected to DB");
    })
    .catch((err) => {
        console.log(err);
    });

async function main() {
    await mongoose.connect(dbUrl);
}

// middlewares
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "/public/")));
app.use(express.json());

const store = MongoStore.create({
    mongoUrl:dbUrl,
    crypto:{
        secret: process.env.SECRET
    },
    touchAfter: 24 * 3600,
});

store.on("error", () =>{
    console.log("ERROR IN MONGO SESSION STORE", err);
});

const sessionOptions = {
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie:{
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true
    }
};

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStatergy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    
    if (req.user) {
        res.locals.currUser = req.user;
        res.locals.userId = req.user._id;
    } else {
        res.locals.currUser = null;
        res.locals.userId = null;
    }
    next();
});

// app.get("/demouser", async (req, res) => {
//     let fakeUser = new User({
//         name: "kvp student2",
//         email:"student@gmail.com",
//         username:"kvp-student2",
//         role: "Admin"
//     });

//     let registeredUser = await User.register(fakeUser, "helloWorld");
//     res.send(registeredUser);
// });

// setting routes
app.use('/', homeRoutes);
app.use('/:userId/dashboard', userRoutes);
app.use('/',authRoutes);


// error handling mechanism
app.all("*", (req,res,next) => {
    next(new ExpressError(404, "Page not found!"));
})

app.use((err, req, res, next) => {
    const { statusCode = 500, message = "something went wrong!" } = err;
    res.status(statusCode).render("error", { message });
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
}).on('error', (err) => {
    console.error(`Server error: ${err.message}`);
});