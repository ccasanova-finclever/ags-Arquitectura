// ============================================================
// ERP-ARQ · Configuración Firebase única
// Requiere los SDK compat cargados antes (firebase-app-compat,
// firebase-auth-compat, firebase-firestore-compat).
// ============================================================
(function () {
  if (window.__ERP_FIREBASE_INITIALIZED__) return;

  const firebaseConfig = {
    apiKey: "AIzaSyAPACLxP1-TzVFm5tIxybOo7sA3DsGshp0",
    authDomain: "erp-arq.firebaseapp.com",
    projectId: "erp-arq",
    storageBucket: "erp-arq.firebasestorage.app",
    messagingSenderId: "1006483433894",
    appId: "1:1006483433894:web:3d4dd06c4a24727a93c767",
    measurementId: "G-NSVT14SGQ1"
  };

  firebase.initializeApp(firebaseConfig);
  window.db = firebase.firestore();
  window.fbAuth = firebase.auth();
  window.__ERP_FIREBASE_INITIALIZED__ = true;
})();
