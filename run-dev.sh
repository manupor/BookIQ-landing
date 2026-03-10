#!/bin/bash
# Run the BookIQ dev server so you can open http://localhost:8080 in your browser.
cd "$(dirname "$0")"
echo "Starting dev server at http://localhost:3000 ..."
echo "Press Ctrl+C to stop."
npm run dev
