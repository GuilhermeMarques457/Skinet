import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { OrderService } from './order.service';
import { Order } from '../shared/models/order';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss',
})
export class OrderComponent {
  orders: Order[] = [];
  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.orderService.getOrdersList().subscribe({
      next: (orders) => {
        this.orders = orders;
      },
    });
  }
}
