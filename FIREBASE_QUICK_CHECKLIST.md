# ✅ Firebase Setup Checklist - Quick Version

Use this if you want a super quick checklist without all the details.

---

## 🎯 DO THESE IN ORDER

### ✅ STEP 1: Create Firebase Project (2 min)
- [ ] Go to https://console.firebase.google.com/
- [ ] Click "Add project"
- [ ] Name it: `cloud-todo`
- [ ] Click "Create project"
- [ ] Wait for blue "Go to console" button
- [ ] Click it

### ✅ STEP 2: Enable Email/Password Auth (2 min)
- [ ] Click "Authentication" (left sidebar)
- [ ] Click "Get Started"
- [ ] Click "Email/Password"
- [ ] Toggle ON (turn blue)
- [ ] Click "Save"

### ✅ STEP 3: Create Firestore Database (3 min)
- [ ] Click "Firestore Database" (left sidebar)
- [ ] Click "Create Database"
- [ ] Select "Test Mode"
- [ ] Choose location (any is fine)
- [ ] Click "Create"
- [ ] Wait 1-2 minutes

### ✅ STEP 4: Get Firebase Config (2 min)
- [ ] Click ⚙️ gear icon (top-left)
- [ ] Click "Project Settings"
- [ ] Scroll to "Your apps"
- [ ] Look for code block starting with `const firebaseConfig = {`
- [ ] Copy the ENTIRE block (all 6 values)

**Your config should have these 6 values:**
```
apiKey: "AIzaSy..."
authDomain: "cloud-todo-xxx.firebaseapp.com"
projectId: "cloud-todo-xxx"
storageBucket: "cloud-todo-xxx.appspot.com"
messagingSenderId: "123456789"
appId: "1:123:web:abc123"
```

### ✅ STEP 5: Add Config to Code (2 min)
- [ ] Open: `D:\Desktop\cloud-todo\script.js`
- [ ] Find lines 8-15 (at top, says "FIREBASE CONFIGURATION")
- [ ] Replace the placeholder text with your config from Step 4
- [ ] Save file (Ctrl+S)

**It should look like:**
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyDxxxxxxxxxxxxxx",
  authDomain: "cloud-todo-xxxxx.firebaseapp.com",
  projectId: "cloud-todo-xxxxx",
  storageBucket: "cloud-todo-xxxxx.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdef"
};
```

### ✅ STEP 6: Add Security Rules (2 min)
- [ ] In Firebase, go to Firestore Database
- [ ] Click "Rules" tab
- [ ] Delete ALL existing text
- [ ] Paste this exactly:

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

- [ ] Click "Publish"
- [ ] Click "Publish" again to confirm
- [ ] Wait for green checkmark ✓

### ✅ STEP 7: Test in Browser (5 min)
- [ ] Open file: `D:\Desktop\cloud-todo\index.html`
- [ ] Drag it into browser OR right-click → Open with → Browser
- [ ] Click "Sign Up" tab
- [ ] Enter:
  - Email: `test@example.com`
  - Password: `Test12345`
  - Confirm: `Test12345`
- [ ] Click "Sign Up"

**You should see: "My Tasks" page with your email**

If you see error: Press F12 → Console → Look at red errors

### ✅ STEP 8: Add a Task (1 min)
- [ ] Type: `Buy milk`
- [ ] Leave priority as "Medium"
- [ ] Click "Add Task"
- [ ] ✅ Task appears in list

### ✅ STEP 9: Refresh Page (1 min)
- [ ] Press F5 to refresh
- [ ] Login if needed with `test@example.com` / `Test12345`
- [ ] ✅ Task should STILL be there!

**If task is gone = Database not working**

### ✅ STEP 10: Verify in Firebase (1 min)
- [ ] Go to Firebase Console
- [ ] Go to Firestore Database
- [ ] Click on "tasks" collection
- [ ] ✅ You should see your task data there!

---

## 🚨 IF SOMETHING IS WRONG

| Problem | Solution |
|---------|----------|
| Nothing happens on Sign Up | Press F12, look at Console for red errors |
| Error: "Firebase is not defined" | Config not added correctly to script.js |
| Error: "auth/operation-not-allowed" | Go to Firebase → Auth → Email/Password not enabled |
| Error: "Permission denied" | Security rules not published in Firestore |
| Tasks don't save | Firestore database not created |
| Tasks appear but then disappear on refresh | Check Firestore → Rules are they published? |

---

## ✨ IF ALL 10 STEPS WORK

You're done with Firebase! Now:

1. Go to GitHub repository
2. Settings → Pages
3. Select "main" branch
4. Wait 2-3 minutes
5. Visit: `https://bu6wer8.github.io/cloud-todo/`
6. Test your live app!

---

## 📋 FINAL CHECKLIST

- [ ] Firebase project created
- [ ] Email/Password Auth enabled
- [ ] Firestore Database created
- [ ] Security Rules published
- [ ] script.js has REAL Firebase config (not placeholder)
- [ ] index.html opens without errors
- [ ] Can sign up successfully
- [ ] Can add tasks
- [ ] Tasks appear in Firebase Console
- [ ] Tasks persist after refresh

**Check all 10? YOU'RE DONE! 🎉**

---

**READ:** `FIREBASE_SETUP_VISUAL.md` if you get stuck on any step.
