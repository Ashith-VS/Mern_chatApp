const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require("../model/userModel");

const isRegister = async (req, res) => {
    try {
        const { username, email, password,url } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ status: 400, message: 'All fields are required' });
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ status: 400, message: 'Email already in use' });
        }
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, email, password: hashedPassword ,avatar:url});
        await user.save();
        res.status(201).json({ status: 200, message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ status: 500, message: error.message });
    }
}

const isLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ status: 404, message: 'User not found' });
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) return res.status(400).json({ status: 400, message: 'Invalid credentials' });
        const token = jwt.sign({ id: user._id }, process.env.JWT_ACCESS_TOKEN_SECRET, { expiresIn: '7h' });
        res.status(200).json({ status: 200, message: 'User logged in successfully', token: token });
    } catch (error) {
        res.status(500).json({ status: 500, message: error.message });
    }
}

module.exports = { isRegister, isLogin };