import { Route } from '@angular/router';
import { CheckoutComponent } from './checkout.component';
import { authGuard } from '../core/guards/auth.guard';

export const CheckoutRouting: Route[] = [
  {
    path: '',
    canActivate: [authGuard],
    component: CheckoutComponent,
  },
];
