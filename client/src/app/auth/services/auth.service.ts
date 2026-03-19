import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map, Observable } from "rxjs";
import { User } from "../../educonnect/models/User";
import { environment } from "../../../../src/environments/environment";
import { UserRegistrationDTO } from "../../../../src/app/educonnect/models/UserRegistrationDTO";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private loginUrl = `${environment.apiUrl}`;
  // private loginUrl = `http://localhost:5000`;


  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  };

  constructor(private http: HttpClient) { }

  login(user: Partial<User>): Observable<{ [key: string]: string }> {
    return this.http.post<{ token: string }>(
      `${this.loginUrl}/user/login`,
      user,
      this.httpOptions
    );
  }

  getToken() {
    return localStorage.getItem("token");
  }

  getRole() {
    return localStorage.getItem("role");
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('user_id');
    localStorage.removeItem('student_id');
    localStorage.removeItem('teacher_id');
  }

  createUser(user: UserRegistrationDTO): Observable<any> {
    return this.http.post<UserRegistrationDTO>(`${this.loginUrl}/user/register`, user);
  }
}
