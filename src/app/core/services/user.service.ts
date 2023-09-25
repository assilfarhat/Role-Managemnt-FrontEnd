import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private fullName$ = new BehaviorSubject<string>("");
  private role$ = new BehaviorSubject<string>("");

  private baseUrl: string = 'https://localhost:7030/api/User/';
  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get<any>(`${this.baseUrl}getusers`);
  }
  deleteUser(id: number) {
   // console.log("deleteUser: " + id);
    return this.http.delete(`${this.baseUrl}delete/${id}`);
  }
  
  updateUser(id: number, user: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}${id}`, user);
  }
  
  getUserById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}${id}`);
  }
  

  addRole(roleName: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}addrole`,roleName);
  }
  getRoles(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}getroles`);
  }

  public getRoleFromStore(){
    return this.role$.asObservable();
  }

  public setRoleForStore(role:string){
    this.role$.next(role);
  }

  public getFullNameFromStore(){
    return this.fullName$.asObservable();
  }

  public setFullNameForStore(fullname:string){
    this.fullName$.next(fullname)
  }
}
