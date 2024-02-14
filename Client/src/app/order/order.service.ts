import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../shared/models/order';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private BASE_URL = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getOrdersList() {
    return this.http.get<Order[]>(`${this.BASE_URL}Orders`);
  }

  getOrderById(id: number) {
    return this.http.get<Order>(`${this.BASE_URL}Orders/${id}`);
  }
}
