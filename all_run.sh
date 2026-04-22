#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

# Add Homebrew to PATH
export PATH="/opt/homebrew/bin:$PATH"

echo -e "${BLUE}Starting FusionByte Pro Website...${NC}"

# Check for .env file
if [ ! -f .env ]; then
    echo -e "${BLUE}No .env file found. Please create one based on .env.local if needed.${NC}"
fi

# Install dependencies if node_modules doesn't exist or just to be sure
echo -e "${BLUE}Installing dependencies...${NC}"
npm install --legacy-peer-deps

# Generate Prisma Client
echo -e "${BLUE}Generating Prisma Client...${NC}"
npx prisma generate

# Run database migrations/sync if needed (Optional: uncomment if you want to push schema to DB)
# echo -e "${BLUE}Syncing database schema...${NC}"
# npx prisma db push

# Start the development server
echo -e "${GREEN}Starting development server at http://localhost:3000...${NC}"
npm run dev
