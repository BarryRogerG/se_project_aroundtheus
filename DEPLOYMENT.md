# Deployment Guide for Google Cloud VM

This guide will help you deploy your "Around The U.S." project to your Google Cloud VM instance.

## Prerequisites

- Google Cloud VM instance running (you have one: `wtwr`)
- SSH access configured (you have SSH keys set up)
- External IP address: `34.134.30.14`
- Username: `bgold6562`

## Step 1: Update API Configuration for Production

The current `baseUrl` in `src/pages/index.js` is set to `/v1` which uses the webpack proxy. For production, we need to use the full API URL.

**Update `src/pages/index.js` line 48:**
```javascript
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "83afc0e8-d580-48dd-9720-21d5eeda6616",
    "Content-Type": "application/json",
  },
});
```

## Step 2: Set Up Web Server on VM

SSH into your VM and install nginx:

```bash
ssh bgold6562@34.134.30.14

# Update package list
sudo apt-get update

# Install nginx
sudo apt-get install -y nginx

# Start nginx
sudo systemctl start nginx

# Enable nginx to start on boot
sudo systemctl enable nginx
```

## Step 3: Configure Nginx

Create a configuration file for your site:

```bash
sudo nano /etc/nginx/sites-available/aroundtheus
```

Add the following configuration:

```nginx
server {
    listen 80;
    server_name 34.134.30.14;

    root /var/www/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

Enable the site:

```bash
sudo ln -s /etc/nginx/sites-available/aroundtheus /etc/nginx/sites-enabled/
sudo nginx -t  # Test configuration
sudo systemctl reload nginx
```

## Step 4: Set Up Deployment Directory

On your VM, create the deployment directory:

```bash
sudo mkdir -p /var/www/html
sudo chown -R $USER:$USER /var/www/html
```

## Step 5: Deploy Your Application

### Option A: Using the deployment script (Recommended)

1. Make the script executable:
   ```bash
   chmod +x deploy.sh
   ```

2. Set environment variables and run:
   ```bash
   export VM_USER=bgold6562
   export VM_IP=34.134.30.14
   export VM_PATH=/var/www/html
   ./deploy.sh
   ```

### Option B: Manual deployment

1. Build the project:
   ```bash
   npm run build
   ```

2. Upload files using SCP:
   ```bash
   scp -r dist/* bgold6562@34.134.30.14:/var/www/html/
   ```

## Step 6: Configure Firewall (if needed)

If you can't access the site, you may need to open port 80:

```bash
# SSH into VM
ssh bgold6562@34.134.30.14

# Check if firewall is active
sudo ufw status

# Allow HTTP traffic
sudo ufw allow 80/tcp
sudo ufw allow 'Nginx Full'
```

Or via Google Cloud Console:
1. Go to VPC network > Firewall rules
2. Create a new rule allowing HTTP (port 80) traffic

## Step 7: Access Your Site

Your site should now be available at:
- **http://34.134.30.14**

## Troubleshooting

### Check nginx status:
```bash
sudo systemctl status nginx
```

### Check nginx error logs:
```bash
sudo tail -f /var/log/nginx/error.log
```

### Check if files are in the right place:
```bash
ls -la /var/www/html/
```

### Test nginx configuration:
```bash
sudo nginx -t
```

## Future Deployments

For future updates, simply run:
```bash
./deploy.sh
```

This will rebuild and redeploy your application automatically.

## Optional: Set Up Domain Name

If you want to use a custom domain:
1. Point your domain's A record to `34.134.30.14`
2. Update the nginx `server_name` directive with your domain
3. Consider setting up SSL with Let's Encrypt

