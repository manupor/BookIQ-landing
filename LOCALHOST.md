# View BookIQ on your Mac

## Option A: Double‑click (easiest)

1. In Finder, go to the **bookiq** folder.
2. **Double‑click** `Start BookIQ Server.command`.
3. If macOS says it’s from an unidentified developer:  
   **Right‑click** the file → **Open** → **Open**.
4. A Terminal window will open. Wait until you see **`✓ Ready`**.
5. In your browser, open: **http://localhost:3000**

Leave the Terminal window open while you use the site. Close it to stop the server.

---

## Option B: Terminal

1. Open **Terminal** (Cmd+Space → type `Terminal` → Enter).
2. Run:
   ```bash
   cd /Users/manu/CascadeProjects/bookiq
   npm run dev
   ```
3. Wait for **`✓ Ready`**.
4. Open in browser: **http://localhost:3000**

---

## If it still doesn’t load

- Try **http://127.0.0.1:3000** instead of localhost.
- Try another browser (e.g. **Safari** or **Chrome**).
- In **System Settings → Privacy & Security**, allow your browser to access the **local network** if asked.
- Make sure nothing else is using port 3000 (e.g. another app or an old Terminal with `npm run dev`).

---

## Use port 8080 instead

To run on port 8080:

```bash
cd /Users/manu/CascadeProjects/bookiq
npm run dev:8080
```

Then open: **http://localhost:8080**
