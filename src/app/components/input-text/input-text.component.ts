import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-input-text',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex flex-col w-full">
      <input 
        type="text" 
        [placeholder]="placeholder" 
        (input)="onInputChange($event)" 
        class="w-full p-2 border rounded-lg bg-white" 
      />
    </div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputTextComponent),
      multi: true
    }
  ]
})
export class InputTextComponent implements ControlValueAccessor {
  @Input() placeholder: string = 'Ingrese un valor';

  private _value: string | undefined;
  onChange: (value: string | undefined) => void = () => {};
  onTouched: () => void = () => {};

  get value(): string | undefined {
    return this._value;
  }

  set value(val: string | undefined) {
    this._value = val;
    this.onChange(val);
    this.onTouched();
  }

  onInputChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    console.log("Valor ingresado: ", this.value);
  }

  writeValue(value: string | undefined): void {
    this.value = value;
  }

  registerOnChange(fn: (value: string | undefined) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}