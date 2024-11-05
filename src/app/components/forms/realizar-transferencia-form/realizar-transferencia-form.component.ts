import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth.service';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { ButtonComponent } from "../../button/button.component";
import { SelectComponent } from "../../select/select.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputComponent } from "../../input/input.component";
import { InputTextComponent } from "../../input-text/input-text.component";

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
  cuentaPropiaSeleccionada: any;
  limiteCredito: any;
  cuentaDestinoSeleccionada: any;

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
    console.log(this.cuentaPropiaSeleccionada + " " + this.cuentaDestinoSeleccionada);
  }

  private loadCuentasBancarias() {
    this.http.get(`${environment.urlBackend}/api/cuentasBancarias/usuario/${this.authService.id}`, { headers: this.getAuthHeaders() })
      .subscribe({
        next: (res: any) => {
          this.cuentasBancarias = res;
          this.opcionesCuentas = this.cuentasBancarias.map(cuenta => cuenta.numeroCuenta);
          console.log('Cuentas bancarias:', this.cuentasBancarias);
        },
        error: (err) => {
          console.error('Error al cargar cuentas bancarias:', err);
          this.errorMessage = 'No se pudieron cargar las cuentas bancarias.';
        }
      });
  }
}