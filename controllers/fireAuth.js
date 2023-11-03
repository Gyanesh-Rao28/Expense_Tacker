const { auth } = require("@/firebase");
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signOut, updateProfile } from "firebase/auth";
const provider = new GoogleAuthProvider();

export const EmailSignup = async (username, email, password) => {

    try {
        await createUserWithEmailAndPassword(auth, email, password)
        await updateProfile(auth.currentUser, {
            displayName: username
        })
    } catch (error) {
        console.error(error)
    }
}

export const EmailLogIn = async (email, password) => {
    try {
        const User = await signInWithEmailAndPassword(auth, email, password)
        const token = User.user.accessToken
        const userData = {
            userId: User.user.uid,
            username: User.user.displayName,
            email: User.user.email,
            photoURL: User.user.photoURL
        }

        // console.log(token)
        // console.log(userData)
        localStorage.setItem("auth-token", token)
        localStorage.setItem("auth-user", JSON.stringify(userData))
        
        // const auth_token = localStorage.getItem("auth-token");
        // console.log(auth_token)

        return true

    } catch (error) {
        console.error(error)
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
    
    
    // const auth_user = localStorage.getItem("auth-user");
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


export const logout = async () => {
    const res = await signOut(auth)
    localStorage.removeItem("auth-token")
    localStorage.removeItem("auth-user")

}
