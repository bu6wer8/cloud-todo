# Cloud To-Do List Application

A cloud-based to-do list application built for the Cloud Computing Course 403241 final project. This application demonstrates core cloud computing concepts including authentication, cloud storage, and cloud security.

## Project Overview

This is a simple yet functional web application that:
- Allows users to create accounts and authenticate via Firebase
- Stores tasks in a cloud database (Firestore)
- Ensures data privacy with security rules
- Runs entirely on cloud services (GitHub Pages + Firebase)
- Requires no server setup or payment

## Technologies Used

### Frontend
- **HTML5**: Page structure
- **CSS3**: Responsive styling with gradients and animations
- **JavaScript (ES6+)**: Application logic and interactivity

### Cloud Services (Free Tier)
- **Firebase Authentication**: User signup and login
- **Firestore Database**: Cloud storage for tasks
- **GitHub Pages**: Website hosting
- **GitHub**: Version control and code repository

## Features Implemented

### Core Features (Required)
✅ User Registration (Signup)
✅ User Login
✅ Add Tasks
✅ Display Task List
✅ Delete Tasks
✅ Cloud Storage (Firestore)
✅ User Authentication (Firebase Auth)
✅ Security Rules (Firestore Rules)

### Extra Features (Bonus)
✅ Task Priority Levels (Low, Medium, High)
✅ Logout Button
✅ Responsive Design
✅ Task Completion Checkbox
✅ Error Handling & User Feedback
✅ Real-time Task Updates

## Project Structure

```
cloud-todo/
├── index.html           # Main HTML file
├── style.css            # Styling and responsive design
├── script.js            # JavaScript application logic
├── README.md            # Project documentation
├── .gitignore           # Git ignore rules
└── FIREBASE_SETUP.md    # Firebase configuration guide
```

## Setup Instructions

### 1. Firebase Configuration

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable Authentication (Email/Password)
4. Create a Firestore Database
5. Copy your Firebase configuration
6. Update `script.js` with your configuration:

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

### 2. Firestore Security Rules

Set these rules in Firestore to ensure users can only access their own tasks:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Only allow authenticated users
    match /tasks/{taskId} {
      allow read, write: if request.auth.uid == resource.data.userId;
      allow create: if request.auth.uid != null;
    }
  }
}
```

### 3. GitHub Repository Setup

1. Create a new private repository on GitHub
2. Clone the repository
3. Add project files
4. Push to GitHub:

```bash
git add .
git commit -m "Initial commit: Cloud To-Do List application"
git push origin main
```

### 4. Enable GitHub Pages

1. Go to repository Settings
2. Scroll to "Pages" section
3. Select "main" branch as source
4. Your site will be published at: `https://yourusername.github.io/cloud-todo`

## Usage

### For Users

1. **Sign Up**: Create a new account with email and password
2. **Login**: Enter credentials to access your tasks
3. **Add Task**: Type task description, select priority, click "Add Task"
4. **Mark Complete**: Check the checkbox to mark task as done
5. **Delete Task**: Click "Delete" to remove a task
6. **Logout**: Click "Logout" to exit

### For Testing

Test scenarios to verify functionality:

- ✅ Register a new user
- ✅ Login with correct credentials
- ✅ Attempt login with wrong password
- ✅ Add multiple tasks with different priorities
- ✅ Mark tasks as complete
- ✅ Delete tasks
- ✅ Refresh page (tasks persist)
- ✅ Login as different users (see different tasks)
- ✅ Logout and login again (tasks still accessible)

## Cloud Computing Concepts Demonstrated

### 1. Cloud Computing Basics
- Application runs on the internet (GitHub Pages)
- No server to maintain locally
- Automatic scaling through cloud providers

### 2. Cloud Storage
- Data stored in Firestore (NoSQL database)
- Data persists across sessions
- Accessible from any device with internet

### 3. Authentication
- Secure user login system
- Password hashing by Firebase
- Session management

### 4. Security
- Firestore Security Rules enforce access control
- Users can only access their own data
- Authentication required for all database operations

### 5. Infrastructure as a Service (IaaS)
- Firebase provides backend infrastructure
- GitHub Pages provides web hosting
- No need for personal servers

## Key Learnings

1. **Cloud Deployment**: Understanding how web apps run on cloud platforms
2. **Authentication**: Implementing secure user authentication
3. **Database**: Using cloud databases for data persistence
4. **Security Rules**: Enforcing data privacy and access control
5. **Version Control**: Using Git and GitHub for code management
6. **Frontend Development**: Building responsive web interfaces

## Grading Rubric

| Component | Marks |
|-----------|-------|
| Website Functionality | 30% |
| Cloud Database | 20% |
| Login System | 20% |
| Security Rules | 10% |
| Report | 20% |
| **Total** | **100%** |

## Troubleshooting

### Firebase Configuration Issues
- Ensure firebaseConfig values are correct
- Check browser console for specific error messages
- Verify Firebase SDK versions are compatible

### Authentication Problems
- Confirm email/password authentication is enabled in Firebase
- Check email format validity
- Verify password meets requirements (6+ characters)

### Database Issues
- Confirm Firestore database is created and in Test Mode initially
- Check security rules allow operations
- Verify userId is correctly stored in Firebase

### Deployment Issues
- Ensure repository is public or settings allow Pages
- Check branch selection in Pages settings
- Clear browser cache if changes don't appear

## Browser Compatibility

Tested and working on:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Performance Considerations

- Minimal CSS and JavaScript (lightweight)
- Efficient database queries
- Real-time updates using Firestore listeners
- Responsive images and assets

## Future Enhancements

Potential features to extend the project:
- Task due dates and reminders
- Task categories/tags
- Sharing tasks with other users
- Task filtering and search
- Dark mode theme
- Mobile app version
- Offline functionality with service workers

## Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [GitHub Pages Guide](https://docs.github.com/en/pages)
- [MDN Web Docs](https://developer.mozilla.org/)
- [W3Schools](https://www.w3schools.com/)

## License

This project is created for educational purposes as part of Cloud Computing Course 403241.

## Contact & Support

For issues or questions about this project, refer to the course materials or contact your instructor.

---

**Project Created**: 2026
**Last Updated**: January 2026
**Course**: Cloud Computing 403241
