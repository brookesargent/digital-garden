#!/bin/bash
set -e

cd "$(dirname "$0")/.."

echo "Syncing vault content..."
npm run sync

echo ""
echo "Staging content changes..."
git add content/

echo ""
git status

echo ""
echo "Review the above changes. Commit and push? (y/n)"
read -r response
if [[ "$response" == "y" ]]; then
  git commit -m "Sync garden content"
  git push
  echo "Pushed! GitHub Action will build and deploy."
else
  echo "Aborted. Changes are staged but not committed."
fi
