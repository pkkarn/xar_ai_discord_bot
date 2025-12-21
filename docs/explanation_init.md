# Zen Bot Internal Architecture Explained

This document provides a comprehensive breakdown of the bot's logic, structure, and data flow.

---

## 1. The Foundation (`package.json` & `.env`)

The project is built on modern Node.js standards using **ES Modules (ESM)**.

*   **`package.json`**: Noted with `"type": "module"`, allowing the use of `import/export` instead of the legacy `require()`.
    *   **`discord.js`**: Our primary interface for interacting with the Discord Gateway.
    *   **`@google/genai`**: The official SDK for communicating with Google's Gemini models.
    *   **`dotenv`**: Responsible for securely loading environmental variables into the process.
*   **`.env`**: Our secure vault. This file is excluded from version control via `.gitignore` to protect sensitive credentials like the `DISCORD_TOKEN` and `GEMINI_API_KEY`.

---

## 2. The Brain (`src/ai.js`)

By decoupling the AI logic from the bot's interface, we ensure the codebase remains maintainable and scalable.

*   **Initialization**: We instantiate the `GoogleGenAI` class using the provided API key.
*   **Model Selection**: The system architecture supports dynamic model switching via `GEMINI_TEXT_MODEL` and `GEMINI_IMAGE_MODEL` environment variables, defaulting to `gemini-1.5-flash` and `gemini-2.0-flash-exp` respectively.

### Key Logic:
1.  **`askGemini(prompt)`**: Implements a standard request-response loop for text generation. It handles asynchronous communication with Google's servers.
2.  **`generateImage(prompt)`**: A multimodal implementation. Since image data is returned as a **Base64 string**, the module converts this data into a **Buffer** (raw binary data) to facilitate Discord's attachment upload process.

---

## 3. The Orchestrator (`src/index.js`)

The main entry point that manages the Discord client lifecycle and user interactions.

### A. Command Definition
Using the `SlashCommandBuilder`, we define our command signatures. This metadata is sent to Discord to populate the command autocomplete menu in the UI.
*   `/reverse`: Basic string manipulation.
*   `/ask`: High-level AI text inference.
*   `/vis`: Multimodal AI image generation.

### B. Command Registration
To ensure commands are available, the `REST` client "pushes" the command definitions to the Discord API. 
*   **Optimization**: We use a `GUILD_ID` during deployment to bypass the standard 1-hour global propagation delay, enabling **instant** updates for the development server.

### C. Interaction Handling
The core logic resides within the `interactionCreate` listener.
1.  **`deferReply()`**: **Essential**. Discord requires a response within 3 seconds. Since AI generation (text or image) often exceeds this window, we defer the reply to inform Discord that the bot is performing a long-running task.
2.  **Routing**:
    *   **Text Logic**: Calls the `ai.js` module, validates the response length against Discord's **2000-character limit**, and edits the deferred reply with the final text.
    *   **Image Logic**: Converts the AI-generated buffer into an `AttachmentBuilder` object, enabling a clean image upload directly into the channel.

---

## The Request Lifecycle
1.  **Start**: Node.js initializes the project.
2.  **Auth**: Bot authenticates via `DISCORD_TOKEN`.
3.  **Sync**: Commands are synchronized with the target Guild/Server.
4.  **Listen**: The process enters a loop, waiting for Discord Gateway events.
5.  **Execution**: Upon receiving a command, the bot routes the prompt to the AI module, processes the data, and returns the result to the user.
