import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './models/User.type';
import { HttpClient } from '@angular/common/http';
import { LoginResponse } from './models/LoginResponse.type';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {


  private token: string = "";
  private userId: number = -1;
  constructor(private http: HttpClient , private cookieService: CookieService) { }

  URL = "http://localhost:5000"
  //Sign up
  signUpUser(user: User) {
    return this.http.post(`${this.URL}/api/signup`, user)
  }

  //Login
  loginUser(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.URL}/api/login`, { email, password })
  }

  //Get user details
  getUserDetails(userId: number): Observable<User> {
    /**
     * AuthToken is sent as a header in the request
     */
    const headers = {
      Authorization: `Bearer ${this.token}`
    };

    return this.http.get<User>(`${this.URL}/api/users/${userId}`, { headers });
  }
  setToken(token: string) {
    this.token = token;
    this.cookieService.set('token', token); // Save token in a cookie
  }
  
  getToken() {
    // Retrieve token from the cookie
    this.token = this.cookieService.get('token');
    return this.token;
  }
  

  
  getIsLoggedIn() {
    /**
     * Check if the user is logged in by checking the token and id
     */
    if (this.getToken() && this.getUserId() !== -1) {
      return true;
    }
    return false;
  }

  setUserId(userId: number) {
    this.userId = userId;
    this.cookieService.set('userId', userId.toString()); // Save userId in a cookie
  }
  
  getUserId() {
    // Retrieve userId from the cookie
    this.userId = parseInt(this.cookieService.get('userId') || '-1');
    return this.userId;
  }

  signOut() {
    this.setToken("");
    this.setUserId(-1);
    this.cookieService.delete('token'); // Remove the token from the cookie
    this.cookieService.delete('userId'); // Remove the userId from the cookie
  }

}
