@echo off
setlocal enabledelayedexpansion
cd /d "%~dp0.."
node scripts\entrypoint.js %*
endlocal