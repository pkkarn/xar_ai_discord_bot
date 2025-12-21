# Zen Bot 🤖

A modern Discord bot project built with `discord.js` (v14).

## 🚀 Getting Started

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v16.11.0 or higher)
- A Discord account

### 2. Setup Discord Application
1. Go to the [Discord Developer Portal](https://discord.com/developers/applications).
2. Click **New Application** and give it a name (e.g., "Zen Bot").
3. Navigate to the **Bot** tab on the left.
4. Click **Reset Token** (if necessary) and copy the **Token**. Keep this secret!
5. Enable **Server Members Intent** and **Message Content Intent** under the "Privileged Gateway Intents" section. (Though not strictly needed for basic slash commands, it's good for future expansions).
6. Copy the **Application ID** (Client ID) from the **General Information** tab.

### 3. Installation
1. Clone this repository or copy the files.
2. Create a `.env` file in the root directory:
   ```env
   DISCORD_TOKEN=your_bot_token_here
   CLIENT_ID=your_client_id_here
   GUILD_ID=your_guild_id_here (optional, for faster dev testing)
   GEMINI_API_KEY=your_gemini_api_key_here
   GEMINI_TEXT_MODEL=gemini-3-flash-preview
GEMINI_IMAGE_MODEL=gemini-2.5-flash-image
   ```
   *Tip: To find your GUILD_ID, enable **Developer Mode** in Discord Settings > Advanced, then right-click your server icon and select "Copy Server ID".*

   **To get a Gemini API Key:**
   1. Visit the [Google AI Studio](https://aistudio.google.com/).
   2. Click "Get API key" and create a new key.
   3. Copy it into your `.env` file.

3. Run `npm install` to install dependencies.

### 4. Running the Bot
```bash
npm start
```

## 🛠 Features
- `/reverse [text]`: Reverses any text you input.
- `/ask [prompt]`: Chat with Google's latest Gemini 1.5 Flash model directly in Discord.
- `/vis [prompt]`: Generate stunning AI images using Gemini 2.0 Flash.

## 🔗 How to add the Bot to your Server
1. Go to the [Discord Developer Portal](https://discord.com/developers/applications).
2. Select your application.
3. On the left sidebar, click **OAuth2** then select **URL Generator**.
4. **Step 1: Scopes** - You MUST select:
   - `bot`
   - `applications.commands` (Critical for slash commands to work)
5. **Step 2: Bot Permissions** - Select:
   - `Send Messages`
   - `Use Slash Commands`
   - `Embed Links`
6. Copy the **Generated URL** at the bottom.
7. Paste it into your browser, select your server, and click **Authorize**.

## 📝 Updates
Check [update.md](./update.md) for the latest changes and project progress.
