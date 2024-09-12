#!/bin/bash

# This script is a utility for managing Prisma-related tasks such as initialization,
# database migrations, client generation, and launching Prisma Studio.

# Set colors for output formatting
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No color

# Log a success message with green color
log_success() {
  echo -e "${GREEN}✔ $1${NC}"
}

# Log an error message with red color
log_error() {
  echo -e "${RED}✘ $1${NC}"
}

# Display usage instructions
show_help() {
  echo "Usage: $0 [command]"
  echo
  echo "Commands:"
  echo "  init        Initialize Prisma schema and configuration"
  echo "  migrate     Create and apply migrations to the database"
  echo "  generate    Generate the Prisma client from the schema"
  echo "  studio      Launch Prisma Studio (a visual database interface)"
  echo "  help        Show this help message"
  exit 1
}

# Function to initialize Prisma (create schema.prisma and environment setup)
init_prisma() {
  echo "Initializing Prisma..."
  if npx prisma init; then
    log_success "Prisma initialized successfully."
  else
    log_error "Failed to initialize Prisma."
    exit 1
  fi
}

# Function to create and apply database migrations
migrate_prisma() {
  echo "Creating and applying migrations..."
  if npx prisma migrate dev --name init_migration; then
    log_success "Migrations applied successfully."
  else
    log_error "Failed to apply migrations."
    exit 1
  fi
}

# Function to generate the Prisma client from schema.prisma
generate_prisma() {
  echo "Generating Prisma client..."
  if npx prisma generate; then
    log_success "Prisma client generated successfully."
  else
    log_error "Failed to generate Prisma client."
    exit 1
  fi
}

# Function to launch Prisma Studio, a visual database explorer
studio_prisma() {
  echo "Launching Prisma Studio..."
  if npx prisma studio; then
    log_success "Prisma Studio launched successfully."
  else
    log_error "Failed to launch Prisma Studio."
    exit 1
  fi
}

# Main logic to handle different commands
case "$1" in
  init)
    init_prisma
    ;;
  migrate)
    migrate_prisma
    ;;
  generate)
    generate_prisma
    ;;
  studio)
    studio_prisma
    ;;
  help)
    show_help
    ;;
  *)
    log_error "Invalid command: $1"
    show_help
    ;;
esac
