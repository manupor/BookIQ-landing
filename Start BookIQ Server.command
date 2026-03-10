#!/bin/bash
cd "$(dirname "$0")"

# Free port 3001 if needed
lsof -ti :3001 | xargs kill -9 2>/dev/null
rm -f .next/dev/lock 2>/dev/null
sleep 1

echo "=============================================="
echo "  BookIQ – starting dev server ON YOUR MAC"
echo "=============================================="
echo ""
echo "  When you see 'Ready' below, open in Firefox:"
echo ""
echo "    http://localhost:3001"
echo ""
echo "  Keep this window open. Close it to stop the server."
echo "=============================================="
echo ""

npm run dev

echo ""
echo "Server stopped. You can close this window."
read -p "Press Enter to close..."
