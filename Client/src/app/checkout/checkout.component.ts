import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { OrderTotalsComponent } from '../shared/components/order-totals/order-totals.component';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, OrderTotalsComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent {}
