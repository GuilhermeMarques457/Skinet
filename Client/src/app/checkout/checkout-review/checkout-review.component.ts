import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BasketSummaryComponent } from '../../shared/components/basket-summary/basket-summary.component';
import { StepperNextPreviousComponent } from '../../shared/components/stepper-next-previous/stepper-next-previous.component';
import { BasketService } from '../../basket/basket.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-checkout-review',
  standalone: true,
  imports: [CommonModule, BasketSummaryComponent, StepperNextPreviousComponent],
  templateUrl: './checkout-review.component.html',
  styleUrl: './checkout-review.component.scss',
})
export class CheckoutReviewComponent {
  constructor(
    private basketService: BasketService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {}

  onCreatePaymentIntent(event: any) {
    this.basketService.createPaymentIntent().subscribe({
      next: (response) => this.toastr.success('Payment Intent created xD'),
      error: () =>
        this.toastr.error(
          'Payment Intent failed to be created, come back later'
        ),
    });
  }
}
