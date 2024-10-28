import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { BrnSelectImports } from '@spartan-ng/ui-select-brain';
import { HlmSelectImports } from '@spartan-ng/ui-select-helm';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [BrnSelectImports, HlmSelectImports,CommonModule],
  template: `
    <brn-select class="w-full" [placeholder]="selectPlaceHolder || 'Select an option'">
      <hlm-select-trigger class="w-full">
        <hlm-select-value />
      </hlm-select-trigger>
      <hlm-select-content>
        <ng-container *ngFor="let option of options">
          <hlm-option [value]="option">{{ option }}</hlm-option>
        </ng-container>
      </hlm-select-content>
    </brn-select>
  `,
})
export class SelectComponent {
  @Input() selectPlaceHolder: string = 'Select an option';
  @Input() options: string[] = [];
}