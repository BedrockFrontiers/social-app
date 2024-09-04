#!/bin/bash

# Print a message indicating the start of the update process
echo "Updating your local Social App repository..."

# Check for any uncommitted changes or untracked files
if [[ -n $(git status --porcelain) ]]; then
  echo "You have uncommitted changes or untracked files in your repository."
  echo "Please commit or stash your changes before running this script."
  exit 1
fi

# Fetch the latest changes from the remote repository
echo "Fetching the latest changes from the remote repository..."
git fetch

# Update the local branch with the latest changes
echo "Updating local branch with the latest changes..."
git pull

# Print a message indicating the end of the update process
echo "Update complete!"
