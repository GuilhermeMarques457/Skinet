import { Component } from '@angular/core';
import { Product } from '../../shared/models/product';
import { ShopService } from '../shop.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BreadcrumbService } from 'xng-breadcrumb';
import { BasketService } from '../../basket/basket.service';
import { BasketItem } from '../../shared/models/basket';
import { take, tap } from 'rxjs';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent {
  product?: Product;
  quantity = 1;
  quantityInBasket = 0;

  constructor(
    private shopService: ShopService,
    private route: ActivatedRoute,
    private bcService: BreadcrumbService,
    public basketService: BasketService
  ) {
    this.bcService.set('@productDetails', ' ');
  }

  ngOnInit() {
    this.loadProduct();
  }

  loadProduct() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id)
      this.shopService.getProduct(+id).subscribe({
        next: (response) => {
          this.product = response;

          this.bcService.set('@productDetails', this.product!.name);
          this.basketService.basketSource$.pipe(take(1)).subscribe({
            next: (basket) => {
              const item = basket?.items.find((x) => x.id === +id);
              if (item) {
                this.quantity = item.quantity;
                this.quantityInBasket = item.quantity;
              }
            },
          });
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  onIncrementQuantity() {
    this.quantity++;
  }

  onDecrementQuantity() {
    this.quantity--;
  }

  onUpdateBasket() {
    if (!this.product) return;

    if (this.quantity > this.quantityInBasket) {
      const itemsToAdd = this.quantity - this.quantityInBasket;
      this.quantityInBasket += itemsToAdd;

      this.basketService.addItemToBasket(this.product, itemsToAdd);
    } else {
      const itemsToRemove = this.quantityInBasket - this.quantity;
      this.quantityInBasket -= itemsToRemove;

      this.basketService.removeItemFromBasket(this.product.id, itemsToRemove);
    }
  }

  // Used to display information that is already calculated inside my component
  get buttonText() {
    return this.quantityInBasket === 0 ? 'Add to basked' : 'Update basket';
  }
}
