import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
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
    <hlm-table class="w-full min-w-[400px] rounded-xl shadow-2xl border-2 border-solid border-gray-50">
      <hlm-caption class="pb-6">Transacciones para la cuenta {{ cuentaNumero }}</hlm-caption>
      <hlm-trow>
        <hlm-th class="w-52">Fecha</hlm-th>
        <hlm-th class="w-40">Hora</hlm-th>
        <hlm-th class="w-60">Tipo de Transacción</hlm-th>
        <hlm-th class="flex-1">Sector</hlm-th>
        <hlm-th class="justify-end w-40">Monto</hlm-th>
      </hlm-trow>
      
      <hlm-trow *ngFor="let transaccion of transacciones">
        <hlm-td class="font-medium w-52">{{ convertirFecha(transaccion.fecha) }}</hlm-td>
        <hlm-td class="w-40">{{ convertirHora(transaccion.fecha) }}</hlm-td>
        <hlm-td class="w-60">{{ transaccion.tipoTransaccion }}</hlm-td>
        <hlm-td class="flex-1">{{ transaccion.sector }}</hlm-td>
        <hlm-td class="justify-end w-40">{{ transaccion.monto }}€</hlm-td>
      </hlm-trow>
      
      <hlm-trow *ngIf="transacciones.length === 0" class="bg-muted/50 hover:bg-muted">
        <hlm-td colspan="5" class="text-center font-semibold">No hay transacciones</hlm-td>
      </hlm-trow>
    </hlm-table>
  `,
})
export class TableTransaccionesComponent {

  @Input() transacciones: any[] = [];
  @Input() cuentaNumero: string = '';

  meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

  convertirFecha(fechaArray: number[]): String {
    const [year, month, day] = fechaArray;
    const diaConCero = String(day).padStart(2, '0');
    return `${diaConCero} de ${this.meses[month - 1]} de ${year}`;
  }

  convertirHora(fechaArray: number[]): String {
    const [, , , hour, minute] = fechaArray;
    const horaConCero = String(hour).padStart(2, '0');
    const minutoConCero = String(minute).padStart(2, '0');
    return `${horaConCero}:${minutoConCero}`;
  }
}