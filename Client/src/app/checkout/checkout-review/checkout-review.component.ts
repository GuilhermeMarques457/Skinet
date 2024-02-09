import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BasketSummaryComponent } from '../../shared/components/basket-summary/basket-summary.component';
import { StepperNextPreviousComponent } from '../../shared/components/stepper-next-previous/stepper-next-previous.component';

@Component({
  selector: 'app-checkout-review',
  standalone: true,
  imports: [CommonModule, BasketSummaryComponent, StepperNextPreviousComponent],
  templateUrl: './checkout-review.component.html',
  styleUrl: './checkout-review.component.scss',
})
export class CheckoutReviewComponent {
  ngOnInit() {}
}
