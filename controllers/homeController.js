module.exports.renderHomePage = async (req, res) => {
    try{
        await res.render("home/home");
    }catch (error) {
        console.error('Error rendering Registration Form:', error);
        // res.status(500).send('Internal Server Error');
        req.flash("error", "Internal Server Error");
    }
    
};

module.exports.renderAttributionsPage = async (req, res) => {
    try{
        await res.render("home/attributions");
    }catch (error) {
        console.error('Error rendering Registration Form:', error);
        // res.status(500).send('Internal Server Error');
        req.flash("error", "Internal Server Error");
    }
    
};