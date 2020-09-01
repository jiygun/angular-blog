import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService implements CanActivate {
  admin:any;
  constructor(public fireStore: AngularFirestore,public fireAuth: AngularFireAuth, public router: Router, public ngZone: NgZone) { 
    this.fireAuth.authState.subscribe(user => {
      if (user) {
        this.admin = user;
        localStorage.setItem('admin', JSON.stringify(this.admin));
        JSON.parse(localStorage.getItem('admin'));
      } else {
        localStorage.setItem('admin', null);
        JSON.parse(localStorage.getItem('admin'));
      }
    })
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | import("@angular/router").UrlTree | import("rxjs").Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
    if(!this.isLoggedIn) this.router.navigate(['auth']);
    return this.isLoggedIn;
  }
  SignIn(email, password) {
    return this.fireAuth.signInWithEmailAndPassword(email, password).then((result) => {
        if(!result.user.emailVerified) this.SendVerificationMail();
        localStorage.setItem('admin', JSON.stringify(result.user));
        this.ngZone.run(() => {
          this.router.navigate(['admin']);
        });
      }).catch((error) => {
        window.alert(error.message);
      })
  }
  SendVerificationMail() {
    return this.fireAuth.currentUser.then(res=>res.sendEmailVerification()).then((res=>window.alert("verify your email address dude")));
  }
  get isLoggedIn(): boolean {
    const admin = JSON.parse(localStorage.getItem('admin'));
    return (admin!==null&&admin.emailVerified!==false)?true:false;
  }
  SignOut() {
    return this.fireAuth.signOut().then(() => {
      localStorage.removeItem('admin');
      this.router.navigate(['auth']);
    })
  }
}
