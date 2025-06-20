#!/bin/bash

set -e

cd "$(dirname "$0")"

echo "Resetting repo state to origin/main ..."
#git fetch origin
#git reset --hard origin/main
#git clean -fd

echo "Install dependencies ..."
#npm install > /dev/null

echo "Scrape from fusion web app ..."
npx ts-node ../src/data-raw/fusion-2025.ts ../src/data-raw/fusion-2025.txt

echo "Match artists with spotify ..."
npm run preprocess -- dry

WATCH_FOLDER="../src/data"
COMMIT_MESSAGE="Automated artist update"
REMOTE="origin"
BRANCH="main"

if [[ -n $(git status --porcelain "$WATCH_FOLDER") ]]; then
    if [[ "$1" == "push" ]]; then
        echo "Changes detected. Committing and pushing..."
        git add "$WATCH_FOLDER"
        git commit -m "$COMMIT_MESSAGE"
        git push "$REMOTE" "$BRANCH"
    else
        echo "Changes detected. No argument passed — skipping commit and push."
    fi
else
    echo "No changes to commit in $WATCH_FOLDER."
fi
