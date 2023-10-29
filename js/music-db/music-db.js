// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-app.js";
import { getFirestore, addDoc, collection } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-firestore.js";

class MusicDB {
    constructor() {
        this.db = null;
        this.isAvailable = false;
    }

    open() {
        return new Promise((resolve, reject) => {
            try {
                // Your web app's Firebase configuration
                const firebaseConfig = {
                    apiKey: "AIzaSyBdA-WuwOCoDfYaFyBQOLdFwzx9Ls3vg8E",
                    authDomain: "games-app-6e2a9.firebaseapp.com",
                    projectId: "games-app-6e2a9",
                    storageBucket: "games-app-6e2a9.appspot.com",
                    messagingSenderId: "658683972987",
                    appId: "1:658683972987:web:4b684858a8439ca13d41de"
                };

                // Initialize Firebase
                const app = initializeApp(firebaseConfig);

                // Initialize Cloud Firestore and get a reference to the service
                const db = getFirestore(app);

                if (db) {
                    this.db = db;
                    this.isAvailable = true;
                    resolve();
                } else {
                    reject('The DB is not available.');
                }
            } catch (error) {
                console.error(error.message);
                reject(error.message);
            }
        });
    }

    add(songTitle, artistName) {
        return addDoc(collection(this.db, 'songs'), {
            songTitle,
            artistName,
            likes: 0,
        });
    }
}

const musicDB = new MusicDB();

export default musicDB;
