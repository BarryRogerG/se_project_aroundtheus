# Step-by-Step Deployment Guide

## All commands can be run in your terminal! 

Just follow these steps in order. Some commands run **locally** (on your computer), and some run **on the VM** (via SSH).

---

## Step 1: Build the Project (Run Locally)

Open your terminal in the project directory and run:

```bash
# Build with subdirectory configuration
webpack --config webpack.config.subdir.js --mode production
```

**OR** add this to your `package.json` scripts and use:
```bash
npm run build:subdir
```

---

## Step 2: Make Deploy Script Executable (Run Locally)

```bash
chmod +x deploy-multi.sh
```

---

## Step 3: Deploy Files to VM (Run Locally)

This script will upload your built files to the VM:

```bash
./deploy-multi.sh aroundtheus
```

**OR** manually set variables and run:
```bash
export VM_USER=bgold6562
export VM_IP=34.134.30.14
export VM_PATH=/var/www/aroundtheus
./deploy-multi.sh aroundtheus
```

---

## Step 4: Configure Nginx on VM (Run on VM via SSH)

**First, SSH into your VM:**
```bash
ssh bgold6562@34.134.30.14
```

**Then, while connected to the VM, run these commands:**

### 4a. Create the directory (if it doesn't exist)
```bash
sudo mkdir -p /var/www/aroundtheus
sudo chown -R $USER:$USER /var/www/aroundtheus
```

**Note:** You need `sudo` for both commands because `/var/www` is a system directory.

### 4b. Check what's currently running
```bash
ls -la /var/www/
cat /etc/nginx/sites-enabled/*
```

This shows you where NewsExplorer is deployed.

### 4c. Create nginx configuration
```bash
sudo nano /etc/nginx/sites-available/aroundtheus
```

Paste this configuration (adjust paths based on what you found in step 4b):

```nginx
# Around The U.S. - Subdirectory
server {
    listen 80;
    server_name 34.134.30.14;

    location /aroundtheus {
        alias /var/www/aroundtheus;
        try_files $uri $uri/ /aroundtheus/index.html;
    }

    location /aroundtheus/ {
        alias /var/www/aroundtheus/;
        try_files $uri $uri/ /aroundtheus/index.html;
    }

    location ~* /aroundtheus/.*\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        alias /var/www/aroundtheus;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

Save and exit: `Ctrl+X`, then `Y`, then `Enter`

### 4d. Enable the site and reload nginx
```bash
sudo ln -s /etc/nginx/sites-available/aroundtheus /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### 4e. Exit SSH
```bash
exit
```

---

## Step 5: Test Your Site

Open in browser:
- **NewsExplorer**: `http://34.134.30.14`
- **Around The U.S.**: `http://34.134.30.14/aroundtheus`

---

## Quick Reference: Where to Run Commands

| Command Type | Where to Run |
|-------------|--------------|
| `webpack`, `npm`, `./deploy-multi.sh` | **Local terminal** (your computer) |
| `ssh bgold6562@34.134.30.14` | **Local terminal** (connects to VM) |
| `sudo`, `ls`, `cat`, `nginx` commands | **On VM** (after SSH connection) |

---

## Troubleshooting

**If files don't upload:**
- Make sure you have SSH keys set up
- Check that the VM is accessible: `ping 34.134.30.14`

**If nginx gives errors:**
- Check config: `sudo nginx -t`
- View logs: `sudo tail -f /var/log/nginx/error.log`

**If site doesn't load:**
- Check files are there: `ls -la /var/www/aroundtheus`
- Check nginx is running: `sudo systemctl status nginx`

