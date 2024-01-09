import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { Pagination } from './models/pagination';
import { Product } from './models/product';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Client';
  products?: Product[];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get<Pagination<Product[]>>(
        'https://localhost:5001/api/products?pageSize=50'
      )
      .pipe(map((response) => response.data))
      .subscribe({
        next: (products) => {
          this.products = products;
        },
      });
  }
}
