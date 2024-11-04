import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex flex-col w-full">
      <select (change)="onSelectChange($event)" class="w-full p-2 border rounded-lg bg-white">
        <option value="">{{ selectPlaceHolder }}</option>
        <option *ngFor="let option of options" [value]="option">{{ option }}</option>
      </select>
    </div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true
    }
  ]
})
export class SelectComponent implements ControlValueAccessor {
  @Input() selectPlaceHolder: string = 'Selecciona una opción';
  @Input() options: string[] = [];

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

  onSelectChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.value = target.value;
    console.log("Cuenta seleccionada: ", this.value);
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