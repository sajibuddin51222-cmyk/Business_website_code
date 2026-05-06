#!/bin/bash

# FusionBytePro Deployment Setup Script
# This script helps you set up everything for Vercel deployment

set -e

echo "🚀 FusionBytePro Vercel Deployment Setup"
echo "=========================================="
echo ""

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "📝 Creating .env.local from .env.example..."
    cp .env.example .env.local
    echo "✅ .env.local created! Please edit it with your database URL and JWT secret."
    echo ""
    echo "Required variables to set in .env.local:"
    echo "  - DATABASE_URL (PostgreSQL connection string)"
    echo "  - JWT_SECRET (at least 32 characters)"
    echo ""
    read -p "Press enter once you've updated .env.local..."
fi

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
npm install

# Check if Prisma is set up
if [ ! -f prisma/schema.prisma ]; then
    echo "❌ Prisma schema not found!"
    exit 1
fi

echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Ensure DATABASE_URL is set in .env.local"
echo "2. Ensure JWT_SECRET is set in .env.local"
echo "3. Run 'npx prisma db push' to create database tables"
echo "4. Run 'npm run dev' to test locally"
echo "5. Push to GitHub and connect to Vercel"
echo "6. Add environment variables in Vercel dashboard"
echo ""
echo "For more details, see DEPLOYMENT.md"
