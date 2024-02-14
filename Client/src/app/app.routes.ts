import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TestErrorComponent } from './core/test-error/test-error.component';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { ServerErrorComponent } from './core/server-error/server-error.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, data: { breadcrumb: 'Home' } },
  { path: 'test-error', component: TestErrorComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: 'server-error', component: ServerErrorComponent },
  {
    path: 'Shop',
    loadChildren: () =>
      import('./shop/shop.routing').then((r) => r.ShopRouting),
  },
  {
    path: 'Basket',
    loadChildren: () =>
      import('./basket/basket.routing').then((r) => r.BasketRouting),
  },
  {
    path: 'Checkout',
    loadChildren: () =>
      import('./checkout/checkout.routing').then((r) => r.CheckoutRouting),
  },
  {
    path: 'Account',
    loadChildren: () =>
      import('./account/account.routing').then((r) => r.AccountRouting),
  },
  {
    path: 'Orders',
    loadChildren: () =>
      import('./order/order.routing').then((r) => r.OrderRouting),
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
