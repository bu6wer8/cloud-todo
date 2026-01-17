# Firebase Configuration Guide

Complete step-by-step guide to set up Firebase for the Cloud To-Do List application.

## Prerequisites
- Google account (for Firebase Console access)
- Web browser
- Basic understanding of cloud services

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click on **"Add project"** or **"Create project"**
3. Enter project name: `cloud-todo` (or any name you prefer)
4. Select options:
   - Enable Google Analytics (optional)
5. Click **"Create project"**
6. Wait for project creation to complete

## Step 2: Register Your Web App

1. In Firebase Console, look for the section: **"Get started by adding Firebase to your app"**
2. Click the **Web** icon (looks like `</>`))
3. Enter app nickname: `cloud-todo-web`
4. Click **"Register app"**
5. You'll see a `firebaseConfig` object with your credentials
6. **Copy all the configuration values**

## Step 3: Set Up Authentication

### Enable Email/Password Authentication

1. In Firebase Console sidebar, click **"Authentication"**
2. Click **"Get Started"**
3. Look for **"Email/Password"** sign-in method
4. Click on it
5. Toggle **"Enable"** to ON
6. Click **"Save"**

### Verify Configuration
- Status should show "Enabled" next to Email/Password
- No configuration needed for basic setup

## Step 4: Create Firestore Database

### Create Database

1. In Firebase Console sidebar, click **"Firestore Database"**
2. Click **"Create database"** or **"+ Create database"**
3. Choose location (closest to your region recommended):
   - Select region from dropdown
4. Start in **"Test mode"**
   - Choose "Start in test mode" option
5. Click **"Create"**

### Wait for Initialization
- Firestore will initialize (takes 1-2 minutes)
- Once ready, you'll see the database dashboard

## Step 5: Configure Security Rules

### Why Security Rules Matter
- Protect user data privacy
- Ensure users can only access their own tasks
- Prevent unauthorized database access

### Add Security Rules

1. In Firestore Database page, click **"Rules"** tab
2. Replace all content with:

```firestore
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Rule 1: Users can only read/write their own tasks
    match /tasks/{taskId} {
      allow read, write: if request.auth.uid == resource.data.userId;
      allow create: if request.auth.uid != null;
    }
  }
}
```

3. Click **"Publish"**
4. Confirm the changes

### Understanding the Rules
- **read, write**: User can access a task only if their UID matches the task's userId
- **create**: Any authenticated user can create new tasks
- **request.auth.uid**: Current user's unique ID from Firebase Auth

## Step 6: Add Firebase Configuration to Your App

### Get Your Configuration

1. Go to **Project Settings** (gear icon top-left)
2. Go to **"Your apps"** section
3. Find your web app
4. Click the icon to copy the Firebase config

### Update script.js

1. Open `script.js` in your code editor
2. Find the section marked `// FIREBASE CONFIGURATION`
3. Replace the placeholder values:

```javascript
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",           // Paste here
    authDomain: "YOUR_AUTH_DOMAIN",   // Paste here
    projectId: "YOUR_PROJECT_ID",     // Paste here
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"              // Paste here
};
```

4. Save the file

## Step 7: Test Firebase Connection

### Test Authentication
1. Open `index.html` in your browser
2. Try to sign up with an email and password
3. Check Firebase Console → Authentication → Users
4. Your user should appear in the list

### Test Firestore
1. Add a task in the web app
2. Go to Firebase Console → Firestore Database
3. Click on the **"tasks"** collection
4. You should see your task document

### Verify Data Structure
Each task document should contain:
```
- text: "Your task description"
- priority: "medium" (or low/high)
- completed: false
- userId: "user_uid_here"
- createdAt: timestamp
- updatedAt: timestamp
```

## Step 8: Verify Security Rules Work

### Test User Privacy

1. **Sign up as User 1**
   - Create account with: test1@example.com
   - Add a task

2. **Logout and Sign up as User 2**
   - Create account with: test2@example.com
   - Login

3. **Verify Isolation**
   - User 2 should see "No tasks yet"
   - User 1's tasks should NOT be visible
   - This confirms security rules are working

4. **Check Firestore**
   - Both users' tasks exist in database
   - But each can only access their own

## Troubleshooting

### Authentication Not Working
**Problem**: Sign up returns error
- Check if Email/Password is enabled in Authentication
- Verify email format is valid
- Ensure password is at least 6 characters

**Solution**:
```
Firebase Console → Authentication → Sign-in method
→ Email/Password → Verify "Enabled" status
```

### Firestore Not Storing Data
**Problem**: Tasks aren't being saved
- Check if Firestore database exists
- Verify security rules allow write operations

**Solution**:
1. Go to Firestore Database
2. Check if database is created (not empty)
3. Verify rules are published

### "Permission Denied" Error
**Problem**: Getting permission errors when adding tasks

**Likely Causes**:
- Security rules not properly configured
- User not authenticated
- userId not being stored in tasks

**Solution**:
1. Verify security rules are published
2. Check browser console for specific errors
3. Ensure user is logged in before adding tasks

### Configuration Not Loading
**Problem**: Firebase functions not working
- Verify all config values are correct
- Check browser console for errors
- Ensure Firebase SDKs are loaded

**Solution**:
1. Double-check firebaseConfig values
2. Verify URLs in HTML script tags
3. Check browser developer tools → Console tab

## Advanced: Understanding Firestore Security Rules

### Rule Components

```firestore
match /tasks/{taskId} {
  allow read, write: if request.auth.uid == resource.data.userId;
}
```

- **match /tasks/{taskId}**: Path to database collection
- **{taskId}**: Variable representing document ID
- **allow read, write**: Operations allowed
- **if**: Condition that must be true
- **request.auth.uid**: Currently logged-in user's ID
- **resource.data.userId**: Task owner's user ID

### Testing Rules Behavior

Use Firestore Console to test:
1. Click "Rules" tab
2. Click "Simulation" mode
3. Test different scenarios:
   - Authenticated user reading own data ✅ (ALLOW)
   - Authenticated user reading others' data ❌ (DENY)

## Security Best Practices

1. **Always Authenticate Before Operations**
   - Never assume user is logged in
   - Verify `auth.currentUser` exists

2. **Validate on Client and Server**
   - Client-side validation: User experience
   - Server-side rules: Data protection

3. **Minimize Data Exposure**
   - Only request what you need
   - Use security rules to limit access

4. **Monitor Firestore Usage**
   - Check Firebase Console for suspicious activity
   - Monitor read/write operations

## Moving from Test Mode to Production

When you're ready for production:

1. **Update Security Rules**
   - Remove "allow read, write" for everyone
   - Implement specific access controls

2. **Set Up Billing**
   - Firebase has free tier limits
   - Enable billing for increased capacity

3. **Enable Additional Features**
   - Backup and restore
   - Advanced monitoring

## Useful Firebase Console Features

### Monitor Usage
- Analytics Dashboard: See user metrics
- Firestore Usage: Check read/write operations
- Performance: Monitor app speed

### Debug Issues
- Logs: View error messages
- Debug View: Real-time event tracking
- Rules Simulator: Test security rules

## Common Configuration Values

| Field | Example | Where to Find |
|-------|---------|---------------|
| apiKey | AIzaSyD... | Project Settings |
| authDomain | project.firebaseapp.com | Project Settings |
| projectId | cloud-todo-12345 | Project Settings |
| storageBucket | project.appspot.com | Project Settings |
| messagingSenderId | 123456789 | Project Settings |
| appId | 1:123:web:abc... | Project Settings |

## Resources

- [Firebase Authentication Docs](https://firebase.google.com/docs/auth)
- [Firestore Security Rules](https://firebase.google.com/docs/firestore/security/get-started)
- [Firestore Web Setup](https://firebase.google.com/docs/firestore/quickstart)
- [Firebase Pricing](https://firebase.google.com/pricing)

## Next Steps

1. ✅ Configure Firebase
2. ✅ Set up Authentication
3. ✅ Create Firestore database
4. ✅ Add security rules
5. Update `script.js` with your config
6. Test the application
7. Deploy to GitHub Pages
8. Create project report

---

**Need Help?**
- Check browser console (F12) for error messages
- Review Firebase documentation
- Check project-specific error logs in Firebase Console
