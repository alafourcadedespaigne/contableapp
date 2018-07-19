import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

// Modulos

import {FormsModule, ReactiveFormsModule} from '@angular/forms';

// NGRX
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {appReducers} from './app.reducer';

// Firebase
import {AngularFireModule} from 'angularfire2';
import {AngularFirestoreModule} from 'angularfire2/firestore';


// Environment
import {environment} from '../environments/environment';

import {AppComponent} from './app.component';
import {AppRouting} from './app.routing';
import {AuthModule} from './auth/auth.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AuthModule,
    AppRouting,
    FormsModule,

    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,

    StoreModule.forRoot(appReducers),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
