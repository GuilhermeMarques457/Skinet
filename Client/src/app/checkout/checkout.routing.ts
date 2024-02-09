import { Route } from '@angular/router';
import { CheckoutComponent } from './checkout.component';
import { authGuard } from '../core/guards/auth.guard';
import { CheckoutSuccessComponent } from './checkout-success/checkout-success.component';

export const CheckoutRouting: Route[] = [
  {
    path: '',
    canActivate: [authGuard],
    component: CheckoutComponent,
  },
  {
    path: 'success',
    canActivate: [authGuard],
    component: CheckoutSuccessComponent,
  },
];
