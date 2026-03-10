#!/bin/bash
# Run this on your Mac in Terminal so the server runs where your browser can reach it.
# Double-click this file, or in Terminal run:  bash "/Users/manu/CascadeProjects/bookiq/start-local.sh"

cd "/Users/manu/CascadeProjects/bookiq"

# Free port 3001 if something is stuck
lsof -ti :3001 | xargs kill -9 2>/dev/null
rm -f .next/dev/lock 2>/dev/null
sleep 1

echo ""
echo "  Starting BookIQ at http://127.0.0.1:3001"
echo "  When you see 'Ready' below:"
echo "    • Open Safari or Chrome and go to: http://127.0.0.1:3001"
echo "    • Or in another Terminal run:  bash \"$PWD/check-server.sh\""
echo "  Keep this window open. Close it to stop the server."
echo ""

npm run dev
