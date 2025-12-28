@echo off
REM Deployment script for Windows
REM Usage: deploy-multi.bat [project-name]

set PROJECT_NAME=%~1
if "%PROJECT_NAME%"=="" set PROJECT_NAME=aroundtheus

set VM_USER=%VM_USER%
if "%VM_USER%"=="" set VM_USER=bgold6562

set VM_IP=%VM_IP%
if "%VM_IP%"=="" set VM_IP=34.134.30.14

set VM_PATH=/var/www/%PROJECT_NAME%

echo 🚀 Starting deployment for: %PROJECT_NAME%
echo 📤 Uploading files to VM...
echo    User: %VM_USER%
echo    IP: %VM_IP%
echo    Path: %VM_PATH%

REM Upload files using scp (works in Git Bash)
scp -r dist/* %VM_USER%@%VM_IP%:%VM_PATH%/

if %ERRORLEVEL% EQU 0 (
    echo ✅ Files uploaded successfully!
    echo 🎉 Deployment completed!
    echo 🌐 Your site should be available at: http://%VM_IP%/%PROJECT_NAME%
) else (
    echo ❌ Upload failed! Make sure the directory exists on the VM first.
    echo    Run: ssh %VM_USER%@%VM_IP% "sudo mkdir -p %VM_PATH% && sudo chown -R %VM_USER%:%VM_USER% %VM_PATH%"
)

