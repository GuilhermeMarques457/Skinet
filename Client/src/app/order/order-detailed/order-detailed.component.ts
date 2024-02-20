import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { OrderService } from '../order.service';
import { ActivatedRoute } from '@angular/router';
import { Order } from '../../shared/models/order';
import { BreadcrumbService } from 'xng-breadcrumb';
import { Subscription, take } from 'rxjs';

@Component({
  selector: 'app-order-detailed',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-detailed.component.html',
  styleUrl: './order-detailed.component.scss',
})
export class OrderDetailedComponent {
  order?: Order;
  orderId: number = 0;

  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute,
    private bcService: BreadcrumbService
  ) {}

  ngOnInit() {
    this.route.params.subscribe({
      next: (params: any) => {
        this.orderId = params.id;
      },
    });

    this.orderService
      .getOrderById(this.orderId)
      .pipe(take(1))
      .subscribe({
        next: (order) => {
          this.order = order;

          this.bcService.breadcrumbs$
            .subscribe((data) => {
              data[
                data.length - 1
              ].label = `Order#${order.id} - ${order.status}`;
            })
            .unsubscribe();
        },
      });
  }
}
