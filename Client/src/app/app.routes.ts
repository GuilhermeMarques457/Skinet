import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'Shop',
    loadChildren: () =>
      import('./shop/shop.routing').then((r) => r.ShopRouting),
  },
];
