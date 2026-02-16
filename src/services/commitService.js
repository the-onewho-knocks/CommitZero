const vscode = require('vscode');
const { getWorkingDiff } = require('./gitService');
const { generateCommitMessage } = require('./geminiService');

async function generateAndSetCommitMessage() {

    // Step 1: Get Git extension
    const gitExtension = vscode.extensions.getExtension('vscode.git');

    if (!gitExtension) {
        throw new Error("Git extension not available");
    }

    const git = gitExtension.exports.getAPI(1);

    if (!git.repositories || git.repositories.length === 0) {
        throw new Error("No Git repository found");
    }

    const repo = git.repositories[0];

    // Step 2: Get diff
    const diff = await getWorkingDiff();

    // Step 3: Generate commit message from Gemini
    const commitMessage = await generateCommitMessage(diff);

    // Step 4: Set commit message in Source Control input box
    repo.inputBox.value = commitMessage;

    return commitMessage;
}

module.exports = {
    generateAndSetCommitMessage
};