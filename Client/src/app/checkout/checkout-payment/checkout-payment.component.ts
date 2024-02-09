import { Component, Input } from '@angular/core';
import { StepperNextPreviousComponent } from '../../shared/components/stepper-next-previous/stepper-next-previous.component';
import { FormGroup } from '@angular/forms';
import { BasketService } from '../../basket/basket.service';
import { CheckoutService } from '../checkout.service';
import { ToastrService } from 'ngx-toastr';
import { Basket } from '../../shared/models/basket';
import { Address } from '../../shared/models/user';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-checkout-payment',
  standalone: true,
  imports: [StepperNextPreviousComponent],
  templateUrl: './checkout-payment.component.html',
  styleUrl: './checkout-payment.component.scss',
})
export class CheckoutPaymentComponent {
  @Input() checkoutForm?: FormGroup;

  constructor(
    private basketService: BasketService,
    private checkoutService: CheckoutService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  onSubmitOrder() {
    const basket = this.basketService.getCurrentBasketValue();
    if (!basket) return;

    const orderToCreate = this.getOrderToCreate(basket);
    if (!orderToCreate) return;

    this.checkoutService.createOrder(orderToCreate).subscribe({
      next: (order) => {
        this.toastr.success('Order were created Successfully');
        this.basketService.deleteLocalBasket();

        const navigationExtras: NavigationExtras = { state: order };
        this.router.navigate(['Checkout/success'], navigationExtras);
      },
    });
  }

  private getOrderToCreate(basket: Basket) {
    const deliveryMethodId: number = this.checkoutForm
      ?.get('deliveryForm')
      ?.get('deliveryMethod')?.value;

    const shipToAddress = this.checkoutForm?.get('addressForm')
      ?.value as Address;

    if (!deliveryMethodId || !shipToAddress) return;

    return {
      basketId: basket.id,
      deliveryMethodId: deliveryMethodId,
      shipToAddress: shipToAddress,
    };
  }
}
