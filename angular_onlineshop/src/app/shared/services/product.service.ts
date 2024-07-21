import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { catchError, map, throwError } from 'rxjs';
import { FbResponseInterface } from '../types/fbResponse.interface';
import { ProductInterface } from '../types/product.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  type = 'phone';
  cartProducts: ProductInterface[] = [];

  constructor(private http: HttpClient) {}

  create(product) {
    return this.http.post(`${environment.fbDbUrl}/products.json`, product).pipe(
      map((res: FbResponseInterface) => {
        return {
          ...product,
          id: res.name,
          date: new Date(product.date),
        };
      })
    );
  }

  getAll() {
    return this.http.get(`${environment.fbDbUrl}/products.json`).pipe(
      map((res) => {
        return Object.keys(res).map((key) => ({
          ...res[key],
          id: key,
          date: new Date(res[key].date),
        }));
      })
    );
  }

  getById(id) {
    return this.http.get(`${environment.fbDbUrl}/products/${id}.json`).pipe(
      map((res: ProductInterface) => {
        return {
          ...res,
          id,
          date: new Date(res.date),
        };
      }),
      catchError((error) => throwError(() => console.log(error)))
    );
  }

  remove(id) {
    return this.http.delete(`${environment.fbDbUrl}/products/${id}.json`);
  }

  update(product: ProductInterface) {
    return this.http.patch(
      `${environment.fbDbUrl}/products/${product.id}.json`,
      product
    );
  }

  setType(type) {
    this.type = type;
  }

  addToCart(product: ProductInterface) {
    this.cartProducts.push(product);
  }
}
