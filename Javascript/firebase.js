import { initializeApp }
    from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import { getAuth }
    from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import { getFirestore }
    from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDysbQTww9dW5SQPKG3zdt98jbS9dyUnvM",
    authDomain: "social-media-1df32.firebaseapp.com",
    projectId: "social-media-1df32",
    storageBucket: "social-media-1df32.firebasestorage.app",
    messagingSenderId: "395466823840",
    appId: "1:395466823840:web:00b6b6679dbbd1d2c291c5",
    measurementId: "G-7670Y6JWCY"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);