@echo off
echo STARTING SETUP
node -v
mkdir temp_init
cd temp_init
call npm create vite@latest . -- --template react-ts
if %errorlevel% neq 0 exit /b %errorlevel%
echo VITE INIT COMPLETE
move * ..
move .gitignore ..
cd ..
rmdir temp_init
echo SETUP COMPLETE
