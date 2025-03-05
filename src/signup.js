    import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-app.js";
    import { getAuth, createUserWithEmailAndPassword,GoogleAuthProvider, signInWithPopup} from "https://www.gstatic.com/firebasejs/11.3.0/firebase-auth.js";
    import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-firestore.js";
    import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-analytics.js";

    const firebaseConfig = {
        apiKey: "AIzaSyC_RFkbb9opYta3RgyCfO-RP0pVfcDNB94",
        authDomain: "parkingcheck-83318.firebaseapp.com",
        projectId: "parkingcheck-83318",
        storageBucket: "parkingcheck-83318.firebasestorage.app",
        messagingSenderId: "421752321656",
        appId: "1:421752321656:web:d60ff23bdb5f226e85df8d",
        measurementId: "G-5E42HCJV4B"
    };

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const db = getFirestore(app);
    const analytics = getAnalytics(app);

    window.registerUser = function() {
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Get the user object after successful registration注册成功后获取用户对象
          const user = userCredential.user;
          return setDoc(doc(db, "users", user.uid), {
            email: user.email,
            createdAt: new Date()
          });
        })
        .then(() => {
          alert("Welcom to Maynooth University Parking Check System！");
          
          window.location.href = "login.html";
        })
        .catch((error) => {
          alert("Sorry：" + error.message);
        });
    };

    // Google login function  谷歌登录函数
    window.googleLogin = function() {
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider)
        .then((result) => {
          //alert("谷歌登录成功！");
          window.location.href = "index.html";
        })
        .catch((error) => {
          alert("Sorry：" + error.message);
        });
    };