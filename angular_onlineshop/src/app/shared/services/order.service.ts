import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';
import { FbResponseInterface } from '../types/fbResponse.interface';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private router: Router, private http: HttpClient) {}

  create(order) {
    return this.http.post(`${environment.fbDbUrl}/orders.json`, order).pipe(
      map((res: FbResponseInterface) => {
        return {
          ...order,
          id: res.name,
          date: new Date(order.date),
        };
      })
    );
  }

  getAll() {
    return this.http.get(`${environment.fbDbUrl}/orders.json`).pipe(
      map((res) => {
        return Object.keys(res).map((key) => ({
          ...res[key],
          id: key,
          date: new Date(res[key].date),
        }));
      })
    );
  }

  remove(id) {
    return this.http.delete(`${environment.fbDbUrl}/orders/${id}.json`);
  }
}
