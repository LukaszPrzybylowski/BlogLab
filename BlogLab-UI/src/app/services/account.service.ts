import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApplicationUserCreate } from '../models/account/application-user-create.model';
import { ApplicationUserLogin } from '../models/account/application-user-login.models';
import { ApplicationUser } from '../models/account/application-user.model';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private currentUserSubject$: BehaviorSubject<ApplicationUser>

  constructor(
    private http: HttpClient
  ) {

    this.currentUserSubject$ = new BehaviorSubject<ApplicationUser>(JSON.parse(<string>localStorage.getItem('blogLab-currentUser')));
   }

  login(model: ApplicationUserLogin) : Observable<ApplicationUser> {
    return this.http.post(`${environment.webApi}/Account/login`, model).pipe(
    map((user : any) => {

      if(user) {
        localStorage.setItem('blogLab-currentUser', JSON.stringify(user));
        this.setCurrentUser(user);
      }
      return user;
    })
      )
  }



  register(model: ApplicationUserCreate): Observable<ApplicationUser> {
    return this.http.post(`${environment.webApi}/Account/register`, model).pipe(
      map((user : any) => {
  
        if(user) {
          localStorage.setItem('blogLab-currentUser', JSON.stringify(user));
          this.setCurrentUser(user);
        }
        return user;
      })
        )
  }

  setCurrentUser(user : ApplicationUser){
    this.currentUserSubject$.next(user);
  }

  public get currentUserValue() : ApplicationUser {
    return this.currentUserSubject$.value;
  }

  public isLoggedIn(){
    const currentUser = this.currentUserValue;
    const isLoggedIn = !!currentUser && !!currentUser.token;
    return isLoggedIn;
  }

  logout(){
    localStorage.removeItem('blogLab-currentUser');
    this.currentUserSubject$.next( new ApplicationUser.arguments(null,null,null,null,null))
  }
}
