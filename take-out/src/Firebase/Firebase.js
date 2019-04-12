import * as firebase from 'firebase';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDWAXYZDCJzmnYvSt-E2lTPqNd1ogGROFI",
    authDomain: "app-test-e1d31.firebaseapp.com",
    databaseURL: "https://app-test-e1d31.firebaseio.com",
    projectId: "app-test-e1d31",
    storageBucket: "app-test-e1d31.appspot.com",
    messagingSenderId: "1052985233838"
};

const fire = firebase.initializeApp(config)



export default fire;


// doCreateUserWithEmailAndPassword = (email, password) =>
// this.auth.createUserWithEmailAndPassword(email, password);

// doSignInWithEmailAndPassword = (email, password) =>
// this.auth.signInWithEmailAndPassword(email, password);

// doSignOut = () => this.auth.signOut();

// doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

// doPasswordUpdate = password =>
// this.auth.currentUser.updatePassword(password);