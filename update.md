# Update Log

All updates and changes to the Zen Bot project will be tracked here.

## [2025-12-21] - Initial Setup
### Added
- Initialized Node.js project with `npm init`.
- Installed `discord.js` and `dotenv`.
- Created basic project structure.
- Implemented `/reverse` slash command.
- Added `.gitignore` and `.env.example`.
- Added documentation on how to add the bot to a Discord server.

## [2025-12-21] - Clarification on Deployment
### Explained
- Added detailed explanation of `GUILD_ID` for instant slash command propagation during development versus global deployment.

## [2025-12-21] - Deployment Concepts Explained
### Clarification
- **Guild Deployment**: Fast, instant updates, limited to one server. Ideal for development and personal bots.
- **Global Deployment**: Slower (up to 1 hour), available in all servers. Used for public production bots.

## [2025-12-21] - Documentation Update
### Added
- Instructions for finding Guild ID (Developer Mode toggling).

## [2025-12-21] - Bug Fixes & Refactoring
### Fixed
- Updated `ready` event to `clientReady` to resolve `discord.js` deprecation warning.
- Added troubleshooting for `DiscordAPIError[50001]: Missing Access` in documentation.

## [2025-12-21] - Educational: Invite Links
### Explained
- Guide on generating invite links via the Discord Developer Portal (OAuth2 -> URL Generator).
- Clarified the importance of the `applications.commands` scope for Slash Commands.

## [2025-12-21] - Documentation Correction
### Fixed
- Improved README instructions for the Discord URL Generator to ensure users can find the settings and select the mandatory `applications.commands` scope.
- Added explicit navigation steps (OAuth2 -> URL Generator).

## [2025-12-21] - GitHub Integration
### Added
- Initialized local Git repository.
- Created a private GitHub repository `zen_bot` using `gh` CLI.
- Pushed initial project code to GitHub.

## [2025-12-21] - Latest Gemini SDK Integration
### Added
- Upgraded to the **latest** `@google/genai` SDK as per official documentation.
- Migrated the project to **ES Modules (ESM)** for modern syntax compatibility.
- Re-implemented `/ask` command using the new `GoogleGenAI` client pattern.
- Configured for `gemini-1.5-flash` for high-performance response generation.
- Updated documentation with API key setup instructions (Google AI Studio).

## [2025-12-21] - Project Modularization
### Optimized
- Separated Gemini AI logic into a dedicated `src/ai.js` module for better maintainability.
- Updated `src/index.js` to import AI functionality, keeping the main entry point clean.
- Added support for `GEMINI_MODEL` environment variable to easily switch models.

## [2025-12-21] - Image Generation Support
### Added
- Implemented `/vis` slash command for AI image generation.
- Integrated Gemini 2.0 Flash (Experimental) for multimodal output.
- Added `GEMINI_IMAGE_MODEL` and `GEMINI_TEXT_MODEL` environment variables.
- Removed legacy `GEMINI_MODEL` to prevent configuration confusion.
- Automated image buffer handling and Discord attachment uploads.
- Updated the local `.env` and `.env.example` with the new standardized variables.

## [2025-12-21] - Documentation & Config Refresh
### Updated
- Synced `README.md` and `.env.example` with latest suggested model versions (`gemini-3-flash-preview` and `gemini-2.5-flash-image`).
- Pushed updates to GitHub.
