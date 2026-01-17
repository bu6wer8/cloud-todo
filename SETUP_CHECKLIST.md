# Cloud To-Do List Setup Checklist

Use this checklist to ensure your project is properly configured and deployed.

## Pre-Setup Requirements

### Before You Start
- [ ] You have a Google account (Gmail)
- [ ] You have a GitHub account
- [ ] You have VS Code or text editor installed
- [ ] You have internet connection
- [ ] This project folder on your computer

---

## Phase 1: Firebase Setup ✅

### Create Firebase Project
- [ ] Visit https://console.firebase.google.com/
- [ ] Click "Add Project" or "Create project"
- [ ] Enter project name: `cloud-todo`
- [ ] Click "Create project"
- [ ] Wait for project to be created (1-2 minutes)
- [ ] Firebase dashboard loads successfully

### Enable Authentication
- [ ] In Firebase, click **Authentication** (left sidebar)
- [ ] Click **Get Started**
- [ ] Look for **Email/Password** sign-in method
- [ ] Click on Email/Password
- [ ] Toggle **Enable** switch to ON
- [ ] Click **Save**
- [ ] Verify status shows "Enabled"

### Create Firestore Database
- [ ] In Firebase, click **Firestore Database** (left sidebar)
- [ ] Click **Create database**
- [ ] Select a location (choose closest to you)
- [ ] Select **Test Mode** (for now)
- [ ] Click **Create**
- [ ] Wait for database to initialize (1-2 minutes)
- [ ] See empty database dashboard

### Configure Firestore Security Rules
- [ ] In Firestore, click **Rules** tab
- [ ] Select all text (Ctrl+A)
- [ ] Delete old rules
- [ ] Paste new security rules (provided in guide)
- [ ] Click **Publish**
- [ ] Confirm changes to publish
- [ ] Wait for rules to deploy

### Get Firebase Configuration
- [ ] In Firebase, click gear icon (⚙️) top-left
- [ ] Click **Project Settings**
- [ ] Scroll to **Your apps** section
- [ ] Find your web app (looks like `</> app`)
- [ ] Copy the entire `firebaseConfig` object
- [ ] Make sure all 6 values are present:
  - [ ] apiKey
  - [ ] authDomain
  - [ ] projectId
  - [ ] storageBucket
  - [ ] messagingSenderId
  - [ ] appId

### Update Your Code
- [ ] Open `script.js` in your editor
- [ ] Find line 8-15 (Firebase Configuration section)
- [ ] Replace `YOUR_API_KEY` with actual apiKey
- [ ] Replace `YOUR_AUTH_DOMAIN` with actual authDomain
- [ ] Replace `YOUR_PROJECT_ID` with actual projectId
- [ ] Replace `YOUR_STORAGE_BUCKET` with actual storageBucket
- [ ] Replace `YOUR_MESSAGING_SENDER_ID` with actual messagingSenderId
- [ ] Replace `YOUR_APP_ID` with actual appId
- [ ] Save the file (Ctrl+S)

### Verify Firebase Configuration
- [ ] Open `index.html` in your browser
- [ ] No "Firebase config not found" errors
- [ ] Page loads without console errors (check F12)
- [ ] Go to Sign Up form
- [ ] Try signing up with test email
- [ ] In Firebase Console → Authentication → Users
- [ ] Verify your test user appears in the list

---

## Phase 2: Local Testing ✅

### Test Authentication
- [ ] Open `index.html` in browser
- [ ] Go to **Sign Up** tab
- [ ] Enter email: `test1@example.com`
- [ ] Enter password: `Test123456`
- [ ] Enter confirm: `Test123456`
- [ ] Click **Sign Up**
- [ ] Should see "My Tasks" page
- [ ] Should see your email in top-right

### Test Task Management
- [ ] See task input field
- [ ] See priority dropdown
- [ ] See "Add Task" button
- [ ] Type task: "Test task 1"
- [ ] Select priority: "Medium"
- [ ] Click "Add Task"
- [ ] Task appears in list
- [ ] Task shows correct priority color

### Test Data Persistence
- [ ] Refresh page (F5)
- [ ] Task should still appear
- [ ] No "No tasks yet" message
- [ ] Task data persists from cloud

### Test Task Features
- [ ] Check the checkbox on task
- [ ] Task appears crossed out
- [ ] Click "Delete" button on task
- [ ] Confirm deletion
- [ ] Task disappears from list
- [ ] Refresh page - task still gone

### Test Multi-User (Different User)
- [ ] Open new browser or private window
- [ ] Visit same `index.html`
- [ ] Sign up as: `test2@example.com`
- [ ] Add different task: "Test task 2"
- [ ] Should NOT see task from test1
- [ ] Go back to first browser with test1
- [ ] Should still only see "Test task 1"
- [ ] ✅ Security rules working!

### Test Logout and Login
- [ ] Click **Logout** button
- [ ] Should go back to login page
- [ ] Go to **Login** tab
- [ ] Enter: `test1@example.com`
- [ ] Enter password: `Test123456`
- [ ] Click **Login**
- [ ] Should see "My Tasks" with your task
- [ ] Verify correct user logged in

### Test Error Handling
- [ ] Try signing up with same email (should fail)
- [ ] Try signing up with weak password < 6 chars (should fail)
- [ ] Try logging in with wrong password (should fail)
- [ ] Try adding empty task (should fail)
- [ ] Error messages appear clearly

---

## Phase 3: GitHub Setup ✅

### Create GitHub Repository
- [ ] Visit https://github.com/
- [ ] Click **+** icon (top-right)
- [ ] Select **New repository**
- [ ] Enter name: `cloud-todo`
- [ ] Enter description: "Cloud Computing Course Project"
- [ ] Select **Private** (important!)
- [ ] Do NOT initialize with README
- [ ] Click **Create repository**

### Get Repository URL
- [ ] On new repository page, click green **Code** button
- [ ] Make sure **HTTPS** is selected
- [ ] Copy the URL (looks like: `https://github.com/username/cloud-todo.git`)
- [ ] Save URL somewhere temporary

### Link Local Repository to GitHub
- [ ] Open command prompt or terminal
- [ ] Navigate to your project folder:
  ```
  cd D:\Desktop\cloud-todo
  ```
- [ ] Run these commands:
  ```
  git remote add origin YOUR_URL_HERE
  git branch -M main
  git push -u origin main
  ```
- [ ] Replace `YOUR_URL_HERE` with your actual URL
- [ ] Watch for upload progress

### Verify Upload
- [ ] Go to your GitHub repository page
- [ ] Refresh the page
- [ ] Should see all your files:
  - [ ] index.html
  - [ ] style.css
  - [ ] script.js
  - [ ] README.md
  - [ ] FIREBASE_SETUP.md
  - [ ] GITHUB_SETUP.md
  - [ ] QUICK_START.md
  - [ ] PROJECT_SUMMARY.md
  - [ ] SETUP_CHECKLIST.md (this file)

---

## Phase 4: GitHub Pages Deployment ✅

### Enable GitHub Pages
- [ ] Go to your GitHub repository
- [ ] Click **Settings** (top menu)
- [ ] Scroll to **Pages** section (left sidebar)
- [ ] Under "Build and deployment":
  - [ ] Select **"Deploy from a branch"** (Source)
  - [ ] Select **"main"** (Branch)
  - [ ] Select **"/ (root)"** (Folder)
- [ ] Click **Save**
- [ ] Wait 2-3 minutes for deployment

### Get Your Live URL
- [ ] Go back to Pages section
- [ ] Look for message: "Your site is live at..."
- [ ] Copy your URL (looks like: `https://username.github.io/cloud-todo/`)
- [ ] Save this URL

### Verify Live Deployment
- [ ] Visit your GitHub Pages URL
- [ ] Should see Cloud To-Do List page
- [ ] Page loads without errors
- [ ] No 404 error
- [ ] Can see login/signup forms

### Test Live Application
- [ ] Sign up on live website
- [ ] Add a task
- [ ] Refresh page
- [ ] Task persists (cloud storage working!)
- [ ] Logout
- [ ] Login again
- [ ] Your task still there

---

## Phase 5: Final Verification ✅

### Website Functionality
- [ ] Page displays correctly
- [ ] Clean, professional appearance
- [ ] Responsive on phone size
- [ ] No console errors (F12)
- [ ] All buttons clickable
- [ ] Forms validate input

### Cloud Database
- [ ] Tasks save to cloud
- [ ] Tasks load from cloud
- [ ] Multiple tasks work
- [ ] Delete works properly
- [ ] Data survives page refresh
- [ ] Check Firebase Console sees data

### Authentication
- [ ] Sign up works
- [ ] Login works
- [ ] Logout works
- [ ] Wrong password rejected
- [ ] Already-used email rejected
- [ ] Session persists
- [ ] Check Firebase Console sees users

### Security
- [ ] Only own tasks visible
- [ ] Different users see different tasks
- [ ] No access to other users' tasks
- [ ] Check Firestore rules are in place

### Performance
- [ ] Page loads in < 2 seconds
- [ ] Tasks add/delete quickly
- [ ] No lag when typing
- [ ] Works on slow internet

---

## Phase 6: Documentation ✅

### Verify Documentation Files
- [ ] README.md - Complete and informative
- [ ] FIREBASE_SETUP.md - Detailed instructions
- [ ] GITHUB_SETUP.md - Deployment guide
- [ ] QUICK_START.md - Fast setup guide
- [ ] PROJECT_SUMMARY.md - Overview
- [ ] SETUP_CHECKLIST.md - This file
- [ ] All files have clear sections
- [ ] Code examples are provided
- [ ] Troubleshooting included

### GitHub Repository Quality
- [ ] All required files present
- [ ] Code is readable and commented
- [ ] Git history clean and logical
- [ ] No sensitive data exposed
- [ ] .gitignore file present
- [ ] Repository is private
- [ ] README is visible on main page

---

## Phase 7: Project Report Preparation ✅

### Report Requirements
- [ ] Report is 5-7 pages long
- [ ] Includes 3+ screenshots of working app
- [ ] Documents cloud services used:
  - [ ] Firebase Authentication
  - [ ] Firestore Database
  - [ ] GitHub Pages
- [ ] Explains why each service was used
- [ ] Documents security implementation
- [ ] Lists all features implemented
- [ ] Describes problems faced
- [ ] Explains solutions to problems
- [ ] Reflects on learning outcomes
- [ ] Properly formatted and professional

### Report Content Checklist
- [ ] Introduction to cloud computing
- [ ] Project overview and goals
- [ ] Architecture diagram
- [ ] Services and technologies used
- [ ] Feature list (required and bonus)
- [ ] Security rules explanation
- [ ] Screenshots of:
  - [ ] Sign up screen
  - [ ] Login screen
  - [ ] Task list screen
  - [ ] Task management in action
  - [ ] Mobile responsiveness
- [ ] Testing documentation
- [ ] Problems and solutions
- [ ] Learning outcomes
- [ ] Conclusion
- [ ] References

---

## Phase 8: Final Submission ✅

### Prepare Submission Materials
- [ ] GitHub repository link ready
- [ ] GitHub Pages URL ready
- [ ] Project report (PDF or Word) completed
- [ ] Screenshots saved and included
- [ ] All documentation reviewed

### Submission Checklist
- [ ] GitHub repository is accessible
- [ ] Repository is private
- [ ] All code files present
- [ ] README is clear and complete
- [ ] Website is live and working
- [ ] Authentication works
- [ ] Tasks save and persist
- [ ] Security rules implemented
- [ ] Report is complete
- [ ] Report includes screenshots
- [ ] No sensitive data exposed

### Before Final Submission
- [ ] Test everything one more time
- [ ] Check all links work
- [ ] Verify GitHub Pages URL is correct
- [ ] Confirm Firebase is working
- [ ] Review report for typos
- [ ] Gather all required documents
- [ ] Double-check grading requirements met

---

## Troubleshooting During Setup

### If Something Goes Wrong

#### Firebase Issues
- [ ] Check Firebase config values are exact
- [ ] Verify all 6 config values present
- [ ] Confirm firebaseConfig syntax is correct
- [ ] Check for typos in credentials

#### GitHub Issues
- [ ] Verify repository URL is correct
- [ ] Check internet connection
- [ ] Wait longer for GitHub Pages (can take 5 minutes)
- [ ] Clear browser cache
- [ ] Check repository settings

#### Authentication Issues
- [ ] Check email format is valid
- [ ] Password must be 6+ characters
- [ ] Confirm Email/Password auth is enabled
- [ ] Check Firebase project is correct

#### Database Issues
- [ ] Verify Firestore database exists
- [ ] Check security rules are published
- [ ] Confirm database in Test Mode or rules allow access
- [ ] Check userId field is being stored

---

## Success Indicators ✅

You'll know everything is working when:

1. ✅ You can sign up and log in
2. ✅ You can add tasks
3. ✅ Tasks appear in your list
4. ✅ Tasks persist after refresh
5. ✅ You can delete tasks
6. ✅ Different users see different tasks
7. ✅ Website is live on GitHub Pages
8. ✅ No errors in browser console
9. ✅ All documentation is complete
10. ✅ Report is ready for submission

---

## Grading Rubric Alignment

| Requirement | Status | Verified |
|-------------|--------|----------|
| Website Works | [ ] Complete | [ ] |
| Cloud Database | [ ] Complete | [ ] |
| Login System | [ ] Complete | [ ] |
| Security Rules | [ ] Complete | [ ] |
| Report | [ ] Complete | [ ] |

---

## Final Sign-Off

When everything is done:

- [ ] All checklist items completed
- [ ] All tests passing
- [ ] All documentation ready
- [ ] Project ready for submission

**Status**: Ready for grading! 🎉

---

## Quick Links

- [Firebase Console](https://console.firebase.google.com/)
- [GitHub Repository](https://github.com/)
- [This Project Folder](.)
- GitHub Pages URL: _________________ (fill in after deployment)

## Notes

Use this space for any notes or issues you encountered:

```
_______________________________________________
_______________________________________________
_______________________________________________
_______________________________________________
_______________________________________________
```

---

**Last Updated**: January 2026
**Course**: Cloud Computing 403241
**Project**: Cloud To-Do List Application
