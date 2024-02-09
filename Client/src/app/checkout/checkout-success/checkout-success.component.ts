import { Component } from '@angular/core';
import { StepperNextPreviousComponent } from '../../shared/components/stepper-next-previous/stepper-next-previous.component';

@Component({
  selector: 'app-checkout-success',
  standalone: true,
  imports: [StepperNextPreviousComponent],
  templateUrl: './checkout-success.component.html',
  styleUrl: './checkout-success.component.scss',
})
export class CheckoutSuccessComponent {}
