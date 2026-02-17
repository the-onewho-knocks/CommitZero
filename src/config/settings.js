const vscode = require('vscode');

function getGeminiApiKey() {

    const config = vscode.workspace.getConfiguration('commitgenie');

    const apiKey = config.get('geminiApiKey');

    if (!apiKey || apiKey.trim() === "") {

        throw new Error(
            "Gemini API key not set. Go to Settings → CommitGenie → Gemini Api Key"
        );
    }

    return apiKey;
}

function getGeminiModel() {

    const config = vscode.workspace.getConfiguration('commitgenie');

    return config.get('geminiModel') || "models/gemini-2.5-flash";
}

module.exports = {
    getGeminiApiKey,
    getGeminiModel
};