import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextInputComponent } from '../../shared/components/text-input/text-input.component';
import { RouterModule } from '@angular/router';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { StepperNextPreviousComponent } from '../../shared/components/stepper-next-previous/stepper-next-previous.component';
import { AccountService } from '../../account/account.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-checkout-address',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TextInputComponent,
    RouterModule,
    StepperNextPreviousComponent,
  ],
  templateUrl: './checkout-address.component.html',
  styleUrl: './checkout-address.component.scss',
})
export class CheckoutAddressComponent {
  @Input() checkoutForm?: FormGroup;

  constructor(
    private accountService: AccountService,
    private toastr: ToastrService
  ) {}

  onSaveUpdatedUserAddress() {
    this.accountService
      .updateUserAddress(this.checkoutForm?.get('addressForm')?.value)
      .subscribe({
        next: (address) => {
          this.toastr.success('Address Saved');
          this.checkoutForm
            ?.get('addressForm')
            ?.reset(this.checkoutForm?.get('addressForm')?.value);
        },
      });
  }
}
