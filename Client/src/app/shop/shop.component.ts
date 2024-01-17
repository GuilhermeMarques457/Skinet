import { Component, ElementRef, ViewChild } from '@angular/core';
import { Product } from '../shared/models/product';
import { ShopService } from './shop.service';
import { debounceTime, map } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ProductItemComponent } from './product-item/product-item.component';
import { Brand } from '../shared/models/brand';
import { Type } from '../shared/models/type';

import { ShopParams } from '../shared/models/shopParams';
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
  shopParams: ShopParams = new ShopParams();
  form!: FormGroup;

  sortOptions = [
    { name: 'Alphabetical', value: 'name' },
    { name: 'Price: Low to High', value: 'priceAsc' },
    { name: 'Price: High to Low ', value: 'priceDesc' },
  ];

  totalCount = 0;

  // @ViewChild('search') searchText?: ElementRef;

  constructor(private shopService: ShopService) {}

  ngOnInit(): void {
    this.getProducts();
    this.getTypes();
    this.getBrands();

    this.form = new FormGroup({
      search: new FormControl(''),
    });

    this.form.valueChanges.pipe(debounceTime(700)).subscribe((value) => {
      if (value && this.form.controls['search'].value) {
        this.shopParams.search = value.search;
        this.getProducts();
      }
    });
  }

  getProducts() {
    this.shopService
      .getProducts(this.shopParams)
      .pipe(
        map((response) => {
          this.shopParams.pageNumber = response.pageIndex;
          this.shopParams.pageSize = response.pageSize;
          this.totalCount = response.count;
          return response.data;
        })
      )
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
    this.shopParams.pageNumber = 1;
    this.shopParams.brandId = brandId;
    this.getProducts();
  }

  onTypeSelected(typeId: number) {
    this.shopParams.pageNumber = 1;
    this.shopParams.typeId = typeId;
    this.getProducts();
  }

  onSortSelected(event: any) {
    this.shopParams.sort = event.target.value;
    this.getProducts();
  }

  onPageChanged(event: number) {
    if (this.shopParams.pageNumber !== event) {
      this.shopParams.pageNumber = event;

      this.getProducts();
    }
  }

  onSearch() {
    this.shopParams.pageNumber = 1;
    this.shopParams.search = this.form.controls['search'].value;
    this.getProducts();
  }

  onReset() {
    this.form.reset();
    this.shopParams = new ShopParams();
    this.getProducts();
  }
}
