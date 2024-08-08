const User = require('../models/user');

module.exports.renderSignupForm = (req, res) => {

    const { name,role } = req.user;

    res.render("auth/signup.ejs",{ name,role });
};

module.exports.signup = async (req, res, next) => {
    try {
        const { username, email, password, role, name } = req.body;

        if (!password) {
            req.flash("error", "Password is required.");
            return res.redirect(`/${req.user._id}/dashboard/registerMember`);
        }

        // Create a new user instance with the provided email and username
        const newUser = new User({ email, username, role, name });

        // Register the new user with the provided password
        const registeredUser = await User.register(newUser, password);

        console.log(registeredUser);

        // Log the user in automatically after successful registration
        req.login(registeredUser, (err) => {
            if (err) {
                return next(err); // Pass the error to the error handling middleware
            }
            req.flash("success", "User registered successfully!");
            res.redirect(`/${req.user._id}/dashboard/registerMember`); // Ensure a response is sent after successful login
        });

    } catch (e) {
        req.flash("error", e.message); // Display any error messages
        res.redirect("/signup");
    }
};

module.exports.renderLoginForm = (req, res) => {
    res.render("auth/login.ejs");
};

module.exports.login = async (req, res) => {
    const { username, password, role } = req.body;

    const userIdF = await User.findOne({username: username}, {_id: 1}).lean();

    const userIdString = userIdF ? userIdF._id.toString() : null;

    res.locals.userId = userIdString;

    req.flash("success", "Welcome to Kishori Vikas Prakalp Online Portal!");

    let redirectUrl = res.locals.redirectUrl || `/${userIdString}/dashboard`;
    res.redirect(redirectUrl);
};

module.exports.logout = (req, res, next) => {
    req.logOut((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "You are logged out!");
        res.redirect("/");
    });
};
