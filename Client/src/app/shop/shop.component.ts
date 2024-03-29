import { Component, ElementRef, ViewChild } from '@angular/core';
import { Product } from '../shared/models/product';
import { ShopService } from './shop.service';
import { debounceTime, map } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ProductItemComponent } from './product-item/product-item.component';
import { Brand } from '../shared/models/brand';
import { Type } from '../shared/models/type';

import { ShopParams } from '../shared/models/shop-params';
import { PagingHeaderComponent } from '../shared/components/paging-header/paging-header.component';
import { PagerComponent } from '../shared/components/pager/pager.component';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    ProductItemComponent,
    PagingHeaderComponent,
    PagerComponent,
  ],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss',
})
export class ShopComponent {
  products: Product[] = [];
  brands: Brand[] = [];
  types: Type[] = [];
  form!: FormGroup;
  seeAllBrands = false;
  seeAllTypes = false;

  sortOptions = [
    { name: 'Alphabetical', value: 'name' },
    { name: 'Price: Low to High', value: 'priceAsc' },
    { name: 'Price: High to Low ', value: 'priceDesc' },
  ];

  totalCount = 0;

  constructor(public shopService: ShopService) {}

  ngOnInit(): void {
    this.getProducts();
    this.getTypes();
    this.getBrands();

    this.form = new FormGroup({
      search: new FormControl(''),
    });

    this.form.valueChanges.pipe(debounceTime(700)).subscribe((value) => {
      if (value && this.form.controls['search'].value) {
        const params = this.shopService.getShopParams();
        params.search = value.search;
        this.shopService.setShopParams(params);
        this.getProducts();
      }
    });
  }

  getProducts() {
    this.shopService.getProducts().subscribe({
      next: (response) => {
        this.products = response.data;
        this.totalCount = response.count;
      },
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
    const params = this.shopService.getShopParams();
    params.pageNumber = 1;
    params.brandId = brandId;
    this.shopService.setShopParams(params);
    this.getProducts();
  }

  onTypeSelected(typeId: number) {
    const params = this.shopService.getShopParams();
    params.pageNumber = 1;
    params.typeId = typeId;
    this.shopService.setShopParams(params);
    this.getProducts();
  }

  onSortSelected(event: any) {
    const params = this.shopService.getShopParams();
    params.sort = event.target.value;
    this.shopService.setShopParams(params);
    this.getProducts();
  }

  onPageChanged(event: number) {
    const params = this.shopService.getShopParams();
    if (params.pageNumber !== event) {
      params.pageNumber = event;
      this.shopService.setShopParams(params);
      this.getProducts();
    }
  }

  onSearch() {
    const params = this.shopService.getShopParams();
    params.pageNumber = 1;
    params.search = this.form.controls['search'].value;
    this.shopService.setShopParams(params);
    this.getProducts();
  }

  onReset() {
    this.form.reset();
    this.shopService.setShopParams(new ShopParams());
    this.getProducts();
  }

  onSeeAllBrands() {
    this.seeAllBrands = true;
  }

  onSeeAllTypes() {
    this.seeAllTypes = true;
  }
}
