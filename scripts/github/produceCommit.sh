#!/bin/bash

# Fetch the latest branches from the remote repository
echo "Fetching the latest branches from the remote repository..."
git fetch

# List all branches and prompt user to select one
echo "Available branches:"
git branch -a

echo "Enter the name of the branch you want to commit to:"
read -r branch_name

# Check if the branch exists
if ! git show-ref --verify --quiet "refs/heads/$branch_name"; then
  echo "Branch '$branch_name' does not exist. Please provide a valid branch name."
  exit 1
fi

# Switch to the selected branch
echo "Switching to branch '$branch_name'..."
git checkout "$branch_name"

# Prompt for a commit message
echo "Enter your commit message:"
read -r commit_message

# Check if the commit message is empty
if [[ -z "$commit_message" ]]; then
  echo "Commit message cannot be empty. Please provide a valid message."
  exit 1
fi

# Check for any uncommitted changes or untracked files
if [[ -n $(git status --porcelain) ]]; then
  echo "Adding all modified and new files to the staging area..."
  git add .
else
  echo "No changes detected to commit."
  exit 1
fi

# Commit the changes with the provided message
echo "Committing changes with the message: '$commit_message'"
git commit -m "$commit_message"

# Print a message indicating the end of the commit process
echo "Commit complete!"
