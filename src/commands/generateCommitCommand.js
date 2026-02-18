const notification = require('../ui/notification');
const logger = require('../utils/logger');
const { generateAndSetCommitMessage } = require('../services/commitService');

async function generateCommitCommand() {

    try {

        logger.log("Generate commit command triggered");

        // Show loading notification
        notification.showInfo("Analyzing staged changes...");

        // Generate and set commit message
        const commitMessage = await generateAndSetCommitMessage();

        if (!commitMessage || commitMessage.trim().length === 0) {
            throw new Error("Generated commit message is empty");
        }

        // Success notification
        notification.showInfo("Commit message generated successfully");

        // Log result
        logger.log("Commit message generated", commitMessage);

    } catch (err) {

        // Log error
        logger.error("Failed to generate commit message", err);

        // Show error to user
        notification.showError(
            err.message || "Unknown error occurred"
        );

    }

}

module.exports = {
    generateCommitCommand
};

//