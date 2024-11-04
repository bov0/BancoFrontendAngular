import { Component } from '@angular/core';
import { ButtonComponent } from '../../button/button.component';
import { CommonModule } from '@angular/common';
import { SelectComponent } from '../../select/select.component';
import { FormsModule } from '@angular/forms';
import { InputComponent } from '../../input/input.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../../auth.service';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-CrearCuentaForm',
  standalone: true,
  imports: [ButtonComponent,CommonModule,InputComponent,SelectComponent,FormsModule],
  templateUrl: './crear-cuenta-form.component.html',
  styleUrl: './crear-cuenta-form.component.css'
})
export class CrearCuentaFormComponent {
  tipoCuenta!: string;
  saldo!: number;
  usuarioId!: number;

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

  onCrearCuenta() {
    console.log("CREANDO CUENTA, TIPO DE CUENTA: " + this.tipoCuenta + " SALDO:" + this.saldo);
    
    if (!this.tipoCuenta || !this.saldo) {
      console.error("Tipo de cuenta o saldo no válido.");
      return;
    }
  
        this.crearCuentaBancaria(this.tipoCuenta, this.saldo, this.authService.id).subscribe({
          next: (res) => {
            console.log("Cuenta bancaria creada:", res);
            this.router.navigate(['/profile']);
          },
          error: (err) => console.error("Error al crear la cuenta bancaria:", err)
        });
  }  

  crearCuentaBancaria(tipoCuenta : string, saldo : number, usuarioId: number): Observable<any> {
    const headers = this.getAuthHeaders();
    const url = `${environment.urlBackend}/api/cuentasBancarias?tipoCuenta=${tipoCuenta}&saldo=${saldo}&usuarioId=${usuarioId}`;
    return this.http.post(url, null, { headers });
  }  

}
