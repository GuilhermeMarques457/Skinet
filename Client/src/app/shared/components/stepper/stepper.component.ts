import { Component, Input, OnInit } from '@angular/core';
import { CdkStepper, CdkStepperModule } from '@angular/cdk/stepper';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stepper',
  standalone: true,
  imports: [CdkStepperModule, CommonModule],
  templateUrl: './stepper.component.html',
  providers: [{ provide: CdkStepper, useExisting: StepperComponent }],
  styleUrl: './stepper.component.scss',
})
export class StepperComponent extends CdkStepper implements OnInit {
  @Input() linearModeSelected = true;

  ngOnInit(): void {
    this.linear = this.linearModeSelected;
  }

  onClick(index: number) {
    this.selectedIndex = index;
  }
}
