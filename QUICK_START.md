# Quick Start Guide - 5 Minute Setup

Get your Cloud To-Do List running in 5 minutes!

## What You Need
- ✅ Google account (for Firebase)
- ✅ GitHub account (for hosting)
- ✅ Web browser
- ✅ Text editor (VS Code recommended)

## 5-Step Setup

### Step 1: Create Firebase Project (1 minute)
1. Go to: https://console.firebase.google.com/
2. Click "Add Project"
3. Enter: `cloud-todo`
4. Click "Create"

### Step 2: Enable Authentication (1 minute)
1. In Firebase, go to **Authentication**
2. Click **Get Started**
3. Click **Email/Password**
4. Toggle **Enable**
5. Click **Save**

### Step 3: Create Firestore Database (1 minute)
1. In Firebase, go to **Firestore Database**
2. Click **Create database**
3. Choose **Test Mode**
4. Click **Create**

### Step 4: Get Your Firebase Config (1 minute)
1. In Firebase, go to **Project Settings** (gear icon)
2. Scroll to **Your apps**
3. Copy the entire firebaseConfig object
4. Open `script.js` in this folder
5. Paste your config (replace placeholder values)

### Step 5: Add Security Rules (1 minute)
1. In Firestore, click **Rules**
2. Replace everything with this:

```firestore
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /tasks/{taskId} {
      allow read, write: if request.auth.uid == resource.data.userId;
      allow create: if request.auth.uid != null;
    }
  }
}
```

3. Click **Publish**

## Test Locally

1. Open `index.html` in your browser
2. Sign up with any email/password
3. Add a task
4. Refresh page (task should still be there)
5. ✅ Works!

## Deploy to GitHub Pages

### Push to GitHub

1. Create new repository on GitHub called `cloud-todo`
2. Set it to **Private**
3. Copy your repository URL
4. In command prompt/terminal:

```bash
cd D:\Desktop\cloud-todo
git remote add origin YOUR_GITHUB_URL
git branch -M main
git push -u origin main
```

### Enable GitHub Pages

1. Go to your GitHub repository
2. Click **Settings**
3. Scroll to **Pages**
4. Select **main** branch as source
5. Your site is live! (Copy the URL)

## Live Website

After 2 minutes, visit: `https://yourusername.github.io/cloud-todo/`

Your cloud app is now online! 🚀

## File Locations

- `script.js` - Add Firebase config here
- `FIREBASE_SETUP.md` - Detailed Firebase guide
- `GITHUB_SETUP.md` - Detailed GitHub guide
- `README.md` - Full documentation

## Common Issues

| Issue | Fix |
|-------|-----|
| App doesn't work | Update Firebase config in script.js |
| Can't sign up | Check email format and password length (6+) |
| Tasks won't save | Verify Firestore database and security rules |
| Site not loading | Wait 5 minutes for GitHub Pages to deploy |

## Need Detailed Help?

- **Firebase Issues**: See `FIREBASE_SETUP.md`
- **GitHub Issues**: See `GITHUB_SETUP.md`
- **General Questions**: See `README.md`
- **Project Overview**: See `PROJECT_SUMMARY.md`

## Next: Write Your Report

Include in your 5-7 page report:
1. Screenshots of your working app
2. Cloud services you used (Firebase, GitHub Pages)
3. What you learned about cloud computing
4. Any problems you faced and how you solved them

---

**That's it!** You have a fully functional cloud application. Congratulations! 🎉
