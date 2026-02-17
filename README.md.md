<div align="center">

# 🧞 CommitGenie

**AI-powered Git commit messages, right inside VS Code.**

CommitGenie analyzes your staged or modified files using Google's Gemini AI and generates professional, intent-driven commit messages following [Conventional Commits](https://www.conventionalcommits.org/) — so you can stay focused on writing code, not describing it.

[![VS Code](https://img.shields.io/badge/VS%20Code-1.109+-007ACC?logo=visual-studio-code&logoColor=white)](https://code.visualstudio.com/)
[![Gemini AI](https://img.shields.io/badge/Powered%20by-Gemini%20AI-4285F4?logo=google&logoColor=white)](https://ai.google.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

</div>

---

## ✨ Features

- 🤖 **AI-generated commit messages** using Google Gemini
- 🔌 **Native VS Code integration** — works inside the Source Control panel
- 📁 **Supports staged & unstaged changes**
- ⚡ **Fast** — typical generation time: 300ms–1200ms
- 📐 **Conventional Commits** format out of the box
- 🔐 **Secure** — your API key stays in VS Code settings; only your diff is sent to Gemini
- 🪶 **Lightweight** — minimal footprint, zero background processes

---

## 📦 Installation

### Via VSIX (Manual)

1. Download the `.vsix` file from the [Releases](../../releases) page
2. Open VS Code
3. Open the Extensions panel (`Ctrl+Shift+X`)
4. Click the **`···`** menu (top-right of the panel)
5. Select **Install from VSIX...**
6. Choose the downloaded `.vsix` file
7. Reload VS Code when prompted

---

## ⚙️ Setup

Before using CommitGenie, you need a Gemini API key.

### 1. Get a Gemini API Key

Visit [https://ai.google.dev/](https://ai.google.dev/) and create a free API key.

### 2. Configure VS Code Settings

Open Settings with `Ctrl+,`, then search for **CommitGenie**:

| Setting | Description | Default |
|---|---|---|
| `commitgenie.geminiApiKey` | Your Gemini API key | *(required)* |
| `commitgenie.geminiModel` | Gemini model to use | `models/gemini-2.5-flash` |

Or edit your `settings.json` directly:

```jsonc
{
  "commitgenie.geminiApiKey": "YOUR_API_KEY_HERE",
  "commitgenie.geminiModel": "models/gemini-2.5-flash"
}
```

---

## 🚀 Usage

1. Open a Git project in VS Code
2. Modify or stage your files
3. Open the **Source Control** panel (`Ctrl+Shift+G`)
4. Click the **CommitGenie** icon in the panel toolbar
5. Your commit message is generated and filled in automatically ✅

No copying. No context switching. No blank staring at the input box.

---

## 💡 Example

### Input — Git Diff

```diff
+ function validateEmail(email) {
+   return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
+ }
```

### Output — Generated Commit Message

```
feat(utils): add email validation helper function
```

---

## 🧠 How It Works

CommitGenie follows a simple five-step pipeline:

```
1. Detect changes    →  Scans modified/staged files in your repo
2. Extract diff      →  Runs git diff to capture what changed
3. Send to Gemini    →  Passes the diff to the Gemini API with a prompt
4. Parse response    →  Extracts and formats the commit message
5. Fill input box    →  Injects the message into VS Code's SCM input
```

---

## 🏗️ Architecture

CommitGenie is built with a clean, modular structure:

```
commitgenie/
├── src/
│   ├── commands/           # VS Code command registrations
│   ├── config/             # Settings access and validation
│   ├── services/
│   │   ├── gitService.js       # Git diff extraction
│   │   ├── geminiService.js    # Gemini API communication
│   │   └── commitService.js    # Message parsing and injection
│   ├── utils/              # Shared utilities
│   └── extension.js        # Entry point — activate/deactivate
├── package.json
└── README.md
```

### Key Services

**`gitService.js`** — Runs `git diff` (staged or unstaged) and returns the raw diff string.

```js
// Example: get staged diff
const diff = await gitService.getStagedDiff(workspaceRoot);
```

**`geminiService.js`** — Sends the diff to the Gemini API and returns the raw completion.

```js
// Example: generate commit message
const message = await geminiService.generate(diff, apiKey, model);
```

**`commitService.js`** — Orchestrates the flow and injects the result into the SCM input box.

```js
// Example: full pipeline
await commitService.run(context);
```

---

## 🔐 Security

- API keys are stored in **VS Code's native settings** — never bundled with the extension
- Only the **Git diff** is transmitted to Gemini; no file paths, project names, or metadata
- No data is stored externally or logged
- The extension makes **no network requests** outside of the Gemini API call

---

## 🌍 Supported Gemini Models

| Model | Notes |
|---|---|
| `models/gemini-2.5-flash` | ✅ **Recommended** — fast, accurate, low cost |
| `models/gemini-1.5-flash` | Stable alternative |
| `models/gemini-1.5-pro` | Higher quality, slower and more expensive |

---

## 🔧 Requirements

- **VS Code** `1.109.0` or newer
- **Git** installed and available in your system `PATH`
- A valid **Gemini API key**

---

## 🐛 Troubleshooting

### API key not found

```
Error: CommitGenie › Gemini API key is missing
```

**Fix:** Open `Ctrl+,`, search for `CommitGenie`, and paste your key into the `Gemini Api Key` field.

---

### No commit message generated

Ensure all of the following are true:

- You are inside a valid Git repository
- At least one file has been **modified or staged**
- Your Gemini API key is **set and valid**
- You have an active internet connection

---

### Extension not responding

Try reloading the VS Code window:

```
Ctrl+Shift+P → Developer: Reload Window
```

---

## 🗺️ Roadmap

- [ ] Auto-generate message on file stage
- [ ] Commit history learning (style adaptation)
- [ ] Custom commit style preferences
- [ ] Multi-repository workspace support
- [ ] VS Code Marketplace release

---

## 🤝 Contributing

Contributions, bug reports, and feature requests are welcome!

1. Fork the repository
2. Create your feature branch: `git checkout -b feat/my-feature`
3. Commit your changes (CommitGenie can help 😉): `git commit`
4. Push to the branch: `git push origin feat/my-feature`
5. Open a Pull Request

---

## 📄 License

[MIT](LICENSE) — free to use, modify, and distribute.

---

## 💭 Philosophy

> *Developers should focus on building systems, not describing trivial diffs.*

Commit messages should reflect **intent** — not just the mechanical "what changed."  
CommitGenie bridges that gap, translating your code changes into clear, purposeful commit messages automatically.

---

<div align="center">

Built with ❤️ using the [VS Code Extension API](https://code.visualstudio.com/api) and [Google Gemini AI](https://ai.google.dev/)

</div>
