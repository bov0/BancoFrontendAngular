import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { TableTransaccionesComponent } from '../transacciones-table/transacciones-table.component';
import { CommonModule } from '@angular/common';
import { CuentaCardDetailsComponent } from '../cuenta-card-details/cuenta-card-details.component';
import { SkeletonComponent } from '../skeleton/skeleton.component';

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [TableTransaccionesComponent,CuentaCardDetailsComponent,SkeletonComponent, CommonModule],
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css'],
})
export class UserInfoComponent {
  cuentasBancarias: any[] = [];
  transacciones: { [key: string]: any[] } = {};
  errorMessage: string | null = null;
  cuentaSeleccionada: any = null;

  constructor(
    public authService: AuthService,
    public router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {
    if (!this.authService.isLoggedIn.value) {
      this.router.navigate(['/']);
    } else {
      const token = this.authService.JWT;
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`
      });

      this.http.get(`${environment.urlBackend}/api/cuentasBancarias/usuario/${this.authService.id}`, { headers })
        .subscribe({
          next: (res: any) => {
            this.cuentasBancarias = res;
            console.log(res);
          },
          error: (err) => {
            console.error('Error:', err);
            this.errorMessage = 'No se pudieron cargar las cuentas bancarias.';
          }
        });
    }
  }

  onCuentaSeleccionada(cuenta: any) {
    this.cuentaSeleccionada = cuenta;
    
    if (!this.transacciones[cuenta.id]) {
      const token = this.authService.JWT;
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`
      });

      this.http.get(`${environment.urlBackend}/api/transacciones/cuenta/${cuenta.id}`, { headers })
        .subscribe({
          next: (res: any) => {
            this.transacciones[cuenta.id] = res;
            console.log('Transacciones para cuenta', cuenta.numeroCuenta, res);
          },
          error: (err) => {
            console.error('Error al cargar transacciones:', err);
            this.errorMessage = 'No se pudieron cargar las transacciones.';
          }
        });
    }
  }
}
