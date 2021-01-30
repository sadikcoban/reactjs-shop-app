import firebase from "firebase/app"
import "firebase/firestore"
import "firebase/auth"

const config = {
    apiKey: "AIzaSyBJoLknXNdUqbRW4NCt4SY9QqrOHuATKVg",
    authDomain: "crwn-db-bdf7a.firebaseapp.com",
    projectId: "crwn-db-bdf7a",
    storageBucket: "crwn-db-bdf7a.appspot.com",
    messagingSenderId: "933351190630",
    appId: "1:933351190630:web:d1f437a0c9290846e73da7",
    measurementId: "G-37K6DPWR0L"
};

export const createUserProfile = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapshot = await userRef.get();

    if (!snapshot.exists) {

        const { displayName, email } = userAuth;
        const created_at = new Date();


        try {
            await userRef.set({
                displayName,
                email,
                created_at,
                ...additionalData
            });
        } catch (e) {
            console.log("error while creating user ", e.message)
        }

    }
    return userRef;
}

firebase.initializeApp(config)

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ "prompt": "select_account" })

export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase;