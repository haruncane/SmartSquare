const Chat = require("../models/chatModel");
const User = require("../models/userModel");
const { generateChat } = require("../middlewares/gemini");
const { classifyText } = require("../middlewares/nlp");

const createChat = async (req, res) => {
    const userId = req.body.userId;
    const userCategory = req.body.category?.toLowerCase() || "";
    const prompt = req.body.prompt;
    if (prompt && userId) {
        try {
            const user = await User.findById(userId);
            const chatIds = user.chats;
            const userCategories = user.categories;
            const chats = await Chat.find({ _id: { $in: chatIds } });
            const favoritedChats = chats.filter(chat => chat.isFavorite);
            await User.findByIdAndUpdate(userId, { chats: favoritedChats }, { new: true });
            const unFavoritedChats = await chats.filter(chat => !chat.isFavorite);
            await Promise.all(unFavoritedChats.map(async chatId => await Chat.findByIdAndDelete(chatId)));
            const nlpCategory = await classifyText(prompt);
            let category = "";
            if (userCategory) {
                if (nlpCategory.toLowerCase().includes(userCategory) || userCategory.includes(nlpCategory.toLowerCase())) {
                    category = userCategory;
                } else {
                    category = "other";
                }
            } else {
                const subStr = nlpCategory.toLowerCase().split("/");
                category = subStr[2];
            }
            const response = await generateChat(nlpCategory, prompt, null);
            const history = [
                    {
                        role: "user",
                        parts: [{ text: prompt }],
                    },
                    {
                    role: "model",
                    parts: [{ text: response }],
                    },
                ];
            const newChat = await Chat.create({
                category: category,
                history: history,
            });
            if (!userCategories.includes(category)) {
                await User.findByIdAndUpdate(userId, 
                    { $push: { chats: newChat, categories: category } }, { new: true });
            } else {
                await User.findByIdAndUpdate(userId, 
                    { $push: { chats: newChat } }, { new: true });
            }
            res.status(200).json(newChat);
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(400).json("Chat not be created!");
    }
};

const updateChat = async (req, res) => {
    const chatId = req.params.chatId;
    const prompt = req.body.prompt;
    if (chatId && prompt) {
        try {
            const chat = await Chat.findById(chatId);
            const history = JSON.stringify(chat.history, null, 2);
            const response = await generateChat(null, prompt, history);
            const updatedHistory = [
                    {
                        role: "user",
                        parts: [{ text: prompt }],
                    },
                    {
                    role: "model",
                    parts: [{ text: response }],
                    },
                ];
            const updatedChat = await Chat.findByIdAndUpdate(chatId,
                { $push: { history: updatedHistory } }, { new: true });
                res.status(200).json(updatedChat);
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(400).json("Failed to generate chat!");
    }
};

const getLastCreatedChat = async (req, res) => {
    const userId = req.body.userId;
    if (userId) {
        try {
            const user = await User.findById(userId);
            const chatIds = user.chats;
            const chats = await Chat.find({ _id: { $in: chatIds } }).sort({ createdAt: -1 });
            res.status(200).json(chats[0]);
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(400).json("Chat not found!");
    }
};

const getFavoritedChats = async (req, res) => {
    const userId = req.body.userId;
    if (userId) {
        try {
            const user = await User.findById(userId);
            const chatIds = user.chats;
            const chats = await Chat.find({ _id: { $in: chatIds } });
            const favoritedChats = chats.filter(chat => chat.isFavorite);
            res.status(200).json(favoritedChats);
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(400).json("Can not find the chats!");
    }
};

const setFavorite = async (req, res) => {
    const chatId = req.params.chatId;
    if (chatId) {
        try {
            const chat = await Chat.findById(chatId);
            const favoriteStatus = chat.isFavorite;
            const updatedChat = await Chat.findByIdAndUpdate(chatId,
                { isFavorite: !favoriteStatus}, { new: true });
                res.status(200).json(updatedChat);
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(400).json("Favorite status can not be changed");
    }
}

const deleteChat = async (req, res) => {
    const chatId = req.params.chatId;
    const userId = req.body.userId;
    if (chatId && userId) {
        try {
            await Chat.findByIdAndDelete(chatId);
            await User.findByIdAndUpdate(userId,
                { $pull: { chats: chatId } }, { new: true });
            res.status(200).json("Chat has been deleted");
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(400).json("Chat not found by given Id!");
    }
};

module.exports = {
    createChat,
    updateChat,
    getLastCreatedChat,
    getFavoritedChats,
    setFavorite,
    deleteChat,
}