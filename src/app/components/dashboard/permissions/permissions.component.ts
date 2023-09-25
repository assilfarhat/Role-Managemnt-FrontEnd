import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PermissionsService } from 'src/app/core/services/permissions.service';

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.css']
})
export class PermissionsComponent implements OnInit {
  permissions: any[]
  existingPermissions: any[]
  public perm: string = "";
  constructor(private toastr: ToastrService,private router: Router,
    private route: ActivatedRoute,private PermissionsService: PermissionsService) { }

  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];
    console.log(id);
    this.getAllPermissions()
    this.getexistingPermissions(id)

  }

  getexistingPermissions(id: number): void{
    this.PermissionsService.getpermissionbyrole(id)
    .subscribe(res=>{
      this.existingPermissions = res.map((per: { id: any}) => {
        return {
          id: per.id  
        };
      });

   
    console.log("existingPermissions",this.existingPermissions)
    });
  }

  permissionExists(permissionId: number): boolean {
    return this.existingPermissions.some(existingPermission => existingPermission.id === permissionId);
  }
  togglePermission(permissionId: number): void {
    if (this.permissionExists(permissionId)) {
      // If permission exists, remove it from the list
      this.existingPermissions = this.existingPermissions.filter(existPer => existPer.id !== permissionId);
    } else {
      // If permission doesn't exist, add it to the list
      this.existingPermissions = [...this.existingPermissions, { id: permissionId }];
    }
    console.log("fff",this.existingPermissions)
  }
  updatePermissions(): void {
    // Get the IDs of permissions with checked switches
    const checkedPermissionIds = this.permissions
      .filter(per => this.permissionExists(per.id))
      .map(per => per.id);
  
    // Update the existingPermissions list
    this.existingPermissions = this.permissions.filter(per => checkedPermissionIds.includes(per.id));
  
    console.log("up",this.existingPermissions)
    const checkedPermissionNames = this.permissions
    .filter(per => this.permissionExists(per.id))
    .map(per => per.name); // Extract permission names
    console.log("checked",checkedPermissionNames)
    // Perform any other necessary actions here
    let idrole = this.route.snapshot.params['id'];
    this.PermissionsService.updateRolePermissions(idrole,checkedPermissionNames)
    .subscribe({
      next:(res=>{
        console.log(res);

        this.toastr.success('permissions updated successfully ')   
        window.location.reload()
      }),
      error:(err=>{
        console.log(err.message);
        this.toastr.error('something went wrong')
      })
    })

  }
  
  

  getAllPermissions(): void {
    this.perm = "Role.View";
    this.PermissionsService.verifiepermissions(this.perm).subscribe(permissionExists => {
      if (permissionExists) {
        this.PermissionsService.getAllPermissions()
        .subscribe(res => {
        
         this.permissions = res.map((per: { id: any; permissionName: any; }) => {
          return {
            id: per.id,
            name: per.permissionName
          };
        });
          console.log("All Permissions:", this.permissions);
        });
        console.log('Permission exists!');
      } else {
        console.log('Permission does not exist.');
        this.router.navigate(['not-permited']);
      }
    });
   
  }

}
