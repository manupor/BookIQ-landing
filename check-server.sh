#!/bin/bash
# Run this in a SECOND Terminal while the server is running in the first.
# It checks if anything is listening on 3001 and if the app responds.

PORT=3001
echo "Checking if server is running on port $PORT..."
echo ""

if lsof -i :$PORT 2>/dev/null | grep -q LISTEN; then
  echo "✓ Something is listening on port $PORT."
  echo ""
  echo "Trying to fetch http://127.0.0.1:$PORT ..."
  if curl -s -o /dev/null -w "%{http_code}" --connect-timeout 2 "http://127.0.0.1:$PORT" 2>/dev/null | grep -qE '^[0-9]+$'; then
    CODE=$(curl -s -o /dev/null -w "%{http_code}" --connect-timeout 2 "http://127.0.0.1:$PORT" 2>/dev/null)
    echo "✓ Server responded with HTTP $CODE"
    echo ""
    echo "The server is running. If Firefox still can't connect:"
    echo "  • Try Safari: open http://127.0.0.1:$PORT"
    echo "  • Or Chrome: open http://127.0.0.1:$PORT"
    echo "  • Firefox: Settings → Network → use No proxy, allow Local Network in macOS."
  else
    echo "✗ Connection to 127.0.0.1:$PORT failed (timeout or refused)."
    echo "  Make sure you ran start-local.sh in another Terminal and see 'Ready'."
  fi
else
  echo "✗ Nothing is listening on port $PORT."
  echo ""
  echo "Start the server first:"
  echo "  bash \"/Users/manu/CascadeProjects/bookiq/start-local.sh\""
  echo ""
  echo "Leave that Terminal open, then run this script again."
fi
echo ""
