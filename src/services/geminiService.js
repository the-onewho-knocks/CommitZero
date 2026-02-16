const axios = require('axios');
const settings = require('../config/settings');
const logger = require('../utils/logger');

async function generateCommitMessage(diff) {

    if (!diff || diff.trim().length === 0) {
        throw new Error("No diff provided");
    }

    const apiKey = settings.getGeminiApiKey();
    const model = settings.getGeminiModel();

    const url =
    `https://generativelanguage.googleapis.com/v1beta/${model}:generateContent?key=${apiKey}`;

    const prompt = `
You are an expert senior software engineer writing git commit message at production level.

Generate a git commit message based on this diff.

Rules:
- Use conventional github commit format
- always be professional and only important stuff
- Min 20 words explaination and tell modifications if any
- Do not include meta-talk like "Here is your commit message." or "This commit applies"
- Max 300 characters
- Only output commit message


Diff:
${diff}
`;

    try {

        logger.log("Sending diff to Gemini");

        const response = await axios.post(url, {
            contents: [
                {
                    parts: [
                        { text: prompt }
                    ]
                }
            ]
        });

        const message =
            response.data.candidates[0].content.parts[0].text.trim();

        logger.log("Gemini response received", message);

        return message;

    } catch (err) {

        logger.error("Gemini API failed", err.response?.data || err);

        throw new Error("Gemini failed to generate commit message");
    }
}

module.exports = {
    generateCommitMessage
};