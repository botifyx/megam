# Deployment Guide for GoDaddy cPanel (React + Node.js)

This guide walks you through deploying your React Vite frontend and Node.js backend to GoDaddy cPanel.

## Prerequisites
- GoDaddy Hosting with cPanel (Linux).
- "Setup Node.js App" feature available in your cPanel (CloudLinux).

## Part 1: Backend Deployment

1.  **Prepare Backend Code**
    - Ensure your `Backend` folder has `package.json` and `server.js`.
    - **Important**: Do NOT upload `node_modules` or `.env`.

2.  **Create Node.js Application in cPanel**
    - Log in to **cPanel**.
    - Find **Software** > **Setup Node.js App**.
    - Click **Create Application**.
    - **Node.js Version**: Select a version compatible with your project (e.g., 18.x or 20.x).
    - **Application Mode**: Production.
    - **Application Root**: `backend` (This will create a `backend` folder in your file manager).
    - **Application URL**: `api` (This means your backend will be accessible at `yourdomain.com/api`).
    - **Application Startup File**: `server.js`.
    - Click **Create**.

3.  **Upload Files**
    - Go to **File Manager** in cPanel.
    - Open the `backend` directory (or whatever you named the root).
    - Upload your `server.js` and `package.json` from your local `d:\Megam_Live\megam\Backend` folder.
    - Create a new file named `.env` and paste your environment variables (smtp settings, etc.).

4.  **Install Dependencies**
    - Go back to **Setup Node.js App**.
    - Click the **Edit** (pencil) icon for your app.
    - Click **Run NPM Install**.

5.  **Restart App**
    - Click **Restart**.
    - **Test**: Visit `yourdomain.com/api` (or wherever you mounted it). You should see "Backend Service is running".
    - **Note**: Since we mounted it at `api`, your actual route `/api/send-email` might be accessible at `yourdomain.com/api/api/send-email` unless you adjust routes in `server.js` or the Application URL.
    - **Recommendation**: If you set Application URL to `api`, cPanel aliases that path. In `server.js`, you might need to adjust routes.
    - **Simpler approach**:
        - Set Application URL to empty (root) - BUT this conflicts with frontend.
        - **Best Method**: Set Application URL to `server` (e.g., `megam.live/server`).
        - Then your API endpoint is `megam.live/server/api/send-email`.
        - Update your Frontend `.env` accordingly.

## Part 2: Frontend Deployment

1.  **Build React App**
    - On your local machine, inside `d:\Megam_Live\megam`:
    - Create a file `.env.production` (if you haven't yet).
    - Add: `VITE_API_URL=https://yourdomain.com/server/api/send-email` (Replace with your actual backend URL).
    - Run: `npm run build`.
    - This creates a `dist` folder.

2.  **Upload Frontend**
    - Go to **File Manager** in cPanel.
    - Open `public_html`.
    - Upload the **contents** of the `dist` folder (files like `index.html`, `assets/`, etc.) directly into `public_html`.

3.  **Handle Client-Side Routing**
    - Since this is a detailed React app, refreshing a page like `/contact` might verify 404.
    - Create a `.htaccess` file in `public_html` (if not exists) and add:

    ```apache
    <IfModule mod_rewrite.c>
      RewriteEngine On
      RewriteBase /
      RewriteRule ^index\.html$ - [L]
      RewriteCond %{REQUEST_FILENAME} !-f
      RewriteCond %{REQUEST_FILENAME} !-d
      RewriteCond %{REQUEST_FILENAME} !-l
      RewriteRule . /index.html [L]
    </IfModule>
    ```

## Part 3: Troubleshooting

- **Email fails**: Check `.env` in the backend folder. Ensure port 465/587 is correct and GoDaddy isn't blocking external SMTP (sometimes you must use `localhost` or GoDaddy's relay if using their email).
- **CORS Error**: if Backend and Frontend are on same domain, it shouldn't be an issue, but `cors` is already enabled in `server.js`.
