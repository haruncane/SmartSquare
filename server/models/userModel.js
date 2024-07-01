const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Chat = require("../models/chatModel");

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        chats: [{ type: mongoose.Schema.Types.ObjectId, ref: "Chat" }],
        categories: [{ type: String, _id: false }],
    },
    {
        timestamps: true,
    }
);

userSchema.pre("save", async function (next) {
    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.checkPassword = async function (enteredPw) {
    return await bcrypt.compare(enteredPw, this.password);
};

module.exports = mongoose.model("User", userSchema);