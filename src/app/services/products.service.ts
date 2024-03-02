import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from './product.mode';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  PRODUCT_URL = 'https://api.escuelajs.co/api/v1/products';

  constructor(private _http: HttpClient) { }

  getProduct(): Observable<IProduct[]> {
    return this._http.get<IProduct[]>(`${this.PRODUCT_URL}`)
  }

}
