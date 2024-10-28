import { Component, Input } from '@angular/core';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [HlmInputDirective],
  template: `<input class="w-full" hlmInput [name]="name" [placeholder]="placeholder" [type]="type" />`,
})
export class InputComponent {
  @Input() name: string = 'text';
  @Input() placeholder: string = '';
  @Input() type: string = 'text';
}
