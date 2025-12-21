# Useful Commands Reference

This document list common commands used during the development and maintenance of Zen Bot.

## 🎥 Video & Image Processing (via FFmpeg)

### Convert MP4 to Optimized GIF
Use this to create high-quality, small-sized GIFs for documentation.
```bash
ffmpeg -i input.mp4 -vf "fps=10,scale=800:-1:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse" output.gif
```
*   `fps=10`: Sets the frame rate (lower = smaller file).
*   `scale=800:-1`: Resizes width to 800px while maintaining aspect ratio.
*   `palettegen`: Generates a custom color palette for the specific video (better quality).

---

## 🤖 Discord Bot Management

### Start the Bot
```bash
npm start
```

### Install Dependencies
```bash
npm install
```

---

## 📦 GitHub CLI (`gh`)

### Create a New Public Repository
```bash
gh repo create repo_name --public --source=. --remote=origin --push
```

### Create a New Private Repository
```bash
gh repo create repo_name --private --source=. --remote=origin --push
```

---

## 🛠 Git Essentials

### Add and Commit Changes
```bash
git add .
git commit -m "Your descriptive message here"
```

### Push to Master
```bash
git push origin master
```

### Check Git Status
```bash
git status
```

---

## 🧪 Development Utilities

### Find Guild (Server) ID
1. Enable **Developer Mode** in Discord Settings > Advanced.
2. Right-click your server icon > **Copy Server ID**.

### Generate Invite Link
1. Go to [Discord Developer Portal](https://discord.com/developers/applications).
2. OAuth2 > URL Generator.
3. Select `bot` and `applications.commands`.
4. Select `Administrator` (for dev) or specific perms.
