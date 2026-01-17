# GitHub Setup and Deployment Guide

Complete instructions for creating a private GitHub repository and deploying the Cloud To-Do List application.

## Step 1: Create a Private GitHub Repository

### Prerequisites
- GitHub account (create one at https://github.com/signup if needed)
- Git installed on your computer
- Project files ready

### Create New Repository

1. Go to [GitHub.com](https://github.com/)
2. Click the **"+"** icon in top-right corner
3. Select **"New repository"**
4. Fill in repository details:
   - **Repository name**: `cloud-todo`
   - **Description**: "Cloud Computing Course Project - Online To-Do List"
   - **Visibility**: Select **"Private"** ⚠️ IMPORTANT
   - **Initialize repository**: Leave unchecked (we'll push existing files)
5. Click **"Create repository"**

### Important: Private Repository
- Only you and authorized people can see the code
- Suitable for coursework
- Can be changed to public later if needed

## Step 2: Link Local Repository to GitHub

### Get the Repository URL

1. On your new GitHub repository page, click the green **"Code"** button
2. Make sure **"HTTPS"** is selected (not SSH)
3. Copy the URL (looks like: `https://github.com/yourusername/cloud-todo.git`)

### Connect Your Local Repository

Open terminal/command prompt and run:

```bash
cd D:\Desktop\cloud-todo
git remote add origin https://github.com/yourusername/cloud-todo.git
git branch -M main
git push -u origin main
```

**Replace** `yourusername` with your actual GitHub username

### What These Commands Do
- `git remote add origin`: Connect local repo to GitHub
- `git branch -M main`: Rename branch to "main"
- `git push -u origin main`: Upload files to GitHub

### Verify Upload
1. Go back to GitHub repository page
2. Refresh the page
3. You should see all your files (index.html, script.js, style.css, README.md, etc.)

## Step 3: Enable GitHub Pages

GitHub Pages will host your website for free!

### Enable Pages

1. Go to your GitHub repository
2. Click **"Settings"** (top menu)
3. Scroll down to **"Pages"** section (left sidebar)
4. Under "Build and deployment":
   - **Source**: Select **"Deploy from a branch"**
   - **Branch**: Select **"main"** and folder **"/ (root)"**
5. Click **"Save"**

### Wait for Deployment

- GitHub will build and deploy your site (takes 1-2 minutes)
- You'll see a message: "Your site is live at https://yourusername.github.io/cloud-todo/"

## Step 4: Verify Your Live Website

1. GitHub will display your site URL in the Pages section
2. Click the link or visit: `https://yourusername.github.io/cloud-todo/`
3. You should see:
   - Cloud To-Do List title
   - Login/Sign Up forms
   - Clean, professional interface

### What You Now Have
✅ Web app running in the cloud
✅ Hosted on GitHub Pages (free)
✅ Code stored in GitHub (version control)
✅ Private repository (secure)

## Step 5: First-Time Setup Before Testing

### Critical: Update Firebase Configuration

Before testing the app, you MUST add your Firebase credentials:

1. Open the GitHub repository on your computer
2. Edit `script.js`
3. Find the Firebase configuration section (lines 8-15)
4. Replace placeholder values with your actual Firebase config:

```javascript
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};
```

5. Save the file
6. Commit and push the changes:

```bash
git add script.js
git commit -m "Add Firebase configuration"
git push
```

### Wait for Redeployment
- GitHub Pages will automatically rebuild
- Takes 1-2 minutes
- Your site will now connect to Firebase

## Step 6: Test Your Cloud Application

### Create Your First Test Account

1. Visit your deployed site: `https://yourusername.github.io/cloud-todo/`
2. Click **"Sign Up"** tab
3. Enter:
   - Email: your test email
   - Password: 6+ character password
   - Confirm Password: same as above
4. Click **"Sign Up"**

### Verify Authentication Works
- Should see "My Tasks" page
- Should see your email in top-right corner
- Should see "No tasks yet" message

### Add Your First Task

1. Type in task input: "Test cloud task"
2. Select priority: "Medium"
3. Click **"Add Task"**
4. Task should appear in list

### Verify Cloud Storage Works
1. Refresh the page (F5 or Cmd+R)
2. Your task should still be there
3. ✅ Confirms data is stored in the cloud

### Test Multiple Users

1. Open an **incognito/private browsing window**
2. Visit the same URL
3. Sign up with a DIFFERENT email
4. Add a different task
5. See that each user's tasks are separate
6. ✅ Confirms security rules work

## Step 7: Make Updates to Your App

### Workflow for Updates

1. **Make changes locally**
```bash
# Edit files in your editor
# For example, modify style.css or script.js
```

2. **Test locally** (optional)
```bash
# Open index.html in browser or use a local server
```

3. **Commit changes**
```bash
cd D:\Desktop\cloud-todo
git add .
git commit -m "Description of changes"
```

4. **Push to GitHub**
```bash
git push
```

5. **GitHub Pages deploys automatically**
- Takes 1-2 minutes
- Visit your URL to see changes

### Example: Update the Title

```bash
# Edit index.html to change title
# Then:
git add index.html
git commit -m "Update page title"
git push
# Changes live in 1-2 minutes
```

## Step 8: Verify Deployment Status

### Check Deployment Status

1. Go to GitHub repository
2. Click "Deployments" (right sidebar) or go to "Environments"
3. Should see "github-pages" with a green checkmark
4. Click to see deployment history

### View Deployment Logs

1. Click on the deployment
2. Scroll down to see build and deployment logs
3. Helps troubleshoot any deployment issues

## Common Issues and Solutions

### Issue: Changes Don't Appear on Live Site

**Problem**: Updated files but changes don't show

**Solutions**:
1. Wait 2-3 minutes for GitHub to rebuild
2. Do a hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
3. Clear browser cache
4. Check "Deployments" to verify deployment succeeded

### Issue: "404 Not Found"

**Problem**: Site can't be found

**Solutions**:
1. Verify Pages is enabled in Settings
2. Check correct URL: `https://yourusername.github.io/cloud-todo/`
3. Confirm "main" branch is selected in Pages settings
4. Wait for initial deployment (can take 5 minutes)

### Issue: App Doesn't Load

**Problem**: Page loads but nothing displays

**Solutions**:
1. Check browser console (F12 → Console tab)
2. Verify Firebase configuration in script.js
3. Check Firebase project exists and services are enabled
4. Ensure internet connection

### Issue: "Firebase Config Not Provided"

**Problem**: Error about missing Firebase config

**Solutions**:
1. Verify `script.js` has complete Firebase config
2. Check all 6 values are present and correct
3. Copy directly from Firebase Console (don't type manually)
4. Commit and push, wait for rebuild

### Issue: Can't Sign Up

**Problem**: Registration fails

**Solutions**:
1. Check email/password requirements:
   - Valid email format (user@domain.com)
   - Password at least 6 characters
2. Verify Firebase Authentication is enabled
3. Check browser console for specific errors
4. Ensure Firestore Database is created

### Issue: Tasks Won't Save

**Problem**: Added task but it disappears after refresh

**Solutions**:
1. Check Firestore Database is created
2. Verify security rules are set correctly
3. Check browser console for permission errors
4. Ensure you're logged in before adding tasks

## Repository Management

### Important Files

```
cloud-todo/
├── index.html              # Main page (don't rename)
├── style.css               # Styling (don't rename)
├── script.js               # App logic (don't rename)
├── README.md               # Documentation
├── FIREBASE_SETUP.md       # Firebase guide
├── GITHUB_SETUP.md         # This file
├── .gitignore              # Git ignore rules
└── .git/                   # Git repository (auto-created)
```

### Protect Important Files

Add to `.gitignore` if you have secrets:
```
.env
.env.local
secrets.json
firebase-key.json
```

### Branches and Collaboration

For this course project, you only need the "main" branch. Advanced features:
- **Branches**: Create for testing new features
- **Pull Requests**: If collaborating with others
- **Issues**: Track bugs and features

## Advanced: Custom Domain (Optional)

### Use a Custom Domain

If you have your own domain:

1. Go to GitHub Settings → Pages
2. Under "Custom domain", enter your domain
3. GitHub will provide DNS records to update
4. Update DNS at your domain registrar
5. GitHub verifies and enables SSL

### Example
- Default: `https://yourusername.github.io/cloud-todo/`
- Custom: `https://mytodoapp.com/`

## Preparing for Course Submission

### Required Deliverables

Organize these for submission:

1. **GitHub Repository Link**
   - Example: `https://github.com/yourusername/cloud-todo`
   - Must be accessible to instructor

2. **Live Website URL**
   - Example: `https://yourusername.github.io/cloud-todo/`
   - Should be fully functional

3. **Project Report** (5-7 pages)
   - Screenshots of application working
   - Cloud services used and why
   - Security concepts implemented
   - Problems faced and solutions
   - What you learned

### Checklist Before Submission

- ✅ Repository is on GitHub (private or public)
- ✅ All required files are in repository
- ✅ README.md is complete and informative
- ✅ GitHub Pages is enabled and working
- ✅ Firebase is configured and working
- ✅ Authentication works (can sign up and login)
- ✅ Can add, complete, and delete tasks
- ✅ Different users see different tasks
- ✅ Data persists after page refresh
- ✅ Website is responsive on mobile
- ✅ No console errors

## Security Reminders

### What NOT to Commit

⚠️ Never push these to GitHub:
- Firebase private keys
- API keys (unless using public keys only)
- Personal credentials
- Database passwords
- `.env` files with secrets

### If You Accidentally Committed Secrets

1. Rotate the credentials in Firebase Console
2. Generate new API keys
3. Update script.js with new keys
4. Commit and push
5. Consider using `git filter-branch` or `BFG Repo-Cleaner` to remove from history

### Private Repository Benefits
- Your code is hidden from search engines
- Credentials exposure is limited
- Only authorized people can access
- Suitable for student work

## Git Commands Reference

```bash
# View status
git status

# View recent commits
git log --oneline -5

# Add specific file
git add filename.js

# Add all changes
git add .

# Commit
git commit -m "Description"

# Push to GitHub
git push

# Pull latest from GitHub
git pull

# Create a new branch
git branch feature-name

# Switch branches
git checkout feature-name

# View branches
git branch -a
```

## Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Git Documentation](https://git-scm.com/doc)
- [GitHub Getting Started](https://docs.github.com/en/get-started)
- [GitHub Actions](https://github.com/features/actions) (for advanced automation)

## Next Steps

1. ✅ Create private GitHub repository
2. ✅ Link local repository to GitHub
3. ✅ Push files to GitHub
4. ✅ Enable GitHub Pages
5. ✅ Add Firebase configuration
6. ✅ Test the application
7. Create project report
8. Submit for grading

---

**You now have a fully functional cloud application deployed on GitHub Pages!** 🚀

For questions or issues, check the troubleshooting section or consult Firebase/GitHub documentation.
