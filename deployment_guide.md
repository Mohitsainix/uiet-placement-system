# Deployment Guide for UIET Placement System

Since your application is built with a Node.js/Express backend that serves your static vanilla HTML/JS frontend, deployment is actually quite straightforward! We can deploy your entire application as a single web service. 

I highly recommend **Render.com** because it's free, very easy to use, and perfect for this project structure.

Here is the step-by-step process:

## Step 1: Set up MongoDB Atlas (Cloud Database)
Currently, you are likely using a local MongoDB database. To deploy, your database needs to be on the internet.

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) and create a free account.
2. Build a new cluster (the **Free** "Shared" tier is perfect).
3. Once the cluster is created, click **"Connect"**.
4. Set up database access: Create a database user with a username and password (save this password!).
5. Set up network access: Allow access from anywhere (IP address `0.0.0.0/0`) so Render can connect to it.
6. Choose **"Connect your application"**.
7. Copy the **Connection String** (it will look like `mongodb+srv://<username>:<password>@cluster0.mongodb.net/?retryWrites=true&w=majority`).
8. Replace `<password>` in that string with the actual password you just created. **This is your new `MONGO_URI`.**

## Step 2: Push your code to GitHub
Render connects directly to your GitHub account to deploy your code.

1. If you haven't already, initialize a git repository in your project folder:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```
   > [!IMPORTANT]
   > Make sure you have a `.gitignore` file in your root directory that includes `node_modules/` and `backend/.env` so you don't upload sensitive data or massive folders to GitHub!

2. Go to [GitHub](https://github.com/) and create a new repository (can be public or private).
3. Follow the instructions on GitHub to push your existing code to the new repository.
   ```bash
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git push -u origin main
   ```

## Step 3: Deploy to Render
Now we will tell Render to take your code from GitHub and run it on the internet.

1. Go to [Render](https://render.com/) and create a free account.
2. In the Render Dashboard, click **New +** and select **Web Service**.
3. Connect your GitHub account and select your newly created repository.
4. Fill in the details for your Web Service:
   - **Name:** `uiet-placement-system` (or whatever you like)
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Instance Type:** Select the **Free** tier.
5. **Environment Variables**: Scroll down to the "Environment Variables" section. This is crucial! You need to add the variables that were in your `.env` file here:
   - Click "Add Environment Variable".
   - Key: `MONGO_URI` | Value: *(Paste the MongoDB Atlas connection string from Step 1)*
   - Key: `JWT_SECRET` | Value: *(Paste the secret string you used in your local .env)*
   - Key: `PORT` | Value: `10000` *(Render prefers port 10000 or dynamically assigns one, but defining it is safe)*
6. Click **Create Web Service**.

## Step 4: Wait and Verify
Render will now download your code, run `npm install`, and then run `npm start`. 

- You will see a terminal log on the screen showing the progress.
- Once you see `Server running on port ...` and `MongoDB Connected`, your deployment is successful!
- At the top left of the Render dashboard for your service, you will see a URL (e.g., `https://uiet-placement-system.onrender.com`). Click this URL to see your live application.

> [!TIP]
> With this setup, anytime you push new code to your `main` branch on GitHub, Render will automatically detect the changes and redeploy your app!
