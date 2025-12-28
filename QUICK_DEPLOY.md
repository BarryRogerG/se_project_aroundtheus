# Quick Deployment Guide

## Fast Track Deployment (5 minutes)

### 1. Update API URL (Already Done ✅)
The API URL has been updated to use the full production URL.

### 2. Build Your Project
```bash
npm run build
```

### 3. SSH into Your VM
```bash
ssh bgold6562@34.134.30.14
```

### 4. Install Nginx (One-time setup)
```bash
sudo apt-get update
sudo apt-get install -y nginx
sudo systemctl start nginx
sudo systemctl enable nginx
```

### 5. Create Web Directory
```bash
sudo mkdir -p /var/www/html
sudo chown -R $USER:$USER /var/www/html
```

### 6. Configure Nginx
```bash
sudo nano /etc/nginx/sites-available/aroundtheus
```

Paste this configuration:
```nginx
server {
    listen 80;
    server_name 34.134.30.14;

    root /var/www/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

Save and exit (Ctrl+X, then Y, then Enter)

Enable the site:
```bash
sudo ln -s /etc/nginx/sites-available/aroundtheus /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### 7. Deploy Files

**From your local machine**, upload the built files:
```bash
scp -r dist/* bgold6562@34.134.30.14:/var/www/html/
```

### 8. Open Firewall (if needed)
```bash
# On the VM
sudo ufw allow 80/tcp
```

### 9. Access Your Site
Open in browser: **http://34.134.30.14**

---

## For Future Updates

Just rebuild and upload:
```bash
npm run build
scp -r dist/* bgold6562@34.134.30.14:/var/www/html/
```

Or use the automated script:
```bash
chmod +x deploy.sh
export VM_USER=bgold6562
export VM_IP=34.134.30.14
export VM_PATH=/var/www/html
./deploy.sh
```

