# Windows Deployment Guide

Since you're on Windows (Git Bash), here's the corrected process:

## Step 1: Build the Project (Local Terminal)

```bash
npm run build:subdir
```

## Step 2: Set Up Directory on VM (SSH into VM first)

**Connect to your VM:**
```bash
ssh bgold6562@34.134.30.14
```

**Once connected, create the directory with sudo:**
```bash
sudo mkdir -p /var/www/aroundtheus
sudo chown -R $USER:$USER /var/www/aroundtheus
```

**Exit SSH:**
```bash
exit
```

## Step 3: Deploy Files (Back on Local Terminal)

### Option A: Use the Windows batch file
```bash
deploy-multi.bat aroundtheus
```

### Option B: Use scp directly
```bash
scp -r dist/* bgold6562@34.134.30.14:/var/www/aroundtheus/
```

### Option C: Use rsync (if available in Git Bash)
```bash
rsync -avz --delete dist/ bgold6562@34.134.30.14:/var/www/aroundtheus/
```

## Step 4: Configure Nginx (SSH into VM again)

```bash
ssh bgold6562@34.134.30.14
```

Then follow the nginx configuration steps from `DEPLOY_STEPS.md` (steps 4b-4e).

---

## Quick Fix for Your Current Situation

Since you're already on the VM, just run:

```bash
sudo mkdir -p /var/www/aroundtheus
sudo chown -R $USER:$USER /var/www/aroundtheus
```

Then exit and deploy:
```bash
exit
scp -r dist/* bgold6562@34.134.30.14:/var/www/aroundtheus/
```

