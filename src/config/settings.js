const path = require('path');
const dotenv = require('dotenv');
const logger = require('../utils/logger');

// Get absolute path to extension root using extension.js location
const extensionRoot = path.resolve(__dirname, '../../');

// Build full path to .env
const envPath = path.join(extensionRoot, '.env');

// Load .env explicitly
const result = dotenv.config({ path: envPath });

if (result.error) {

    console.error("CommitGenie: Failed to load .env from:", envPath);

} else {

    console.log("CommitGenie: .env loaded from:", envPath);

}

function getGeminiApiKey() {

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {

        throw new Error(
            "Gemini API key not found. Please add GEMINI_API_KEY to .env file."
        );

    }

    return apiKey;
}

function getGeminiModel() {

    return process.env.GEMINI_MODEL || "models/gemini-2.5-flash";

}

module.exports = {
    getGeminiApiKey,
    getGeminiModel
};