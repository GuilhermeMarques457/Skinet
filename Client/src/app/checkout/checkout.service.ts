import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { DeliveryMethod } from '../shared/models/delivery-method';
import { map } from 'rxjs';
import { Order, OrderToCreate } from '../shared/models/order';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getDeliveryMethods() {
    return this.http
      .get<DeliveryMethod[]>(`${this.baseUrl}Orders/deliveryMethods`)
      .pipe(
        map((data) => {
          return data.sort((a, b) => b.price - a.price);
        })
      );
  }

  createOrder(order: OrderToCreate) {
    return this.http.post<Order>(`${this.baseUrl}Orders`, order);
  }
}
