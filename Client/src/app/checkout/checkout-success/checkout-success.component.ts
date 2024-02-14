import { Component } from '@angular/core';
import { StepperNextPreviousComponent } from '../../shared/components/stepper-next-previous/stepper-next-previous.component';
import { Router, RouterModule } from '@angular/router';
import { Order } from '../../shared/models/order';

@Component({
  selector: 'app-checkout-success',
  standalone: true,
  imports: [StepperNextPreviousComponent, RouterModule],
  templateUrl: './checkout-success.component.html',
  styleUrl: './checkout-success.component.scss',
})
export class CheckoutSuccessComponent {
  order?: Order;
  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();

    this.order = navigation?.extras?.state as Order;
  }
}
