import { Component, OnInit } from '@angular/core';
import {  FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/core/services/product.service';
import { Customvalidator } from 'src/app/core/utils/custumvalidator';

@Component({
  selector: 'app-productupdate',
  templateUrl: './productupdate.component.html',
  styleUrls: ['./productupdate.component.css']
})
export class ProductupdateComponent implements OnInit {
prod :any;
addForm: FormGroup;
  constructor(private productService:ProductService,private formBuilder: FormBuilder,
    private currentRoute: ActivatedRoute,private router: Router,private toastr: ToastrService) { }

  ngOnInit(): void {
  this.initform();    
    

  
  }
  initform() { 

    let id = this.currentRoute.snapshot.params['id'];
    this.productService.getProductById(id).subscribe(res=>
        { this.prod = res;
       
        } )
        console.log("update" ,this.prod);

    this.addForm = this.formBuilder.group({
      Name: ['', [Validators.minLength(3), Validators.required]],
      Price: ['', Validators.required],
      Image: ['', Validators.required],
    });
    this.addForm = new FormGroup({
      'Name': new FormControl(this.prod.name,[Validators.minLength(3), Validators.required]),
      'Price': new FormControl(this.prod.price, Validators.required),
      'Image': new FormControl(this.prod.image, Validators.required),
      
      })
  }
  addprod(){
    
    let id = this.currentRoute.snapshot.params['id'];
    if (this.addForm.valid) {
      console.log("1",this.addForm.value);
      let prod = {
        ...this.addForm.value 
      }
      console.log("prod",prod)
      this.productService.updateProduct(id,prod)
      .subscribe({
        next:(res=>{
          console.log(res);
  
          this.toastr.success('product updated successfully ')   
          this.router.navigate(['products']);
        }),
        error:(err=>{
          console.log(err.message);
          this.toastr.error('something went wrong')
        })
      })
    } else {
      Customvalidator.validateAllFormFields(this.addForm);  }
  }
}
