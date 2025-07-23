// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCYasXzXa6pim3xZ2M6psy2wAMKWCKVJ8c",
  authDomain: "crud-92687.firebaseapp.com",
  databaseURL: "https://crud-92687-default-rtdb.firebaseio.com",
  projectId: "crud-92687",
  storageBucket: "crud-92687.firebasestorage.app",
  messagingSenderId: "988755313325",
  appId: "1:988755313325:web:e878c379b7dcd6abdabc24",
  measurementId: "G-YTL25T7MDV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default app;
