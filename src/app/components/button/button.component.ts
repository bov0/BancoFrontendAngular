import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [HlmButtonDirective,NgClass],
  template: `<button hlmBtn [ngClass]="class" class="shadow-2xl">{{ contenidoButton }}</button>`,
})
export class ButtonComponent {
  @Input() contenidoButton!: string;
  @Input() class!: string;
}
