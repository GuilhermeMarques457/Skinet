import { Component } from '@angular/core';
import { BasketService } from './basket.service';
import { CommonModule } from '@angular/common';
import { OrderTotalsComponent } from '../shared/components/order-totals/order-totals.component';
import { BasketItem } from '../shared/models/basket';
import { RouterModule } from '@angular/router';
import { BasketSummaryComponent } from '../shared/components/basket-summary/basket-summary.component';

@Component({
  selector: 'app-basket',
  standalone: true,
  imports: [
    CommonModule,
    OrderTotalsComponent,
    RouterModule,
    BasketSummaryComponent,
  ],
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.scss',
})
export class BasketComponent {
  constructor(public basketService: BasketService) {}

  onIncrementQuantity(item: BasketItem) {
    this.basketService.addItemToBasket(item);
  }

  onRemoveItem(basketEvent: { id: number; quantity: number }) {
    this.basketService.removeItemFromBasket(
      basketEvent.id,
      basketEvent.quantity
    );
  }
}
