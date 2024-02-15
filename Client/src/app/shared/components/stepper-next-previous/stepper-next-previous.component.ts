import { CdkStepperModule } from '@angular/cdk/stepper';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';

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

  @Output() submitStepper = new EventEmitter<any>();
  @Output() paymentIntentStepper = new EventEmitter<any>();

  onSubmitStepper() {
    this.submitStepper.emit();
  }

  onCreatePaymentIntentStepper() {
    this.paymentIntentStepper.emit();
  }
}
