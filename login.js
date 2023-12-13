import { signInWithEmailAndPassword , GoogleAuthProvider, signInWithPopup, GithubAuthProvider,onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { auth } from "./config.js";


const form = document.querySelector('#form');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const googleBtn = document.querySelector('#googleBtn');
const githubBtn = document.querySelector('#githubBtn');



onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const uid = user.uid;
      console.log(uid);
      window.location = "home.html"
      // ...
    } else {
      // User is signed out
      // ...
    }
  });



form.addEventListener('submit', (event) => {
    event.preventDefault();
    signInWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
            window.location = 'home.html'
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);
            // console.log(errorCode);
            // const errSplice = errorCode
            alert(errorCode)
        });

})


const provider = new GoogleAuthProvider();

googleBtn.addEventListener('click', () => {
    signInWithPopup(auth, provider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            console.log(token);
            const user = result.user;
            console.log(user);

            const uid = user.uid

            addDoc(collection(db, "user"), {
                name: user.displayName,
                email: user.email,
                uid: user.uid,
                profileUrl: user.photoURL
            }).then((res) => {
                console.log(res);
                window.location = 'home.html';
            }).catch((err) => {
                console.log(err);
            });

        })
        .catch((error) => {
            const errorMessage = error.message;
            console.log(errorMessage);
        });
});

const githubProvider = new GithubAuthProvider();
githubBtn.addEventListener('click', () => {
    signInWithPopup(auth, githubProvider)
        .then((result) => {
            const credential = GithubAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;


            
            const user = result.user;
            console.log(token);
            console.log(user);
            addDoc(collection(db, "user"), {
                name: user.displayName,
                uid: user.uid,
                profileUrl: user.photoURL
            }).then((res) => {
                console.log(res);
                window.location = 'home.html';
            }).catch((err) => {
                console.log(err);
            });
        }).catch((error) => {
            const errorMessage = error.message;
            console.log(errorMessage);
        });
})
