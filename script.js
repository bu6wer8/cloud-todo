const firebaseConfig = {
  apiKey: "AIzaSyD7pR7ykSpXa6ZyOFkz9NdPR-WiBYYpEVc",
  authDomain: "todo-8d14e.firebaseapp.com",
  projectId: "todo-8d14e",
  storageBucket: "todo-8d14e.firebasestorage.app",
  messagingSenderId: "948389169998",
  appId: "1:948389169998:web:658780188a907120952c1f",
  measurementId: "G-VT81EK9MCV"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

const authSection = document.getElementById('authSection');
const appSection = document.getElementById('appSection');

const loginTab = document.getElementById('loginTab');
const signupTab = document.getElementById('signupTab');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');

const loginEmail = document.getElementById('loginEmail');
const loginPassword = document.getElementById('loginPassword');
const loginBtn = document.getElementById('loginBtn');
const loginError = document.getElementById('loginError');

const signupEmail = document.getElementById('signupEmail');
const signupPassword = document.getElementById('signupPassword');
const signupConfirm = document.getElementById('signupConfirm');
const signupBtn = document.getElementById('signupBtn');
const signupError = document.getElementById('signupError');

const userEmail = document.getElementById('userEmail');
const logoutBtn = document.getElementById('logoutBtn');
const taskInput = document.getElementById('taskInput');
const prioritySelect = document.getElementById('prioritySelect');
const addTaskBtn = document.getElementById('addTaskBtn');
const tasksList = document.getElementById('tasksList');
const taskError = document.getElementById('taskError');
const taskSuccess = document.getElementById('taskSuccess');

loginTab.addEventListener('click', () => {
    loginTab.classList.add('active');
    signupTab.classList.remove('active');
    loginForm.classList.add('active');
    signupForm.classList.remove('active');
    clearAuthMessages();
});

signupTab.addEventListener('click', () => {
    signupTab.classList.add('active');
    loginTab.classList.remove('active');
    signupForm.classList.add('active');
    loginForm.classList.remove('active');
    clearAuthMessages();
});

// Login
loginBtn.addEventListener('click', async () => {
    const email = loginEmail.value.trim();
    const password = loginPassword.value.trim();

    if (!email || !password) {
        showLoginError('Please fill in all fields');
        return;
    }

    try {
        loginBtn.disabled = true;
        loginBtn.textContent = 'Logging in...';

        await auth.signInWithEmailAndPassword(email, password);
        clearAuthMessages();
    } catch (error) {
        showLoginError(getErrorMessage(error));
    } finally {
        loginBtn.disabled = false;
        loginBtn.textContent = 'Login';
    }
});

// Signup
signupBtn.addEventListener('click', async () => {
    const email = signupEmail.value.trim();
    const password = signupPassword.value.trim();
    const confirm = signupConfirm.value.trim();

    if (!email || !password || !confirm) {
        showSignupError('Please fill in all fields');
        return;
    }

    if (password !== confirm) {
        showSignupError('Passwords do not match');
        return;
    }

    if (password.length < 6) {
        showSignupError('Password must be at least 6 characters');
        return;
    }

    try {
        signupBtn.disabled = true;
        signupBtn.textContent = 'Creating account...';

        await auth.createUserWithEmailAndPassword(email, password);
        clearAuthMessages();
    } catch (error) {
        showSignupError(getErrorMessage(error));
    } finally {
        signupBtn.disabled = false;
        signupBtn.textContent = 'Sign Up';
    }
});

logoutBtn.addEventListener('click', async () => {
    try {
        await auth.signOut();
    } catch (error) {
        console.error('Logout error:', error);
    }
});

addTaskBtn.addEventListener('click', async () => {
    const taskText = taskInput.value.trim();
    const priority = prioritySelect.value;

    if (!taskText) {
        showTaskError('Please enter a task');
        return;
    }

    try {
        addTaskBtn.disabled = true;
        addTaskBtn.textContent = 'Adding...';
        clearTaskMessages();

        const user = auth.currentUser;
        if (!user) {
            showTaskError('User not authenticated');
            return;
        }

        await db.collection('tasks').add({
            text: taskText,
            priority: priority,
            completed: false,
            userId: user.uid,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });

        taskInput.value = '';
        prioritySelect.value = 'medium';
        showTaskSuccess('Task added successfully!');
        loadTasks();
    } catch (error) {
        showTaskError('Error adding task: ' + error.message);
    } finally {
        addTaskBtn.disabled = false;
        addTaskBtn.textContent = 'Add Task';
    }
});

auth.onAuthStateChanged(async (user) => {
    if (user) {
        authSection.classList.add('hidden');
        appSection.classList.remove('hidden');
        userEmail.textContent = user.email;
        loadTasks();
    } else {
        authSection.classList.remove('hidden');
        appSection.classList.add('hidden');
        tasksList.innerHTML = '<p class="empty-state">No tasks yet. Add one to get started!</p>';
        clearAuthForms();
    }
});

async function loadTasks() {
    try {
        const user = auth.currentUser;
        if (!user) return;

        const snapshot = await db.collection('tasks')
            .where('userId', '==', user.uid)
            .orderBy('createdAt', 'desc')
            .get();

        if (snapshot.empty) {
            tasksList.innerHTML = '<p class="empty-state">No tasks yet. Add one to get started!</p>';
            return;
        }

        tasksList.innerHTML = '';
        snapshot.forEach((doc) => {
            const task = doc.data();
            const taskElement = createTaskElement(doc.id, task);
            tasksList.appendChild(taskElement);
        });
    } catch (error) {
        console.error('Error loading tasks:', error);
        showTaskError('Error loading tasks');
    }
}

function createTaskElement(taskId, task) {
    const taskItem = document.createElement('div');
    taskItem.className = 'task-item' + (task.completed ? ' completed' : '');
    taskItem.dataset.taskId = taskId;

    const taskContent = document.createElement('div');
    taskContent.className = 'task-content';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'task-checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', () => toggleTaskComplete(taskId, !task.completed));

    const taskText = document.createElement('span');
    taskText.className = 'task-text';
    taskText.textContent = task.text;

    taskContent.appendChild(checkbox);
    taskContent.appendChild(taskText);

    const taskPriority = document.createElement('span');
    taskPriority.className = 'task-priority ' + task.priority;
    taskPriority.textContent = task.priority.charAt(0).toUpperCase() + task.priority.slice(1);

    const taskActions = document.createElement('div');
    taskActions.className = 'task-actions';

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn btn-danger';
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => deleteTask(taskId));

    taskActions.appendChild(deleteBtn);

    taskItem.appendChild(taskContent);
    taskItem.appendChild(taskPriority);
    taskItem.appendChild(taskActions);

    return taskItem;
}

async function toggleTaskComplete(taskId, completed) {
    try {
        await db.collection('tasks').doc(taskId).update({
            completed: completed,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        loadTasks();
    } catch (error) {
        console.error('Error updating task:', error);
        showTaskError('Error updating task');
    }
}

async function deleteTask(taskId) {
    if (!confirm('Are you sure you want to delete this task?')) return;

    try {
        await db.collection('tasks').doc(taskId).delete();
        showTaskSuccess('Task deleted successfully!');
        loadTasks();
    } catch (error) {
        console.error('Error deleting task:', error);
        showTaskError('Error deleting task');
    }
}

function showLoginError(message) {
    loginError.textContent = message;
    loginError.classList.add('show');
}

function showSignupError(message) {
    signupError.textContent = message;
    signupError.classList.add('show');
}

function showTaskError(message) {
    taskError.textContent = message;
    taskError.classList.add('show');
    setTimeout(() => taskError.classList.remove('show'), 4000);
}

function showTaskSuccess(message) {
    taskSuccess.textContent = message;
    taskSuccess.classList.add('show');
    setTimeout(() => taskSuccess.classList.remove('show'), 4000);
}

function clearAuthMessages() {
    loginError.classList.remove('show');
    signupError.classList.remove('show');
}

function clearTaskMessages() {
    taskError.classList.remove('show');
    taskSuccess.classList.remove('show');
}

function clearAuthForms() {
    loginEmail.value = '';
    loginPassword.value = '';
    signupEmail.value = '';
    signupPassword.value = '';
    signupConfirm.value = '';
}

function getErrorMessage(error) {
    const errorCode = error.code;
    const errorMessage = error.message;

    switch (errorCode) {
        case 'auth/email-already-in-use':
            return 'Email is already in use';
        case 'auth/invalid-email':
            return 'Invalid email address';
        case 'auth/weak-password':
            return 'Password is too weak (minimum 6 characters)';
        case 'auth/user-not-found':
            return 'User not found';
        case 'auth/wrong-password':
            return 'Wrong password';
        case 'auth/operation-not-allowed':
            return 'Email/Password authentication is not enabled';
        default:
            return errorMessage;
    }
}
