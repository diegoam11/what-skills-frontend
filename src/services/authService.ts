import { initializeApp } from 'firebase/app';
import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    type User as FirebaseUser
} from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDvQSuybE7XPSgZJsAr4jlAorhfIfbYLtU",
    authDomain: "whatskills-database.firebaseapp.com",
    projectId: "whatskills-database",
    storageBucket: "whatskills-database.firebasestorage.app",
    messagingSenderId: "851279343659",
    appId: "1:851279343659:web:11574f5152f8e93eec3fda"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export interface User {
    uid: string;
    email: string | null;
    displayName: string | null;
    photoURL: string | null;
}

class AuthService {
    private googleProvider: GoogleAuthProvider;

    constructor() {
        this.googleProvider = new GoogleAuthProvider();
    }

    async signInWithGoogle(): Promise<User> {
        try {
            const result = await signInWithPopup(auth, this.googleProvider);
            return this.formatUser(result.user);
        } catch (error) {
            console.error('Error en login con Google:', error);
            throw error;
        }
    }

    async signInWithEmail(email: string, password: string): Promise<User> {
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            return this.formatUser(result.user);
        } catch (error) {
            console.error('Error en login con email:', error);
            throw error;
        }
    }

    async signUpWithEmail(email: string, password: string): Promise<User> {
        try {
            const result = await createUserWithEmailAndPassword(auth, email, password);
            return this.formatUser(result.user);
        } catch (error) {
            console.error('Error en registro con email:', error);
            throw error;
        }
    }

    async signOut(): Promise<void> {
        try {
            await signOut(auth);
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
            throw error;
        }
    }

    onAuthStateChanged(callback: (user: User | null) => void) {
        return onAuthStateChanged(auth, (firebaseUser) => {
            if (firebaseUser) {
                callback(this.formatUser(firebaseUser));
            } else {
                callback(null);
            }
        });
    }

    getCurrentUser(): User | null {
        const firebaseUser = auth.currentUser;
        return firebaseUser ? this.formatUser(firebaseUser) : null;
    }

    private formatUser(firebaseUser: FirebaseUser): User {
        return {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            photoURL: firebaseUser.photoURL,
        };
    }
}

export const authService = new AuthService();
