<div align="center">

# CommitGenie

**AI-powered Git commit messages, generated in one click.**

Powered by Google Gemini. Built for VS Code.

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)
[![VS Code](https://img.shields.io/badge/VS%20Code-1.60%2B-007ACC?logo=visualstudiocode)](https://code.visualstudio.com/)
[![Gemini](https://img.shields.io/badge/Powered%20by-Gemini-8E44AD)](https://aistudio.google.com/)

</div>

---

## Overview

CommitGenie connects directly to your VS Code Source Control panel, reads your staged and modified diffs, and uses Google Gemini to produce clean, conventional commit messages — without leaving your editor.

No copy-pasting. No context switching. Just commit.

---

## Features

| | |
|---|---|
| **One-click generation** | Trigger from the Source Control toolbar or Command Palette |
| **Conventional commits** | Output follows the standard `type(scope): description` format |
| **Staged + unstaged support** | Reads both index changes and working tree diffs |
| **Configurable model** | Choose any Gemini model via settings |
| **In-editor experience** | Message is injected directly into the commit input box |

---

## Requirements

- VS Code `1.60.0` or later
- A [Google Gemini API key](https://aistudio.google.com/app/apikey)
- A Git repository open in your workspace

---

## Getting Started

**1. Install the extension**

Search for `CommitGenie` in the VS Code Extensions Marketplace and click Install.

**2. Add your API key**

Open Settings (`Ctrl+,` / `Cmd+,`), search for `CommitGenie`, and paste your Gemini API key into **CommitGenie: Gemini Api Key**.

**3. Generate your first commit message**

Stage your changes and either click the CommitGenie button in the Source Control panel, or open the Command Palette (`Ctrl+Shift+P` / `Cmd+Shift+P`) and run:

```
CommitGenie: Generate Commit Message
```

---

## Configuration

| Setting | Description | Default |
|---|---|---|
| `commitgenie.geminiApiKey` | Your Google Gemini API key | *(required)* |
| `commitgenie.geminiModel` | Gemini model to use for generation | `models/gemini-2.5-flash` |

> Settings can be changed at any time via **File → Preferences → Settings** and searching `CommitGenie`.

---

## How It Works

```
Your staged diff
      |
      v
  VS Code Git API  -->  Raw diff text
      |
      v
  Gemini API  -->  Conventional commit message
      |
      v
  Source Control input box
```

1. CommitGenie reads your diffs through the built-in VS Code Git API
2. The diff is sent to Gemini with a prompt engineered for professional, production-grade commit messages
3. The response is written directly into the Source Control commit input box

---

## Project Structure

```
commitgenie/
├── extension.js                  # Entry point — activate / deactivate
│
├── commands/
│   └── generateCommitCommand.js  # Main command handler and error boundary
│
├── services/
│   ├── commitService.js          # Orchestrates the full generation pipeline
│   ├── geminiService.js          # Gemini API client
│   └── gitService.js             # VS Code Git API wrapper
│
├── config/
│   └── settings.js               # Reads API key and model from workspace config
│
├── ui/
│   ├── notification.js           # Info, error, and warning notifications
│   └── scmButton.js              # Source Control panel button registration
│
└── utils/
    ├── constants.js              # Extension-wide constants and command IDs
    └── logger.js                 # Timestamped console logger
```

---

## Contributing

Contributions, issues, and feature requests are welcome.

```bash
# 1. Fork and clone the repository
git clone https://github.com/your-username/commitgenie.git

# 2. Create a feature branch
git checkout -b feat/your-feature

# 3. Make your changes, then open a Pull Request
```

Please keep pull requests focused and include a clear description of what changed and why.

---

## License

Distributed under the [Apache License 2.0](LICENSE).

```
Copyright 2024 CommitGenie Contributors

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0
```
