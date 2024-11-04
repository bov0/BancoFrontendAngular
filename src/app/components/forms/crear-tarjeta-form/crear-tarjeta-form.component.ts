import { Component, OnInit } from '@angular/core';
import { ButtonComponent } from '../../button/button.component';
import { CommonModule } from '@angular/common';
import { InputComponent } from '../../input/input.component';
import { SelectComponent } from '../../select/select.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../auth.service'; // Importa el servicio de autenticación
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crearTarjetaForm',
  standalone: true,
  imports: [ButtonComponent, CommonModule, InputComponent, SelectComponent, FormsModule],
  templateUrl: './crear-tarjeta-form.component.html',
  styleUrls: ['./crear-tarjeta-form.component.css'],
})
export class CrearTarjetaFormComponent implements OnInit {
  limiteCredito!: number;
  cuentaBancariaId!: number;
  cuentasBancarias: {
    numeroCuenta: any;
  }[] = [];
  opcionesCuentas: string[] = [];
  cuentaSeleccionada: any;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    const usuarioId = this.authService.id;
    if (usuarioId) {
      this.getCuentasBancarias(usuarioId).subscribe({
        next: (cuentas) => {
          console.log("CUENTAS ENCONTRADAS PARA EL FORMULARIO: ", cuentas);
          this.cuentasBancarias = cuentas;
          this.opcionesCuentas = this.cuentasBancarias.map(cuenta => cuenta.numeroCuenta);
        },
        error: (err) => {
          console.error("Error al obtener las cuentas bancarias: ", err);
        }
      });
    }
  }

  onCrearTarjeta() {
    console.log("CREANDO CUENTA, LIMITE DE CUENTA: " + this.limiteCredito + " NUMERO DE CUENTA ASOCIADA:" + this.cuentaSeleccionada);
    
    if (!this.cuentaSeleccionada || !this.limiteCredito) {
      console.error("Número de cuenta o límite de crédito no válido.");
      return;
    }
  
    this.getCuentaIdPorNumero(this.cuentaSeleccionada).subscribe({
      next: (cuenta) => {
        const cuentaBancariaId = cuenta.id;
  
        // Crear la tarjeta con el ID de la cuenta bancaria obtenida y el límite de crédito
        this.crearTarjetaCredito(this.limiteCredito, cuentaBancariaId).subscribe({
          next: (res) => {
            console.log("Tarjeta de crédito creada:", res);
            this.router.navigate(['/profile']);
          },
          error: (err) => console.error("Error al crear la tarjeta de crédito:", err)
        });
      },
      error: (err) => console.error("Error al obtener el ID de la cuenta bancaria:", err)
    });
  }  

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.JWT;
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  getCuentasBancarias(usuarioId: number): Observable<any[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<any[]>(`${environment.urlBackend}/api/cuentasBancarias/usuario/${usuarioId}`, { headers });
  }

  getCuentaIdPorNumero(numeroCuenta: string): Observable<{ id: number }> {
    const headers = this.getAuthHeaders();
    return this.http.get<{ id: number }>(`http://localhost:8081/api/cuentasBancarias/numero/${numeroCuenta}`, { headers });
  }

  crearTarjetaCredito(limiteCredito: number, cuentaBancariaId: number): Observable<any> {
    const headers = this.getAuthHeaders();
    const url = `${environment.urlBackend}/api/tarjetasCredito?limiteCredito=${limiteCredito}&cuentaBancariaId=${cuentaBancariaId}`;
    return this.http.post(url, null, { headers });
  }  
}