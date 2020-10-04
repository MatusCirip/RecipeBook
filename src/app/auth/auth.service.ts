import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, tap} from "rxjs/operators";
import {BehaviorSubject, Subject, throwError} from "rxjs";
import {User} from "./user.model";

interface AuthResponseData {
  kind: string,
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string,
  registered?: boolean
}

@Injectable({providedIn: 'root'})
export class AuthService {
  constructor(private http: HttpClient){
  }

  user = new BehaviorSubject<User>(null);
  token = null;

  login(email: string, password: string){
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB9J2-T2k7MjNjCTsRWSG-AR6FtB0UEukM',
      {email: email, password: password, returnSecureToken: true})
      .pipe(catchError(error => {
        let errorMes = 'Unspecified error occured';
        console.log(error);
        if (!error.error || !error.error.error){
          return throwError(errorMes);
        }
        switch (error.error.error.message) {
          case 'EMAIL_NOT_FOUND': errorMes = 'User does not exists'; break;
          case 'INVALID_PASSWORD': errorMes = 'Wrong password'; break;
          case 'USER_DISABLED': errorMes = 'This user was disabled'; break;
        }
        return throwError(errorMes);
      }), tap(response => {
        this.handleAuthentication(response.email, response.localId, response.idToken, +response.expiresIn);
      }));
  }


  signup(email: string, password: string){
   return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB9J2-T2k7MjNjCTsRWSG-AR6FtB0UEukM',
      {email: email, password: password, returnSecureToken: true})
     .pipe(catchError(error => {
       let errorMes = 'Unspecified error occured.';
       if (!error.error || !error.error.error){
         return throwError(errorMes);
       }
       switch (error.error.error.message) {
         case 'EMAIL_EXISTS': errorMes = 'This error is registered already';
       }
       //console.log(error.error.error.message);
       return throwError(errorMes);
     }), tap(response => {
       this.handleAuthentication(response.email, response.localId, response.idToken, +response.expiresIn);
     }));
  }


  private handleAuthentication(email: string, localId: string, token: string, expiresIn: number){
    const expirationDate = new Date(new Date().getTime() + (expiresIn * 1000));
    const user = new User(email, localId, token, expirationDate);
    this.token = token;
    this.user.next(user);
  }
}
