# SolutionSphere — Local React Prototype

This package wraps the provided `SolutionSphere.jsx` component in a Vite + React project so it can run on your computer.

## Requirements
- Node.js 20.19+ or 22.12+ (Node 22 LTS recommended)
- npm (installed with Node.js)
- A modern browser such as Chrome or Edge

## Run on Windows
1. Extract `SolutionSphere-local.zip` to a folder, for example `Desktop\SolutionSphere-local`.
2. Install Node.js LTS from https://nodejs.org/ if it is not already installed. During installation, keep the option to add Node to PATH enabled.
3. Open the extracted folder in File Explorer.
4. Click the address bar, type `cmd`, and press Enter. This opens Command Prompt in that folder.
5. Run:

   ```bash
   npm install
   npm run dev
   ```

6. Open the local address printed in the terminal (normally `http://127.0.0.1:5173/`).
7. Keep the terminal open while using the website. Press `Ctrl+C` in that terminal to stop the server.

## Run in VS Code
1. Install Visual Studio Code and Node.js LTS.
2. In VS Code, choose **File → Open Folder** and select this extracted folder.
3. Open **Terminal → New Terminal**.
4. Run `npm install`, then `npm run dev`.
5. Open `http://127.0.0.1:5173/` in your browser.

## Create a production build
Run:

```bash
npm run build
```

Vite creates the production files in `dist/`. To preview that build locally, run `npm run preview`.

## Important implementation notes
- `src/App.jsx` is the supplied SolutionSphere React component.
- Challenge cards, leaderboard users, feed posts, and achievements in this prototype are sample/demo data defined in the component.
- The current supplied component does not make backend API calls and does not connect to a database. Login, application, save, and other UI interactions should be treated as prototype interactions unless you add a real backend.
- Data held only in React state resets when the page is refreshed. Persistent accounts, saved challenges, submissions, verified skill analytics, recruitment, and investor funding would require backend endpoints and persistent storage.
- Do not present sample names, organizations, applicant counts, achievements, or impact metrics as real users or verified results.

## Common troubleshooting
- **`npm` is not recognized:** reinstall Node.js LTS and enable adding it to PATH, then close and reopen Command Prompt.
- **Port 5173 is already in use:** close the other development server. This project uses a strict port setting, so it will report an error instead of silently switching ports.
- **Blank page or compile error:** check the terminal for the first error message. Ensure you ran commands from the folder containing `package.json`.
- **No internet during setup:** `npm install` needs access to download React and Vite the first time. After dependencies are installed, the development server can run locally.
