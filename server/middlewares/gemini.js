const { GoogleGenerativeAI } = require("@google/generative-ai");
const { classifyText } = require("./nlp");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro"});

async function generateChat(category, prompt, history) {
    if (history) {
        const chat = model.startChat(
            history = history,
        );
        const result = await chat.sendMessage(prompt);
        const response = result.response;
        const text = response.text();
        return text;
    } else {
        const result = await model.generateContent(`Category: ${category}. ${prompt}`);
        const response = result.response;
        const text = response.text();
        return text;
    }
};

module.exports = { generateChat };