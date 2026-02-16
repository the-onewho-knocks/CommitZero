const vscode = require('vscode');
const logger = require('../utils/logger');

async function getGitAPI() {

    const gitExtension = vscode.extensions.getExtension('vscode.git');

    if (!gitExtension) {
        throw new Error("Git extension not found");
    }

    return gitExtension.exports.getAPI(1);
}

async function getRepository() {

    const git = await getGitAPI();

    if (!git.repositories || git.repositories.length === 0) {
        throw new Error("No Git repository found");
    }

    return git.repositories[0];
}

async function getDiffFromChanges(repo, changes, type) {

    let fullDiff = "";

    for (const change of changes) {

        try {

            const filePath = change.uri.fsPath;

            let diff;

            if (type === "staged") {
                diff = await repo.diffIndexWithHEAD(filePath);
            } else {
                diff = await repo.diffWithHEAD(filePath);
            }

            fullDiff += `\n--- ${type.toUpperCase()} FILE: ${filePath} ---\n`;
            fullDiff += diff;
            fullDiff += "\n";

        } catch (err) {

            logger.error("Failed reading diff", err);

        }

    }

    return fullDiff;
}

async function getWorkingDiff() {

    const repo = await getRepository();

    const stagedChanges = repo.state.indexChanges;
    const modifiedChanges = repo.state.workingTreeChanges;

    if (
        (!stagedChanges || stagedChanges.length === 0) &&
        (!modifiedChanges || modifiedChanges.length === 0)
    ) {
        throw new Error("No staged or modified changes found");
    }

    let fullDiff = "";

    if (stagedChanges.length > 0) {

        logger.log("Reading staged changes");

        fullDiff += await getDiffFromChanges(
            repo,
            stagedChanges,
            "staged"
        );
    }

    if (modifiedChanges.length > 0) {

        logger.log("Reading modified changes");

        fullDiff += await getDiffFromChanges(
            repo,
            modifiedChanges,
            "modified"
        );
    }

    return fullDiff;
}

module.exports = {
    getWorkingDiff
};