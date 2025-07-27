#!/bin/bash

# Bulgaria Internships Platform Launcher
# 🇧🇬 България Стажове Platform Starter

# Colors for terminal output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

clear
echo -e "${GREEN}"
echo "============================================"
echo "   🇧🇬 Bulgaria Internships Platform 🇧🇬"
echo "============================================"
echo -e "${NC}"
echo
echo -e "${BLUE}Starting your amazing job platform...${NC}"
echo

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed${NC}"
    echo -e "${YELLOW}📥 Please install Node.js from: https://nodejs.org${NC}"
    exit 1
fi

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ package.json not found${NC}"
    echo -e "${YELLOW}📂 Please run this script from the project directory${NC}"
    exit 1
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}📦 Installing dependencies...${NC}"
    npm install
    if [ $? -ne 0 ]; then
        echo -e "${RED}❌ Failed to install dependencies${NC}"
        exit 1
    fi
fi

echo -e "${BLUE}🚀 Starting development server...${NC}"
echo -e "${YELLOW}⏳ This may take a moment...${NC}"
echo

# Start the development server in background
npm run dev &
SERVER_PID=$!

# Function to cleanup on exit
cleanup() {
    echo -e "\n${YELLOW}🛑 Shutting down server...${NC}"
    kill $SERVER_PID 2>/dev/null
    exit 0
}

# Set trap to cleanup on script exit
trap cleanup SIGINT SIGTERM

# Wait for server to start
echo -e "${BLUE}⏳ Waiting for server to start...${NC}"
sleep 5

# Function to open URL in browser (cross-platform)
open_browser() {
    local url=$1
    if command -v xdg-open &> /dev/null; then
        # Linux
        xdg-open "$url"
    elif command -v open &> /dev/null; then
        # macOS
        open "$url"
    elif command -v start &> /dev/null; then
        # Windows (Git Bash)
        start "$url"
    else
        echo -e "${YELLOW}📝 Please manually open: $url${NC}"
    fi
}

echo -e "${GREEN}🌐 Opening browser...${NC}"
echo -e "${BLUE}📱 Your platform will open at: http://localhost:3000${NC}"
echo

# Open the launcher page first
open_browser "$(pwd)/launch-website.html"

# Wait a bit then open the main site
sleep 3
open_browser "http://localhost:3000"

echo -e "${GREEN}✅ Platform launched successfully!${NC}"
echo
echo -e "${YELLOW}📝 Instructions:${NC}"
echo "  • The website should open automatically"
echo "  • If not, visit: http://localhost:3000"
echo "  • Press Ctrl+C to stop the server"
echo
echo -e "${GREEN}🎉 Enjoy your Bulgaria Internships Platform!${NC}"
echo
echo -e "${BLUE}Server is running... Press Ctrl+C to stop${NC}"

# Keep the script running and wait for the server
wait $SERVER_PID