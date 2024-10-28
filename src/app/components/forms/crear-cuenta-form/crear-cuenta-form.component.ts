import { Component } from '@angular/core';
import { ButtonComponent } from '../../button/button.component';
import { CommonModule } from '@angular/common';
import { SelectComponent } from '../../select/select.component';
import { FormsModule } from '@angular/forms';
import { InputComponent } from '../../input/input.component';

@Component({
  selector: 'app-CrearCuentaForm',
  standalone: true,
  imports: [ButtonComponent,CommonModule,InputComponent,SelectComponent,FormsModule],
  templateUrl: './crear-cuenta-form.component.html',
  styleUrl: './crear-cuenta-form.component.css'
})
export class CrearCuentaFormComponent {
  tipoCuenta: string = '';
  saldo: number | null = null;
}
