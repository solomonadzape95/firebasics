import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import {
  getFirestore,
  collection,
  onSnapshot,
  addDoc,
  query,
  orderBy,
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";
import {
  getAuth,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBBDhAEi0IHFqdfcwb19ghBmHsNZKr5zRk",
  authDomain: "basics-69215.firebaseapp.com",
  projectId: "basics-69215",
  storageBucket: "basics-69215.firebasestorage.app",
  messagingSenderId: "29594122528",
  appId: "1:29594122528:web:081eac9bf7246f6c39ff45",
  measurementId: "G-VKGKSDQ398",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// DOM Elements
const isSignedIn = document.getElementById("signedIn");
const isSignedOut = document.getElementById("signedOut");
const inBtn = document.getElementById("signinbtn");
const outBtn = document.getElementById("signoutbtn");
const userDetails = document.getElementById("userdetails");
const addRecord = document.getElementById("addRecord");
const recordInput = document.getElementById("record-input");
const routeInput = document.getElementById("route-input"); // Ensure this points to the correct input element
const list = document.getElementById("rec_list");

// Authentication
const provider = new GoogleAuthProvider();

inBtn.onclick = () =>
  signInWithPopup(auth, provider)
    .then((result) => console.log("User Signed In", result.user))
    .catch((err) => console.error("Sign in failed", err.message));

outBtn.onclick = () =>
  signOut(auth)
    .then(() => console.log("User Signed Out"))
    .catch((err) => console.error("Sign Out failed", err.message));

// Real-Time Authentication State Listener
onAuthStateChanged(auth, (user) => {
  if (user) {
    isSignedIn.hidden = false;
    isSignedOut.hidden = true;
    userDetails.textContent = `Hello ${user.displayName}, Your ID is ${user.uid}`;
  } else {
    isSignedIn.hidden = true;
    isSignedOut.hidden = false;
    userDetails.textContent = "";
  }
});

// Firestore Collection Reference
const stuffRef = collection(db, "stuff");

// Add Record to Firestore
addRecord.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = recordInput.value.trim();
  const weight = routeInput.value.trim();

  if (name && weight) {
    try {
      await addDoc(stuffRef, {
        name: name,
        weight: parseFloat(weight), // Ensure weight is stored as a number
        createdAt: new Date(), // Use Firestore timestamp
      });
      recordInput.value = "";
      routeInput.value = "";
      console.log("Record added successfully!");
    } catch (err) {
      console.error("Error adding record:", err.message);
    }
  } else {
    console.warn("Both name and weight are required!");
  }
});

// Real-Time Listener for Firestore Collection
const stuffQuery = query(stuffRef, orderBy("createdAt", "desc")); // Sort by createdAt descending
onSnapshot(stuffQuery, (snapshot) => {
  list.innerHTML = ""; // Clear the list
  snapshot.forEach((doc) => {
    const record = doc.data();
    const listItem = document.createElement("li");
    listItem.textContent = `${record.name} - ${record.weight}kg`;
    list.appendChild(listItem);
  });
});
