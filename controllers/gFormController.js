// to create new data by using form
module.exports.createDataGForm = async (req, res, next) => {
    try {
        const newKvpData = new kvpData(req.body);

        if (typeof newKvpData === 'string') {
            // Parsing the attendance data
            const newKvpDataFinal = JSON.parse(newKvpData);

            const dobField = newKvpDataFinal.DOB;

            // Parse the date
            const date = new Date(dobField);

            // Format the date as 'dd/mm/yyyy'
            const formattedDate = `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;

            newKvpDataFinal.DOB = formattedDate;

            await newKvpDataFinal.save();
            req.flash("success", "Student Added Successfully!");
            return res.redirect(`/${req.user._id}/dashboard`);

        } else {
            throw new Error('Attendance data is not a valid JSON string.');
        }
    } catch (e) {
        console.error('Error while adding entry:', e.message); // Log the error for debugging
        req.flash("error", e.message);
        return res.redirect(`/${req.user._id}/dashboard/dashboardData/addNewStudent/manage-data/new`); // Assuming userId is stored in req.user._id
    }

};