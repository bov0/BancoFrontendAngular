import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tarjetaCard',
  standalone: true,
  imports: [],
  templateUrl: './tarjeta-card-details.component.html',
  styleUrls: ['./tarjeta-card-details.component.css']
})
export class TarjetaCardDetailsComponent {
  @Input() numeroTarjeta!: string;
  @Input() limiteCredito!: number;
  @Input() fechaVencimiento!: number[];
  @Input() numeroCuenta!: string;

  meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

  convertirFecha(fechaArray: number[]): string {
    if (!fechaArray || fechaArray.length < 3) {
      return 'Fecha no disponible';
    }
    
    const [year, month, day] = fechaArray;
    const diaConCero = String(day).padStart(2, '0');
    return `${diaConCero} de ${this.meses[month - 1]} de ${year}`;
  }

  convertirNumTarjeta(numero: string): string {
    if (!numero) return '';
    return numero.replace(/(.{4})/g, '$1-').slice(0, -1);
  }
}
