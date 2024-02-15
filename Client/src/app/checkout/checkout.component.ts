import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { OrderTotalsComponent } from '../shared/components/order-totals/order-totals.component';
import { StepperComponent } from '../shared/components/stepper/stepper.component';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { CheckoutAddressComponent } from './checkout-address/checkout-address.component';
import { CheckoutPaymentComponent } from './checkout-payment/checkout-payment.component';
import { CheckoutReviewComponent } from './checkout-review/checkout-review.component';
import { CheckoutSuccessComponent } from './checkout-success/checkout-success.component';
import { CheckoutDeliveryComponent } from './checkout-delivery/checkout-delivery.component';
import { FormBuilder, Validators } from '@angular/forms';
import { AccountService } from '../account/account.service';
import { BasketService } from '../basket/basket.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    CommonModule,
    OrderTotalsComponent,
    StepperComponent,
    CdkStepperModule,
    CheckoutAddressComponent,
    CheckoutPaymentComponent,
    CheckoutReviewComponent,
    CheckoutSuccessComponent,
    CheckoutDeliveryComponent,
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent {
  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private basketService: BasketService
  ) {}

  ngOnInit() {
    this.onGetAddressFormValues();
    this.onGetDeliveryMethodValue();
  }

  checkoutForm = this.fb.group({
    addressForm: this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', Validators.required],
    }),
    deliveryForm: this.fb.group({
      deliveryMethod: ['', Validators.required],
    }),
    paymentForm: this.fb.group({
      nameOnCard: ['', Validators.required],
    }),
  });

  onGetAddressFormValues() {
    this.accountService.getUserAddress().subscribe({
      next: (address) => {
        address && this.checkoutForm.get('addressForm')?.patchValue(address);
      },
    });
  }

  private onGetDeliveryMethodValue() {
    const basket = this.basketService.getCurrentBasketValue();
    if (basket && basket.deliveryMethodId) {
      this.checkoutForm
        .get('deliveryForm')
        ?.get('deliveryMethod')
        ?.patchValue(basket.deliveryMethodId.toString());
    }
  }
}
