import firebase from 'firebase';

export class AuthService {
	
	login(email: string, password: string ){
		return firebase.auth().signInWithEmailAndPassword(email,password);
	}

	forgotPassword( email: string){
		return firebase.auth().sendPasswordResetEmail(email,null);
	}

	logout() {
		firebase.auth().signOut();
	}
}