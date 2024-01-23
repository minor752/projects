import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-icon',
  imports: [CommonModule],
  template: ` <i *ngIf="icon" [class]="icon"></i> `,
})
export class IconComponent {
  @Input() icon?: string;
}
