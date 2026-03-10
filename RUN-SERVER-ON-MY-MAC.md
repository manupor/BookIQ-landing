# The server must run on your Mac

If you see **“Unable to connect”** in Firefox, the app is not running on your computer.  
Starting the server from Cursor often runs it somewhere your browser cannot reach (e.g. a remote machine).

## Fix: run the server on your Mac

### Option 1 – One command in Terminal

1. On your Mac, open **Terminal** (not Cursor’s terminal):  
   **Spotlight** (⌘+Space) → type **Terminal** → press Enter.

2. Paste this and press Enter:

   ```bash
   bash "/Users/manu/CascadeProjects/bookiq/start-local.sh"
   ```

3. Wait until you see **`✓ Ready`**.

4. In Firefox, go to: **http://localhost:3001**

Leave the Terminal window open while you use the site.

---

### Option 2 – Double‑click

1. In **Finder**, go to: **Users** → **manu** → **CascadeProjects** → **bookiq**.
2. Double‑click **`Start BookIQ Server.command`**.
3. If macOS says it’s from an unidentified developer:  
   **Right‑click** the file → **Open** → **Open**.
4. Wait for **`✓ Ready`**, then in Firefox open: **http://localhost:3001**

---

### Option 3 – Manual commands

In **Terminal** (on your Mac):

```bash
cd /Users/manu/CascadeProjects/bookiq
npm run dev
```

When you see **`✓ Ready`**, open **http://localhost:3001** in Firefox.

---

**Important:** Use **Terminal on your Mac** (from Spotlight or Applications). Do not rely on starting the server only from inside Cursor if you develop remotely.
