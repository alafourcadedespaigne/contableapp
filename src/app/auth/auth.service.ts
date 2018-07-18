import {Injectable} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {Router} from '@angular/router';


import Swal from 'sweetalert2';
import * as firebase from 'firebase';
import {map} from 'rxjs/operators';
import {User} from './user.model';
import {AngularFirestore} from 'angularfire2/firestore';
import {Store} from '@ngrx/store';
import {AppState} from '../app.reducer';
import {ActivarLoadingAction, DesactivarLoadingAction} from '../shared/ui.accions';
import {SetUserAction} from './auth.actions';
import {Subscription} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubscription: Subscription = new Subscription();

  constructor(private afAuth: AngularFireAuth,
              private router: Router, private afDB: AngularFirestore, private store: Store<AppState>) {
  }

  initAuthListener() {

    this.userSubscription = this.afAuth.authState.subscribe((fbUser: firebase.User) => {

      if (fbUser) {
        this.afDB.doc(`${ fbUser.uid }/usuario`).valueChanges()
          .subscribe((usuarioObj: any) => {
            const newUser = new User(usuarioObj);
            this.store.dispatch(new SetUserAction(newUser));
          });
      } else {
        this.userSubscription.unsubscribe();
      }

    });

  }


  crearUsuario(nombre: string, email: string, password: string) {


    this.store.dispatch(new ActivarLoadingAction());

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
            this.store.dispatch(new DesactivarLoadingAction());
          });


      })
      .catch(error => {
        console.error(error);
        Swal('Error en el login', error.message, 'error');
      });

  }


  login(email: string, password: string) {

    this.store.dispatch(new ActivarLoadingAction());

    this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(respuesta => {
        this.store.dispatch(new DesactivarLoadingAction());
        this.router.navigate(['/']);
      })
      .catch(error => {
        console.error(error);
        this.store.dispatch(new DesactivarLoadingAction());
        this.store.dispatch(new DesactivarLoadingAction());
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
