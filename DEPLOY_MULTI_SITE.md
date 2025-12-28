# Deploying Multiple Projects on Same VM

## Current Situation
- **NewsExplorer**: Already running at `http://34.134.30.14`
- **Around The U.S.**: Needs to be deployed to the same VM

## Solution Options

### Option 1: Different Directories with Path-Based Routing ⭐ (Recommended)

**Setup:**
1. Keep NewsExplorer at: `/var/www/html` or `/var/www/news-explorer`
2. Deploy Around The U.S. to: `/var/www/aroundtheus`
3. Access via:
   - NewsExplorer: `http://34.134.30.14`
   - Around The U.S.: `http://34.134.30.14/aroundtheus`

**Steps:**

1. **Create separate directory for Around The U.S.:**
   ```bash
   ssh bgold6562@34.134.30.14
   sudo mkdir -p /var/www/aroundtheus
   sudo chown -R $USER:$USER /var/www/aroundtheus
   ```

2. **Update nginx configuration:**
   ```bash
   sudo nano /etc/nginx/sites-available/multi-site
   ```
   
   Paste the configuration from `nginx-multi-site.conf` (or see below)

3. **Enable the new configuration:**
   ```bash
   sudo ln -s /etc/nginx/sites-available/multi-site /etc/nginx/sites-enabled/
   sudo rm /etc/nginx/sites-enabled/default  # Remove default if exists
   sudo nginx -t
   sudo systemctl reload nginx
   ```

4. **Update webpack publicPath for Around The U.S.:**
   Since it's in a subdirectory, update `webpack.config.js`:
   ```javascript
   output: {
     path: path.resolve(__dirname, "dist"),
     filename: "main.js",
     publicPath: "/aroundtheus/",  // Add this
   },
   ```

5. **Deploy Around The U.S.:**
   ```bash
   npm run build
   scp -r dist/* bgold6562@34.134.30.14:/var/www/aroundtheus/
   ```

---

### Option 2: Different Ports

**Setup:**
- NewsExplorer: Port 80 (default)
- Around The U.S.: Port 8080

**Steps:**

1. **Create nginx config for Around The U.S. on port 8080:**
   ```bash
   sudo nano /etc/nginx/sites-available/aroundtheus
   ```
   
   ```nginx
   server {
       listen 8080;
       server_name 34.134.30.14;

       root /var/www/aroundtheus;
       index index.html;

       location / {
           try_files $uri $uri/ /index.html;
       }
   }
   ```

2. **Enable and reload:**
   ```bash
   sudo ln -s /etc/nginx/sites-available/aroundtheus /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl reload nginx
   ```

3. **Open firewall for port 8080:**
   ```bash
   sudo ufw allow 8080/tcp
   ```

4. **Access:**
   - NewsExplorer: `http://34.134.30.14`
   - Around The U.S.: `http://34.134.30.14:8080`

---

### Option 3: Use Domain Names (If you have domains)

If you have domain names, you can use virtual hosts:

```nginx
# NewsExplorer
server {
    listen 80;
    server_name news.yourdomain.com;
    root /var/www/news-explorer;
    # ... rest of config
}

# Around The U.S.
server {
    listen 80;
    server_name around.yourdomain.com;
    root /var/www/aroundtheus;
    # ... rest of config
}
```

---

## Recommended Approach

**I recommend Option 1 (Path-Based Routing)** because:
- ✅ No need to open additional ports
- ✅ Both sites accessible from same IP
- ✅ Clean URL structure
- ✅ Easy to manage

**Important:** If you choose Option 1, you'll need to update the `publicPath` in webpack config so all assets load correctly from the `/aroundtheus/` subdirectory.

---

## Quick Check: What's Currently Running?

To see what's currently configured on your VM:

```bash
ssh bgold6562@34.134.30.14
ls -la /var/www/
cat /etc/nginx/sites-enabled/*
```

This will show you:
- What directories exist
- What nginx configurations are active
- How to best integrate the new project

