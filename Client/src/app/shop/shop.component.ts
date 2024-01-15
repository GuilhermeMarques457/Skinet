import { Component } from '@angular/core';
import { Product } from '../shared/models/product';
import { ShopService } from './shop.service';
import { map } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ProductItemComponent } from './product-item/product-item.component';
import { Brand } from '../shared/models/brand';
import { Type } from '../shared/models/type';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [CommonModule, ProductItemComponent],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss',
})
export class ShopComponent {
  products: Product[] = [];
  brands: Brand[] = [];
  types: Type[] = [];
  brandIdSelected = 0;
  typeIdSelected = 0;

  constructor(private shopService: ShopService) {}

  ngOnInit(): void {
    this.getProducts();
    this.getTypes();
    this.getBrands();
  }

  getProducts() {
    this.shopService
      .getProduct(this.brandIdSelected, this.typeIdSelected)
      .pipe(map((response) => response.data))
      .subscribe({
        next: (products) => (this.products = products),
        error: (error) => console.log(error),
      });
  }

  getBrands() {
    this.shopService.getBrands().subscribe({
      next: (brands) => (this.brands = [{ id: 0, name: 'All' }, ...brands]),
      error: (error) => console.log(error),
    });
  }

  getTypes() {
    this.shopService.getTypes().subscribe({
      next: (types) => (this.types = [{ id: 0, name: 'All' }, ...types]),
      error: (error) => console.log(error),
    });
  }

  onBrandSelected(brandId: number) {
    this.brandIdSelected = brandId;
    this.getProducts();
  }

  onTypeSelected(typeId: number) {
    this.typeIdSelected = typeId;
    this.getProducts();
  }
}
