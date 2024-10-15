import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cuentaCard',
  standalone: true,
  imports: [],
  templateUrl: './cuenta-card-details.component.html',
  styleUrl: './cuenta-card-details.component.css'
})
export class CuentaCardDetailsComponent {
  
  @Input() numeroTarjeta!: string;
  @Input() saldo!: number;
  @Input() tipoCuenta!: string;
  
}
