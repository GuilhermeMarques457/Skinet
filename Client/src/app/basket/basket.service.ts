import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';
import { Basket, BasketItem, BasketTotals } from '../shared/models/basket';
import { HttpClient } from '@angular/common/http';
import { Product } from '../shared/models/product';
import { DeliveryMethod } from '../shared/models/delivery-method';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  private baseUrl = environment.apiUrl;
  private basketSource = new BehaviorSubject<Basket | null>(null);
  private basketTotalSource = new BehaviorSubject<BasketTotals | null>(null);

  public basketSource$ = this.basketSource.asObservable();
  public basketTotalSource$ = this.basketTotalSource.asObservable();
  shipping = 0;

  constructor(private http: HttpClient) {}

  getBasket(id: string) {
    return this.http.get<Basket>(`${this.baseUrl}basket?id=${id}`).subscribe({
      next: (response) => {
        this.basketSource.next(response);
        this.calculateTotals();
      },
    });
  }

  postBasket(basket: Basket) {
    return this.http.post<Basket>(`${this.baseUrl}basket`, basket).subscribe({
      next: (response) => {
        this.basketSource.next(response);
        this.calculateTotals();
      },
    });
  }

  deleteBasket(basket: Basket) {
    this.http.delete(`${this.baseUrl}basket?id=${basket.id}`).subscribe({
      next: (response) => {
        this.deleteLocalBasket();
      },
    });
  }

  deleteLocalBasket() {
    this.basketSource.next(null);
    this.basketTotalSource.next(null);
    localStorage.removeItem('basket_id');
  }

  getCurrentBasketValue() {
    return this.basketSource.value;
  }

  addItemToBasket(item: Product | BasketItem, quantity = 1) {
    // We could do this way to check which kind of type is our item
    // if('productBrand' in item) this.mapProductToBasketItem(item);
    if (this.isProduct(item)) item = this.mapProductToBasketItem(item);

    const basket = this.getCurrentBasketValue() ?? this.createBasket();
    basket.items = this.upsertBasketItem(basket.items, item, quantity);
    this.postBasket(basket);
  }

  removeItemFromBasket(id: number, quantity = 1) {
    const basket = this.getCurrentBasketValue();
    if (!basket) return;

    const item = basket.items.find((x) => x.id == id);
    if (!item) return;

    item.quantity -= quantity;

    if (item.quantity === 0)
      basket.items = basket.items.filter((x) => x.id !== id);

    if (basket.items.length > 0) this.postBasket(basket);
    else this.deleteBasket(basket);
  }

  setShippingPrice(deliveryMethod: DeliveryMethod) {
    this.shipping = deliveryMethod.price;
    this.calculateTotals();
  }

  private upsertBasketItem(
    items: BasketItem[],
    itemToAdd: BasketItem,
    quantity: number
  ): BasketItem[] {
    const item = items.find((x) => x.id === itemToAdd.id);
    if (item) item.quantity += quantity;
    else {
      itemToAdd.quantity = quantity;
      items.push(itemToAdd);
    }

    return items;
  }

  private createBasket(): Basket {
    const basket = new Basket();
    localStorage.setItem('basket_id', basket.id);

    return basket;
  }

  private mapProductToBasketItem(item: Product): BasketItem {
    return {
      id: item.id,
      productName: item.name,
      price: item.price,
      quantity: 0,
      pictureUrl: item.pictureUrl,
      brand: item.productBrand,
      type: item.productType,
    };
  }

  private calculateTotals() {
    const basket = this.getCurrentBasketValue();
    if (!basket) return;

    const subtotal = basket.items.reduce(
      (sum, item) => item.quantity * item.price + sum,
      0
    );

    const total = subtotal + this.shipping;
    this.basketTotalSource.next({ shipping: this.shipping, total, subtotal });
  }

  // THIS IS A WAY OF CHECKING WHICH TYPE IS MY OBJECT XD (VERY USEFULL)
  private isProduct(item: Product | BasketItem): item is Product {
    return (item as Product).productBrand !== undefined;
  }
}
