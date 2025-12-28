#!/bin/bash

# Deployment script for Google Cloud VM
# Make sure to set these variables before running:
# VM_USER: Your Google Cloud username (e.g., bgold6562)
# VM_IP: Your VM's external IP (e.g., 34.134.30.14)
# VM_PATH: Path on VM where you want to deploy (e.g., /var/www/html)

set -e

echo "🚀 Starting deployment process..."

# Build the project for production
echo "📦 Building project for production..."
npm run build

# Check if build was successful
if [ ! -d "dist" ]; then
    echo "❌ Build failed! dist directory not found."
    exit 1
fi

echo "✅ Build completed successfully!"

# Variables (update these with your VM details)
VM_USER="${VM_USER:-bgold6562}"
VM_IP="${VM_IP:-34.134.30.14}"
VM_PATH="${VM_PATH:-/var/www/html}"

echo "📤 Uploading files to VM..."
echo "   User: $VM_USER"
echo "   IP: $VM_IP"
echo "   Path: $VM_PATH"

# Upload files to VM
rsync -avz --delete \
    --exclude '*.map' \
    dist/ \
    $VM_USER@$VM_IP:$VM_PATH/

echo "✅ Files uploaded successfully!"

# Restart web server (uncomment if using systemd service)
# ssh $VM_USER@$VM_IP "sudo systemctl restart nginx"

echo "🎉 Deployment completed!"
echo "🌐 Your site should be available at: http://$VM_IP"

