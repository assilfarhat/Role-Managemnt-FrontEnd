
import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PermissionsService } from 'src/app/core/services/permissions.service';
import { ProductService } from 'src/app/core/services/product.service';
import { Customvalidator } from 'src/app/core/utils/custumvalidator';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  p: number = 1;
  length: number
  products : any[]
  addForm: FormGroup;
  added: boolean;
  file: File;
  perm: string= "";
  constructor(private productService:ProductService,private PermissionsService: PermissionsService,
    private formBuilder: FormBuilder,private router: Router,private toastr: ToastrService) { }

  ngOnInit(): void {
    
    this.productService.getProducts().subscribe(products => {
      this.products = products;
      console.log("prod:",this.products);

      
  })
  this.added=false;
      this.addForm = this.formBuilder.group({
        Name: ['', [Validators.minLength(3), Validators.required]],
        Price: ['', Validators.required],
        Image: ['', Validators.required],
      });
}


addprod(){
  this.perm = "Product.Create";
  this.PermissionsService.verifiepermissions(this.perm).subscribe(permissionExists => {
    if (permissionExists) {
      if (this.addForm.valid) {
        console.log("1",this.addForm.value);
        let prod = {
          ...this.addForm.value
        }
        console.log("prod",prod)
        this.productService.createProduct(prod)
        .subscribe({
          next:(res=>{
            console.log(res);
    
            this.toastr.success('product created successfully ')   
            window.location.reload()
          }),
          error:(err=>{
            console.log(err.message);
            this.toastr.error('something went wrong')
          })
        })
      } else {
        Customvalidator.validateAllFormFields(this.addForm);  }
      console.log('Permission exists!');
    } else {
      console.log('Permission does not exist.');
      this.router.navigate(['not-permited']);
    }
  });
  
}
update(id:number){
  this.perm = "Product.Update";
  this.PermissionsService.verifiepermissions(this.perm).subscribe(permissionExists => {
    if (permissionExists) {
      this.router.navigate(["dashboard/Products/update", id]);
      console.log('Permission exists!');
    } else {
      console.log('Permission does not exist.');
      this.router.navigate(['not-permited']);
    }
  });
}

delete(prod:any): void{
  this.perm = "Product.Delete";
  this.PermissionsService.verifiepermissions(this.perm).subscribe(permissionExists => {
    if (permissionExists) {
      if(confirm("Are you sure to delete "+prod.name)) {
        console.log("user id :" ,prod.id)
        this.productService.deleteProduct(prod.id).subscribe(
          {
            next: () => {
              let i = this.products.indexOf(prod)
             this.products.splice(i, 1);
              this.toastr.success(prod.name+' has been deleted successfully','Success');
            }, error: (err) => {
              console.log("err" + err.message);
              this.toastr.error('something went wrong !','Error');
      
            }
          }
        )
       
        
      }
      console.log('Permission exists!');
    } else {
      console.log('Permission does not exist.');
      this.router.navigate(['not-permited']);
    }
  });
  
}

}
