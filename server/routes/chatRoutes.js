const express = require("express");
const router = express.Router();
const { createChat, updateChat, getLastCreatedChat, getFavoritedChats, deleteChat, setFavorite } = require("../controllers/chatCtrl");

router.post("/createChat", createChat);
router.put("/updateChat/:chatId", updateChat);
router.post("/getFavoritedChats", getFavoritedChats);
router.post("/getLastCreatedChat", getLastCreatedChat);
router.put("/setFavorite/:chatId", setFavorite);
router.delete("/:chatId", deleteChat);

module.exports = router;