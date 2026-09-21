@echo off
echo ====================================
echo RK Food Application Startup Script
echo ====================================
echo.

echo Checking prerequisites...
echo.

REM Check Java
java -version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Java is not installed or not in PATH
    echo Please install Java 17 or higher
    pause
    exit /b 1
)
echo [OK] Java is installed

REM Check Node.js
node -version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed or not in PATH
    echo Please install Node.js 18 or higher
    pause
    exit /b 1
)
echo [OK] Node.js is installed

REM Check MongoDB
echo Checking MongoDB connection...
mongo --version >nul 2>&1
if %errorlevel% neq 0 (
    echo WARNING: MongoDB command line not found
    echo Please ensure MongoDB is installed and running
    echo You can also use MongoDB Atlas (cloud)
)

echo.
echo ====================================
echo Starting MongoDB...
echo ====================================
echo.

REM Try to start MongoDB service
net start MongoDB >nul 2>&1
if %errorlevel% neq 0 (
    echo MongoDB service may already be running or not installed
    echo Continuing with application startup...
) else (
    echo MongoDB service started successfully
)

echo.
echo ====================================
echo Starting Backend Server...
echo ====================================
echo.

cd backend
start "RK Food Backend" cmd /k "mvn spring-boot:run"

echo Waiting for backend to start...
timeout /t 15 /nobreak >nul

echo.
echo ====================================
echo Starting Frontend Server...
echo ====================================
echo.

cd ..\frontend
start "RK Food Frontend" cmd /k "npm run dev"

echo.
echo ====================================
echo Application Started Successfully!
echo ====================================
echo.
echo Frontend: http://localhost:5173
echo Backend:  http://localhost:8080
echo Admin:    http://localhost:5173/admin
echo.
echo Press any key to open the application in your browser...
pause >nul

start http://localhost:5173

echo.
echo To stop the servers, close the opened command windows
echo.
pause