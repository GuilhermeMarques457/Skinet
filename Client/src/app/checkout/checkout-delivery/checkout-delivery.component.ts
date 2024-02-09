import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextInputComponent } from '../../shared/components/text-input/text-input.component';
import { DeliveryMethod } from '../../shared/models/delivery-method';
import { CheckoutService } from '../checkout.service';
import { take } from 'rxjs';
import { StepperNextPreviousComponent } from '../../shared/components/stepper-next-previous/stepper-next-previous.component';
import { BasketService } from '../../basket/basket.service';

@Component({
  selector: 'app-checkout-delivery',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TextInputComponent,
    StepperNextPreviousComponent,
  ],
  templateUrl: './checkout-delivery.component.html',
  styleUrl: './checkout-delivery.component.scss',
})
export class CheckoutDeliveryComponent {
  @Input() checkoutForm?: FormGroup;
  deliveryMethods: DeliveryMethod[] = [];

  constructor(
    private checkoutService: CheckoutService,
    private basketService: BasketService
  ) {}

  ngOnInit() {
    this.checkoutService
      .getDeliveryMethods()
      .pipe(take(1))
      .subscribe({
        next: (data) => {
          this.deliveryMethods = data;
        },
      });
  }

  onSetShippingPrice(deliveryMethod: DeliveryMethod) {
    this.basketService.setShippingPrice(deliveryMethod);
  }
}
