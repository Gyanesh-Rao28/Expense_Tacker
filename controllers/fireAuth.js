const { auth } = require("@/firebase");
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signOut, getRedirectResult } from "firebase/auth";
const provider = new GoogleAuthProvider();
const cors = require("cors")({ origin: true });

export const Signup = async (email, password) => {

    try {
        const User = await createUserWithEmailAndPassword(auth, email, password)
        console.log(User.user)

    } catch (error) {
        console.error(error)
    }
}

export const logIn = async (email, password) => {
    try {
        const User = await signInWithEmailAndPassword(auth, email, password)
        console.log(User.user)

    } catch (error) {
        console.error(error)
    }
}

export const getCurrentUser = async () => {
    try {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const res = {
                    userId: user.uid,
                    msg: true
                };
                console.log(res)
                return res
            } else {
                const res = {
                    userId: user.uid,
                    msg: true
                };
                console.log(res)
                return res
            }
        })
    } catch (error) {
        console.log(error)
    }
}

export const googleLogin = async () => {
    const result = await signInWithPopup(auth, provider)
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;

    const userData = {
        userId: result.user.uid,
        username: result.user.displayName,
        email: result.user.email,
        photoURL: result.user.photoURL
    }

    localStorage.setItem("auth-token", token)
    localStorage.setItem("auth-user", JSON.stringify(userData))


    const auth_token = localStorage.getItem("auth-token");
    const auth_user = localStorage.getItem("auth-user");

    // console.log(auth_token)



}


export const logout = async () => {
    const res = await signOut(auth)
    localStorage.removeItem("auth-token")
    localStorage.removeItem("auth-user")

}
