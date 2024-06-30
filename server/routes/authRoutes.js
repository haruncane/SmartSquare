const express = require("express");
const router = express.Router();
const { register, login, getUser, deleteUser, addCategory } = require("../controllers/userCtrl");

router.post("/register", register);
router.post("/login", login);
router.put("/addCategory/:userId", addCategory);
router.get("/:userId", getUser);
router.delete("/:userId", deleteUser);

module.exports = router;