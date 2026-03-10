# Firefox can't connect to localhost:3001 – fix

Your server is running (you saw "✓ Ready"). Firefox is likely blocking localhost. Try these in order:

---

## 1. Use 127.0.0.1 instead of localhost

In Firefox’s address bar, open:

**http://127.0.0.1:3001**

Sometimes this works when `localhost` does not.

---

## 2. Turn off proxy for localhost

1. In Firefox: **Firefox** menu → **Settings** (or **Preferences**).
2. Open **Settings** and go to **Network Settings** (or search for “proxy”).
3. Click **Settings** next to “Configure how Firefox connects to the internet”.
4. Choose **No proxy**.
5. If you use a custom proxy, add `localhost, 127.0.0.1` to the **No proxy for** list.
6. Restart Firefox and try **http://127.0.0.1:3001** again.

---

## 3. Allow Local Network (macOS)

1. **Apple menu** → **System Settings**.
2. Go to **Privacy & Security**.
3. Open **Local Network**.
4. Find **Firefox** and turn it **On** if it’s off.
5. Restart Firefox and try **http://127.0.0.1:3001** again.

---

## 4. Confirm the server with Safari

1. With the server still running in Terminal, open **Safari**.
2. In the address bar go to: **http://127.0.0.1:3001**
3. If the site loads in Safari, the server is fine and the problem is Firefox (permissions or proxy). Use the steps above for Firefox.

---

## 5. Use Safari or Chrome for development

If Firefox keeps blocking localhost, use **Safari** or **Chrome** for **http://127.0.0.1:3001** while developing.
