import firebase from "firebase/app"
import "firebase/auth"
import "firebase/database"

const config = {
    apiKey: "AIzaSyAsMHb359tv9XfXe_jUMgHnsdqU2IkZSWg",
    authDomain: "settlersportal.firebaseapp.com",
    databaseURL: "https://settlersportal.firebaseio.com",
    projectId: "settlersportal",
    storageBucket: "settlersportal.appspot.com",
    messagingSenderId: "836734194025",
    appId: "1:836734194025:web:610e91c266a608c3d42df8",
    measurementId: "G-0BBZKSSR6D"
}

!firebase.apps.length ? firebase.initializeApp(config) : ''

export const auth = firebase.auth()
export const database = firebase.database()