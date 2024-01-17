import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'Shop',
    loadChildren: () =>
      import('./shop/shop.routing').then((r) => r.ShopRouting),
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
