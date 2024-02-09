import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { BehaviorSubject, ReplaySubject, map, of, tap } from 'rxjs';
import { Address, User } from '../shared/models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  baseUrl = environment.apiUrl;
  // private currentUserSource = new BehaviorSubject<User | null>(null);
  // With this Subject we wait for the first value to arrive so then we subscrive in the auth guard (AMAZING)
  private currentUserSource = new ReplaySubject<User | null>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  loadCurrentUser(token: string | null) {
    // this is to ensure that our ReplaySubject will always have one value
    if (token === null) {
      this.currentUserSource.next(null);
      return of(null);
    }

    let header = new HttpHeaders();
    header = header.set('Authorization', `Bearer ${token}`);

    return this.http
      .get<User>(`${this.baseUrl}account`, { headers: header })
      .pipe(
        map((response) => {
          if (response) {
            this.setUserAndToken(response);
            return response;
          } else {
            return null;
          }
        })
      );
  }

  login(user: any) {
    return this.http.post<User>(`${this.baseUrl}account/login`, user).pipe(
      tap((user) => {
        this.setUserAndToken(user);
      })
    );
  }

  register(user: any) {
    return this.http.post<User>(`${this.baseUrl}account/register`, user).pipe(
      tap((user) => {
        this.setUserAndToken(user);
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.currentUserSource.next(null);
    this.router.navigateByUrl('/');
  }

  checkEmailExists(email: string) {
    return this.http.get<boolean>(
      `${this.baseUrl}account/email-exists?email=${email}`
    );
  }

  getUserAddress() {
    return this.http.get<Address>(`${this.baseUrl}account/address`);
  }

  updateUserAddress(address: Address) {
    return this.http.put<Address>(`${this.baseUrl}account/address`, address);
  }

  private setUserAndToken(user: User) {
    localStorage.setItem('token', user.token);
    this.currentUserSource.next(user);
  }
}
