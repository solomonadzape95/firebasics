# Firebase Firestore & Authentication Demo

This is a simple project that demonstrates Firebase Authentication and Firestore database integration. Users can sign in using Google Authentication, add records to a Firestore collection, and view real-time updates on the page.

Features
Google Sign-In for user authentication.
Add and display records from a Firestore collection in real time.
Responsive design for dynamic updates.
Prerequisites
Node.js installed.
Firebase CLI installed. Run the following command to install it globally:
bash
Copy code
npm install -g firebase-tools
A Firebase project set up. You can create one at the Firebase Console.
Setup Instructions

1. Clone the Repository

Clone this project to your local machine:

bash
Copy code
git clone [Repo Link](https://github.com/your-repo/firebase-firestore-auth-demo.git)
cd firebase-firestore-auth-demo
2. Install Firebase CLI
Ensure the Firebase CLI is installed. Run:

bash
Copy code
firebase --version
If not installed, use:

bash
Copy code
npm install -g firebase-tools
3. Log In to Firebase
Log in to Firebase using the CLI:

bash
Copy code
firebase login
4. Initialize Firebase Hosting
Inside the project directory, initialize Firebase Hosting:

bash
Copy code
firebase init hosting
Select the Firebase project you created.
Choose the public directory as the hosting folder.
Configure the app as a single-page app (SPA).
5. Update Firebase Configuration
Replace the firebaseConfig in your script.js file with your Firebase project's configuration. You can find this in your Firebase Console under Project Settings > General > Your apps.

6. Deploy to Firebase Hosting

To deploy the app to Firebase Hosting:

bash
Copy code
firebase deploy
Running the App Locally
To test the app locally:

bash
Copy code
firebase emulators:start
Open the provided URL in your browser to see the app.

Project Structure
bash
Copy code
/public
  ├── index.html        # Main HTML file
  ├── style.css         # Styles for the app
  ├── script.js         # JavaScript with Firebase functionality
/firebase.json          # Firebase configuration
/README.md              # Project documentation
Firestore Structure
Collection: stuff
Fields:

name: String
weight: Number
createdAt: Timestamp
Known Issues
Ensure you’ve enabled Google Authentication in the Firebase Console under Authentication > Sign-in Method.
License
This project is licensed under the MIT License. Feel free to use and modify it as needed.
