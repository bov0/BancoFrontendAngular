import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [HlmInputDirective],
  template: `<input class="w-full" hlmInput [name]="name" [placeholder]="placeholder" [type]="type" (input)="onInputChange($event)" />`,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ]
})
export class InputComponent implements ControlValueAccessor {
  @Input() name: string = 'text';
  @Input() placeholder: string = '';
  @Input() type: string = 'text';

  private _value: any;
  onChange: (value: any) => void = () => {};
  onTouched: () => void = () => {};

  get value(): any {
    return this._value;
  }

  set value(val: any) {
    this._value = val;
    this.onChange(val);
    this.onTouched();
  }

  onInputChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
  }

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
