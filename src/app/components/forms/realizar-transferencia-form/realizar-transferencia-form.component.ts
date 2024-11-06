import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth.service';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { ButtonComponent } from "../../button/button.component";
import { SelectComponent } from "../../select/select.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextComponent } from "../../input-text/input-text.component";
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-RealizarTransferenciaForm',
  standalone: true,
  imports: [ButtonComponent, SelectComponent, CommonModule, FormsModule, InputTextComponent],
  templateUrl: './realizar-transferencia-form.component.html',
  styleUrls: ['./realizar-transferencia-form.component.css']
})
export class RealizarTransferenciaFormComponent implements OnInit {
  cuentasBancarias: any[] = [];
  opcionesCuentas: string[] = [];
  errorMessage: string | null = null;
  cuentaOrigenSeleccionada: any;
  cuentaDestinoSeleccionada: any;
  importe: any;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) { }

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.JWT;
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  ngOnInit() {
    this.loadCuentasBancarias();
  }

  onRealizarTransferencia() {
    // Validación de datos
    if (!this.cuentaOrigenSeleccionada || !this.cuentaDestinoSeleccionada || !this.importe) {
      this.errorMessage = 'Por favor, completa todos los campos.';
      return;
    }

    // Obtener información de la cuenta origen
    this.obtenerCuentaPorNumero(this.cuentaOrigenSeleccionada).subscribe({
      next: (cuentaOrigen) => {
        const saldoOrigen: number = cuentaOrigen.saldo;
        const idCuentaOrigen = cuentaOrigen.id;

        // Verificar si la cuenta origen tiene suficiente saldo
        if (saldoOrigen < this.importe) {
          this.errorMessage = 'Saldo insuficiente en la cuenta de origen.';
          return;
        }

        // Obtener información de la cuenta destino
        this.obtenerCuentaPorNumero(this.cuentaDestinoSeleccionada).subscribe({
          next: (cuentaDestino) => {
            const saldoDestino: number = cuentaDestino.saldo;
            const idCuentaDestino = cuentaDestino.id;

            // Calcular nuevos saldos
            const nuevoSaldoOrigen = saldoOrigen - this.importe;
            const nuevoSaldoDestino = saldoDestino + this.importe;

            // Registrar transacciones (RETIRO en cuenta origen y DEPOSITO en cuenta destino)
            this.crearTransaccion('RETIRO', this.importe, idCuentaOrigen).subscribe({
              next: () => {
                this.crearTransaccion('DEPOSITO', this.importe, idCuentaDestino).subscribe({
                  next: () => {
                    // Actualizar saldos de ambas cuentas
                    this.actualizarSaldoCuenta(this.cuentaOrigenSeleccionada, nuevoSaldoOrigen).subscribe({
                      next: () => {
                        this.actualizarSaldoCuenta(this.cuentaDestinoSeleccionada, nuevoSaldoDestino).subscribe({
                          next: () => {
                            alert('Transferencia completada exitosamente.');
                          },
                          error: () => {
                            alert('Error al actualizar el saldo de la cuenta destino.');
                          }
                        });
                      },
                      error: () => {
                        alert('Error al actualizar el saldo de la cuenta origen.');
                      }
                    });
                  },
                  error: () => {
                    alert('Error al realizar el depósito en la cuenta destino.');
                  }
                });
              },
              error: () => {
                alert('Error al realizar el retiro de la cuenta origen.');
              }
            });
          },
          error: () => {
            alert('Error al obtener saldo de la cuenta destino.');
          }
        });
      },
      error: () => {
        alert('Error al obtener saldo de la cuenta origen.');
      }
    });
  }

  private crearTransaccion(tipo: string, monto: number, cuentaId: any) {
    const url = `${environment.urlBackend}/api/transacciones?tipoTransaccion=${tipo}&monto=${monto}&cuentaId=${cuentaId}&sector=${"SERVICIOS"}`;
    return this.http.post(url, {}, { headers: this.getAuthHeaders() });
  }

  private obtenerCuentaPorNumero(numeroCuenta: string): Observable<any> {
    const url = `${environment.urlBackend}/api/cuentasBancarias/numero/${numeroCuenta}`;
    return this.http.get<any>(url, { headers: this.getAuthHeaders() });
  }

  private actualizarSaldoCuenta(numeroCuenta: string, nuevoSaldo: number): Observable<any> {
    const url = `${environment.urlBackend}/api/cuentasBancarias/${numeroCuenta}`;
    const params = { saldo: nuevoSaldo };
    return this.http.put(url, params, { headers: this.getAuthHeaders() });
  }

  private loadCuentasBancarias() {
    this.http.get(`${environment.urlBackend}/api/cuentasBancarias/usuario/${this.authService.id}`, { headers: this.getAuthHeaders() })
      .subscribe({
        next: (res: any) => {
          this.cuentasBancarias = res;
          this.opcionesCuentas = this.cuentasBancarias.map(cuenta => cuenta.numeroCuenta);
        },
        error: (err) => {
          this.errorMessage = 'No se pudieron cargar las cuentas bancarias.';
        }
      });
  }
}
