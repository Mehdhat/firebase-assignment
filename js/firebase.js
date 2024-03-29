// firebaseFunctions.js

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD13hM9QkWgFvcpT7Otz4s8b9qhCHpXKng",

  authDomain: "miniproject-11574.firebaseapp.com",

  databaseURL: "https://miniproject-11574-default-rtdb.firebaseio.com",

  projectId: "miniproject-11574",

  storageBucket: "miniproject-11574.appspot.com",

  messagingSenderId: "543149965584",

  appId: "1:543149965584:web:052c6b54f253276a5f2595"

};



// Initialize Firebase
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

function signup() {
  var firstname = document.getElementById('inputFirstName').value;
  var lastname = document.getElementById('inputLastName').value;
  var email = document.getElementById('inputEmail').value;
  var password = document.getElementById('inputPassword').value;
  var repeatpassword = document.getElementById('inputRepeatPassword').value;

  if(password !== repeatpassword) {
    console.log("Passwords do not match");
    return;
  }

  auth.createUserWithEmailAndPassword(email, password)
    .then(function (userCredential) {
      var user = userCredential.user;
      writeUserData(user.uid, firstname, lastname, email);
      console.log(user);
      sessionStorage.setItem('email', user.email);
      // window.location.href = '../index.html'
    })
    .catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.error(errorMessage);
    });
}

const database = firebase.database();

function writeUserData(userId, firstname, lastname, email) {
  database.ref('users/' + userId).set({
    firstname: firstname,
    lastname: lastname,
    email: email
  }).then(() => {
    console.log('User created successfully.');
  }).catch((error) => {
    console.error('Error creating user:', error);
  });
}

const dbRef = firebase.database().ref();

function readUserData(userId) {
  dbRef.child("users").child(userId).get().then((snapshot) => {
    if (snapshot.exists()) {
      console.log(snapshot.val());
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error("Error reading user data:", error);
  });
}
// Assuming firebase has been correctly initialized before this function
function signin() {
  var email = document.getElementById('inputEmail').value;
  var password = document.getElementById('inputPassword').value;

  auth.signInWithEmailAndPassword(email, password)
      .then(function (userCredential) {
          var user = userCredential.user;
          console.log(user);
          sessionStorage.setItem('email', user.email);
          window.location.href = 'dashboard.html'; // Redirect to profile page
      })
      .catch(function (error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.error(errorMessage);
      });
}
