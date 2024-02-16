import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { StepperNextPreviousComponent } from '../../shared/components/stepper-next-previous/stepper-next-previous.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BasketService } from '../../basket/basket.service';
import { CheckoutService } from '../checkout.service';
import { ToastrService } from 'ngx-toastr';
import { Basket } from '../../shared/models/basket';
import { Address } from '../../shared/models/user';
import { NavigationExtras, Router } from '@angular/router';
import {
  Stripe,
  StripeCardCvcElement,
  StripeCardExpiryElement,
  StripeCardNumberElement,
  loadStripe,
} from '@stripe/stripe-js';
import { CommonModule } from '@angular/common';
import { TextInputComponent } from '../../shared/components/text-input/text-input.component';
import { environment } from '../../../environments/environment';
import { firstValueFrom } from 'rxjs';
import { OrderToCreate } from '../../shared/models/order';

@Component({
  selector: 'app-checkout-payment',
  standalone: true,
  imports: [
    StepperNextPreviousComponent,
    ReactiveFormsModule,
    CommonModule,
    TextInputComponent,
  ],
  templateUrl: './checkout-payment.component.html',
  styleUrl: './checkout-payment.component.scss',
})
export class CheckoutPaymentComponent {
  @Input() checkoutForm?: FormGroup;

  stripe: Stripe | null = null;

  @ViewChild('cardNumber') cardNumberEl?: ElementRef;
  @ViewChild('cardExpiry') cardExpiryEl?: ElementRef;
  @ViewChild('cardCvc') cardCvcEl?: ElementRef;

  cardNumber?: StripeCardNumberElement;
  cardExpiry?: StripeCardExpiryElement;
  cardCvc?: StripeCardCvcElement;

  cardErrors: any;

  constructor(
    private basketService: BasketService,
    private checkoutService: CheckoutService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    loadStripe(environment.stripePublishableKey, { locale: 'en' }).then(
      (stripe) => {
        this.stripe = stripe;
        const elements = stripe?.elements();

        if (elements) {
          this.cardNumber = elements.create('cardNumber');
          this.cardNumber.mount(this.cardNumberEl?.nativeElement);
          this.cardNumber.on('change', (event) => {
            if (event.error) this.cardErrors = event.error.message;
            else this.cardErrors = null;
          });

          this.cardCvc = elements.create('cardCvc');
          this.cardCvc.mount(this.cardCvcEl?.nativeElement);
          this.cardCvc.on('change', (event) => {
            if (event.error) this.cardErrors = event.error.message;
            else this.cardErrors = null;
          });

          this.cardExpiry = elements.create('cardExpiry');
          this.cardExpiry.mount(this.cardExpiryEl?.nativeElement);
          this.cardExpiry.on('change', (event) => {
            if (event.error) this.cardErrors = event.error.message;
            else this.cardErrors = null;
          });
        }
      }
    );
  }

  async onSubmitOrder() {
    this.checkoutService.setLoadingState(true);

    const basket = this.basketService.getCurrentBasketValue();
    if (!basket) return;

    try {
      const createdOrder = await this.onCreateOrder(basket);
      const paymentResult = await this.onConfirmPaymentWithStripe(basket);

      if (paymentResult.paymentIntent) {
        this.basketService.deleteLocalBasket();

        // This is to send the order as an extra to the next redirected page
        const navigationExtras: NavigationExtras = { state: createdOrder };
        this.router.navigate(['Checkout/success'], navigationExtras);
      } else {
        // Displaying error thrown by stripe
        this.toastr.error(paymentResult.error.message);
      }
    } catch (error: any) {
      // Displaying error thrown by me
      this.toastr.error(error.message);
      console.log(error);
    } finally {
      this.checkoutService.setLoadingState(false);
    }
  }

  private async onConfirmPaymentWithStripe(basket: Basket | null) {
    if (!basket) throw new Error('Basket is null');

    const result = this.stripe?.confirmCardPayment(basket.clientSecret!, {
      payment_method: {
        card: this.cardNumber!,
        billing_details: {
          name: this.checkoutForm?.get('paymentForm')?.get('nameOnCard')?.value,
        },
      },
    });

    if (!result) throw new Error('Problem attempting payment with Stripe');

    return result;
  }

  private async onCreateOrder(basket: Basket | null) {
    if (!basket) throw new Error('Basket is null');

    const orderToCreate = this.onGetOrderToCreate(basket);

    return firstValueFrom(this.checkoutService.createOrder(orderToCreate));
  }

  private onGetOrderToCreate(basket: Basket): OrderToCreate {
    const deliveryMethodId: number = this.checkoutForm
      ?.get('deliveryForm')
      ?.get('deliveryMethod')?.value;

    const shipToAddress = this.checkoutForm?.get('addressForm')
      ?.value as Address;

    if (!deliveryMethodId || !shipToAddress)
      throw new Error('Problem with basket');

    return {
      basketId: basket.id,
      deliveryMethodId: deliveryMethodId,
      shipToAddress: shipToAddress,
    };
  }
}
