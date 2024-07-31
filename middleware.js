const KvpData = require("./models/kvpData.js");
const AttData = require("./models/attData.js");
const ExpressError = require("./utils/ExpressError.js");
const {kvpDataSchema, attDataSchema} = require("./schema.js");

module.exports.isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "you must be logged in to access website !");
        return res.redirect("/login");
    }
    next();
};

module.exports.saveRedirectUrl = (req, res, next) => {
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};

// module.exports.isOwner = async (req, res, next) => {
//     let { id, role } = req.params;
//     let listing = await Listing.findById(id);

//     if(!listing.owner._id.equals(res.locals.currUser._id)){
//         req.flash("error","You are not the owner of this listing");
//         return res.redirect(`/listings/${id}`);
//     }

//     next();
// };

module.exports.validateKvpData = (req, res, next) => {
    let {error} = kvpDataSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, error);
    } else {
        next();
    }
};

module.exports.validateAttData = (req, res, next) => {
    let {error} = attDataSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, error);
    } else {
        next();
    }
};

// module.exports.isReviewAuthor = async (req, res, next) => {
//     let { id, reviewId } = req.params;
//     let review = await Review.findById(reviewId);

//     if(!review.author.equals(res.locals.currUser._id)){
//         req.flash("error","You are not the author of this review");
//         return res.redirect(`/listings/${id}`);
//     }

//     next();
// }

