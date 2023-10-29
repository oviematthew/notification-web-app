import { initializeApp } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-app.js";
import { getFirestore, collection, addDoc, doc, deleteDoc, getDocs, updateDoc } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-firestore.js";

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

    add(songTitle, artistName, likes) {
        return addDoc(collection(this.db, 'songs'), {
            songTitle,
            artistName,
            likes,
        });
    }

    remove(docId) {
        return deleteDoc(doc(this.db, 'songs', docId));
    }

    getAllSongs() {
        return getDocs(collection(this.db, 'songs'));
    }

    updateLikes(docId, likes) {
        const songRef = doc(this.db, 'songs', docId);
        return updateDoc(songRef, { likes });
    }
}

const musicDB = new MusicDB();

export default musicDB;
