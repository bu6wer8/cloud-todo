// 1. Import necessary functions from Firebase SDKs
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from "firebase/auth";
import { 
  getFirestore, 
  collection, 
  addDoc, 
  deleteDoc, 
  doc, 
  onSnapshot, 
  query, 
  where, 
  serverTimestamp, 
  orderBy
} from "firebase/firestore";

// 2. Your Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyD7pR7ykSpXa6ZyOFkz9NdPR-WiBYYpEVc",
  authDomain: "todo-8d14e.firebaseapp.com",
  projectId: "todo-8d14e",
  storageBucket: "todo-8d14e.firebasestorage.app",
  messagingSenderId: "948389169998",
  appId: "1:948389169998:web:658780188a907120952c1f",
  measurementId: "G-VT81EK9MCV"
};

// 3. Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

// Global variable to manage the listener
let unsubscribeTasks; 

// ----------------------------------------------------------------
// 4. Central Auth Listener (Handles Login, Refresh, and Logout UI)
// ----------------------------------------------------------------
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in
        document.getElementById("auth-section").style.display = "none";
        document.getElementById("todo-section").style.display = "block";
        loadTasks(user); // Load data safely
    } else {
        // User is signed out
        document.getElementById("auth-section").style.display = "block";
        document.getElementById("todo-section").style.display = "none";
        
        // Stop listening to database updates to avoid memory leaks
        if (unsubscribeTasks) unsubscribeTasks(); 
    }
});

// ----------------------------------------------------------------
// 5. App Functions
// ----------------------------------------------------------------

// Register User
window.register = async function() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Registration successful! You are now logged in.");
    } catch (error) {
        alert(error.message);
    }
}

// Login User
window.login = async function() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        await signInWithEmailAndPassword(auth, email, password);
        // No need to touch UI here, onAuthStateChanged handles it
    } catch (error) {
        alert(error.message);
    }
}

// Logout User
window.logout = async function() {
    try {
        await signOut(auth);
    } catch (error) {
        console.error("Error signing out:", error);
    }
}

// Add Task
window.addTask = async function() {
    const user = auth.currentUser;
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value;

    if (!user || !taskText.trim()) return; 

    try {
        // Updated syntax: addDoc + collection reference
        await addDoc(collection(db, "tasks"), {
            text: taskText,
            uid: user.uid,
            createdAt: serverTimestamp()
        });
        taskInput.value = ""; // Clear input
    } catch (error) {
        console.error("Error adding task:", error);
    }
}

// Load Tasks (Real-time)
function loadTasks(user) {
    const tasksRef = collection(db, "tasks");
    
    // Query: Filter by UID and sort by time
    // Note: You may need to create a Composite Index in Firebase Console for this specific query
    const q = query(
        tasksRef, 
        where("uid", "==", user.uid),
        orderBy("createdAt", "asc") 
    );

    // Updated syntax: onSnapshot returns the unsubscribe function
    unsubscribeTasks = onSnapshot(q, (snapshot) => {
        const list = document.getElementById("taskList");
        list.innerHTML = "";

        snapshot.forEach((docSnap) => {
            const data = docSnap.data();
            const li = document.createElement("li");
            li.textContent = data.text;

            const btn = document.createElement("button");
            btn.textContent = "Delete";
            // Updated syntax: deleteDoc + doc reference
            btn.onclick = () => deleteDoc(doc(db, "tasks", docSnap.id));

            li.appendChild(btn);
            list.appendChild(li);
        });
    });
}
