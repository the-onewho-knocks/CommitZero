commit-oracle/

│
├── package.json
├── package-lock.json
├── README.md
├── .gitignore
├── .env
│
├── src/
│   │
│   ├── extension.js                # Entry point (activation + command registration)
│   │
│   ├── commands/
│   │   └── generateCommitCommand.js   # Handles user clicking "Generate Commit Message"
│   │
│   ├── services/
│   │   ├── gitService.js              # Reads git repo, staged files, and diff
│   │   ├── geminiService.js           # Sends diff to Gemini API and receives message
│   │   └── commitService.js           # Orchestrates git + gemini + UI update
│   │
│   ├── ui/
│   │   ├── scmButton.js               # Adds button to Source Control panel
│   │   └── notification.js            # Shows loading, success, and error messages
│   │
│   ├── utils/
│   │   ├── logger.js                  # Debug and console logging
│   │   └── constants.js               # Stores API URLs, extension name, configs
│   │
│   └── config/
│       └── settings.js                # Handles extension configuration and env access
│
└── assets/
    └── icon.svg                      # Extension icon shown in VS Code marketplace