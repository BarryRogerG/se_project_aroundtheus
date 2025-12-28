#!/bin/bash

# Deployment script for multiple projects on same VM
# Usage: ./deploy-multi.sh [project-name]
# Example: ./deploy-multi.sh aroundtheus

set -e

PROJECT_NAME="${1:-aroundtheus}"
VM_USER="${VM_USER:-bgold6562}"
VM_IP="${VM_IP:-34.134.30.14}"
VM_PATH="${VM_PATH:-/var/www/$PROJECT_NAME}"

echo "🚀 Starting deployment for: $PROJECT_NAME"
echo "📦 Building project for production..."

# Build the project
npm run build

# Check if build was successful
if [ ! -d "dist" ]; then
    echo "❌ Build failed! dist directory not found."
    exit 1
fi

echo "✅ Build completed successfully!"
echo "📤 Uploading files to VM..."
echo "   User: $VM_USER"
echo "   IP: $VM_IP"
echo "   Path: $VM_PATH"

# Create directory on VM if it doesn't exist
ssh $VM_USER@$VM_IP "mkdir -p $VM_PATH"

# Upload files to VM
rsync -avz --delete \
    --exclude '*.map' \
    dist/ \
    $VM_USER@$VM_IP:$VM_PATH/

echo "✅ Files uploaded successfully!"
echo "🎉 Deployment completed!"
echo "🌐 Your site should be available at: http://$VM_IP/$PROJECT_NAME"

