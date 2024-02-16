import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { BasketSummaryComponent } from '../../shared/components/basket-summary/basket-summary.component';
import { StepperNextPreviousComponent } from '../../shared/components/stepper-next-previous/stepper-next-previous.component';
import { BasketService } from '../../basket/basket.service';
import { ToastrService } from 'ngx-toastr';
import { CdkStepper } from '@angular/cdk/stepper';

@Component({
  selector: 'app-checkout-review',
  standalone: true,
  imports: [CommonModule, BasketSummaryComponent, StepperNextPreviousComponent],
  templateUrl: './checkout-review.component.html',
  styleUrl: './checkout-review.component.scss',
})
export class CheckoutReviewComponent {
  @Input() appStepper?: CdkStepper;

  constructor(
    private basketService: BasketService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {}

  onCreatePaymentIntent(event: any) {
    this.basketService.createPaymentIntent().subscribe({
      next: (response) => {
        this.toastr.success('Payment Intent created xD');
        this.appStepper?.next();
      },
      error: () =>
        this.toastr.error(
          'Payment Intent failed to be created, come back later'
        ),
    });
  }
}
