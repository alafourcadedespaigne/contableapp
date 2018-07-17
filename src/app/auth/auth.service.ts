import {Injectable} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {Router} from '@angular/router';


import Swal from 'sweetalert2';
import * as firebase from 'firebase';
import {map} from 'rxjs/operators';
import {User} from './user.model';
import {AngularFirestore} from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth, private router: Router, private afDB: AngularFirestore) {
  }

  initAuthListener() {

    this.afAuth.authState.subscribe((fbUser: firebase.User) => {


    });

  }


  crearUsuario(nombre: string, email: string, password: string) {

    this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(respuesta => {

        // Crear usuario en Firebase

        const user: User = {
          uid: respuesta.user.uid,
          nombre: nombre,
          email: respuesta.user.email
        };

        this.afDB.doc(`${ user.uid }/usuario`)
          .set(user)
          .then(() => {
            this.router.navigate(['/']);
          });


      })
      .catch(error => {
        console.error(error);
        Swal('Error en el login', error.message, 'error');
      });

  }


  login(email: string, password: string) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(respuesta => {
        this.router.navigate(['/']);
      })
      .catch(error => {
        console.error(error);
        Swal('Error en el login', error.message, 'error');
      });
  }


  logout() {
    this.router.navigate(['/login']);
    this.afAuth.auth.signOut();
  }

  isAuth() {


    return this.afAuth.authState.pipe(
      map(fbuser => {

        if (fbuser == null) {
          this.router.navigate(['/login']);
        }
        return fbuser != null;
      })
    );
  }

}
