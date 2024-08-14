const User = require('../models/user');

module.exports.renderSignupForm = async (req, res) => {

    try {
        const { name, role } = req.user;

        await res.render("auth/signup.ejs", { name, role });
    } catch (error) {
        console.error('Error rendering Registration Form:', error);
        // res.status(500).send('Internal Server Error');
        req.flash("error", "Internal Server Error");
    }
};

module.exports.renderRegSuccessMsg = async (req, res) => {

    try {

        await res.render("results/successReg.ejs");
    } catch (error) {
        console.error('Error rendering Registration Form:', error);
        // res.status(500).send('Internal Server Error');
        req.flash("error", "Internal Server Error");
    }
};

module.exports.signup = async (req, res, next) => {
    try {
        const { username, email, password, role, name } = req.body;

        if (!password) {
            req.flash("error", "Password is required.");
            // return res.redirect(`/${req.user._id}/dashboard/registerMember`);
            return res.render("results/failurePwd.ejs");
        }

        // Create a new user instance with the provided email and username
        const newUser = new User({ email, username, role, name });

        // Register the new user with the provided password
        const registeredUser = await User.register(newUser, password);

        // console.log(registeredUser);

        // Log the user in automatically after successful registration
        req.login(registeredUser, (err) => {
            if (err) {
                return next(err); // Pass the error to the error handling middleware
            }
            // req.flash("success", "User registered successfully!");
            return res.render("results/successReg.ejs");

            // return res.redirect(`/${req.user._id}/dashboard/registerMember/saveUser/successMsg`); // Ensure a response is sent after successful login
        });

    } catch (e) {
        req.flash("error", e.message); // Display any error messages
        return res.render("results/failureReg.ejs");;
    }
};


module.exports.renderLoginForm = async (req, res) => {
    try {
        await res.render("auth/login.ejs");
    } catch (error) {
        console.error('Error rendering Registration Form:', error);
        // res.status(500).send('Internal Server Error');
        req.flash("error", "Internal Server Error");
    }
};

module.exports.login = async (req, res) => {
    try {
        const { username, password, role } = req.body;

        const userIdF = await User.findOne({ username: username, role: role }, { _id: 1 }).lean();

        const userIdString = userIdF ? userIdF._id.toString() : null;

        res.locals.userId = userIdString;

        req.flash("success", "Welcome to Kishori Vikas Prakalp Online Portal!");

        let redirectUrl = res.locals.redirectUrl || `/${userIdString}/dashboard`;
        res.redirect(redirectUrl);
    } catch (error) {
        console.error('Error rendering Registration Form:', error);
        // res.status(500).send('Internal Server Error');
        req.flash("error", "Internal Server Error");
    }
};

module.exports.logout = (req, res, next) => {
    try {
        req.logOut((err) => {
            if (err) {
                return next(err);
            }
            req.flash("success", "You are logged out!");
            res.redirect("/");
        });
    } catch (error) {
        console.error('Error rendering Registration Form:', error);
        // res.status(500).send('Internal Server Error');
        req.flash("error", "Internal Server Error");
    }

};
