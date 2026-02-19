@echo off
echo Killing existing node processes...
taskkill /F /IM node.exe

echo Deleting old log file...
if exist server_log.txt del server_log.txt

echo Starting server...
cd server
node index.js > ../server_startup_log.txt 2>&1
echo Node process exited with %errorlevel%
type ../server_startup_log.txt
