const User = require("../models/userModel");
const Chat = require("../models/chatModel");

const register = async (req, res) => {
    const email = req.body.email;
    const isUser = await User.findOne({ email: email });
    if (!isUser) {
        try {
            const newUser = await User.create(req.body);
            res.status(200).json(newUser);
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(400).json("This email already exists!");
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    const isUser = await User.findOne({ email: email });
    if (isUser) {
        try {
            await isUser.checkPassword(password);
            res.status(200).json(isUser);
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(400).json("Credentials are wrong!");
    }
};

const getUser = async (req, res) => {
    const userId = req.params.userId;
    if (userId) {
        try {
            const user = await User.findById(userId);
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(400).json("User not found by given Id!");
    }
};

const addCategory = async (req, res) => {
    const userId = req.params.userId;
    const category = req.body.category;
    if (userId && category) {
        try {
            const user = await User.findById(userId);
            const userCategories = user.categories;
            if (!userCategories.includes(category)) {
                const uptUser = await User.findByIdAndUpdate(userId, 
                    { $push: { categories: category } }, { new: true });
                res.status(200).json(uptUser);
            } else {
                res.status(200).json(user);
            }
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(400).json("Something went wrong!");
    }
};

const deleteUser = async (req, res) => {
    const userId = req.params.userId;
    if (userId) {
        try {
            const user = await User.findById(userId);
            const { chats, ...info } = user._doc;
            await Promise.all(chats.map(chatId => Chat.findByIdAndDelete(chatId)));
            await User.findByIdAndDelete(userId);
            res.status(200).json("User and associated chats has been deleted");
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(400).json("User not found by given Id!");
    }
};

module.exports = {
    register,
    login,
    getUser,
    addCategory,
    deleteUser,
};