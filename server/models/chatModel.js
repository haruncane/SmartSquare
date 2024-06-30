const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema(
    {
        category: {
            type: String,
        },
        history: [
            {
                role: {
                    type: String,
                    required: true,
                },
                parts: [
                    {
                        text: {
                            type: String,
                            required: true,
                        },
                        _id: false,
                    },
                ], 
                _id: false,
            },
            
        ],
        isFavorite: {
            type: Boolean,
            default: false,
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Chat", chatSchema);