import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyCL8hbtDdyI1wWhrtyebSc2LaMlV1_lsko",
    databaseURL: "https://business-trip-app.firebaseio.com",
    storageBucket: "business-trip-app.appspot.com",
    authDomain: "business-trip-app.firebaseapp.com",
    messagingSenderId: "477984551823",
    projectId: "business-trip-app"
}

const fire = firebase.initializeApp(config);

export const provider = new firebase.auth.GoogleAuthProvider();
export const session = fire.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);

export const fireDB = fire.database();
// export const storage = fire.storage();

export default  fire;