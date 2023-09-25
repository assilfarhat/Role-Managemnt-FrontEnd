import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {

  permessions : any[];
  private baseUrl: string = 'https://localhost:7030/api/Roles/';
  constructor(private http: HttpClient,private auth: AuthService) { }

  getAllPermissions() {
    return this.http.get<any>(`${this.baseUrl}getAllPermissions`);
  }
  getPermissionNamesByRoleName(roleName: string) {
    return this.http.get<any[]>(`${this.baseUrl}getPermissionNamesByRoleName/${roleName}`);
  }
  
  getroles() {
    return this.http.get<any>(`${this.baseUrl}getRoles`);
  }
  getpermissionbyrole(id: number) {
    return this.http.get<any>(`${this.baseUrl}get-permissions/${id}`);
  }
  updateRolePermissions(idRole: number,names : string[]){
    return this.http.put<any>(`${this.baseUrl}updateRolePermissions/${idRole}`, names);
  }
  deleteRole(id: number) {
    // console.log("deleteUser: " + id);
     return this.http.delete(`${this.baseUrl}deleteRole/${id}`);
  }
  AddRole(role: any){
    return this.http.post<any>(`${this.baseUrl}addrole`, role);
  }


  verifiepermissions(verpermition: string): Observable<boolean> {
    const tokenPayload = this.auth.decodedToken();
    return this.getPermissionNamesByRoleName(tokenPayload.role).pipe(
      map((res: string[]) => {
        this.permessions = res;
        console.log("Permissions", this.permessions.includes(verpermition));
        return this.permessions.includes(verpermition);
      }),
      catchError(() => {
        // Handle errors here, e.g., permission check failed due to an API error
        console.log("Error checking permissions");
        return of(false); // Return false to indicate permission doesn't exist
      })
    );
  }
  
  


  
}
