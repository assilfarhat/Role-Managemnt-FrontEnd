import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'https://localhost:7030/api/Products/'; // Change the URL to match your API endpoint

  constructor(private http: HttpClient) {}

  getProducts(){
    return this.http.get<any[]>(`${this.baseUrl}GetProduct`);
  }

  

  getProductById(id: number) {
    return this.http.get<any>(`${this.baseUrl}GetProductById/${id}`);
  }

  createProduct(product: any){
    return this.http.post<any>(`${this.baseUrl}CreateProduct`, product);
  }

  updateProduct(id: number, product: any){
    return this.http.put<any>(`${this.baseUrl}UpdateProduct/${id}`, product);
  }

  deleteProduct(id: number) {
    return this.http.delete<any>(`${this.baseUrl}DeleteProduct/${id}`);
  }

}
