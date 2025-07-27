@echo off
title Bulgaria Internships Platform Launcher
color 0A

echo.
echo  ============================================
echo    🇧🇬 Bulgaria Internships Platform 🇧🇬
echo  ============================================
echo.
echo  Starting your amazing job platform...
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo  ❌ Node.js is not installed or not in PATH
    echo  📥 Please install Node.js from: https://nodejs.org
    pause
    exit /b 1
)

REM Check if we're in the right directory
if not exist "package.json" (
    echo  ❌ package.json not found
    echo  📂 Please run this script from the project directory
    pause
    exit /b 1
)

REM Install dependencies if node_modules doesn't exist
if not exist "node_modules" (
    echo  📦 Installing dependencies...
    npm install
    if errorlevel 1 (
        echo  ❌ Failed to install dependencies
        pause
        exit /b 1
    )
)

echo  🚀 Starting development server...
echo  ⏳ This may take a moment...
echo.

REM Start the development server
start /min cmd /c "npm run dev"

REM Wait a bit for the server to start
timeout /t 5 /nobreak >nul

echo  🌐 Opening browser...
echo  📱 Your platform will open at: http://localhost:3000
echo.

REM Open the launcher page
start "" "launch-website.html"

REM Also try to open the main site directly
timeout /t 3 /nobreak >nul
start "" "http://localhost:3000"

echo  ✅ Platform launched successfully!
echo.
echo  📝 Instructions:
echo    • The website should open automatically
echo    • If not, visit: http://localhost:3000
echo    • Press Ctrl+C in the server window to stop
echo.
echo  🎉 Enjoy your Bulgaria Internships Platform!
echo.
pause