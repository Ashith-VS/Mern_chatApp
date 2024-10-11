const User = require("../model/userModel");


const getUsersBySearch = async (req, res) => {
    try {
        const query = req.query.search
        // console.log('query: ', query);
        const users = await User.find({ username: { $regex: query, $options: 'i' } }).find({ _id: { $ne: req.id } })//login user detail not yet available IN search users list
        res.status(200).json({ status: 200, message: 'Users fetched successfully', users });
    } catch (error) {
        res.status(500).json({ status: 500, message: error.message });
    }
}

module.exports = { getUsersBySearch }