import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BreadcrumbModule, BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-section-header',
  standalone: true,
  imports: [CommonModule, BreadcrumbModule],
  templateUrl: './section-header.component.html',
  styleUrl: './section-header.component.scss',
})
export class SectionHeaderComponent {
  constructor(public bcService: BreadcrumbService) {
    bcService.breadcrumbs$.subscribe((data) => {});
  }
}
