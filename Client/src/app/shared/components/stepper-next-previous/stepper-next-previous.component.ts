import { CdkStepperModule } from '@angular/cdk/stepper';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CheckoutService } from '../../../checkout/checkout.service';
import { Subscription, debounceTime, distinctUntilChanged } from 'rxjs';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-stepper-next-previous',
  standalone: true,
  imports: [RouterModule, CdkStepperModule, CommonModule],
  templateUrl: './stepper-next-previous.component.html',
  styleUrl: './stepper-next-previous.component.scss',
})
export class StepperNextPreviousComponent {
  @Input() nextStep: string = '';
  @Input() previousStep: string = '';
  @Input() formIsValid?: boolean = false;

  @Output() submitStepper = new EventEmitter<any>();
  @Output() paymentIntentStepper = new EventEmitter<any>();

  loading = false;

  loadingSubs$ = new Subscription();

  constructor(private checkoutService: CheckoutService) {}

  ngOnInit() {
    if (this.nextStep == 'Submit Order') {
      this.loadingSubs$ = this.checkoutService
        .getLoadingState()
        .subscribe((loadingState) => {
          this.loading = loadingState;
        });
    }
  }

  ngOnDestroy() {
    this.loadingSubs$.unsubscribe();
  }

  onSubmitStepper() {
    this.submitStepper.emit();
  }

  onCreatePaymentIntentStepper() {
    this.paymentIntentStepper.emit();
  }
}
