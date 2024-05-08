import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDt-0kvxA40XKWyDsYhvpa1R34Cl0zfrvI",
  authDomain: "alephjavier-93688.firebaseapp.com",
  projectId: "alephjavier-93688",
  storageBucket: "alephjavier-93688.appspot.com",
  messagingSenderId: "792905750006",
  appId: "1:792905750006:web:9cc66c5af9f6bf2abda3d7",
};

class FirebaseSingleton {
  constructor() {
    if (!FirebaseSingleton.instance) {
      this.firebaseApp = initializeApp(firebaseConfig);
      this.db = getDatabase(this.firebaseApp);
      FirebaseSingleton.instance = this;
    }
    return FirebaseSingleton.instance;
  }

  getDatabaseInstance() {
    return this.db;
  }
}

const firebaseInstance = new FirebaseSingleton();
const db = firebaseInstance.getDatabaseInstance();

export default db;