import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BasketItem } from '../../models/basket';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BasketService } from '../../../basket/basket.service';

@Component({
  selector: 'app-basket-summary',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './basket-summary.component.html',
  styleUrl: './basket-summary.component.scss',
})
export class BasketSummaryComponent {
  @Output() addItem = new EventEmitter<BasketItem>();
  // prettier-ignore
  @Output() removeItem = new EventEmitter<{ id: number, quantity: number }>();
  @Input() isBasket = true;

  constructor(public basketService: BasketService) {}

  onAddBasketItem(item: BasketItem) {
    this.addItem.emit(item);
  }

  onRemoveBasketItem(id: number, quantity = 1) {
    this.removeItem.emit({ id, quantity });
  }
}
