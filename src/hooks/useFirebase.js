import { useEffect, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signOut, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, updateProfile, getIdToken } from "firebase/auth";
import initializeAuthentication from '../Pages/Login/Firebase/firebase.init';
import axios from 'axios';

initializeAuthentication();

const useFirebase = () => {
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [authError, setAuthError] = useState('');
    const [admin, setAdmin] = useState(false)
    const [token, setToken] = useState('');

    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();

    const registerUser = (email, password, name, history) => {
        setIsLoading(true)
        createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                setAuthError('');
                const newUser = { email, displayName: name };
                setUser(newUser);
                // store user in database
                saveUser(email, name)

                updateProfile(auth.currentUser, { displayName: name })
                    .then(() => {

                    }).catch((error) => {
                        setAuthError(error.message)
                    });
                history.replace('/');
            })
            .catch(error => setAuthError(error.message))
            .finally(() => setIsLoading(false))
    }

    const loginUser = (email, password, location, history) => {
        setIsLoading(true)
        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                const destination = location?.state?.from || '/';
                history.replace(destination);
                setAuthError('');
            })
            .catch(error => setAuthError(error.message))
            .finally(() => setIsLoading(false));
    }

    const signInWithGoogle = (location, history) => {
        setIsLoading(true)
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                const user = result.user;
                saveGoogleUser(user);
                const destination = location?.state?.from || '/';
                history.replace(destination);
                setAuthError('')
            })
            .catch(error => setAuthError(error.message))
            .finally(() => setIsLoading(false))
    }

    useEffect(() => {
        axios.get(`https://obscure-chamber-60035.herokuapp.com/users/${user.email}`)
            .then(res => setAdmin(res.data.admin))
    }, [user.email])

    const logout = () => {
        signOut(auth).then(() => { }).finally(() => setIsLoading(false))
    }

    useEffect(() => {
        const subscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                getIdToken(user)
                    .then(idToken => {
                        setToken(idToken)
                        localStorage.setItem('idToken', idToken);
                    });
            }
            else {
                setUser({})
            }
            setIsLoading(false)
        })
        return () => subscribe;

    }, [auth])

    const saveUser = (email, displayName) => {
        const user = { email, displayName };
        axios.post('https://obscure-chamber-60035.herokuapp.com/users', user).then()
    }

    const saveGoogleUser = user => {
        axios.put('https://obscure-chamber-60035.herokuapp.com/users', user).then()
    }

    return {
        user,
        isLoading,
        authError,
        admin,
        token,
        signInWithGoogle,
        registerUser,
        loginUser,
        logout
    }
};

export default useFirebase;