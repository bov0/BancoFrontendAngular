import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {
  HlmCaptionComponent,
  HlmTableComponent,
  HlmTdComponent,
  HlmThComponent,
  HlmTrowComponent,
} from '@spartan-ng/ui-table-helm';

@Component({
  selector: 'app-transacciones-table',
  standalone: true,
  imports: [HlmTableComponent, HlmTrowComponent, HlmThComponent, HlmTdComponent, HlmCaptionComponent, CommonModule],
  host: {
    class: 'w-full overflow-x-auto',
  },
  template: `
          <hlm-table class="w-full md:w-4/6 rounded-xl shadow-2xl border-2 border-solid border-gray-50">
            <hlm-caption class="pb-6">
                Transacciones para {{ cuentaNumero }}
            </hlm-caption>
              <hlm-trow>
                <hlm-th class="w-1/5">Fecha</hlm-th>
                <hlm-th class="w-1/5">Hora</hlm-th>
                <hlm-th class="w-1/5">Tipo de Transacción</hlm-th>
                <hlm-th class="w-1/5">Sector</hlm-th>
                <hlm-th class="w-1/5">Monto</hlm-th>
              </hlm-trow>

              <hlm-trow *ngFor="let transaccion of transacciones">
                <hlm-td class="w-1/5">{{ convertirFecha(transaccion.fecha) }}</hlm-td>
                <hlm-td class="w-1/5">{{ convertirHora(transaccion.fecha) }}</hlm-td>
                <hlm-td class="w-1/5">{{ transaccion.tipoTransaccion }}</hlm-td>
                <hlm-td class="w-1/5">{{ transaccion.sector }}</hlm-td>
                <hlm-td class="w-1/5 font-semibold">{{ transaccion.monto }}€</hlm-td>
              </hlm-trow>

          <hlm-trow *ngIf="transacciones.length === 0" class="bg-muted/50 hover:bg-muted">
            <hlm-td colspan="5" class="text-center font-semibold">No hay transacciones</hlm-td>
          </hlm-trow>
        </hlm-table>
  `,
})
export class TableTransaccionesComponent implements OnInit {
  @Input() transacciones: any[] = [];
  @Input() cuentaNumero: string = '';

  ngOnInit() {
    console.log('Transacciones recibidas:', this.transacciones);
  }

  // Función para convertir fechas (maneja arrays de longitud 5 y 6)
  convertirFecha(fechaArray: number[]): string {
    if (fechaArray.length === 5) {
      // Si la longitud es 5 (año, mes, día, hora, minuto)
      const [year, month, day] = fechaArray;
      const mesConCero = String(month).padStart(2, '0');
      const diaConCero = String(day).padStart(2, '0');
      return `${diaConCero}/${mesConCero}/${year}`;
    } else if (fechaArray.length === 6) {
      // Si la longitud es 6 (año, mes, día, hora, minuto, segundo)
      const [year, month, day] = fechaArray;
      const mesConCero = String(month).padStart(2, '0');
      const diaConCero = String(day).padStart(2, '0');
      return `${diaConCero}/${mesConCero}/${year}`;
    }

    return 'Fecha no válida';
  }

  // Función para convertir hora (maneja arrays de longitud 5 y 6)
  convertirHora(fechaArray: number[]): string {
    if (fechaArray.length === 5) {
      // Si la longitud es 5 (hora, minuto)
      const [, , , hour, minute] = fechaArray;
      const horaConCero = String(hour).padStart(2, '0');
      const minutoConCero = String(minute).padStart(2, '0');
      return `${horaConCero}:${minutoConCero}`;
    } else if (fechaArray.length === 6) {
      // Si la longitud es 6 (hora, minuto, segundo)
      const [, , , hour, minute] = fechaArray;
      const horaConCero = String(hour).padStart(2, '0');
      const minutoConCero = String(minute).padStart(2, '0');
      return `${horaConCero}:${minutoConCero}`;
    }

    return 'Hora no válida';
  }
}